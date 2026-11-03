# Backend Architecture & Tooling Specification

This document defines the technical stack, architecture, and operational standards for the **Timelines** backend API (`/apps/api`).

The backend is designed for rapid prototyping and end-to-end TypeScript ergonomics while maintaining clean boundaries so individual components or services can be scaled or rewritten in higher-performance languages later if needed.

---

## 1. Core Runtime & Framework

- **Runtime:** **Bun**
  - Chosen for fast startup, native TypeScript execution, built-in test runner (`bun test`), native `.env` loading, `--watch` mode, and built-in primitives like `Bun.S3Client`.
- **HTTP Framework:** **ElysiaJS**
  - High-performance, ergonomic TypeScript web framework built for Bun.
  - Provides end-to-end type inference and supports **Elysia Eden** so TypeScript clients (such as `/apps/web`) can consume the API with full compile-time type safety and zero codegen.
- **Validation & Serialization:** **TypeBox (`t` via Elysia)**
  - Used for all HTTP route boundaries (request body, query params, path params, headers, and response schemas).
  - Compiles ahead-of-time to fast validators and maps 1:1 to JSON Schema.
- **API Documentation:** **OpenAPI / Swagger (`@elysiajs/swagger` / `@elysiajs/openapi`)**
  - Automatically generated from Elysia + TypeBox route definitions, exposing an interactive OpenAPI/Scalar UI and machine-readable spec.

---

## 2. Database & Persistence

- **Database Engine:** **PostgreSQL**
  - Primary relational datastore for application domain models (Events, Timelines, Organizations) as well as authentication and session state.
- **ORM & Query Builder:** **Drizzle ORM** (`drizzle-orm`) + **Drizzle Kit** (`drizzle-kit`)
  - SQL-first, type-safe schema declarations and queries, plus declarative SQL migration generation.
- **Database Driver:** **`postgres` (`postgres.js`)**
  - Battle-tested Postgres client compatible with Bun and Drizzle ORM, supporting connection pooling and clean connection draining.
- **Schema-to-Validator Bridge:** **`drizzle-typebox`**
  - Generates TypeBox schemas directly from Drizzle table definitions so database models and Elysia route schemas stay synchronized without duplicating field definitions.
- **Schema Organization:**
  - Application domain tables and authentication tables are separated into distinct schema modules (e.g., `src/db/schema/auth.ts`, `src/db/schema/timelines.ts`) to prevent CLI-generated auth updates from colliding with domain schemas.

---

## 3. Authentication & Identity

- **Auth Framework:** **Better Auth** (`better-auth`)
  - Self-hosted, database-backed authentication owned entirely by the application and persisted in PostgreSQL via Better Auth's official Drizzle adapter.
- **Capabilities & Plugins:**
  - **Core Auth:** Email/password and session management.
  - **Social OAuth:** Configurable first-party social providers (Google, GitHub, etc.).
  - **Organizations & Multi-Tenancy:** Better Auth Organization plugin for teams, classrooms, roles, and permissions (aligning with [04_collaboration_and_orgs.md](file:///home/ncronquist/Documents/projects/timelines/spec/04_collaboration_and_orgs.md)).
  - **Enterprise SSO:** Better Auth SSO plugin supporting OIDC and SAML 2.0 when organization features are introduced.
  - **OpenAPI Plugin:** Exposes authentication endpoints in the OpenAPI documentation.
- **Elysia Integration:**
  - Mounted on `/api/auth/*` with a custom Elysia macro (`{ auth: true }`) that resolves and injects strongly-typed `user` and `session` objects into protected route contexts.

---

## 4. Logging & Observability

- **Distributed Tracing & Metrics:** **OpenTelemetry (`@elysiajs/opentelemetry`)**
  - Native Elysia lifecycle instrumentation emitting root request spans and child spans across parse, validation, handler execution, and database queries.
- **Structured Logging:** **Pino**
  - **Production:** Emits fast, single-line structured JSON logs to `stdout` with concise root keys (`ts`, `lvl`, `reqId`, `traceId`, `spanId`, `msg`).
  - **Local Development:** Formatted with `pino-pretty` for human readability in the terminal.
  - **Network & Storage Efficiency:** `stdout` stays standard JSON for universal tooling compatibility (`jq`, `kubectl logs`, Docker logs), while log shipping agents / OpenTelemetry Collectors batch and compress logs (`OTLP/Protobuf` + `zstd` or columnar storage) before network egress or long-term storage.
- **Request Correlation:**
  - Every incoming request either adopts an incoming `x-request-id` header or generates a new unique ID (UUIDv7/ULID), echoes `x-request-id` on the response, and binds `{ requestId, traceId, spanId, userId }` to the request-scoped logger (`ctx.log`).

---

## 5. Storage & Asynchronous Processing (Deferred / Future-Ready)

- **Blob / Media Storage (S3-Compatible):**
  - Not required for initial bootstrap, avoiding heavy LocalStack setups early on.
  - When media attachments (images, audio, 3D glTF artifacts) are introduced, the backend will use Bun's native **`Bun.S3Client`** (with presigned URLs) backed by **MinIO** (or Garage) in local `docker-compose` and AWS S3 / Cloudflare R2 in production.
- **Background Jobs & Queues:**
  - Deferred until needed. Can start with **pg-boss** (leveraging the existing PostgreSQL instance with zero added infrastructure) or AWS SQS / Redis workers behind a clean queue interface, with optional serverless/Lambda offload for heavy media processing later.

---

## 6. Code Quality, Packaging & Deployment

- **Linting & Formatting:** **Biome** (`@biomejs/biome`)
  - Single fast binary replacing ESLint and Prettier across the repository.
- **Local Development Environment:** **Docker Compose**
  - Manages local PostgreSQL (and optional future services like MinIO or a `grafana/otel-lgtm` observability profile).
- **Production Packaging & Runtime Target:** **Docker Containers (K8s / AWS ECS)**
  - Packaged via multi-stage `Dockerfile` using `oven/bun` (or compiled standalone binary via `bun build --compile`).
  - **Health Endpoints:** Exposes `/healthz` (liveness probe) and `/readyz` (readiness probe verifying PostgreSQL connectivity).
  - **Graceful Shutdown:** Listens for `SIGTERM` / `SIGINT` to stop accepting new connections, complete in-flight requests, flush telemetry/logs, and close PostgreSQL pool connections cleanly.
  - **Database Migrations:** Executed as an explicit pre-deploy job or init container (`bun run db:migrate`) rather than implicitly on server boot to avoid race conditions across horizontally scaled replicas.
