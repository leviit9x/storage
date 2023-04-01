FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY prisma ./prisma/

RUN yarn prisma generate
RUN yarn prisma migrate dev --name init

COPY . ./

CMD ["yarn", "start:dev"]
