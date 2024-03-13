# Use the official Node.js 16 as a parent image
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
