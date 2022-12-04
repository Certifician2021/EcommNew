FROM node:14-alpine as build-step

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

# Step-2
FROM nginx:1.21.6-alpine

RUN mkdir /etc/nginx/templates
COPY default.conf.template /etc/nginx/templates

COPY --from=build-step /app/build /usr/share/nginx/html