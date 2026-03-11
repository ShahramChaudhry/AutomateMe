# Getting Your Google Gemini API Key

## Quick Setup (2 minutes)

1. **Visit Google AI Studio**  
   Go to: https://ai.google.dev/

2. **Sign in with Google Account**  
   Use any Google account (free)

3. **Get API Key**  
   - Click "Get API Key" button
   - Click "Create API key in new project" (or select existing project)
   - Copy your API key (starts with `AIza...`)

4. **Add to Your App**  
   Edit `frontend/.env.local`:
   ```bash
   GOOGLE_API_KEY=your-actual-key-here
   ```

5. **Done!**  
   Your app now has 1,500 free requests per day.

## Free Tier Limits

- **1,500 requests per day (RPD)**
- **1 million tokens per minute (TPM)**
- **32,000 tokens per request**

This is more than enough for development and light production use!

## Paid Tier (Optional)

Only needed if you exceed free tier:

- **Input**: $0.075 per 1M tokens (~$0.00015 per analysis)
- **Output**: $0.30 per 1M tokens (~$0.00045 per analysis)
- **Total**: ~$0.0006 per analysis (60x cheaper than GPT-4)

## API Key Security

- Never commit your API key to git (already in `.gitignore`)
- Use environment variables in production
- Rotate keys if accidentally exposed
- Use Google Cloud Secret Manager for production

## Troubleshooting

**"API key not valid"**
- Make sure you copied the entire key
- Check for extra spaces or newlines
- Regenerate key if needed

**"Quota exceeded"**
- You've hit the 1,500/day free limit
- Wait until next day (resets at midnight PT)
- Or upgrade to paid tier in Google AI Studio

**"Model not found"**
- Gemini 2.0 Flash is the latest model
- Falls back to gemini-pro if needed
- Check model availability at https://ai.google.dev/models

## Alternative: Use Service Account (Production)

For production deployments:

1. Create GCP project
2. Enable Generative AI API
3. Create service account with API access
4. Download JSON key
5. Set `GOOGLE_APPLICATION_CREDENTIALS` env var

This provides better quota management and billing.
