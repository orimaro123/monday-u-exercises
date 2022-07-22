FROM node:16

WORKDIR /app


COPY server server
COPY server/db . 
COPY package.json .

# COPY client client

RUN npm install
# RUN npm --prefix client install

ENV NODE_ENV=production

# CMD npm --prefix server start & npm --prefix client start
CMD npm start