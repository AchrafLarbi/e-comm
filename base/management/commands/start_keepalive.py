"""
Django management command to start render keep-alive service
"""
from django.core.management.base import BaseCommand
from django.conf import settings
import os
import time

class Command(BaseCommand):
    help = 'Start Render keep-alive service to prevent spin-down'

    def add_arguments(self, parser):
        parser.add_argument(
            '--interval',
            type=int,
            default=14,
            help='Ping interval in minutes (default: 14)'
        )
        parser.add_argument(
            '--url',
            type=str,
            help='Custom URL to ping (default: auto-detect)'
        )

    def handle(self, *args, **options):
        try:
            from backend.render_keepalive import RenderKeepAliveService
            
            # Create keep-alive service
            service = RenderKeepAliveService()
            
            # Configure custom settings if provided
            if options['url']:
                service.base_url = options['url']
            
            service.ping_interval = options['interval'] * 60  # Convert to seconds
            
            self.stdout.write(
                self.style.SUCCESS(f'🚀 Starting Render keep-alive service...')
            )
            self.stdout.write(f'📍 Target URL: {service.base_url}')
            self.stdout.write(f'⏰ Ping interval: {options["interval"]} minutes')
            
            # Start the service
            service.start_keep_alive()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Keep-alive service started successfully!')
            )
            self.stdout.write('Press Ctrl+C to stop')
            
            # Keep the command running
            try:
                while True:
                    time.sleep(60)
                    status = service.get_status()
                    self.stdout.write(
                        f'Status: Active | Pings sent: {status["ping_count"]} | '
                        f'Last ping: {status["last_ping"] or "Never"}'
                    )
            except KeyboardInterrupt:
                service.stop_keep_alive()
                self.stdout.write(
                    self.style.WARNING('\n🛑 Keep-alive service stopped')
                )
                
        except ImportError:
            self.stdout.write(
                self.style.ERROR('❌ Keep-alive service not available')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Error starting keep-alive service: {e}')
            )
