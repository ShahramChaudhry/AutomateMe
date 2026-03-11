import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const ANALYSIS_PROMPT = `You are an operations AI consultant analyzing workflows to identify AI automation opportunities.

Analyze the following workflow and provide a structured response.

Workflow Information:
{workflow_info}

Provide a detailed analysis in the following JSON structure:

{
  "workflow_summary": "Brief 2-3 sentence overview",
  "detected_steps": [{"step_number": 1, "description": "...", "is_manual": true, "is_repetitive": true, "time_estimate": "..."}],
  "friction_points": ["..."],
  "automation_opportunities": [{"description": "...", "ai_pattern": "...", "difficulty": "...", "risk": "...", "human_in_loop": true, "estimated_time_saved": "..."}],
  "recommended_agents": [{"agent_name": "...", "purpose": "...", "inputs": [...], "outputs": [...], "architecture": "..."}],
  "estimated_impact": {"time_saved": "...", "speed_improvement": "...", "quality_improvement": "..."},
  "risk_areas": ["..."],
  "implementation_plan": [{"step_number": 1, "description": "...", "complexity": "..."}],
  "compliance_sensitivity": "low|medium|high"
}

Be practical and realistic.`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const workflowInfo = `Workflow Name: ${file.name}\nSource: Image Upload`;

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
      systemInstruction: 'You are an expert operations consultant specializing in AI automation.',
    });

    const imagePart = {
      inlineData: {
        data: buffer.toString('base64'),
        mimeType: file.type,
      },
    };

    const prompt = ANALYSIS_PROMPT.replace('{workflow_info}', workflowInfo) + 
      '\n\nExtract the workflow from this image (screenshot, diagram, or SOP) and analyze it for AI automation opportunities.';

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: 'Image analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
