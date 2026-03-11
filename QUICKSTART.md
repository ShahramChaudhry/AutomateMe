# Quick Start Guide

## Installation (One-Time Setup)

```bash
# Run the setup script
./setup.sh

# Edit backend/.env and add your Google Gemini API key
# Get free key at: https://ai.google.dev/
nano backend/.env  # or use your preferred editor
```

## Running the Application

```bash
# Start both servers at once
./start.sh
```

Or start them separately in two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Test It Out

Try this example workflow in the Text Input tab:

**Workflow Name:** Customer Support Ticket Resolution

**Team:** Customer Operations

**Tools Used:** Zendesk, Slack, Salesforce

**Description:**
```
Our support team receives 100+ customer tickets daily through Zendesk. Each ticket goes through this process:

1. Agent reads the ticket and manually categorizes it (billing, technical, account)
2. Agent searches through 3 different knowledge bases to find relevant information
3. Agent manually drafts a response, often copying from previous tickets
4. Supervisor reviews responses for quality before sending
5. Agent updates Salesforce with ticket details and customer notes
6. Agent posts update in team Slack channel

The categorization and research steps take 5-10 minutes per ticket. Response drafting takes another 10-15 minutes. We often have inconsistent responses across agents. High volume during peak hours causes 24+ hour response times.

This workflow runs 100 times per day, 5 days per week. Customer data is sensitive and requires compliance with data privacy regulations.
```

Click "Audit Workflow" and see the AI analysis!

## Example Workflows

### Sales Pipeline Management
- Lead qualification
- Company research
- Email outreach
- Demo scheduling
- CRM updates

### Weekly Reporting
- Data collection from multiple systems
- Chart creation
- Summary writing
- Stakeholder distribution

### Compliance Review
- Contract analysis
- Risk identification
- Compliance checking
- Redline suggestions

## Troubleshooting

**Backend won't start:**
- Check that your Google Gemini API key is set in `backend/.env`
- Get free API key at https://ai.google.dev/
- Make sure virtual environment is activated: `source backend/venv/bin/activate`

**Frontend won't start:**
- Run `npm install` in the frontend directory
- Check that port 3000 is available

**CORS errors:**
- Verify `FRONTEND_URL` in backend/.env matches your frontend URL
- Check that both servers are running

**Analysis fails:**
- Verify Google Gemini API key is valid (get one free at https://ai.google.dev/)
- Check backend logs for detailed error messages
- Try with a simpler workflow description first
