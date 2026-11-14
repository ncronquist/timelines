FROM oven/bun:1.4.4-alpine AS base
WORKDIR /app

# Install dependencies across workspace
FROM base AS deps
COPY package.json bun.lock* turbo.json ./
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY packages/types/package.json ./packages/types/
COPY packages/time-engine/package.json ./packages/time-engine/
COPY packages/ui-components/package.json ./packages/ui-components/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN bun install --frozen-lockfile || bun install

# Runtime stage
FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY packages ./packages
COPY apps/api ./apps/api

WORKDIR /app/apps/api
EXPOSE 3001
CMD ["bun", "run", "src/index.ts"]
