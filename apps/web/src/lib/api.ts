import { treaty } from "@elysiajs/eden";
import type { App } from "@timelines/api";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

/**
 * End-to-end type-safe API client powered by Elysia Eden Treaty (spec/07_frontend_and_monorepo.md)
 */
export const apiClient = treaty<App>(apiUrl);
