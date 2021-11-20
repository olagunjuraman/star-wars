FROM node:alpine

WORKDIR '/starwar-api'

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm", "run", "start"]