# Backend Management System

This enhanced Django backend includes a comprehensive keep-alive and monitoring system to ensure the server stays active and responsive.

## Features

### 🔄 Keep-Alive System

- **Background Keep-Alive Thread**: Continuously monitors server activity
- **Request Tracking**: Tracks request count and last activity time
- **Automatic Health Monitoring**: Built-in health checks every 30 seconds

### 📊 Health Monitoring

- **System Metrics**: CPU usage, memory consumption, disk space
- **Database Connectivity**: Automatic database connection testing
- **Application Status**: Django app health and static file accessibility

### 🛡️ Enhanced Security & CORS

- **Dynamic CORS Headers**: Automatically configured for frontend communication
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, XSS Protection
- **Request Performance Tracking**: Processing time headers for debugging

## Quick Start

### Option 1: Using Batch File (Recommended for Windows)

```batch
# Double-click or run in command prompt
start_backend.bat
```

### Option 2: Using PowerShell Script

```powershell
# For development (default)
.\start_backend.ps1

# For production
.\start_backend.ps1 -Production

# Custom port
.\start_backend.ps1 -Port 9000
```

### Option 3: Using Python Script Directly

```bash
python start_backend.py
```

### Option 4: Traditional Django Way

```bash
python manage.py runserver
```

## API Endpoints

### Health Check Endpoints

- **`/api/health/`** - Detailed health status with system metrics
- **`/api/status/`** - Simple status check
- **`/api/keep-alive/`** - Keep-alive endpoint (GET/POST)
- **`/api/ping/`** - Quick ping endpoint

### Example Health Check Response

```json
{
  "status": "healthy",
  "timestamp": 1703123456.789,
  "server_info": {
    "python_version": "3.11.0",
    "django_version": "5.0.7",
    "pid": 12345
  },
  "system_info": {
    "memory_usage": {
      "total": 16777216000,
      "available": 8388608000,
      "used": 8388608000,
      "percentage": 50.0
    },
    "cpu_usage": 15.2
  },
  "application_info": {
    "debug_mode": true,
    "database_connected": true,
    "static_files_accessible": true
  }
}
```

## Middleware Components

### 1. BackendKeepAliveMiddleware

- Maintains server activity tracking
- Starts background monitoring thread
- Adds performance headers to responses

### 2. HealthCheckMiddleware

- Intercepts health check requests
- Provides instant health status responses
- Lightweight and fast

### 3. CORSAndSecurityMiddleware

- Configures CORS headers for frontend
- Adds security headers
- Handles cross-origin requests

## Configuration

### Environment Variables

```bash
FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS
DJANGO_ENV=development             # Environment mode
```

### Settings Configuration

```python
# Backend management settings
SERVER_START_TIME = time.time()
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

# Add middleware to MIDDLEWARE list
MIDDLEWARE = [
    # ... other middleware
    "backend.middleware.BackendKeepAliveMiddleware",
    "backend.middleware.HealthCheckMiddleware",
    "backend.middleware.CORSAndSecurityMiddleware",
]
```

## Monitoring & Logging

### Log Files

- **`backend.log`** - Server activity and health check logs
- **Console Output** - Real-time server status and monitoring

### Performance Headers

All responses include:

- `X-Backend-Processing-Time` - Request processing time
- `X-Backend-Request-Count` - Total requests served
- `X-Backend-Status` - Server status

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Find and kill process using port 8000
   netstat -ano | findstr :8000
   taskkill /PID <process_id> /F
   ```

2. **Virtual Environment Issues**

   ```bash
   # Recreate virtual environment
   rmdir /s env
   python -m venv env
   env\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Database Connection Issues**
   ```bash
   # Reset database
   python manage.py migrate --run-syncdb
   ```

### Health Check Failures

If health checks fail:

1. Check database connectivity
2. Verify static files configuration
3. Check system resources (CPU/Memory)
4. Review application logs

## Production Deployment

For production deployment:

1. Set `DJANGO_ENV=production`
2. Configure proper database settings
3. Set up static file serving
4. Use a proper WSGI server (gunicorn, uWSGI)
5. Set up reverse proxy (nginx, Apache)

### Example Production Start

```bash
# Install production requirements
pip install gunicorn

# Start with gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

## Frontend Integration

The backend automatically handles:

- CORS headers for React frontend
- Keep-alive requests from frontend
- Health status for frontend monitoring

### Frontend Health Check Example

```javascript
// Check backend health from React
const checkBackendHealth = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/health/");
    const health = await response.json();
    console.log("Backend Status:", health.status);
    return health.status === "healthy";
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
```

## Support

For issues or questions:

1. Check the logs in `backend.log`
2. Visit health endpoint: `http://localhost:8000/api/health/`
3. Review middleware configuration in `backend/settings.py`
4. Check CORS settings for frontend communication
