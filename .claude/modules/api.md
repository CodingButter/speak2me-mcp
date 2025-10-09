# MODULE: API (id: API)

Scope: HTTP APIs & SSE for MCP/REST.

Open if: api|openapi|endpoint|cors|sse|route.

Checklist:

- Use BASE_BE `http://localhost:3001`; prefer small fetch wrapper.
- Routes of interest: `/api/projects`, `/api/conversations`, `/api/messages`, `/api/settings`, `/api/keys`, `/api/voices`, `/api/system-metrics`, `/api/filesystem`, `/api/claude`.
- SSE path: `/sse/:conversationId`; one convId per MCP session.
- Handle errors; retry idempotent GET only; backoff on 429/5xx.
- Log brief trace: method path status ms.
- Respect CORS rules; preflight when needed.

Example:

```ts
const r = await fetch(`$http://localhost:3001/api/projects`).then((r) => r.json())
```

Gotchas:

- Be precise with convId in SSE URL.
- Keep payloads small; avoid N+1 fetches.
