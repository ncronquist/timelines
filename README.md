# Timelines

A multi-scale interactive timeline platform capable of representing and comparing events from cosmological epochs ($10^{18}$ years) down to sub-nanosecond intervals ($10^{-18}$ seconds).

Built using **Spec-Driven Development (SDD)**. Read the complete product and architecture specifications in [`/spec/README.md`](./spec/README.md).

---

## Monorepo Structure

```text
/timelines
├── /spec                        # Cross-project product & architecture specifications
├── /apps
│   ├── /api                     # Bun + ElysiaJS + Drizzle ORM + Better Auth backend
│   └── /web                     # React 19 + Vite + TanStack + Tailwind v4 SPA frontend
├── /packages
│   ├── /time-engine             # BigInt temporal math, L0–L10 scales, Interval Tree, Elastic Time
│   ├── /types                   # Shared TypeBox schemas, domain enums & API contract types
│   ├── /ui-components           # Shared Tailwind v4 utilities & Radix/shadcn UI primitives
│   └── /tsconfig                # Shared strict TypeScript configurations
├── biome.json                   # Unified linter & formatter configuration
├── docker-compose.yml           # Local PostgreSQL instance
├── package.json                 # Bun workspaces root
└── turbo.json                   # Turborepo task pipeline configuration
```

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (`>= 1.2`)
- [Docker](https://docs.docker.com/get-docker/) (for local PostgreSQL)

### Quickstart

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Install workspace dependencies
bun install

# 3. Start local PostgreSQL
docker compose up -d

# 4. Run API and Web dev servers in parallel
bun dev
```

## Developer Scripts

| Command | Description |
| :--- | :--- |
| `bun dev` | Run `/apps/api` (`:3001`) and `/apps/web` (`:5173`) in watch mode via Turborepo |
| `bun test` | Run unit and integration tests across all workspaces |
| `bun check` | Run Biome linting/formatting checks and TypeScript typechecking |
| `bun format` | Format all files with Biome |
| `bun db:generate` | Generate Drizzle SQL migrations from `/apps/api/src/db/schema` |
| `bun db:migrate` | Apply pending Drizzle migrations to PostgreSQL |
