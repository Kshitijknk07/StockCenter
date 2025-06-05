FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o stockcenter

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/stockcenter .
COPY --from=builder /app/.env .

EXPOSE 9090
CMD ["./stockcenter"] 