FROM node:8-alpine

RUN mkdir /jetbase-react

WORKDIR /jetbase-react

COPY . .

COPY package.json /jetbase-react/package.json

RUN npm install --silent

CMD ["npm", "start"]
