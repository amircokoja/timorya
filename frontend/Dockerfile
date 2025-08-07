FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
COPY .env.production .env.production

# Debug the build step
RUN npm run build || (echo "❌ Build failed" && exit 1)
RUN echo "✅ Build completed. Listing .next directory..." && ls -la .next || echo "❌ .next folder is missing"

EXPOSE 4000

ENV NODE_ENV=production

CMD ["npm", "start"]