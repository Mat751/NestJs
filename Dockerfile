FROM node:16.13.2-alpine3.15 as builder

WORKDIR /app
COPY . /app

RUN yarn install

RUN yarn build

FROM node:16.13.2-alpine3.15

WORKDIR /app

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist

USER node

ENTRYPOINT ["node", "dist/main"]