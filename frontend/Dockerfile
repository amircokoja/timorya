# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Set build-time variable with default
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Force full dependency install (even in production build) to avoid build errors
# Don't use NODE_ENV=production here to ensure devDependencies like next are available
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
  npm ci --legacy-peer-deps

# Copy app source
COPY . .

# Only run build step in production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Expose app port
EXPOSE 4000

# Run correct command depending on mode
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
