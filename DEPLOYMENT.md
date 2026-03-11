# Deployment Guide

## Production Deployment Options

### Option 1: Docker Deployment (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - GEMINI_MODEL=gemini-2.0-flash-exp
      - FRONTEND_URL=https://your-domain.com
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.your-domain.com
    depends_on:
      - backend
    restart: unless-stopped
```

### Option 2: Separate Hosting

**Backend (FastAPI):**
- Deploy to: Railway, Render, AWS Elastic Beanstalk, or Google Cloud Run
- Set environment variables in platform dashboard
- Use production ASGI server (already using uvicorn)

**Frontend (Next.js):**
- Deploy to: Vercel (recommended), Netlify, or AWS Amplify
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Vercel deployment is zero-config (just connect your repo)

## Environment Variables

### Backend (Production)
```
GOOGLE_API_KEY=your-google-api-key-here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://your-domain.com
```

### Frontend (Production)
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Security Considerations

1. **API Key Protection**: Never commit `.env` files. Use platform secret management.
2. **CORS**: Update `FRONTEND_URL` in backend to match production domain
3. **Rate Limiting**: Add rate limiting to prevent API abuse
4. **File Upload Limits**: Configure max file sizes (currently 10MB)
5. **Input Validation**: Backend validates all inputs via Pydantic

## Scaling Considerations

- Add Redis for caching analysis results
- Implement queue system (Celery/Redis) for long-running analyses
- Add database (PostgreSQL) to store workflow analyses
- Implement user authentication and multi-tenancy
- Add CDN for frontend assets

## Monitoring

- Monitor Gemini API usage and quotas
- Track analysis success/failure rates
- Monitor response times
- Set up error alerting (Sentry, Datadog)

## Cost Estimation

With Gemini 2.0 Flash:
- **Free Tier**: 1,500 requests per day (RPD), 1M tokens per minute (TPM)
- **Paid Tier**: $0.075 per 1M input tokens, $0.30 per 1M output tokens
- Average analysis: ~2000 tokens input, ~1500 tokens output
- Cost per analysis: ~$0.0006 (60x cheaper than GPT-4)
- 100 analyses/day: ~$0.06/day on free tier, then ~$0.06/day paid
- PDF/Image analyses same cost with vision model
