# Stage 1: Build the React application
FROM --platform=linux/amd64 node:21.5.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --legacy-peer-deps
COPY public/ ./public/
COPY src/ ./src/
COPY .env ./
RUN npm run build

# Stage 2: Serve the static files using a clean server
FROM --platform=linux/amd64 node:21.5.0-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]