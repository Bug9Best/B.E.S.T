FROM node:20.6.1 AS dev

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
