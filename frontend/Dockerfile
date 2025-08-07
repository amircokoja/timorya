# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Allow switching modes: development or production
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Only build in production mode
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Expose port
EXPOSE 4000

# Start based on mode
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi" ]
