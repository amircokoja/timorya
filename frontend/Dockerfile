FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# receive build-time values
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENVIRONMENT

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT

COPY . .

# Build app (creates .next/)
RUN npm run build

# ⬇️ Make sure it's not being ignored by .dockerignore!

# Confirm the build exists
RUN ls -la .next

EXPOSE 4000

ENV NODE_ENV=production

CMD ["npm", "start"]
