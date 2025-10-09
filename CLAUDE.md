# CLAUDE Core

## Norms (RFC)

- MUST follow TODO-first workflow; TODOs drive all work.
- MUST keep security/PII safe; ask before destructive ops.
- MUST cite files/lines changed; keep diffs small and reversible.
- SHOULD ask one clarifying Q at most when blocking.
- SHOULD prefer terse bullets, imperatives, and aliases.
- MAY load modules via `.claude/CLAUDE.manifest.json` when triggers match.

## Glossary & Aliases

convId, FE(frontend), BE(backend), cfg(config), cmp(component), impl(implementation), SSE(server-sent events), MCP(Model Context Protocol).

## Constants

BASE_BE=http://localhost:3001; BASE_FE=http://localhost:5174; SSE_PATH="/sse/:conversationId"

## Commands Matrix (root/FE/BE)

- dev: `bun run dev`; FE:`bun run dev` in `apps/frontend`; BE:`bun run dev` in `apps/backend`
- build: `bun run build` (root/FE/BE)
- typecheck: `bun run typecheck`; lint:`bun run lint`; fmt:`bun run format`

## Routing Rules

1. If `.claude/CLAUDE.manifest.json` exists → read it.
2. If task text hits any module `triggers` → load that module **before planning**.
3. Load ≤ 3 most relevant modules. If unavailable, continue with Core and ask once.
4. Norms in Core are binding across modules.

## Golden Examples

**TODO (canonical):**

```ts
// TODO: Implement ElevenLabs TTS streaming
// Scope: §5.1.1 speak tool; §6 perf
// Steps:
// 1) bun add elevenlabs
// 2) init client(apiKey)
// 3) call tts(voice_id, model_id)
// 4) stream; target TTFB < 500ms
// 5) save ./data/audio/:convId/:msgId.mp3
// labels: enhancement, backend, voice; assignees: codingbutter; milestone: MVP Launch
```

**API call (pattern):** `GET http://localhost:3001/api/* -> fetchJSON(path)`  
**SSE connect:** `http://localhost:3001/sse/:conversationId`

## Safety & Escalation

If access/credentials/PII risk → stop and ask. Cite files/lines in edits. Keep network ops idempotent where possible.

## Scope Pointers (what exists in repo)

- BE: Elysia SSE MCP server; REST routes `/api/*`.
- FE: React PWA (audio capture/playback).
- Tools (15): voice(speak/listen); TODO(create/update/list/archive/delete); project(link/get/unlink); process(start/stop/status/output); claude_chat.
- Ports: BE 3001; FE 5174.
- DB: Prisma (SQLite dev | PostgreSQL prod).

## Modules

See `.claude/CLAUDE.manifest.json`. Use short IDs: [API],[FE],[BE],[SEC],[TODO],[VMS].
