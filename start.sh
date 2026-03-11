#!/bin/bash

echo "🚀 Starting AI Ops Auditor..."

echo ""
echo "Starting backend server..."
cd backend
source venv/bin/activate 2>/dev/null || echo "⚠️  Virtual environment not found. Please run setup first."
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

cd ..

echo ""
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo "   Backend: http://localhost:8000"
echo "   Frontend: http://localhost:3000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

wait
