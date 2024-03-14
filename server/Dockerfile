FROM node:20.6.1 AS dev

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD npx prisma generate && rm -rf /prisma/migrations && npx prisma migrate dev &&npm run dev