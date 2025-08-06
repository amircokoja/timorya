# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Force dependency resolution during install
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Expose port
EXPOSE 4000

# Start Next.js
CMD ["npm", "run", "dev"]
