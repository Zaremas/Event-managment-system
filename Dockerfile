FROM node:14
WORKDIR /
COPY package*.json ./
RUN npm install
CMD ["npm","start"]
EXPOSE 3000
COPY . .