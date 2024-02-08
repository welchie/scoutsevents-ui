FROM node:21.5.0-alpine
COPY public/ ./public/
COPY src/ ./src/
COPY .env ./.env
COPY package.json . 
RUN npm install --ignore-scripts --unsafe-perm --force
RUN npm install -g serve
RUN npm run build

CMD ["serve","-s","build"]