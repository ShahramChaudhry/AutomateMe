from http.server import BaseHTTPRequestHandler
import json
import os
import google.generativeai as genai
from typing import Optional

genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))

ANALYSIS_PROMPT = """You are an operations AI consultant analyzing workflows to identify AI automation opportunities.

Analyze the following workflow and provide a structured response.

Workflow Information:
{workflow_info}

Provide a detailed analysis in the following JSON structure:

{{
  "workflow_summary": "Brief 2-3 sentence overview",
  "detected_steps": [
    {{
      "step_number": 1,
      "description": "Step description",
      "is_manual": true,
      "is_repetitive": true,
      "time_estimate": "e.g., 5-10 minutes"
    }}
  ],
  "friction_points": ["List of bottlenecks and pain points"],
  "automation_opportunities": [
    {{
      "description": "What can be automated",
      "ai_pattern": "classification|summarization|extraction|routing|generation|analysis",
      "difficulty": "low|medium|high",
      "risk": "low|medium|high",
      "human_in_loop": true,
      "estimated_time_saved": "e.g., 2 hours per week"
    }}
  ],
  "recommended_agents": [
    {{
      "agent_name": "Descriptive name",
      "purpose": "What it does",
      "inputs": ["List of inputs"],
      "outputs": ["List of outputs"],
      "architecture": "Brief tech approach"
    }}
  ],
  "estimated_impact": {{
    "time_saved": "e.g., 10 hours per week",
    "speed_improvement": "e.g., 3x faster",
    "quality_improvement": "e.g., 95% accuracy vs 85% manual"
  }},
  "risk_areas": ["Areas requiring human oversight"],
  "implementation_plan": [
    {{
      "step_number": 1,
      "description": "Implementation step",
      "complexity": "low|medium|high"
    }}
  ],
  "compliance_sensitivity": "low|medium|high"
}}

Be practical and realistic. Focus on high-impact, achievable automation. Flag risky areas clearly."""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            workflow_name = data.get('workflow_name', '')
            team = data.get('team', '')
            tools_used = data.get('tools_used', '')
            description = data.get('description', '')
            
            workflow_info = f"""
Workflow Name: {workflow_name}
Team: {team}
Tools Used: {tools_used or 'Not specified'}
Description: {description}
"""
            
            model = genai.GenerativeModel(
                model_name=os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash'),
                generation_config={
                    "temperature": 0.7,
                    "response_mime_type": "application/json"
                },
                system_instruction="You are an expert operations consultant specializing in AI automation."
            )
            
            response = model.generate_content(
                ANALYSIS_PROMPT.format(workflow_info=workflow_info)
            )
            
            result = json.loads(response.text)
            
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
