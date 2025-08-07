# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Always install all dependencies (build needs devDependencies)
RUN npm ci --legacy-peer-deps

COPY . .

# Build the app (this creates the .next/ directory)
RUN npm run build

# Expose your chosen port
EXPOSE 4000

# Set environment variable to tell Next.js it's running in prod
ENV NODE_ENV=production

# Run the production server
CMD ["npm", "start"]
