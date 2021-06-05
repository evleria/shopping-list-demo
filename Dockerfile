FROM golang:1.16-alpine AS build

WORKDIR /
COPY go.mod .
COPY go.sum .
RUN go mod download

COPY /cmd /cmd
COPY /pkg /pkg
RUN go build -o ./out/server ./cmd/rest/main.go

FROM alpine

COPY --from=build /out/server /out/server
EXPOSE 3000
CMD ["./out/server"]