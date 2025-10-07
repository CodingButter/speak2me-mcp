# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Voice MCP Server** monorepo that implements the Model Context Protocol with speech-to-text (STT) and text-to-speech (TTS) capabilities. The system consists of:

- **Elysia Backend**: MCP SSE server with `speak` and `listen` tools
- **React PWA Frontend**: Operator console for managing conversations and audio controls
- **Shared Packages**: Core logic, database (Prisma), platform adapters, UI components

## Architecture

### Monorepo Structure

```
apps/
  backend/          Elysia server with MCP SSE endpoints
  frontend/         React PWA with audio capture/playback

packages/
  core/             MCP tools, services (TTS/STT/SSML), session management
  database/         Prisma client and storage layer
  shared/           Zod schemas, shared types
  platform/         Web/Electron platform adapters
  ui/               Shared React components
  config/           Shared TypeScript/ESLint configs
```

### Core Flow

1. **MCP Client Connection**: Claude Code (or other MCP clients) connect via SSE to `/sse/:conversationId`
2. **Session Management**: Each conversation gets a unique session with its own API keys
3. **Tool Invocations**:
   - `speak(text)` → SSML enrichment (OpenAI) → ElevenLabs TTS → audio saved → message stored
   - `listen(mode)` → Audio capture (PWA) → VAD/chunking → Gemini STT → transcript stored
4. **PWA UI**: Displays all conversations, messages with audio replay, settings, diagnostics

### Key Technologies

- **Runtime**: Bun
- **Backend**: Elysia (web framework), MCP SDK (@modelcontextprotocol/sdk), Prisma
- **Frontend**: React 18, Zustand (state), TailwindCSS, @ricky0123/vad-web
- **AI Services**: OpenAI (SSML enhancement), ElevenLabs (TTS), Google Gemini (STT)
- **Validation**: Zod schemas shared between frontend/backend

## Development Commands

### Root Level

```bash
# Start both backend and frontend in dev mode
bun run dev

# Start backend only
bun run dev:backend

# Start frontend only
bun run dev:frontend

# Build all apps
bun run build

# Type checking
bun run typecheck

# Lint
bun run lint

# Format
bun run format
```

### Backend (apps/backend)

```bash
cd apps/backend

# Dev with hot reload
bun run dev

# Build
bun run build

# Production start
bun run start

# Type check
bun run typecheck
```

Backend runs on **http://localhost:3000** with:
- MCP SSE endpoint: `/sse/:conversationId`
- REST API: `/api/conversations`, `/api/messages`, `/api/settings`, `/api/keys`
- Health check: `/health`

### Frontend (apps/frontend)

```bash
cd apps/frontend

# Dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type check
bun run typecheck
```

Frontend runs on **http://localhost:5173** (or port specified in dev-server.ts).

## MCP Integration

### Connecting from Claude Code

Add to `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "voice": {
      "url": "http://localhost:3000/sse/my-project-id"
    }
  }
}
```

Each project can have its own **conversationId** (the last path segment) to maintain separate conversation histories.

### Available MCP Tools

**`speak`**
- Converts text to speech using ElevenLabs
- Optional SSML enrichment via OpenAI
- Saves audio asset for replay in PWA
- Returns: `{ ok, ssmlUsed, audioUrl, metrics: { ttfbMs, totalMs } }`

**`listen`**
- Captures and transcribes voice using Gemini STT
- Modes: `auto` (auto-send), `manual` (user confirms), `ptt` (push-to-talk)
- VAD and silence trimming to reduce costs
- Returns: `{ ok, transcript, segments, metrics: { audioSecSent, chunks, latencyMs } }`

## Important File Locations

### Backend Core Logic

- `apps/backend/src/index.ts` - Main Elysia server setup
- `apps/backend/src/mcp/sse-server.ts` - SSE transport and MCP tool handlers
- `apps/backend/src/api/` - REST API routes (conversations, messages, settings, keys)

### Core Package (MCP Tools & Services)

- `packages/core/src/mcp/tools.ts` - `handleSpeak` and `handleListen` implementations
- `packages/core/src/services/ssml-enhancer.ts` - OpenAI SSML enhancement
- `packages/core/src/services/tts.ts` - ElevenLabs integration
- `packages/core/src/services/stt.ts` - Gemini STT integration
- `packages/core/src/session/index.ts` - SessionManager (tracks MCP sessions)
- `packages/core/src/operations/index.ts` - CoreOperations (business logic)

### Database

- `packages/database/src/storage.ts` - PrismaStorage implementation
- `packages/database/prisma/schema.prisma` - Database schema

### Frontend Components

- `apps/frontend/src/App.tsx` - Root app component
- `apps/frontend/src/components/Layout.tsx` - Main layout with sidebar
- `apps/frontend/src/components/ConversationList.tsx` - Conversation switcher
- `apps/frontend/src/components/ChatView.tsx` - Message history with audio replay
- `apps/frontend/src/components/AudioControls.tsx` - Mic controls, mode selector
- `apps/frontend/src/components/Settings.tsx` - Settings panel
- `apps/frontend/src/components/VolumeMeter.tsx` - VAD visualization

### Shared Schemas

- `packages/shared/src/schemas.ts` - Zod schemas for `speak` and `listen` inputs
- `packages/shared/src/types.ts` - TypeScript types (Message, Conversation, ApiKeys, etc.)

## API Keys & Configuration

API keys can be stored **two ways**:

1. **Server-side** (recommended for self-hosted): `.env` file in `apps/backend/`
2. **Client-side** (PWA UI): User enters keys in Settings → stored per conversation via `/api/keys` endpoint

Required keys:
- `OPENAI_API_KEY` (for SSML enhancement)
- `ELEVENLABS_API_KEY` (for TTS)
- `GEMINI_API_KEY` (for STT)

Keys are accessed from session context in MCP tool handlers (see `apps/backend/src/mcp/sse-server.ts:93-96`).

## Important Implementation Details

### Session Management

- **SessionManager** (`packages/core/src/session/index.ts`) tracks active MCP connections
- Each MCP connection is mapped to a `conversationId`
- Sessions store API keys and are created when a client connects
- Sessions can be retrieved by session ID or conversation ID

### Audio Pipeline (Frontend)

- Browser-based audio capture via `getUserMedia`
- VAD implemented using `@ricky0123/vad-web`
- Audio chunking and silence trimming to reduce STT costs
- Audio sent to backend as base64 or ArrayBuffer (see `handleListen` in `packages/core/src/mcp/tools.ts`)

### SSML Enrichment

- OpenAI is used to enrich plain text with SSML tags (`<break>`, `<prosody>`, `<emphasis>`)
- Validation ensures only ElevenLabs-compatible SSML is sent
- Fallback to plain text if enrichment fails
- See `packages/core/src/services/ssml-enhancer.ts`

### Database Persistence

- Prisma with SQLite (or PostgreSQL for production)
- Stores: Conversations, Messages (with audio URLs), Settings, API Keys
- Storage interface in `packages/database/src/storage.ts`
- Core operations use `PrismaStorage` for all DB access

## Common Development Tasks

### Adding a New MCP Tool

1. Define Zod schema in `packages/shared/src/schemas.ts`
2. Implement handler in `packages/core/src/mcp/tools.ts`
3. Register tool in `apps/backend/src/mcp/sse-server.ts` (ListToolsRequestSchema and CallToolRequestSchema)

### Adding a New Frontend Component

1. Create component in `apps/frontend/src/components/`
2. Import shared UI components from `@stt-mcp/ui` package
3. Use Zustand store for state management
4. Call backend REST API via fetch (see existing components for patterns)

### Updating Database Schema

```bash
cd packages/database

# Edit prisma/schema.prisma
# Then generate client
bun prisma generate

# Create migration
bun prisma migrate dev --name my_migration
```

### Testing MCP Connection

```bash
# Terminal 1: Start backend
cd apps/backend
bun run dev

# Terminal 2: Connect with MCP client
# Add to .mcp.json in test project:
{
  "mcpServers": {
    "voice": {
      "url": "http://localhost:3000/sse/test-convo"
    }
  }
}

# Claude Code will auto-discover speak/listen tools
```

## Gotchas & Design Notes

- **conversationId** is the primary routing key - MCP clients specify it in SSE URL path
- **API keys** are loaded per-session, not globally - allows multi-user scenarios
- **Audio assets** are stored as files (not in DB) - see TTS service for path generation
- **SSE transport** is adapted to work with Elysia Stream (see hack in `handleSSEConnection`)
- **listen tool** currently has placeholder `audioData` - PWA must send audio to backend (see TODO in `sse-server.ts:130`)
- **Platform package** supports both Web (PWA) and Electron wrappers - see `packages/platform/src/index.ts`

## Project Scope Document

For full product requirements and architecture details, see **`Project Scope Document.md`** in the root. It covers:
- Business goals and success criteria
- Audio pipeline (VAD, chunking, cost controls)
- SSML enrichment strategy
- Multi-session support
- Security & privacy considerations
- Deployment options
