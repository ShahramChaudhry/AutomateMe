# Contributing Guide

## Development Setup

1. Fork the repository
2. Clone your fork
3. Run setup: `./setup.sh`
4. Add your OpenAI API key to `backend/.env`
5. Create a new branch: `git checkout -b feature-name`

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints
- Use async/await for API calls
- Use Pydantic for validation

### TypeScript (Frontend)
- Use TypeScript strict mode
- Functional components with hooks
- Props interfaces for all components
- Use const for immutable values

## Testing Your Changes

1. Start both servers: `./start.sh`
2. Test all three input methods (Text, PDF, Image)
3. Verify output displays correctly
4. Check browser console for errors
5. Test with example workflows from `EXAMPLES.md`

## Adding New Features

### Adding a New Analysis Dimension

1. Update `models.py` - Add new field to `AnalysisResponse`
2. Update `analyzer.py` - Modify `ANALYSIS_PROMPT` to request new dimension
3. Update `frontend/app/page.tsx` - Add new section to display results

### Adding a New Input Method

1. Update `frontend/app/page.tsx` - Add new tab
2. Update `backend/main.py` - Add new endpoint
3. Update `backend/analyzer.py` - Add analysis function

### Adding New AI Patterns

Update the AI pattern list in:
- `backend/models.py` - AutomationOpportunity model
- `backend/analyzer.py` - ANALYSIS_PROMPT examples

## Submitting Changes

1. Test thoroughly with multiple workflow types
2. Ensure no console errors
3. Update relevant documentation
4. Commit with clear message
5. Push to your fork
6. Open a Pull Request

## Project Principles

1. **User Experience First**: Keep the UI clean and intuitive
2. **Practical Over Clever**: Recommendations should be realistic and actionable
3. **Risk Awareness**: Always flag high-risk automation areas
4. **Modular Design**: Keep components focused and reusable
5. **Type Safety**: Leverage TypeScript and Pydantic

## Questions?

Open an issue or reach out to the maintainers.
