#!/usr/bin/env bash

set -o errexit # exit on error

echo "🚀 Starting build process..."

# Install Python dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Install keep-alive service dependencies
echo "🔄 Installing keep-alive dependencies..."
pip install requests psutil

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input

# Run database migrations
echo "🗄️ Running migrations..."
python manage.py migrate

echo "✅ Build completed successfully!"