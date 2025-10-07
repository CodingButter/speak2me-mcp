# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Voice MCP Server + PWA Client - A Progressive Web App with integrated SSE MCP server for voice-enabled conversational AI. Multiple MCP clients (e.g., Claude Code instances) can connect concurrently, each maintaining separate conversations with full text and audio history.

**Stack:**
- Backend: Elysia (Bun runtime) with SSE MCP server integration
- Frontend: React + TypeScript + TailwindCSS + shadcn/ui + lucide-react
- Monorepo: Bun workspaces (`frontend/` + `backend/` + shared types)
- AI Services: OpenAI (SSML enrichment), ElevenLabs (TTS), Google Gemini (STT)

## Core Architecture

### High-Level Flow

1. **MCP Client -> Speak Pipeline:**
   - MCP client connects via SSE to `https://backend/mcp/sse?conversationId=<id>`
   - Client calls `speak(text)` -> Backend: OpenAI SSML Enhancer -> ElevenLabs streaming TTS -> saves audio asset
   - Backend pushes message to PWA via WebSocket -> PWA displays message + plays audio

2. **User -> Listen Pipeline (via PWA):**
   - PWA: User starts mic (getUserMedia) -> VAD (Web Audio API) -> silence trimming/chunking -> sends to backend REST API
   - Backend: Processes audio -> Gemini STT -> transcript
   - Backend: Returns to PWA (manual mode) OR forwards to MCP client (auto mode)
   - Backend: Saves message to conversation history -> pushes to PWA

3. **Multi-Session Management:**
   - Each MCP client connection creates unique session (identified by conversationId in URL query param)
   - PWA displays all active conversations in sidebar
   - Full chat history with audio replay for each conversation

4. **Mode Control:**
   - **Auto**: Auto-send transcripts to MCP client
   - **Manual**: Hold transcript, require explicit Send button
   - **Push-to-Talk (PTT)**: Record only while hotkey held (works only when PWA window focused - browser limitation)

### Key Components

**Elysia Backend:**
- SSE MCP server (`speak`, `listen` tools via `@modelcontextprotocol/sdk`)
- REST API (conversations, messages, settings, audio assets)
- WebSocket/SSE for real-time PWA updates
- Session manager (MCP connection -> conversation mapping)
- Conversation persistence (SQLite or PostgreSQL)

**PWA Frontend:**
- React + TypeScript UI with shadcn/ui components
- Conversation switcher sidebar (all MCP sessions)
- Chat view with full history + audio replay
- Audio controls (waveform/VU, mode selector, PTT, send/cancel)
- Settings panel (API keys, VAD thresholds, device config)
- Diagnostics panel (metrics, logs, connection status)

**SSML Enhancer:**
- OpenAI-powered prosody, breaks, emphasis injection with ElevenLabs validation

**Audio Pipeline:**
- Browser-based (getUserMedia, Web Audio API, MediaRecorder)
- VAD-gated capture, silence trimming (≥30% cost reduction target), smart chunking

## Critical Design Constraints

### Performance Targets
- TTS TTFB: < 500ms first audio
- STT End-to-End: < 1500ms mic-to-text
- SSML enrichment success rate: ≥ 90%
- PWA initial load: < 2s on broadband

### Cost Controls
- VAD threshold filtering (energy-based + min speech duration)
- Silence trimming: Remove internal silences ≥ `minSilenceMs`
- Smart chunking: Max `maxUtteranceMs` (12-20s), optional 100-200ms overlap
- Do-not-send rule: Discard sub-threshold blips

### Audio Handling
- Default encoding: **Opus/WebM** at 16k-24kHz mono
- Browser-based capture: getUserMedia with device selection
- Device enumeration, test tones, automatic fallback

### Browser Constraints
- PTT hotkey only works when PWA window is focused (browser security limitation)
- No global hotkeys without native wrapper (out of scope)
- HTTPS required for getUserMedia in production

## MCP Connection URL

**Format:** `https://<backend-host>/mcp/sse?conversationId=<conversation-id>`

- **conversationId** (required): Unique identifier for the conversation
- Each Claude Code project sets its own ID in `.mcp.json` to maintain project-specific conversation history

**Example `.mcp.json` entry:**
```json
{
  "mcpServers": {
    "voice": {
      "url": "https://localhost:3000/mcp/sse?conversationId=my-project-foo"
    }
  }
}
```

## MCP Tool Schemas

### `speak` Tool
**Input:**
```typescript
{
  text: string;          // required
  ssml?: string;         // bypass enhancer if provided
  voiceId?: string;      // ElevenLabs voice ID
  model?: string;        // ElevenLabs model
  stream?: boolean;      // default true
}
```

**Output:**
```typescript
{
  ok: boolean;
  ssmlUsed?: string;
  audioUrl?: string;
  metrics: { ttfbMs: number; totalMs: number };
  reason?: string;       // on error
}
```

### `listen` Tool
**Input:**
```typescript
{
  mode: "auto" | "manual" | "ptt";  // required
  vadThreshold?: number;             // 0-1, default from settings
  minSilenceMs?: number;             // split floor
  maxUtteranceMs?: number;           // cap per utterance
  locale?: string;                   // e.g., "en-US"
}
```

**Output:**
```typescript
{
  ok: boolean;
  transcript: string;
  segments: Array<{ startMs: number; endMs: number; sent: boolean }>;
  metrics: { audioSecSent: number; chunks: number; latencyMs: number };
  reason?: string;  // on error
}
```

## SSML Enhancer Rules

- **Allowed tags**: `<speak>`, `<break>`, `<prosody>`, `<emphasis>`, `<phoneme>`
- **Validation**: XML parse, remove disallowed tags/attributes, strip nested breaks, cap length
- **Fallback**: Plain text or minimal `<speak>` wrapper if invalid
- **Settings-driven**: Max breaks per 100 words, prosody bounds (± rate/pitch), phoneme toggle

## Security & API Keys

**Two Options:**

1. **Self-hosted / Development**: User enters API keys (ElevenLabs, OpenAI, Gemini) in PWA Settings UI
   - Stored in browser LocalStorage/IndexedDB (encrypted)
   - Sent to backend with each request
   - Keys never logged; redacted in error messages

2. **Hosted Service**: Admin configures keys server-side via `.env` or cloud secret manager
   - Users don't need to provide keys
   - Backend uses shared service keys

**Conversation Data:**
- Opt-in conversation history storage with configurable retention policy
- Export/delete conversations from PWA

**Transport Security:**
- HTTPS required in production
- WebSocket/SSE connections secured with same origin policy
- Optional auth token for hosted deployments

## Error Handling

- **Network/API**: Exponential backoff, circuit breaker after N failures
- **SSE connection drops**: Auto-reconnect with session ID persistence
- **Audio devices**: Enumerate, test tone, fallback to default
- **Browser tab backgrounding**: Detect visibility changes, pause recording, warn user
- **Graceful cancel**: Stop TTS/STT streams, clear pending requests
- **Telemetry**: Per-stage timings, error codes by subsystem

## Testing Strategy

### Unit/Integration
- SSML validator (XML + ElevenLabs rules)
- VAD/Chunker with synthetic audio (labeled silences)
- Mock services (ElevenLabs, Gemini, OpenAI)
- Zod schema validation (shared types)

### End-to-End Acceptance (must pass)
1. Auto mode: speak -> hear TTS, talk -> auto-send transcript, latencies under target
2. Manual mode: speak -> talk -> review -> Send/Cancel
3. PTT mode: record while key held (window focused), send on release (or manual)
4. Silence handling: long pause = split segments, only speech above threshold sent
5. Cost reduction: silence trimming shows ≥30% reduction on 5-min test script
6. SSML validity: 0 parser errors on 20 random enriched messages
7. Recovery: network kill mid-stream, app recovers with clear user messaging
8. Multi-session: Multiple Claude Code instances connect, conversations isolated, no cross-contamination
9. Chat history: Audio replay works for all historical messages
10. PWA installability: Passes Chrome Lighthouse PWA audit

## Workspace Structure (Bun Monorepo)

```
/
├── backend/              # Elysia server + MCP
│   ├── src/
│   │   ├── mcp/         # SSE MCP server, tool handlers
│   │   ├── api/         # REST endpoints
│   │   ├── services/    # SSML enhancer, TTS, STT
│   │   ├── audio/       # VAD, chunking
│   │   ├── session/     # Session manager
│   │   ├── db/          # Conversation persistence
│   │   └── index.ts     # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # React PWA
│   ├── src/
│   │   ├── components/  # shadcn/ui + custom
│   │   ├── pages/       # Main views
│   │   ├── hooks/       # Audio capture, WebSocket
│   │   ├── lib/         # API client, utils
│   │   ├── types/       # (imports from shared)
│   │   └── main.tsx     # Entry point
│   ├── public/
│   │   ├── manifest.json
│   │   └── service-worker.js
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── shared/               # Shared types/schemas
│   ├── src/
│   │   ├── schemas.ts   # Zod schemas
│   │   └── types.ts     # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── package.json          # Workspace root
└── bun.lockb
```

## Development Commands

```bash
# Install dependencies
bun install

# Dev mode (both frontend + backend)
bun dev

# Dev backend only
bun --filter backend dev

# Dev frontend only
bun --filter frontend dev

# Build everything
bun run build

# Run tests
bun test

# Type check
bun run typecheck
```

## Key Files (to be created)

**Backend:**
- `backend/src/mcp/server.ts` - SSE MCP server setup
- `backend/src/mcp/tools/speak.ts` - Speak tool handler
- `backend/src/mcp/tools/listen.ts` - Listen tool handler
- `backend/src/services/ssml-enhancer.ts` - OpenAI SSML enrichment
- `backend/src/services/tts-elevenlabs.ts` - ElevenLabs streaming client
- `backend/src/services/stt-gemini.ts` - Gemini STT with chunking
- `backend/src/audio/vad.ts` - Voice activity detection
- `backend/src/audio/chunker.ts` - Smart silence-based chunking
- `backend/src/session/manager.ts` - MCP session management
- `backend/src/db/conversations.ts` - Conversation persistence

**Frontend:**
- `frontend/src/pages/Main.tsx` - Main layout (sidebar + chat + controls)
- `frontend/src/components/ConversationList.tsx` - Sidebar with all sessions
- `frontend/src/components/ChatView.tsx` - Message history + audio replay
- `frontend/src/components/AudioControls.tsx` - Mic, PTT, mode selector
- `frontend/src/components/Settings.tsx` - Settings panel
- `frontend/src/components/Diagnostics.tsx` - Metrics + logs
- `frontend/src/hooks/useAudioCapture.ts` - getUserMedia + VAD
- `frontend/src/hooks/useWebSocket.ts` - Real-time updates from backend
- `frontend/src/lib/api.ts` - Backend API client

**Shared:**
- `shared/src/schemas.ts` - Zod schemas for validation
- `shared/src/types.ts` - TypeScript types derived from schemas

## Success Criteria (from scope)

- MCP conformance: Tools discoverable via SSE and validated by clients
- Multi-session support: Multiple MCP clients connect concurrently, conversations isolated
- Chat history: Full conversation history with audio replay
- TTS quality: < 500ms TTFB
- SSML enrichment: ≥ 90% success rate
- STT accuracy: Within Gemini nominal range, one send per utterance
- Cost controls: ≥ 30% reduction via silence trimming
- UX modes: All three modes functional with persisted settings
- Stability: No deadlocks or unhandled rejections in 30-min session
- Observability: Built-in metrics visible in diagnostics panel
- PWA installability: Passes Chrome PWA audit

## Development Notes

- **Browser APIs**: getUserMedia (mic), Web Audio API (VAD/processing), MediaRecorder (encoding), WebSocket/SSE (real-time)
- **Accessibility**: Keyboard-first (PTT when focused), ARIA labels, high-contrast support
- **Observability**: Structured JSON logs sent to backend; metrics in diagnostics panel
- **Settings**: Hot reload where feasible (thresholds apply without restart)
- **Deployment**: Can be hosted on Vercel, Railway, Fly.io, or VPS with Nginx reverse proxy
