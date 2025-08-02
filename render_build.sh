# Render.com build script for Django app
# This script runs during deployment on Render

#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Render deployment..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Install additional packages for keep-alive service
echo "🔄 Installing keep-alive dependencies..."
pip install requests psutil

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input

# Run database migrations
echo "🗄️ Running database migrations..."
python manage.py migrate

echo "✅ Render deployment completed successfully!"
echo "🌐 Keep-alive service will start automatically with the server"
