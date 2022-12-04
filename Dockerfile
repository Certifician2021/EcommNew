FROM node:12.22.10-slim
 
WORKDIR /home/node/app
 
COPY package*.json ./
 
RUN npm i
 
COPY . .
 
CMD ["node", "src/app.js"]