FROM node:16-alpine AS fe-build

WORKDIR /
COPY /web/package.json .
COPY /web/yarn.lock .
RUN yarn install --silent

COPY /web .
RUN npm run build

FROM golang:1.16-alpine AS be-build

WORKDIR /
COPY go.mod .
COPY go.sum .
RUN go mod download

COPY /cmd /cmd
COPY /pkg /pkg
RUN go build -o server ./cmd/rest/main.go

FROM alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY --from=be-build /server /out/server
COPY --from=fe-build /build /out/build

EXPOSE 3000
CMD ["./out/server"]