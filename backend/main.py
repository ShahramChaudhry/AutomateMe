from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import TextAnalysisRequest, AnalysisResponse
from analyzer import analyze_text_workflow, analyze_pdf_workflow, analyze_image_workflow
from config import get_settings
import json

settings = get_settings()

app = FastAPI(
    title="AutomateMe API",
    description="Analyze workflows to identify AI automation opportunities",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "AutomateMe API", "status": "running"}


@app.post("/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    try:
        result = await analyze_text_workflow(
            workflow_name=request.workflow_name,
            team=request.team,
            tools_used=request.tools_used,
            description=request.description
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/analyze/pdf", response_model=AnalysisResponse)
async def analyze_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        content = await file.read()
        result = await analyze_pdf_workflow(content, file.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF analysis failed: {str(e)}")


@app.post("/analyze/image", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, and WebP images are supported")
    
    try:
        content = await file.read()
        result = await analyze_image_workflow(content, file.filename, file.content_type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {str(e)}")


@app.post("/export/markdown")
async def export_markdown(analysis: AnalysisResponse):
    md = f"""# Workflow Analysis: {analysis.workflow_summary}

## Detected Steps
"""
    for step in analysis.detected_steps:
        md += f"{step.step_number}. {step.description} {'(Manual)' if step.is_manual else '(Automated)'}\n"
    
    md += "\n## Friction Points\n"
    for point in analysis.friction_points:
        md += f"- {point}\n"
    
    md += "\n## Automation Opportunities\n"
    for opp in analysis.automation_opportunities:
        md += f"### {opp.description}\n"
        md += f"- **Pattern:** {opp.ai_pattern}\n"
        md += f"- **Difficulty:** {opp.difficulty}\n"
        md += f"- **Risk:** {opp.risk}\n"
        md += f"- **Time Saved:** {opp.estimated_time_saved}\n\n"
    
    md += "\n## Recommended AI Agents\n"
    for agent in analysis.recommended_agents:
        md += f"### {agent.agent_name}\n"
        md += f"{agent.purpose}\n\n"
    
    return {"markdown": md}


@app.post("/export/json")
async def export_json(analysis: AnalysisResponse):
    return JSONResponse(content=analysis.model_dump())
