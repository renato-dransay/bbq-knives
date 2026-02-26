#!/bin/bash
# Setup script for DigitalOcean droplet
# Run this once on a fresh droplet: curl -sSL <url> | bash

set -e

echo "=== BBQ Knives Droplet Setup ==="

# Update system
echo "Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose plugin
echo "Installing Docker Compose..."
apt-get install -y docker-compose-plugin

# Install Git
echo "Installing Git..."
apt-get install -y git

# Setup swap (important for 1GB droplet)
echo "Setting up swap..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p /opt/bbq-knives

# Clone repository (you'll need to set up deploy keys or use HTTPS)
echo "Cloning repository..."
cd /opt/bbq-knives
if [ ! -d ".git" ]; then
    git clone https://github.com/YOUR_USERNAME/bbq-knives.git .
fi

# Create .env file template
echo "Creating environment file template..."
if [ ! -f .env ]; then
    cat > .env << 'EOF'
# Database
POSTGRES_DB=medusa-bbq
POSTGRES_USER=postgres
POSTGRES_PASSWORD=CHANGE_ME_SECURE_PASSWORD

# Backend
JWT_SECRET=CHANGE_ME_GENERATE_RANDOM_STRING
COOKIE_SECRET=CHANGE_ME_GENERATE_ANOTHER_RANDOM_STRING
STORE_CORS=http://YOUR_DOMAIN:8000
ADMIN_CORS=http://YOUR_DOMAIN:9000
AUTH_CORS=http://YOUR_DOMAIN:9000

# Storefront
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_BASE_URL=http://YOUR_DOMAIN:8000
NEXT_PUBLIC_DEFAULT_REGION=de
MEDUSA_BACKEND_URL=http://backend:9000

# Payment (optional)
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENVIRONMENT=sandbox

# Email (optional)
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@example.com
ADMIN_EMAIL=admin@example.com
EOF
    echo "IMPORTANT: Edit /opt/bbq-knives/.env with your actual values!"
fi

# Setup firewall
echo "Configuring firewall..."
ufw allow OpenSSH
ufw allow 8000/tcp  # Storefront
ufw allow 9000/tcp  # Backend API
ufw --force enable

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Edit /opt/bbq-knives/.env with your production values"
echo "2. Generate secure secrets: openssl rand -base64 32"
echo "3. Add your GitHub deploy key or configure HTTPS access"
echo "4. Run: cd /opt/bbq-knives && docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "To view logs: docker compose -f docker-compose.prod.yml logs -f"
