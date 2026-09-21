FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:1.29-bookworm

LABEL service="save-your-tears"

COPY --from=builder /app/dist/app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
