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
  "detected_steps": [
    {
      "step_number": 1,
      "description": "Step description",
      "is_manual": true,
      "is_repetitive": true,
      "time_estimate": "e.g., 5-10 minutes"
    }
  ],
  "friction_points": ["List of bottlenecks and pain points"],
  "automation_opportunities": [
    {
      "description": "What can be automated",
      "ai_pattern": "classification|summarization|extraction|routing|generation|analysis",
      "difficulty": "low|medium|high",
      "risk": "low|medium|high",
      "human_in_loop": true,
      "estimated_time_saved": "e.g., 2 hours per week"
    }
  ],
  "recommended_agents": [
    {
      "agent_name": "Descriptive name",
      "purpose": "What it does",
      "inputs": ["List of inputs"],
      "outputs": ["List of outputs"],
      "architecture": "Brief tech approach"
    }
  ],
  "estimated_impact": {
    "time_saved": "e.g., 10 hours per week",
    "speed_improvement": "e.g., 3x faster",
    "quality_improvement": "e.g., 95% accuracy vs 85% manual"
  },
  "risk_areas": ["Areas requiring human oversight"],
  "implementation_plan": [
    {
      "step_number": 1,
      "description": "Implementation step",
      "complexity": "low|medium|high"
    }
  ],
  "compliance_sensitivity": "low|medium|high"
}

Be practical and realistic. Focus on high-impact, achievable automation. Flag risky areas clearly.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const workflowInfo = `
Workflow Name: ${body.workflow_name}
Team: ${body.team}
Tools Used: ${body.tools_used || 'Not specified'}
Description: ${body.description}
`;

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
      systemInstruction: 'You are an expert operations consultant specializing in AI automation.',
    });

    const result = await model.generateContent(
      ANALYSIS_PROMPT.replace('{workflow_info}', workflowInfo)
    );
    
    const response = await result.response;
    const text = response.text();
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Text analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
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
