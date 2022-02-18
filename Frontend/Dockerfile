FROM node:15-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN npm install

COPY . .

COPY copy.config.js src/Api/config.js

EXPOSE 3000

CMD [ "yarn", "start" ]