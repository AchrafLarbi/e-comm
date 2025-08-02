# Render.com start command for Django app with keep-alive
# This command starts the Django server with Gunicorn and keep-alive service

#!/usr/bin/env bash

echo "🚀 Starting Django server on Render..."

# Set environment variables for Render
export DJANGO_ENV=production

# Start Gunicorn with proper configuration for Render
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 2 \
    --worker-class gthread \
    --threads 4 \
    --timeout 120 \
    --keep-alive 5 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --access-logfile - \
    --error-logfile - \
    --log-level info
