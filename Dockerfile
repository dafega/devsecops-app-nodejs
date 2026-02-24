FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
# npm install funciona sin package-lock.json (todo se resuelve dentro del contenedor)
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "index.js"]
