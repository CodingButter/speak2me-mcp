# MODULE: Backend (id: BE)

Scope: Elysia SSE MCP server; tool registration; process mgmt.

Open if: backend|elysia|sse|mcp|tool|service.

Checklist:

- Register MCP tools (voice/todo/project/claude/process).
- SessionManager maps connections to convId; store per-session API keys.
- ProcessManager: start/stop/status/output; conversation-scoped.
- Persist via Prisma storage; keep long blobs (audio) as files, not DB.
- Health: `/health`; REST under `/api/*`.

Example (tool sketch):

```ts
// handleSpeak(text) -> ssmlEnhancer -> TTS -> save -> return metrics
```

Gotchas:

- Clean up processes on shutdown.
- SSE uses Elysia Stream; mind backpressure.
