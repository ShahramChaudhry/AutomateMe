'use client';

import { useState } from 'react';
import axios from 'axios';

type TabType = 'text' | 'pdf' | 'image';

interface WorkflowStep {
  step_number: number;
  description: string;
  is_manual: boolean;
  is_repetitive: boolean;
  time_estimate?: string;
}

interface AutomationOpportunity {
  description: string;
  ai_pattern: string;
  difficulty: string;
  risk: string;
  human_in_loop: boolean;
  estimated_time_saved: string;
}

interface RecommendedAgent {
  agent_name: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  architecture: string;
}

interface ImpactEstimate {
  time_saved: string;
  speed_improvement: string;
  quality_improvement: string;
}

interface ImplementationStep {
  step_number: number;
  description: string;
  complexity: string;
}

interface AnalysisResult {
  workflow_summary: string;
  detected_steps: WorkflowStep[];
  friction_points: string[];
  automation_opportunities: AutomationOpportunity[];
  recommended_agents: RecommendedAgent[];
  estimated_impact: ImpactEstimate;
  risk_areas: string[];
  implementation_plan: ImplementationStep[];
  compliance_sensitivity: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  const [workflowName, setWorkflowName] = useState('');
  const [team, setTeam] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [description, setDescription] = useState('');
  
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_URL = '/api';

  const handleTextSubmit = async () => {
    if (!workflowName || !team || !description) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/analyze/text`, {
        workflow_name: workflowName,
        team: team,
        tools_used: toolsUsed,
        description: description,
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfSubmit = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await axios.post(`${API_URL}/analyze/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('PDF analysis failed:', error);
      alert('PDF analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async () => {
    if (!imageFile) {
      alert('Please select an image file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await axios.post(`${API_URL}/analyze/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Image analysis failed:', error);
      alert('Image analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'text') {
      handleTextSubmit();
    } else if (activeTab === 'pdf') {
      handlePdfSubmit();
    } else if (activeTab === 'image') {
      handleImageSubmit();
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-taptap-red text-white';
      case 'medium':
        return 'bg-taptap-peach text-taptap-dark-green';
      case 'low':
        return 'bg-taptap-light-green text-taptap-dark-green';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'high':
        return 'bg-taptap-dark-green text-white';
      case 'medium':
        return 'bg-taptap-light-green text-taptap-dark-green';
      case 'low':
        return 'bg-taptap-cream text-taptap-dark-green';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-taptap-cream via-white to-taptap-light-green">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-taptap-dark-green mb-4">
            AI Ops Auditor
          </h1>
          <p className="text-xl text-taptap-dark-green/70">
            Audit operational workflows to uncover high-impact AI automation opportunities.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('text')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === 'text'
                  ? 'text-taptap-dark-green border-b-2 border-taptap-dark-green'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === 'pdf'
                  ? 'text-taptap-dark-green border-b-2 border-taptap-dark-green'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              PDF Upload
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === 'image'
                  ? 'text-taptap-dark-green border-b-2 border-taptap-dark-green'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Image Upload
            </button>
          </div>

          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Workflow Name *
                </label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-taptap-light-green focus:border-transparent outline-none"
                  placeholder="e.g., Customer Support Ticket Resolution"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Team *
                </label>
                <input
                  type="text"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-taptap-light-green focus:border-transparent outline-none"
                  placeholder="e.g., Customer Operations"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Tools Used (optional)
                </label>
                <input
                  type="text"
                  value={toolsUsed}
                  onChange={(e) => setToolsUsed(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-taptap-light-green focus:border-transparent outline-none"
                  placeholder="e.g., Zendesk, Slack, Salesforce"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Workflow Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-taptap-light-green focus:border-transparent outline-none resize-none"
                  placeholder="Describe your workflow in detail. Include steps, pain points, frequency, tools, and any compliance requirements..."
                />
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Upload PDF Workflow Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-taptap-light-green transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="text-taptap-dark-green/70 mb-2">
                      {pdfFile ? pdfFile.name : 'Click to upload or drag and drop'}
                    </div>
                    <div className="text-sm text-gray-500">
                      PDF files only (max 10MB)
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-taptap-dark-green mb-2">
                  Upload Workflow Screenshot / Diagram
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-taptap-light-green transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-taptap-dark-green/70 mb-2">
                      {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                    </div>
                    <div className="text-sm text-gray-500">
                      PNG, JPG, or WebP (max 10MB)
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-taptap-dark-green text-white font-semibold py-4 rounded-lg hover:bg-taptap-dark-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing Workflow...' : 'Audit Workflow'}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Workflow Summary
              </h2>
              <p className="text-gray-700">{analysis.workflow_summary}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Detected Steps
              </h2>
              <div className="space-y-3">
                {analysis.detected_steps.map((step) => (
                  <div
                    key={step.step_number}
                    className="flex items-start gap-4 p-4 bg-taptap-cream rounded-lg"
                  >
                    <div className="bg-taptap-dark-green text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                      {step.step_number}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{step.description}</p>
                      <div className="flex gap-2 mt-2">
                        {step.is_manual && (
                          <span className="text-xs px-2 py-1 bg-taptap-peach text-taptap-dark-green rounded">
                            Manual
                          </span>
                        )}
                        {step.is_repetitive && (
                          <span className="text-xs px-2 py-1 bg-taptap-light-green text-taptap-dark-green rounded">
                            Repetitive
                          </span>
                        )}
                        {step.time_estimate && (
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                            {step.time_estimate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Friction & Manual Work
              </h2>
              <ul className="space-y-2">
                {analysis.friction_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-taptap-red mt-1">⚠</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                AI Automation Opportunities
              </h2>
              <div className="space-y-4">
                {analysis.automation_opportunities.map((opp, idx) => (
                  <div key={idx} className="p-6 bg-taptap-cream rounded-xl">
                    <p className="text-gray-800 font-medium mb-3">
                      {opp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-taptap-light-green text-taptap-dark-green rounded-full font-semibold">
                        {opp.ai_pattern}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor(opp.difficulty)}`}>
                        Difficulty: {opp.difficulty}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getRiskColor(opp.risk)}`}>
                        Risk: {opp.risk}
                      </span>
                      {opp.human_in_loop && (
                        <span className="text-xs px-3 py-1 bg-taptap-dark-green text-white rounded-full font-semibold">
                          Human Review Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      💰 Time Saved: {opp.estimated_time_saved}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Recommended AI Agents
              </h2>
              <div className="space-y-4">
                {analysis.recommended_agents.map((agent, idx) => (
                  <div key={idx} className="p-6 bg-taptap-cream rounded-xl">
                    <h3 className="text-xl font-bold text-taptap-dark-green mb-2">
                      {agent.agent_name}
                    </h3>
                    <p className="text-gray-700 mb-4">{agent.purpose}</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-taptap-dark-green mb-1">
                          Inputs:
                        </p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {agent.inputs.map((input, i) => (
                            <li key={i}>{input}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-taptap-dark-green mb-1">
                          Outputs:
                        </p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {agent.outputs.map((output, i) => (
                            <li key={i}>{output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Architecture:</span> {agent.architecture}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Estimated Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-taptap-light-green rounded-xl text-center">
                  <p className="text-sm font-semibold text-taptap-dark-green mb-2">
                    Time Saved
                  </p>
                  <p className="text-2xl font-bold text-taptap-dark-green">
                    {analysis.estimated_impact.time_saved}
                  </p>
                </div>
                <div className="p-6 bg-taptap-light-green rounded-xl text-center">
                  <p className="text-sm font-semibold text-taptap-dark-green mb-2">
                    Speed Improvement
                  </p>
                  <p className="text-2xl font-bold text-taptap-dark-green">
                    {analysis.estimated_impact.speed_improvement}
                  </p>
                </div>
                <div className="p-6 bg-taptap-light-green rounded-xl text-center">
                  <p className="text-sm font-semibold text-taptap-dark-green mb-2">
                    Quality Improvement
                  </p>
                  <p className="text-2xl font-bold text-taptap-dark-green">
                    {analysis.estimated_impact.quality_improvement}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Risk & Human Review
              </h2>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-taptap-peach text-taptap-dark-green rounded-lg font-semibold">
                  Compliance Sensitivity: {analysis.compliance_sensitivity}
                </span>
              </div>
              <ul className="space-y-2">
                {analysis.risk_areas.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-taptap-red mt-1">🔒</span>
                    <span className="text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-taptap-dark-green mb-4">
                Implementation Plan
              </h2>
              <div className="space-y-3">
                {analysis.implementation_plan.map((step) => (
                  <div
                    key={step.step_number}
                    className="flex items-start gap-4 p-4 bg-taptap-cream rounded-lg"
                  >
                    <div className="bg-taptap-dark-green text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                      {step.step_number}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{step.description}</p>
                      <span className={`inline-block text-xs px-2 py-1 mt-2 rounded ${getDifficultyColor(step.complexity)}`}>
                        {step.complexity} complexity
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
