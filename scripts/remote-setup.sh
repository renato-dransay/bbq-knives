#!/bin/bash
# Remote setup script for BBQ Knives droplet
# Run on the droplet: curl -sSL https://raw.githubusercontent.com/renato-dransay/bbq-knives/main/scripts/remote-setup.sh | bash

set -e

echo "=== BBQ Knives Droplet Setup ==="

# Add deploy key for GitHub Actions
echo "Adding deploy key..."
mkdir -p ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICHgcLQFsOOZJDMvsI8yhTFXMYE5rvpEQuiykhiOn05C bbq-knives-deploy' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Install Docker if not already installed
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose plugin
echo "Installing Docker Compose..."
apt-get update
apt-get install -y docker-compose-plugin git

# Setup swap for better performance (1GB droplet needs this)
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
cd /opt/bbq-knives

# Clone the repository
echo "Cloning repository..."
if [ ! -d ".git" ]; then
    git clone https://github.com/renato-dransay/bbq-knives.git .
else
    git fetch origin main
    git reset --hard origin/main
fi

# Generate secure secrets
echo "Generating secrets..."
JWT_SECRET=$(openssl rand -base64 32)
COOKIE_SECRET=$(openssl rand -base64 32)
POSTGRES_PASSWORD=$(openssl rand -base64 16)

# Create .env file
echo "Creating .env file..."
cat > .env << ENVEOF
# Database
POSTGRES_DB=medusa-bbq
POSTGRES_USER=postgres
POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# Backend
JWT_SECRET=$JWT_SECRET
COOKIE_SECRET=$COOKIE_SECRET
STORE_CORS=http://209.38.205.122:8000
ADMIN_CORS=http://209.38.205.122:9000
AUTH_CORS=http://209.38.205.122:9000

# Storefront
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_temp_key
NEXT_PUBLIC_BASE_URL=http://209.38.205.122:8000
NEXT_PUBLIC_DEFAULT_REGION=de
MEDUSA_BACKEND_URL=http://backend:9000
ENVEOF

# Open firewall ports
echo "Configuring firewall..."
ufw allow OpenSSH
ufw allow 8000/tcp
ufw allow 9000/tcp
ufw --force enable

# Start the deployment
echo "Starting containers (this may take a few minutes)..."
docker compose -f docker-compose.prod.yml up -d --build

# Wait for services
echo "Waiting for services to start..."
sleep 60

# Check status
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== Deployment complete! ==="
echo ""
echo "Storefront: http://209.38.205.122:8000"
echo "Backend API: http://209.38.205.122:9000"
echo "Admin: http://209.38.205.122:9000/app"
echo ""
echo "Next: Get your publishable key from Admin > Settings > API Key Management"
echo "Then update /opt/bbq-knives/.env with NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
