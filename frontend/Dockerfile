FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# ❗️ Always install full deps so that typescript and next are available
RUN npm ci --legacy-peer-deps

COPY . .

# Optional: Set prod env AFTER install
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# ✅ Build the Next.js app
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 4000

# ✅ Dev vs Prod entry point
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
