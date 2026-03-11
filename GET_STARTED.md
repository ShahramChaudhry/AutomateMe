# Get Started in 3 Steps

## Step 1: Install Dependencies

```bash
./setup.sh
```

This will:
- Create Python virtual environment
- Install all backend dependencies
- Install all frontend dependencies
- Create .env files from templates

## Step 2: Add Your Google Gemini API Key

1. Get a free API key at https://ai.google.dev/ (see `API_KEY_SETUP.md` for detailed guide)
2. Edit `backend/.env`:

```bash
nano backend/.env
```

3. Replace `your_google_api_key_here` with your actual Gemini API key (starts with `AIza...`).

## Step 3: Start the App

```bash
./start.sh
```

This starts:
- Backend API at http://localhost:8000
- Frontend app at http://localhost:3000

## Try It Out!

1. Open http://localhost:3000
2. Copy this example into the "Text Input" tab:

**Workflow Name:** Customer Support Ticket Resolution

**Team:** Customer Operations

**Tools Used:** Zendesk, Slack, Salesforce

**Description:**
```
Our support team receives 100+ tickets daily. Each requires manual categorization, knowledge base searching, response drafting, supervisor review, and system updates. Categorization takes 5-10 min, response drafting 10-15 min. We have inconsistent quality and 24+ hour response times during peaks. Runs 100x daily with sensitive customer data.
```

3. Click "Audit Workflow"
4. See AI-powered analysis with automation recommendations!

## More Examples

See `EXAMPLES.md` for 7 ready-to-test workflow examples including:
- Customer Support
- Sales Pipeline
- Weekly Reporting
- Invoice Processing
- Compliance Review
- Employee Onboarding
- Content Moderation

## Need Help?

- Check `README.md` for full documentation
- Check `QUICKSTART.md` for troubleshooting
- Check `ARCHITECTURE.md` for technical details

## What's Included

📁 **Complete Project Structure**
- Full-stack TypeScript/Python application
- Beautiful TapTap-inspired UI
- AI-powered workflow analysis
- PDF and image upload support
- Modular, production-ready code

📚 **Comprehensive Documentation**
- README with full overview
- Quick start guide
- Example workflows
- Architecture documentation
- Deployment guide
- Contributing guide

🛠️ **Developer Tools**
- Setup script for easy installation
- Start script to run both servers
- Verify script to check installation
- Docker support for containerization

🎨 **Professional Design**
- TapTap Send color palette
- Clean fintech aesthetic
- Responsive layout
- Smooth interactions

🤖 **AI Analysis Features**
- Powered by Google Gemini 2.0 (free tier available!)
- Workflow extraction and summarization
- Step-by-step breakdown
- Friction point identification
- AI automation recommendations
- Risk assessment
- Implementation roadmap

## Ready to Ship

This MVP is production-ready with:
- ✅ Type safety (TypeScript + Pydantic)
- ✅ Error handling
- ✅ Input validation
- ✅ API documentation (auto-generated at /docs)
- ✅ CORS configuration
- ✅ Docker support
- ✅ Environment variable management
- ✅ Modern best practices

Start building! 🚀
