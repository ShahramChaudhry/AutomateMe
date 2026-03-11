from http.server import BaseHTTPRequestHandler
import json
import os
import google.generativeai as genai
from PyPDF2 import PdfReader
from io import BytesIO
import base64
from PIL import Image
import fitz

genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))

ANALYSIS_PROMPT = """You are an operations AI consultant analyzing workflows to identify AI automation opportunities.

Analyze the following workflow and provide a structured response.

Workflow Information:
{workflow_info}

Provide a detailed analysis in the following JSON structure (same as text analysis):

{{
  "workflow_summary": "Brief 2-3 sentence overview",
  "detected_steps": [{{"step_number": 1, "description": "...", "is_manual": true, "is_repetitive": true, "time_estimate": "..."}}, ...],
  "friction_points": ["..."],
  "automation_opportunities": [{{"description": "...", "ai_pattern": "...", "difficulty": "...", "risk": "...", "human_in_loop": true, "estimated_time_saved": "..."}}, ...],
  "recommended_agents": [{{"agent_name": "...", "purpose": "...", "inputs": [...], "outputs": [...], "architecture": "..."}}, ...],
  "estimated_impact": {{"time_saved": "...", "speed_improvement": "...", "quality_improvement": "..."}},
  "risk_areas": ["..."],
  "implementation_plan": [{{"step_number": 1, "description": "...", "complexity": "..."}}, ...],
  "compliance_sensitivity": "low|medium|high"
}}

Be practical and realistic."""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            boundary = self.headers['Content-Type'].split('boundary=')[1]
            parts = post_data.split(f'--{boundary}'.encode())
            
            pdf_content = None
            filename = 'document.pdf'
            
            for part in parts:
                if b'Content-Disposition' in part and b'filename=' in part:
                    lines = part.split(b'\r\n')
                    for i, line in enumerate(lines):
                        if b'filename=' in line:
                            filename = line.decode().split('filename="')[1].split('"')[0]
                        if line == b'':
                            pdf_content = b'\r\n'.join(lines[i+1:])
                            break
            
            if not pdf_content:
                raise ValueError("No PDF content found")
            
            try:
                pdf_reader = PdfReader(BytesIO(pdf_content))
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                
                if len(text.strip()) < 50:
                    doc = fitz.open(stream=pdf_content, filetype="pdf")
                    page = doc[0]
                    pix = page.get_pixmap(dpi=150)
                    img_data = pix.tobytes("png")
                    image = Image.open(BytesIO(img_data))
                    
                    workflow_info = f"Workflow Name: {filename}\nSource: PDF Upload (Vision)"
                    
                    model = genai.GenerativeModel(
                        model_name=os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash'),
                        generation_config={"temperature": 0.7, "response_mime_type": "application/json"},
                        system_instruction="You are an expert operations consultant specializing in AI automation."
                    )
                    
                    prompt = ANALYSIS_PROMPT.format(workflow_info=workflow_info) + "\n\nExtract workflow from PDF image."
                    response = model.generate_content([prompt, image])
                else:
                    workflow_info = f"Workflow Name: {filename}\nSource: PDF\nContent:\n{text}"
                    
                    model = genai.GenerativeModel(
                        model_name=os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash'),
                        generation_config={"temperature": 0.7, "response_mime_type": "application/json"},
                        system_instruction="You are an expert operations consultant specializing in AI automation."
                    )
                    
                    response = model.generate_content(ANALYSIS_PROMPT.format(workflow_info=workflow_info))
                
                result = json.loads(response.text)
                
            except Exception as e:
                raise ValueError(f"PDF processing failed: {str(e)}")
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
