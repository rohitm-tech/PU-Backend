# ── Stage 1: Install dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Production image ──
FROM node:20-alpine
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Switch to non-root user
USER appuser

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
