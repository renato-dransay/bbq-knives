# Build stage - no memory limits here, CI has plenty of RAM
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Now install production-only dependencies in a separate node_modules
RUN rm -rf node_modules && npm ci --omit=dev

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Set memory limit for runtime only
ENV NODE_OPTIONS="--max-old-space-size=384"

# Create non-root user
RUN addgroup -g 1001 -S medusa && \
    adduser -S medusa -u 1001

# Copy package files
COPY package*.json ./

# Copy production-only dependencies from builder (already pruned)
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder
COPY --from=builder /app/.medusa ./.medusa

# Copy compiled medusa-config.js to root (required by medusa start)
COPY --from=builder /app/.medusa/server/medusa-config.js ./

# Copy compiled src modules to root (custom modules are resolved from ./src/)
COPY --from=builder /app/.medusa/server/src ./src

# Change ownership
RUN chown -R medusa:medusa /app

USER medusa

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

# Start command
CMD ["npm", "run", "start"]
