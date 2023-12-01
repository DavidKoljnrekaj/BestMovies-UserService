# user-service/Dockerfile
FROM node:alpine

WORKDIR /app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install && npm cache clean --force

COPY src/ /app/

EXPOSE 5002

CMD ["node", "server.js"]
