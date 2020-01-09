FROM node:12.14.1
RUN mkdir /client
WORKDIR /client
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i
COPY . .
CMD ["npm", "start"]