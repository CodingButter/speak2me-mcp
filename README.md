# speak2me-mcp

> Voice MCP Server with STT/TTS capabilities - Elysia backend + React PWA frontend

A Model Context Protocol (MCP) server that adds voice capabilities to Claude Code and other MCP clients. Speak text using high-quality TTS (ElevenLabs) with SSML enrichment (OpenAI), and listen to voice input with STT (Google Gemini).

## Features

- 🎙️ **Voice Input**: Capture and transcribe voice using Google Gemini STT with VAD and chunking
- 🔊 **Voice Output**: Convert text to speech using ElevenLabs with OpenAI-powered SSML enrichment
- 🎭 **MCP Integration**: Two tools (`speak` and `listen`) accessible from Claude Code and other MCP clients
- 💬 **PWA Interface**: React-based operator console with conversation history and audio replay
- 🔐 **Multi-Session**: Support multiple concurrent MCP connections with separate conversation histories
- ✅ **Tested**: 81 tests covering schemas, tools, storage, and session management

## Architecture

This is a Bun monorepo with:

- **Backend** (`apps/backend`): Elysia server with MCP SSE endpoints
- **Frontend** (`apps/frontend`): React PWA with audio controls and conversation UI
- **Packages**:
  - `core`: MCP tools, AI services (TTS/STT/SSML), session management
  - `database`: Prisma storage layer for conversations and messages
  - `shared`: Zod schemas and TypeScript types
  - `platform`: Web/Electron adapters
  - `ui`: Shared React components

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- API Keys:
  - OpenAI (for SSML enrichment)
  - ElevenLabs (for TTS)
  - Google Gemini (for STT)

### Installation

```bash
# Clone the repo
git clone https://github.com/CodingButter/speak2me-mcp.git
cd speak2me-mcp

# Install dependencies
bun install

# Set up database
cd packages/database
bun run db:generate
bun run db:push
cd ../..

# Configure API keys (backend)
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your API keys
```

### Development

```bash
# Start both backend and frontend
bun run dev

# Or start individually
bun run dev:backend  # Backend on http://localhost:3000
bun run dev:frontend # Frontend on http://localhost:5173
```

### Testing

```bash
# Run all tests
bun test

# Watch mode
bun test:watch

# Coverage
bun test:coverage
```

## MCP Integration

Connect Claude Code (or other MCP clients) to the voice server:

### 1. Start the backend

```bash
bun run dev:backend
```

### 2. Add to your project's `.mcp.json`

```json
{
  "mcpServers": {
    "voice": {
      "url": "http://localhost:3000/sse/my-project-id"
    }
  }
}
```

Each project can have its own `conversationId` (the last path segment) to maintain separate histories.

### 3. Use the tools

Claude Code will auto-discover two tools:

**`speak`** - Convert text to speech
```typescript
{
  text: string,           // Required: text to speak
  ssml?: string,          // Optional: provide your own SSML
  voiceId?: string,       // Optional: ElevenLabs voice ID
  model?: string,         // Optional: ElevenLabs model
  stream?: boolean        // Optional: stream audio (default: true)
}
```

**`listen`** - Capture and transcribe voice
```typescript
{
  mode: "auto" | "manual" | "ptt",  // Required: listening mode
  vadThreshold?: number,             // Optional: VAD threshold (0-1)
  minSilenceMs?: number,             // Optional: silence duration
  maxUtteranceMs?: number,           // Optional: max utterance length
  locale?: string                    // Optional: e.g., "en-US"
}
```

## Project Structure

```
speak2me-mcp/
├── apps/
│   ├── backend/              # Elysia MCP server
│   │   ├── src/
│   │   │   ├── index.ts      # Main server
│   │   │   ├── mcp/          # SSE transport, tool handlers
│   │   │   └── api/          # REST endpoints
│   │   └── package.json
│   └── frontend/             # React PWA
│       ├── src/
│       │   ├── components/   # UI components
│       │   ├── hooks/        # Audio capture hooks
│       │   └── services/     # Audio encoding
│       └── package.json
├── packages/
│   ├── core/                 # MCP tools & services
│   │   └── src/
│   │       ├── mcp/          # handleSpeak, handleListen
│   │       ├── services/     # TTS, STT, SSML enhancer
│   │       ├── session/      # SessionManager
│   │       └── operations/   # CoreOperations
│   ├── database/             # Prisma storage
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/storage.ts
│   ├── shared/               # Schemas & types
│   │   └── src/
│   │       ├── schemas.ts    # Zod schemas
│   │       └── types.ts      # TypeScript types
│   ├── platform/             # Web/Electron adapters
│   ├── ui/                   # Shared components
│   └── config/               # Shared config
└── package.json              # Root workspace
```

## Scripts

### Root Level
- `bun run dev` - Start both apps in dev mode
- `bun run dev:backend` - Start backend only
- `bun run dev:frontend` - Start frontend only
- `bun run build` - Build all apps
- `bun test` - Run all tests
- `bun run typecheck` - Type check all packages
- `bun run lint` - Lint all packages
- `bun run format` - Format code with Prettier

### Backend
- `bun run dev` - Dev with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production build
- `bun test` - Run backend tests

### Frontend
- `bun run dev` - Dev server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun test` - Run frontend tests

### Database
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema to database
- `bun run db:migrate` - Create migration
- `bun run db:studio` - Open Prisma Studio

## Git Hooks

This project uses pre-push hooks to ensure code quality:

- **Pre-push**: Runs all tests before allowing push to remote
- Tests must pass before code can be pushed
- Located in `.git/hooks/pre-push`

## API Keys Configuration

Keys can be stored two ways:

### Server-side (Recommended for self-hosted)
Create `apps/backend/.env`:
```env
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
GEMINI_API_KEY=...
```

### Client-side (PWA UI)
Users can enter keys in the PWA Settings panel. Keys are stored per conversation.

## Documentation

- **CLAUDE.md** - Instructions for Claude Code when working in this repo
- **Project Scope Document.md** - Full product requirements and architecture

## Tech Stack

- **Runtime**: Bun
- **Backend**: Elysia, @modelcontextprotocol/sdk, Prisma
- **Frontend**: React 18, Zustand, TailwindCSS, @ricky0123/vad-web
- **AI Services**: OpenAI, ElevenLabs, Google Gemini
- **Validation**: Zod
- **Testing**: Bun Test

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`bun test`)
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
