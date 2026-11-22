# ==========================================
# Multi-Stage Dockerfile for AICTE PS 264
# ==========================================

# Stage 1: Build the Vite frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Server Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install openssl for Prisma engine
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy server code and built frontend dist
COPY server ./server
COPY --from=frontend-builder /app/dist ./dist

EXPOSE 5001

CMD ["node", "server/index.js"]
