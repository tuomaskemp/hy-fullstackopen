FROM node:16 as build

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm run tsc

ENV NODE_ENV production

USER node

CMD npm start