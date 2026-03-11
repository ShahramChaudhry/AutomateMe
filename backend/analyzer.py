import google.generativeai as genai
from config import get_settings
from models import AnalysisResponse
import json
import base64
from typing import Optional


settings = get_settings()
genai.configure(api_key=settings.google_api_key)


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
      "is_manual": true/false,
      "is_repetitive": true/false,
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
      "human_in_loop": true/false,
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


async def analyze_text_workflow(
    workflow_name: str,
    team: str,
    tools_used: Optional[str],
    description: str
) -> AnalysisResponse:
    workflow_info = f"""
Workflow Name: {workflow_name}
Team: {team}
Tools Used: {tools_used or 'Not specified'}
Description: {description}
"""
    
    model = genai.GenerativeModel(
        model_name=settings.gemini_model,
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
    return AnalysisResponse(**result)


async def analyze_pdf_workflow(pdf_content: bytes, filename: str) -> AnalysisResponse:
    from PyPDF2 import PdfReader
    from io import BytesIO
    
    try:
        pdf_reader = PdfReader(BytesIO(pdf_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        if len(text.strip()) < 50:
            return await analyze_pdf_with_vision(pdf_content, filename)
        
        workflow_info = f"""
Workflow Name: {filename}
Source: PDF Upload
Content:
{text}
"""
        
        model = genai.GenerativeModel(
            model_name=settings.gemini_model,
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
        return AnalysisResponse(**result)
    
    except Exception as e:
        return await analyze_pdf_with_vision(pdf_content, filename)


async def analyze_pdf_with_vision(pdf_content: bytes, filename: str) -> AnalysisResponse:
    from PIL import Image
    from io import BytesIO
    import fitz
    
    doc = fitz.open(stream=pdf_content, filetype="pdf")
    page = doc[0]
    pix = page.get_pixmap(dpi=150)
    img_data = pix.tobytes("png")
    image = Image.open(BytesIO(img_data))
    
    workflow_info = f"Workflow Name: {filename}\nSource: PDF Upload (Vision Analysis)"
    
    model = genai.GenerativeModel(
        model_name=settings.gemini_model,
        generation_config={
            "temperature": 0.7,
            "response_mime_type": "application/json"
        },
        system_instruction="You are an expert operations consultant specializing in AI automation."
    )
    
    prompt = ANALYSIS_PROMPT.format(workflow_info=workflow_info) + "\n\nExtract the workflow from this PDF image and analyze it."
    
    response = model.generate_content([prompt, image])
    
    result = json.loads(response.text)
    return AnalysisResponse(**result)


async def analyze_image_workflow(image_content: bytes, filename: str, content_type: str) -> AnalysisResponse:
    from PIL import Image
    from io import BytesIO
    
    image = Image.open(BytesIO(image_content))
    
    workflow_info = f"Workflow Name: {filename}\nSource: Image Upload"
    
    model = genai.GenerativeModel(
        model_name=settings.gemini_model,
        generation_config={
            "temperature": 0.7,
            "response_mime_type": "application/json"
        },
        system_instruction="You are an expert operations consultant specializing in AI automation."
    )
    
    prompt = ANALYSIS_PROMPT.format(workflow_info=workflow_info) + "\n\nExtract the workflow from this image (screenshot, diagram, or SOP) and analyze it for AI automation opportunities."
    
    response = model.generate_content([prompt, image])
    
    result = json.loads(response.text)
    return AnalysisResponse(**result)
