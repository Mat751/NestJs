#FROM node:14.0.0-alpine3.11
FROM node:16-alpine3.14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "/app/"]

RUN npm i -g @nestjs/cli
