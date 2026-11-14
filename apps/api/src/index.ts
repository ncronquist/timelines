import { app } from "./app";
import { closeDatabase } from "./db";
import { logger } from "./logger";

const port = Number(process.env.PORT ?? 3001);
const hostname = process.env.HOST ?? "0.0.0.0";

app.listen({ port, hostname }, (server) => {
  logger.info({ port: server.port, hostname: server.hostname }, "Timelines API server listening");
});

async function shutdown(signal: string) {
  logger.info({ signal }, "Shutting down Timelines API server gracefully...");
  try {
    await app.stop();
    await closeDatabase();
    logger.info("Graceful shutdown complete");
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "Error during graceful shutdown");
    process.exit(1);
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
