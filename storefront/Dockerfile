# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable corepack for Yarn 4
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Set build-time environment variables
# Use placeholder values for build - actual values are set at runtime
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_build_placeholder_key
ARG NEXT_PUBLIC_BASE_URL=http://localhost:8000
ARG NEXT_PUBLIC_DEFAULT_REGION=de
ARG MEDUSA_BACKEND_URL=http://localhost:9000

# Set environment variables for build
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION

# Skip env validation during build since we use placeholders
ENV SKIP_ENV_VALIDATION=true

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change ownership
RUN chown -R nextjs:nextjs /app

USER nextjs

# Expose port
EXPOSE 8000

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=8000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8000 || exit 1

# Start command
CMD ["node", "server.js"]
