FROM oven/bun:1.4.4-alpine AS build
WORKDIR /app

COPY package.json bun.lock* turbo.json ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/
COPY apps/web ./apps/web

RUN bun install --frozen-lockfile || bun install
WORKDIR /app/apps/web
RUN bun run build

FROM nginx:stable-alpine AS runner
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
