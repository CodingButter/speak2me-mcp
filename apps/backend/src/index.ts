import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { storage } from "@s2m-pac/database";
import { SessionManager, CoreOperations } from "@s2m-pac/core";
import { projectsRoutes } from "./api/projects";
import { conversationsRoutes } from "./api/conversations";
import { messagesRoutes } from "./api/messages";
import { settingsRoutes } from "./api/settings";
import { keysRoutes } from "./api/keys";
import { voicesRoutes } from "./api/voices";
import { systemMetricsRoutes } from "./api/system-metrics";
import { filesystemRoutes } from "./api/filesystem";
import { claudeRoutes } from "./api/claude";
import { handleSSEConnection } from "./mcp/sse-server";

// Initialize core systems
const sessionManager = new SessionManager();
const coreOps = new CoreOperations(storage);

const app = new Elysia()
  .use(cors())
  .decorate("core", coreOps)
  .decorate("sessionManager", sessionManager)
  .get("/", () => ({ message: "STT MCP Server" }))
  .get("/health", () => ({ status: "ok", timestamp: Date.now() }))
  .get("/sse/:id", (context) => handleSSEConnection(context, coreOps, sessionManager))
  .group("/api", (app) =>
    app
      .use(projectsRoutes)
      .use(conversationsRoutes)
      .use(messagesRoutes)
      .use(settingsRoutes)
      .use(keysRoutes)
      .use(voicesRoutes)
      .use(systemMetricsRoutes)
      .use(filesystemRoutes)
      .use(claudeRoutes)
  )
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
console.log(`📡 MCP SSE endpoint: http://${app.server?.hostname}:${app.server?.port}/sse/<conversation_id>`);

export default app;
export type App = typeof app;
