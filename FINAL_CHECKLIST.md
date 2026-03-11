# Final Setup Checklist

Before running the app, complete these steps:

## ✅ Installation Checklist

- [ ] Run `./setup.sh` to install all dependencies
- [ ] Get free Gemini API key from https://ai.google.dev/
- [ ] Edit `backend/.env` and paste your API key
- [ ] Verify with `./verify.sh`

## ✅ First Run Checklist

- [ ] Run `./start.sh` to start both servers
- [ ] Open http://localhost:3000 in browser
- [ ] Verify page loads with "AI Ops Auditor" title
- [ ] Check backend at http://localhost:8000/docs

## ✅ First Test Checklist

Use one of these quick tests:

**Option 1 - Simple Text Test:**
1. Click "Text Input" tab
2. Fill in:
   - Workflow Name: `Email Processing`
   - Team: `Operations`
   - Description: `We manually read 100 emails daily, categorize them, and forward to correct teams. Takes 2 hours per day.`
3. Click "Audit Workflow"
4. Wait 10-15 seconds
5. Verify you see 8 output sections

**Option 2 - Use Example Workflow:**
1. Open `EXAMPLES.md`
2. Copy the "Customer Support Ticket Resolution" example
3. Paste into the Text Input form
4. Click "Audit Workflow"
5. Review comprehensive analysis

## ✅ Troubleshooting

**Backend doesn't start:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python -c "import google.generativeai as genai; print('✅ Gemini SDK installed')"
```

**Frontend doesn't start:**
```bash
cd frontend
npm install
npm run dev
```

**Analysis fails:**
- Check API key in `backend/.env`
- Verify API key is valid at https://ai.google.dev/
- Check backend terminal for error messages
- Try with shorter workflow description first

**CORS errors:**
- Verify backend is running on port 8000
- Check `FRONTEND_URL` in `backend/.env` is `http://localhost:3000`
- Restart backend after changing .env

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Both servers start without errors
- ✅ Frontend page loads at localhost:3000
- ✅ You can submit a workflow and see results
- ✅ Results include all 8 sections:
  1. Workflow Summary
  2. Detected Steps
  3. Friction & Manual Work
  4. AI Automation Opportunities
  5. Recommended AI Agents
  6. Estimated Impact
  7. Risk & Human Review
  8. Implementation Plan

## 📚 Next Steps After Setup

1. Try all 7 example workflows from `EXAMPLES.md`
2. Test PDF upload with a process document
3. Test image upload with a workflow screenshot
4. Review `ARCHITECTURE.md` to understand the system
5. Check `WHY_GEMINI.md` to understand the AI model choice

## 🚀 Ready to Customize?

See `CONTRIBUTING.md` for how to:
- Add new analysis dimensions
- Customize the AI prompts
- Add new input methods
- Modify the UI styling
- Deploy to production

## ⏱️ Expected Timings

- **Setup**: 5 minutes (one-time)
- **Get API Key**: 2 minutes (one-time)
- **Start App**: 30 seconds
- **First Analysis**: 10-15 seconds
- **Subsequent Analyses**: 5-10 seconds

## 💡 Pro Tips

1. **Save API Key Securely**: Store in password manager after getting it
2. **Test with Simple Workflows First**: Start small to verify setup
3. **Use Examples**: The 7 example workflows are production-ready test cases
4. **Check Backend Logs**: If analysis fails, backend terminal shows detailed errors
5. **Free Tier Limit**: 1,500/day resets at midnight Pacific Time

## Need Help?

- `README.md` - Full documentation
- `QUICKSTART.md` - Usage guide
- `API_KEY_SETUP.md` - Detailed API key instructions
- `EXAMPLES.md` - Ready-to-use test workflows
- `TROUBLESHOOTING.md` - Common issues

Happy auditing! 🎯
