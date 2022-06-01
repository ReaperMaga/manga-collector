FROM golang:1.18-alpine

WORKDIR /app

COPY . .

RUN go mod download

CMD ["go", "run", "."]