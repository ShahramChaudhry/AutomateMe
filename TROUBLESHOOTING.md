# Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### "Module not found" errors

**Problem**: Python dependencies not installed

**Solution**:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### "GOOGLE_API_KEY not found"

**Problem**: Environment variable not set

**Solution**:
1. Check `backend/.env` exists
2. Verify it contains `GOOGLE_API_KEY=AIza...`
3. Get key at https://ai.google.dev/ if needed
4. Restart backend after adding key

#### "API key not valid"

**Problem**: Invalid or incorrect API key

**Solution**:
1. Verify you copied the entire key (starts with `AIza`)
2. Check for spaces or newlines in .env file
3. Regenerate key at https://ai.google.dev/
4. Make sure you're using Gemini API key, not other Google API keys

#### Backend starts but crashes on first request

**Problem**: Usually Gemini SDK or dependency issue

**Solution**:
```bash
cd backend
source venv/bin/activate
pip install --upgrade google-generativeai
python -c "import google.generativeai as genai; print('✅ Working')"
```

### Frontend Issues

#### "Module not found" in frontend

**Problem**: Node dependencies not installed

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Frontend won't start - port already in use

**Problem**: Port 3000 is occupied

**Solution**:
```bash
# Find process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
cd frontend
PORT=3001 npm run dev
```

#### "Failed to fetch" or CORS errors

**Problem**: Frontend can't reach backend

**Solution**:
1. Verify backend is running: http://localhost:8000
2. Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
3. Verify CORS settings in `backend/main.py`
4. Restart both servers

### Analysis Issues

#### Analysis returns empty or incomplete results

**Problem**: Gemini output not matching expected schema

**Solution**:
1. Check backend logs for JSON parsing errors
2. Try with simpler workflow description
3. Verify Gemini model name in `.env` is correct: `gemini-2.0-flash-exp`

#### "Quota exceeded" error

**Problem**: Hit free tier limit (1,500 requests/day)

**Solution**:
1. Wait until midnight PT for quota reset
2. Or upgrade to paid tier at https://ai.google.dev/
3. Check quota usage in Google AI Studio

#### PDF analysis fails

**Problem**: PDF parsing or vision fallback issue

**Solution**:
1. Try with text extraction first
2. If PDF is image-based, ensure PyMuPDF installed: `pip install pymupdf`
3. Check PDF isn't corrupted
4. Try with simpler PDF first

#### Image analysis fails

**Problem**: Image format or size issue

**Solution**:
1. Verify image is PNG, JPG, or WebP
2. Check file size < 10MB
3. Try with simpler image first
4. Ensure Pillow installed: `pip install pillow`

### Setup Script Issues

#### setup.sh fails with "python3: command not found"

**Problem**: Python not installed or not in PATH

**Solution**:
```bash
# Install Python (macOS)
brew install python3

# Install Python (Ubuntu/Debian)
sudo apt install python3 python3-venv

# Verify
python3 --version
```

#### setup.sh fails with "npm: command not found"

**Problem**: Node.js not installed

**Solution**:
```bash
# Install Node (macOS)
brew install node

# Install Node (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### Performance Issues

#### Analysis takes too long (>30 seconds)

**Possible causes**:
1. Large PDF or image file
2. Network latency to Gemini API
3. Complex workflow description

**Solutions**:
1. Optimize image size before upload
2. Use text input for faster results
3. Check internet connection
4. Try with shorter description first

#### UI feels slow or unresponsive

**Problem**: Usually frontend bundle size or dev mode

**Solutions**:
```bash
cd frontend
npm run build
npm start  # Use production build
```

### Production Issues

#### Backend crashes in production

**Problem**: Missing environment variables

**Solution**:
1. Verify all env vars set in hosting platform
2. Check logs for specific error
3. Ensure `GOOGLE_API_KEY` is set
4. Verify `FRONTEND_URL` matches actual frontend domain

#### CORS errors in production

**Problem**: Frontend URL mismatch

**Solution**:
1. Update `FRONTEND_URL` in backend env to production domain
2. Restart backend after change
3. Ensure HTTPS if frontend uses HTTPS

## Testing Commands

### Verify Backend is Running
```bash
curl http://localhost:8000
# Should return: {"message":"AI Ops Auditor API","status":"running"}
```

### Test Text Analysis Endpoint
```bash
curl -X POST http://localhost:8000/analyze/text \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_name": "Test",
    "team": "Ops",
    "description": "We manually process 50 forms daily. Each takes 10 minutes."
  }'
```

### Check Python Dependencies
```bash
cd backend
source venv/bin/activate
pip list | grep -E "fastapi|google-generativeai|pydantic"
```

### Check Node Dependencies
```bash
cd frontend
npm list --depth=0
```

## Still Having Issues?

1. **Check the logs**:
   - Backend: Look at terminal running uvicorn
   - Frontend: Look at browser console (F12)

2. **Verify installation**:
   ```bash
   ./verify.sh
   ```

3. **Clean reinstall**:
   ```bash
   # Backend
   cd backend
   rm -rf venv
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   rm -rf node_modules .next
   npm install
   ```

4. **Check versions**:
   - Python 3.10+ required
   - Node.js 18+ required
   - Latest browser recommended

## Debug Mode

Enable verbose logging:

**Backend**:
```python
# In main.py, add after app creation:
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Frontend**:
```typescript
// In page.tsx, add console logs:
console.log('Analysis response:', response.data);
```

## Contact & Support

If you're still stuck:
1. Check `README.md` for full documentation
2. Review `ARCHITECTURE.md` for technical details
3. Open an issue with:
   - Error message
   - Steps to reproduce
   - OS and version info
   - Python/Node versions
