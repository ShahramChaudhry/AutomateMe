# Architecture Overview

## System Design

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         ▼
┌─────────────────┐
│  Next.js App    │
│  (Port 3000)    │
│                 │
│  - React UI     │
│  - TailwindCSS  │
│  - Form handling│
└────────┬────────┘
         │
         │ REST API
         ▼
┌─────────────────┐
│  FastAPI        │
│  (Port 8000)    │
│                 │
│  - 3 endpoints  │
│  - File parsing │
│  - Validation   │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│  Gemini API     │
│  (2.0-flash-exp)│
│                 │
│  - Text analysis│
│  - Vision       │
│  - JSON mode    │
└─────────────────┘
```

## Component Breakdown

### Frontend (`frontend/`)

**app/page.tsx** - Main application component
- Tab state management (Text/PDF/Image)
- Form inputs with validation
- File upload handling
- API calls to backend
- Results display with styled cards

**Styling**
- TailwindCSS with custom TapTap color palette
- Responsive design (mobile-friendly)
- Clean fintech aesthetic
- Smooth transitions and hover effects

### Backend (`backend/`)

**main.py** - FastAPI application
- CORS middleware for frontend connection
- 3 main endpoints:
  - `POST /analyze/text` - Text workflow analysis
  - `POST /analyze/pdf` - PDF document analysis
  - `POST /analyze/image` - Image/screenshot analysis
- 2 export endpoints:
  - `POST /export/markdown` - Export as MD
  - `POST /export/json` - Export as JSON

**analyzer.py** - AI analysis logic
- `analyze_text_workflow()` - Processes text descriptions using Gemini
- `analyze_pdf_workflow()` - Extracts text from PDFs with PyPDF2
- `analyze_pdf_with_vision()` - Fallback for image-based PDFs using Gemini Vision
- `analyze_image_workflow()` - Vision-based image analysis with Gemini
- Structured prompt engineering for consistent JSON output

**models.py** - Pydantic data models
- Type-safe request/response models
- Validation for all API inputs
- Structured output schema

**config.py** - Configuration management
- Environment variable handling
- Settings validation
- Cached settings singleton

## Data Flow

### Text Analysis Flow
1. User fills form → Submit
2. Frontend validates inputs
3. POST to `/analyze/text` with JSON body
4. Backend calls OpenAI with structured prompt
5. OpenAI returns JSON analysis
6. Backend validates with Pydantic
7. Frontend displays results in styled cards

### PDF Analysis Flow
1. User uploads PDF → Submit
2. Frontend sends multipart/form-data
3. Backend extracts text with PyPDF2
4. If text extraction fails → converts PDF to image and uses Gemini Vision
5. Gemini analyzes extracted content
6. Returns structured analysis

### Image Analysis Flow
1. User uploads image → Submit
2. Frontend sends multipart/form-data
3. Backend loads image with Pillow
4. Gemini vision model extracts workflow
5. Returns structured analysis

## AI Prompt Engineering

The system uses a structured prompt that acts as an "operations AI consultant" with specific instructions to:

1. **Extract workflow components:**
   - Steps (manual vs automated)
   - Tools used
   - Frequency and volume
   - Pain points

2. **Identify automation opportunities:**
   - AI pattern (classification, extraction, etc.)
   - Difficulty level
   - Risk assessment
   - Human-in-the-loop requirements

3. **Recommend specific AI agents:**
   - Purpose and capabilities
   - Input/output specifications
   - Architectural approach

4. **Assess impact:**
   - Time savings
   - Speed improvements
   - Quality improvements

5. **Flag risks:**
   - Compliance concerns
   - Areas requiring human oversight
   - High-stakes decisions

6. **Create implementation plan:**
   - Step-by-step roadmap
   - Complexity assessment

## API Schema

### Request (Text)
```json
{
  "workflow_name": "string",
  "team": "string",
  "tools_used": "string (optional)",
  "description": "string"
}
```

### Response (All endpoints)
```json
{
  "workflow_summary": "string",
  "detected_steps": [
    {
      "step_number": 1,
      "description": "string",
      "is_manual": true,
      "is_repetitive": true,
      "time_estimate": "string"
    }
  ],
  "friction_points": ["string"],
  "automation_opportunities": [
    {
      "description": "string",
      "ai_pattern": "classification|summarization|extraction|routing|generation|analysis",
      "difficulty": "low|medium|high",
      "risk": "low|medium|high",
      "human_in_loop": true,
      "estimated_time_saved": "string"
    }
  ],
  "recommended_agents": [
    {
      "agent_name": "string",
      "purpose": "string",
      "inputs": ["string"],
      "outputs": ["string"],
      "architecture": "string"
    }
  ],
  "estimated_impact": {
    "time_saved": "string",
    "speed_improvement": "string",
    "quality_improvement": "string"
  },
  "risk_areas": ["string"],
  "implementation_plan": [
    {
      "step_number": 1,
      "description": "string",
      "complexity": "low|medium|high"
    }
  ],
  "compliance_sensitivity": "low|medium|high"
}
```

## Technology Choices

### Why FastAPI?
- Fast, modern Python framework
- Automatic API documentation
- Type validation with Pydantic
- Async support for AI calls
- Easy to deploy

### Why Next.js?
- React with SSR capabilities
- Built-in routing
- Fast page loads
- Easy deployment to Vercel
- Great developer experience

### Why Google Gemini?
- Free tier available (great for MVP)
- Vision capabilities for images/PDFs
- JSON mode for structured output
- High-quality analysis
- Fast inference with 2.0-flash-exp
- Cost-effective at scale

### Why TailwindCSS?
- Rapid UI development
- Consistent design system
- Small bundle size
- Easy customization with theme

## Future Enhancements

1. **Database Layer**: Store analyses for history/comparison
2. **User Authentication**: Multi-tenant support
3. **Workflow Templates**: Pre-built industry templates
4. **Batch Processing**: Analyze multiple workflows at once
5. **Comparison View**: Compare automation strategies
6. **Export Options**: PDF reports, PowerPoint slides
7. **ROI Calculator**: Detailed cost/benefit analysis
8. **Integration Library**: Connect to actual tools (Zendesk API, etc.)
9. **Agent Marketplace**: Catalog of pre-built AI agents
10. **Implementation Tracking**: Track automation rollout progress
