FROM node:15-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

COPY copy.config.js Api/config.js

EXPOSE 5000

CMD ["npm", "start"]