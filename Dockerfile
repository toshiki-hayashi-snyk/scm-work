# EOL/古い系の公式イメージ（脆弱性が多く出やすい）
FROM node:14
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
