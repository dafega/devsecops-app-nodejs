# Stage: tests. 
FROM node:20-alpine AS test
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install
COPY . .
CMD ["sh", "-c", "npm run lint && npm run test:coverage"]

# Stage: producción
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "index.js"]
