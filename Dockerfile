# user-service/Dockerfile
FROM node:18.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["node", "app.js"]
