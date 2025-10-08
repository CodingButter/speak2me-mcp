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

// TODO: Add WebSocket support for real-time PWA updates
// Project Scope: §7.2 (Data Flows), §5.2.1 (PWA real-time updates)
// Need to implement WebSocket endpoint for:
// - Broadcasting new messages to PWA when MCP client calls speak/listen
// - Pushing conversation updates (new sessions, status changes)
// - Real-time process output streaming
// - Audio processing status updates (transcribing, generating speech)
// Implementation: Use @elysiajs/websocket plugin
// Route: /ws/:conversationId or /ws (global channel with room support)
// assignees: codingbutter
// labels: enhancement, backend
// milestone: MVP Launch

// TODO: Add static file serving for audio assets
// Project Scope: §7.2.1 (Audio asset storage)
// Need to serve saved audio files for PWA playback
// Route: /assets/audio/:conversationId/:filename
// Storage location: ./data/audio/ or configurable via env
// Security: Verify conversationId ownership before serving
// labels: enhancement, backend, voice

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
      // TODO: Add /api/audio routes
      // - POST /api/audio/upload - Accept audio from PWA for STT
      // - GET /api/audio/:conversationId/:messageId - Serve audio assets
      // labels: enhancement, backend, voice
  )
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
console.log(`📡 MCP SSE endpoint: http://${app.server?.hostname}:${app.server?.port}/sse/<conversation_id>`);

export default app;
export type App = typeof app;
