FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:1.29-bookworm

LABEL service="save-your-tiers"

COPY --from=builder /app/dist/app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
