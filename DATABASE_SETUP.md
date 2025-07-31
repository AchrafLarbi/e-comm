# Database Setup Guide

## Quick Fix for Current Error

The current error is due to missing or incorrect Supabase database credentials. To quickly get the application running:

1. **For Local Development (Recommended)**: 
   - The application will now automatically use SQLite if no `DB_URL` is provided
   - No additional setup required - just run the Django server

2. **For Supabase Setup**:
   - Create a `.env` file in the root directory
   - Add your Supabase database URL

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ENV=DEVELOPMENT

# Database Configuration
# Option 1: For Supabase PostgreSQL (uncomment and fill in your Supabase credentials)
# DB_URL=postgresql://postgres:[YOUR-PASSWORD]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres

# Option 2: For local SQLite (default - no DB_URL needed)
# Leave DB_URL empty or commented out to use SQLite

# PayPal Configuration
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Cloudinary Configuration (for image storage)
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
```

## Supabase Setup Instructions

If you want to use Supabase PostgreSQL:

1. **Create a Supabase Project**:
   - Go to https://supabase.com
   - Create a new project
   - Wait for the project to be set up

2. **Get Database Connection String**:
   - Go to your Supabase project dashboard
   - Navigate to Settings > Database
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your database password

3. **Update .env file**:
   - Add the connection string to your `.env` file as `DB_URL`

## Running the Application

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

3. **Create superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

4. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

## Current Status

The application is now configured to:
- Use SQLite for local development (no setup required)
- Use Supabase PostgreSQL when `DB_URL` is provided
- Handle database connection errors gracefully

The backend should now start without the database connection error. 