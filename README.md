# 🤖 AutomateMe

A polished MVP web application powered by **Google Gemini 2.5** that analyzes internal company workflows and identifies AI automation opportunities.

> **🎉 Free Tier**: 1,500 analyses per day at no cost!  
> **⚡ Fast Setup**: 5 minutes from clone to running  
> **🎨 TapTap Design**: Beautiful fintech-inspired UI  

**[→ Start Here: GET_STARTED.md](GET_STARTED.md)** | **[→ See Examples](EXAMPLES.md)** | **[→ All Docs](INDEX.md)**

## Features

- **Multi-Input Support**: Text descriptions, PDF uploads, or image uploads (screenshots, diagrams, SOPs)
- **AI-Powered Analysis**: Extracts workflows and generates detailed automation recommendations
- **Beautiful TapTap-Inspired UI**: Clean fintech design with modern SaaS aesthetics
- **Structured Output**: Comprehensive analysis including friction points, AI opportunities, recommended agents, and implementation plans

## Tech Stack

### Frontend
- Next.js 14 (TypeScript)
- Tailwind CSS with TapTap-inspired design
- Axios for API calls

### Backend
- FastAPI (Python)
- Google Gemini 2.0 Flash (with vision capabilities)
- PyPDF2 for PDF text extraction
- PyMuPDF for PDF-to-image conversion
- Pillow for image processing

### Why Gemini?
- **Free tier**: 1,500 requests/day at no cost
- **Vision capabilities**: Analyze images and PDFs
- **Fast**: Sub-second response times
- **Cost-effective**: 60x cheaper than GPT-4 on paid tier
- **JSON mode**: Structured output guaranteed

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Google Gemini API key (free tier available at ai.google.dev)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Edit `.env` and add your Google Gemini API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:3000
```

**Get your free API key**: See `API_KEY_SETUP.md` for step-by-step instructions, or visit https://ai.google.dev/

6. Start the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Choose your input method:
   - **Text Input**: Manually describe your workflow
   - **PDF Upload**: Upload a workflow document
   - **Image Upload**: Upload screenshots or diagrams
3. Click "Audit Workflow" to analyze
4. Review the comprehensive analysis with:
   - Workflow summary and detected steps
   - Friction points and manual work
   - AI automation opportunities
   - Recommended AI agents
   - Estimated impact metrics
   - Risk areas requiring human review
   - Implementation plan

## Example Workflows to Test

Try analyzing these common workflows:

1. **Customer Support**: "Our team receives 50+ tickets daily in Zendesk. Each ticket requires manual categorization, research in our knowledge base, and response drafting."

2. **Sales Pipeline**: "Sales reps manually qualify leads from form submissions, research company info, and schedule demos through back-and-forth emails."

3. **Weekly Reporting**: "Every Friday, team leads manually pull data from 3 systems, create Excel charts, and write summary emails to stakeholders."

4. **Compliance Review**: "Legal team reviews contracts for compliance issues, manually highlighting risks and suggesting edits."

## API Endpoints

- `POST /analyze/text` - Analyze text workflow description
- `POST /analyze/pdf` - Analyze PDF workflow document
- `POST /analyze/image` - Analyze workflow image/screenshot
- `POST /export/markdown` - Export analysis as Markdown
- `POST /export/json` - Export analysis as JSON

## Project Structure

```
AutomateMe/
├── backend/
│   ├── main.py           # FastAPI app and endpoints
│   ├── analyzer.py       # AI analysis logic
│   ├── models.py         # Pydantic models
│   ├── config.py         # Configuration
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment template
├── frontend/
│   ├── app/
│   │   ├── page.tsx      # Main application page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── package.json      # Node dependencies
│   ├── tsconfig.json     # TypeScript config
│   ├── tailwind.config.ts # Tailwind config with TapTap colors
│   └── .env.example      # Environment template
└── README.md
```

## Color Palette (TapTap-Inspired)

- **Dark Green** (`#003830`): Primary text, buttons, headings
- **Light Green** (`#b6e4c5`): Highlights, backgrounds
- **Cream** (`#fbeee5`): Card backgrounds
- **Peach** (`#ffcab2`): Accent sections
- **Red** (`#fd3333`): Warnings, high-risk items

## Development

- Backend runs on port 8000
- Frontend runs on port 3000
- API documentation available at `http://localhost:8000/docs`

## License

MIT
