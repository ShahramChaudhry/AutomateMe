from pydantic import BaseModel
from typing import List, Optional


class TextAnalysisRequest(BaseModel):
    workflow_name: str
    team: str
    tools_used: Optional[str] = None
    description: str


class WorkflowStep(BaseModel):
    step_number: int
    description: str
    is_manual: bool
    is_repetitive: bool
    time_estimate: Optional[str] = None


class AutomationOpportunity(BaseModel):
    description: str
    ai_pattern: str
    difficulty: str
    risk: str
    human_in_loop: bool
    estimated_time_saved: str


class RecommendedAgent(BaseModel):
    agent_name: str
    purpose: str
    inputs: List[str]
    outputs: List[str]
    architecture: str


class ImpactEstimate(BaseModel):
    time_saved: str
    speed_improvement: str
    quality_improvement: str


class ImplementationStep(BaseModel):
    step_number: int
    description: str
    complexity: str


class AnalysisResponse(BaseModel):
    workflow_summary: str
    detected_steps: List[WorkflowStep]
    friction_points: List[str]
    automation_opportunities: List[AutomationOpportunity]
    recommended_agents: List[RecommendedAgent]
    estimated_impact: ImpactEstimate
    risk_areas: List[str]
    implementation_plan: List[ImplementationStep]
    compliance_sensitivity: str
