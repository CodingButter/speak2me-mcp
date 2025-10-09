# Project Scope Document — Claude Code Orchestration Platform

## 1) Executive Summary

Build a comprehensive **Claude Code Orchestration Platform** - a Model Context Protocol (MCP) **SSE server** integrated into an Elysia backend that exposes 15 tools across 5 categories, plus a **Progressive Web App (PWA)** operator console.

The system enables:

- 🎤 **Voice Communication**: Convert text to high-quality speech (ElevenLabs) with **OpenAI-assisted SSML enrichment**, and capture voice via **Google Gemini STT** with **VAD and chunking**.
- 📋 **Task Management**: Create, update, list, archive, and delete TODOs with priority levels, tags, and status tracking.
- 🔗 **Project Context**: Link projects to conversations with dev/build/test commands for context-aware tool usage.
- 🤖 **Claude Orchestration**: Run Claude CLI instances programmatically, capturing responses and streaming via TTS.
- ⚙️ **Process Control**: Start, stop, monitor dev servers, builds, and tests with stdout/stderr streaming.
- 💬 **Chat History**: Full conversation history with audio replay for each message.
- 🔄 **Multi-Session**: Support multiple concurrent MCP client connections (e.g., multiple Claude Code instances), each appearing as a separate conversation in the UI.

The result is a low-latency, streaming, "command center" interface for AI-driven development, with cost-sensitive audio handling, tight tool semantics via MCP, and the flexibility to be hosted as a service or installed locally.

---

## 2) Goals & Success Criteria

### 2.1 Business/Experience Goals

- Provide a **hands-free or push-to-talk** conversational UX with **studio-quality TTS** and **robust STT**.
- Enable **voice-driven development** with TODO tracking, project management, and process control.
- Keep **latency low**, **transcription cost modest**, and **control obvious**.
- Make it trivial for **any MCP-enabled client** to discover and use all 15 tools via well-defined schemas.

### 2.2 Measurable Success Criteria

1. **MCP Conformance**: All 15 tools discoverable via `@modelcontextprotocol/sdk` over SSE; tool schemas validated by clients.
2. **Multi-Session Support**: Multiple MCP clients can connect concurrently; each appears as a distinct conversation in the UI; no cross-session contamination.
3. **Chat History**: Full conversation history persisted with both text and audio; audio replay functional for all messages.
4. **TTS Quality**: ElevenLabs audio streamed with < **500ms** first-audio latency after text receipt (on a typical broadband connection).
5. **SSML Enrichment**: ≥ **90%** of assistant messages enriched with valid SSML (no rendering errors from ElevenLabs).
6. **STT Accuracy**: Word error rate within **Gemini's nominal range** on quiet-room speech; no more than one send per utterance with VAD enabled.
7. **Cost Controls**: Silence-trimming reduces average audio seconds sent to Gemini by **≥30%** compared to raw capture (on a 5-minute test script).
8. **UX Modes**: Auto-send, manual-send, and push-to-talk all functional; push-to-talk keybinding configurable and persisted.
9. **Settings Persistence**: All thresholds and options persist across browser sessions.
10. **Stability**: No audio device deadlocks or unhandled promise rejections during a 30-minute continuous session.
11. **Observability**: Built-in metrics (latency, chunk count, send seconds, error rates) visible in diagnostics panel.
12. **TODO Management**: Create, update, list, archive TODOs with proper status transitions; filter by project, priority, tags.
13. **Project Context**: Link projects to conversations; commands (dev, build, test) persist and are used by process tools.
14. **Process Control**: Start/stop processes; capture stdout/stderr; monitor resource usage; auto-restart on crash.
15. **Claude Orchestration**: Execute Claude CLI; capture output; integrate with project context; stream responses via TTS.

---

## 3) Product Scope

### 3.1 In Scope

- **Elysia Backend Server (Port 3001)** with:

  - **SSE MCP Server** exposing **15 tools** across 5 categories:
    - **Voice Tools (2)**: `speak`, `listen`
    - **TODO Management (5)**: `todo_create`, `todo_update`, `todo_list`, `todo_archive`, `todo_delete`
    - **Project Management (3)**: `project_link`, `project_get`, `project_unlink`
    - **Claude Orchestration (1)**: `claude_chat`
    - **Process Control (4)**: `process_start`, `process_stop`, `process_status`, `process_output`
  - **REST API** for web app: `/api/projects`, `/api/conversations`, `/api/messages`, `/api/settings`, `/api/keys`, `/api/voices`, `/api/system-metrics`, `/api/filesystem`, `/api/claude`
  - **Session Management**: Track multiple concurrent MCP connections; unique conversation per client
  - **Database Persistence**: Prisma with SQLite (9 models: Project, Conversation, Message, ApiKey, VoiceConfig, ClaudeConfig, Settings, ProjectContext, Todo)

- **SSML Enhancer** (OpenAI): Input raw assistant text; output enriched SSML (pauses, prosody, emphasis, phoneme hints). Fallback to raw text if enhancement fails.
- **TTS Engine** (ElevenLabs): Streaming playback; audio assets saved for replay.
- **STT Engine** (Google Gemini): Chunked streaming recognition; silence trimming and pre-chunking to reduce token-seconds.
- **TODO System**: Full CRUD with status tracking (BACKLOG → IN_PROGRESS → BLOCKED → COMPLETED → ARCHIVED), priority levels (LOW/MEDIUM/HIGH/CRITICAL), tags, assignees.
- **Project Context System**: Link conversations to project directories; store dev/build/test commands; auto-use in process tools.
- **Process Manager**: Start/stop dev servers, builds, tests; capture stdout/stderr; monitor CPU/RAM; auto-restart policies.
- **Claude CLI Service**: Execute Claude CLI programmatically; capture responses; integrate with project context; stream via TTS.

- **PWA (React + TypeScript + TailwindCSS v4)**:

  - **Project Selector**: Top-level navigation; switch between projects
  - **Conversation Switcher**: Sidebar showing all conversations within current project; click to switch
  - **Chat View**: Full message history (user + assistant); inline audio player for each message; auto-scroll; copy/export
  - **Audio Controls**: Waveform/VU meter, mode selector (Auto/Manual/PTT), PTT button/keybinding (works when window focused), Send/Cancel/Retry
  - **Settings Panel**: Audio device picker, VAD thresholds, STT/TTS config, SSML enhancer options, keybindings, privacy settings
  - **Claude Config Panel**: System prompts, model selection, tool permissions, MCP server configuration
  - **Diagnostics Panel** (Planned): Real-time metrics charts, logs viewer, connection status, device tests
  - **PWA Features** (Partial): Manifest.json (icons pending), service worker (TODO), installable via Chrome

- **Audio Pipeline** (Browser WebRTC APIs):

  - **getUserMedia** for mic access; browser-based device selection
  - **VAD** (volume threshold + min-silence window) via `@ricky0123/vad-web`
  - **Smart chunking**: Split on silence boundaries; cap chunk length; optional overlap to avoid word snips
  - **Compression**: Opus/WebM or PCM; configurable

- **Chat & History**:

  - Persistent conversation storage (Prisma + SQLite)
  - Each message stored with: text, audio URL, timestamp, role (user/assistant), metadata (SSML, metrics)
  - Audio replay: Click to play any historical message
  - Export conversations (JSON, Markdown - planned)

- **Security & Secrets**:

  - API keys stored server-side via `.env` or per-conversation via `/api/keys` endpoint
  - CORS configured for PWA origin; HTTPS recommended for production

### 3.2 Out of Scope (For Current Phase)

- Native mobile apps (PWA works on mobile browsers)
- Multi-user voice conferencing, diarization beyond single speaker
- Global push-to-talk hotkeys (PTT only works when window is focused due to browser security)
- Cloud-hosted key management UI
- Non-English voice cloning
- Electron desktop app (removed from scope)
- Standalone binary compilation (removed from scope)
- Docker deployment (can be added later)
- Full PWA offline support (service worker not yet implemented)

---

## 4) Users & Roles

- **Primary Operator (You)**: Uses PWA via browser; monitors multiple projects and conversations; controls modes and thresholds; reviews chat history; manages TODOs; controls processes.
- **MCP Clients (e.g., Claude Code)**: Connect via SSE to backend; discover and invoke 15 tools; each connection creates a separate conversation.
- **Developers**: Extend tools, tweak VAD, add metrics sinks, deploy as hosted service or local instance.
- **Future: Remote Users** (optional): Access hosted instance with authentication; manage their own conversations.

---

## 5) Functional Requirements

### 5.1 MCP Tools (15 Total)

#### 5.1.1 Voice Tools (2)

**`speak`**

- **Input**
  - `text` (required): assistant content to vocalize
  - `ssml` (optional): if provided, bypass enhancer
  - `voiceId` (optional): ElevenLabs voice; default from settings
  - `model` (optional): ElevenLabs model; default from settings
  - `stream` (optional, default true): stream audio as it's generated

- **Process**
  1. If `ssml` absent → call **OpenAI SSML Enhancer**:
     - Adds `<prosody rate/pitch>`, `<break time>`, `<emphasis>`, optional `<phoneme>`
     - Validate against ElevenLabs SSML constraints; sanitize
  2. Call ElevenLabs streaming API; start playback immediately
  3. Save audio asset to `./data/audio/:conversationId/:messageId.mp3`

- **Output**
  - `{ ok: true, ssmlUsed: string, audioUrl?: string, metrics: { ttfbMs, totalMs } }`
  - Errors return `{ ok: false, reason }`

**`listen`**

- **Input**
  - `mode`: `"auto"` | `"manual"` | `"ptt"`
  - `vadThreshold`: float 0–1 (default from settings)
  - `minSilenceMs`: number (split floor)
  - `maxUtteranceMs`: cap per utterance
  - `locale`: e.g., `"en-US"`

- **Process**
  1. Start mic; show VU meter (PWA side)
  2. VAD gates segments; trim leading/trailing silence; split by `minSilenceMs`
  3. Encode each segment (Opus/WebM). **Do not send** segments that fail the loudness floor
  4. Stream to **Gemini STT**; accumulate partials; on final, produce stable text
  5. Respect mode:
     - **auto**: auto-send final transcript to MCP client
     - **manual**: hold transcript; require "Send"
     - **ptt**: only record while hotkey held; send on release (or manual, per setting)

- **Output**
  - `{ ok: true, transcript: string, segments: [...], metrics: { audioSecSent, chunks, latencyMs } }`

#### 5.1.2 TODO Management Tools (5)

**`todo_create`**

- **Input**
  - `title` (required): TODO title
  - `description` (optional): Detailed description
  - `priority` (optional): LOW | MEDIUM | HIGH | CRITICAL
  - `tags` (optional): Array of strings for categorization
  - `assignee` (optional): Person assigned to this task
  - `projectPath` (optional): Link to specific project

- **Output**
  - `{ ok: true, todo: { id, title, status, priority, ... } }`

**`todo_update`**

- **Input**
  - `id` (required): TODO ID
  - `title`, `description`, `status`, `priority`, `tags`, `blockedReason`, `assignee` (all optional)
  - `status`: BACKLOG | IN_PROGRESS | BLOCKED | COMPLETED | ARCHIVED

- **Output**
  - `{ ok: true, todo: { ... } }`

**`todo_list`**

- **Input** (all optional)
  - `status`: Filter by status
  - `projectPath`: Filter by project
  - `priority`: Filter by priority
  - `tags`: Filter by tags (match any)

- **Output**
  - `{ ok: true, todos: [...] }`

**`todo_archive`**

- **Input**
  - `id` (required): TODO ID to archive

- **Output**
  - `{ ok: true, archivedAt: timestamp }`

**`todo_delete`**

- **Input**
  - `id` (required): TODO ID to permanently delete

- **Output**
  - `{ ok: true }`

#### 5.1.3 Project Management Tools (3)

**`project_link`**

- **Input**
  - `projectPath` (required): Absolute path to project directory
  - `projectName` (optional): Auto-detected from path if not provided
  - `devCommand`, `buildCommand`, `testCommand`, `stopCommand` (optional): Commands for process control
  - `settings` (optional): Additional project settings (JSON)

- **Output**
  - `{ ok: true, project: { ... } }`

**`project_get`**

- **Input**: None

- **Output**
  - `{ ok: true, project: { ... } }` or `{ ok: false }` if no project linked

**`project_unlink`**

- **Input**: None

- **Output**
  - `{ ok: true }`

#### 5.1.4 Claude Orchestration Tool (1)

**`claude_chat`**

- **Input**
  - `prompt` (required): The prompt to send to Claude CLI
  - `contextFiles` (optional): Array of file paths to include as context
  - `useProjectContext` (optional, default true): Whether to use linked project's directory as working directory

- **Output**
  - `{ ok: true, output: string, error?: string }`

**Process**:
1. Spawn Claude CLI subprocess in project directory (if linked)
2. Pass prompt and context files via `--file` flags
3. Capture stdout/stderr
4. Parse Claude's response
5. Return full output for processing

#### 5.1.5 Process Control Tools (4)

**`process_start`**

- **Input**
  - `type` (required): dev | build | test | custom
  - `command` (optional): Command to run (uses project context commands if not provided)
  - `cwd` (optional): Working directory (defaults to project path)

- **Output**
  - `{ ok: true, process: { type, status, pid } }`

**`process_stop`**

- **Input**
  - `type` (optional): Process type to stop (if omitted, stops all processes for conversation)

- **Output**
  - `{ ok: true, stoppedProcesses: [...] }`

**`process_status`**

- **Input**
  - `type` (optional): Process type to check (if omitted, returns all processes for conversation)

- **Output**
  - `{ ok: true, processes: [{ type, status, pid, uptime, ... }] }`

**`process_output`**

- **Input**
  - `type` (required): Process type to get output from

- **Output**
  - `{ ok: true, output: string, error: string }`

### 5.2 PWA (React + TypeScript)

#### 5.2.1 Main Layout

- **Top Bar**:
  - **Project Selector**: Dropdown to switch between projects
  - **Connection Status**: MCP session health indicator
  - **Settings Icon**: Opens settings modal

- **Sidebar (Left)**:
  - **Conversation List**: All conversations within current project; show last message timestamp, unread indicator
  - Click to switch between conversations
  - "New Conversation" button (manual session creation for testing)

- **Main Panel (Center/Right)**:
  - **Chat View**: Scrollable message history (user + assistant); each message shows:
    - Role icon/avatar
    - Text content
    - Timestamp
    - Audio player (play/pause/scrub) if audio available
    - Metadata toggle (SSML used, metrics)
  - **Audio Controls (Bottom)**:
    - Waveform/VU meter (live during recording)
    - Mode selector: Auto / Manual / Push-to-talk
    - PTT button (hold to record) + keybinding display
    - "Send", "Cancel", "Retry last", "Mute TTS"
    - Device status indicator

#### 5.2.2 Settings Panel (Modal)

- **Audio Capture**
  - Input device picker (browser-based); gain control; noise suppression toggle (browser API)

- **VAD & Chunking**
  - `vadThreshold` slider (with live meter preview)
  - `minSilenceMs`, `maxUtteranceMs`, **minSpeechMs** (to ignore blips)
  - "Trim long silences" on/off; "Max chunk length (ms)"

- **STT**
  - Provider: **Gemini** (model list); language/locale; encoding (Opus/WebM or PCM)
  - "Send partials" toggle (advanced)

- **TTS**
  - Provider: **ElevenLabs**; `voiceId`; model; speaking rate/pitch bias (pre-SSML)
  - "Stream playback" toggle; "Autoplay" toggle

- **SSML Enhancer (OpenAI)**
  - Model; "Enable prosody", "Enable emphasis", "Enable phonemes"
  - Formality slider (casual ↔ neutral ↔ formal), "Max breaks per 100 words"

- **Interaction**
  - Default mode; auto-send in auto mode on/off; PTT keybinding (works only when window focused)

- **Privacy & Storage**
  - "Keep conversation history" on/off; retention days; export conversations (JSON/MD)

- **Advanced**
  - Logging level; metrics panel on/off; backend URL (for self-hosted deployments)

#### 5.2.3 Claude Config Panel (Modal)

- **System Prompt**
  - Template editor with variable support (`{{voiceDirectives}}`, etc.)
  - Voice directives toggle and configuration

- **Model & Behavior**
  - Model selection (claude-sonnet-4-5, etc.)
  - Max turns, permission mode (acceptEdits, default, bypassPermissions, plan)

- **Tools**
  - Allowed tools (whitelist)
  - Disallowed tools (blacklist)

- **MCP Servers**
  - JSON editor for MCP server configurations

- **Custom Instructions**
  - Free-form text area for additional context

#### 5.2.4 Diagnostics Panel (Planned)

- Real-time charts: end-to-end latency, audio-seconds sent, chunk count, error rate (per session or aggregate)
- Last 100 logs with filter (audio, STT, TTS, SSML, MCP, backend)
- Connection status: MCP sessions active, backend API reachability
- Device tests: Mic check (record 3s + playback), speaker check (test tone)

---

## 6) Non-Functional Requirements

- **Performance**: TTFB (Speak) < 500ms; E2E "mic-to-text" < 1500ms typical; PWA initial load < 2s on broadband
- **Reliability**: Auto-reconnect SSE; exponential backoff on API failures; offline warning
- **Security**: API keys stored server-side (`.env` or per-conversation via REST API); HTTPS recommended in production; CORS configured for PWA origin
- **Cross-Platform**: Works in modern browsers (Chrome, Edge, Firefox, Safari) on desktop and mobile
- **Browser APIs**: Uses WebRTC `getUserMedia` for mic; Web Audio API for VAD/processing; MediaRecorder for encoding
- **Accessibility**: Keyboard-first operation (PTT when focused), ARIA labels, large touch targets, high-contrast mode support
- **Observability**: Structured logs; metrics exposed in diagnostics panel; optional telemetry for hosted deployments
- **PWA Compliance** (Partial): Manifest.json with name/theme (icons pending); service worker not yet implemented; installable once complete

---

## 7) Architecture Overview

### 7.1 High-Level Components

- **PWA Frontend (React + TypeScript)**
  - UI: project selector, conversation list, chat view, audio controls, settings, Claude config
  - Audio capture/playback via browser APIs (getUserMedia, Web Audio, MediaRecorder, @ricky0123/vad-web)
  - State management (Zustand)
  - Communicates with backend via REST API (@better-fetch/fetch) + React Query for server state

- **Elysia Backend Server (Bun + TypeScript, Port 3001)**
  - **SSE MCP Server**: Exposes 15 tools across 5 categories; handles multiple concurrent MCP clients
  - **REST API**: CRUD for projects, conversations, messages, settings, keys; serves audio assets
  - **Session Manager**: Tracks MCP connections; maps clients to conversations
  - **Core Operations**: Business logic layer for all CRUD operations
  - **Process Manager**: Manages dev/build/test processes; captures stdout/stderr
  - **Claude CLI Service**: Executes Claude CLI; captures output; integrates with project context
  - **Persistence**: Prisma with SQLite (9 models)

- **AI Services** (called by backend)
  - **OpenAI**: SSML enrichment (text-in → SSML-out)
  - **ElevenLabs**: TTS (SSML-in → audio stream; saved to asset storage)
  - **Google Gemini**: STT (audio-in → text stream)
  - **Anthropic Claude**: CLI orchestration

### 7.2 Database Schema (Prisma + SQLite)

**9 Models**:

1. **Project**: Top-level organizational unit
   - `id`, `name`, `description`, `createdAt`, `updatedAt`
   - Relations: `conversations[]`

2. **Conversation**: Individual conversation/session
   - `id`, `projectId`, `name`, `createdAt`, `updatedAt`, `messageCount`
   - Relations: `project`, `messages[]`, `apiKeys`, `voiceConfig`, `projectContext`, `claudeConfig`

3. **Message**: Chat messages with audio
   - `id`, `conversationId`, `role`, `content`, `audioUrl`, `ssmlUsed`, `timestamp`, `metrics` (JSON)
   - Relations: `conversation`

4. **ApiKey**: API keys per conversation
   - `id`, `conversationId`, `openai`, `elevenlabs`, `gemini`, `anthropic`
   - Relations: `conversation`

5. **VoiceConfig**: Voice settings per conversation
   - `id`, `conversationId`, `voiceId`, `model`, `ssmlEnabled`, `ssmlModel`, `prosodyEnabled`, `emphasisEnabled`, `phonemesEnabled`, `formality`, `maxBreaksPer100Words`
   - Relations: `conversation`

6. **ClaudeConfig**: Claude agent configuration per conversation
   - `id`, `conversationId`, `systemPromptTemplate`, `voiceEnabled`, `voiceDirectives`, `model`, `maxTurns`, `permissionMode`, `allowedTools`, `disallowedTools`, `mcpServers`, `customInstructions`, `templateVars`
   - Relations: `conversation`

7. **Settings**: Global settings (single row)
   - Audio capture, VAD/chunking, STT, TTS, SSML, interaction, privacy, advanced settings
   - Fields: `inputDeviceId`, `sampleRate`, `vadThreshold`, `minSilenceMs`, `maxUtteranceMs`, etc.

8. **ProjectContext**: Links conversations to project directories
   - `id`, `conversationId`, `projectPath`, `projectName`, `claudeMdPath`, `devCommand`, `buildCommand`, `testCommand`, `stopCommand`, `settings` (JSON)
   - Relations: `conversation`

9. **Todo**: Task management
   - `id`, `conversationId`, `projectPath`, `title`, `description`, `status` (enum), `priority` (enum), `tags` (JSON), `createdAt`, `updatedAt`, `completedAt`, `archivedAt`, `blockedReason`, `assignee`, `metadata` (JSON)
   - Indexes: `[conversationId, status]`, `[projectPath, status]`

**Enums**:
- `TodoStatus`: BACKLOG, IN_PROGRESS, BLOCKED, COMPLETED, ARCHIVED
- `Priority`: LOW, MEDIUM, HIGH, CRITICAL

### 7.3 Data Flows

1. **MCP Client → Speak**
   - MCP client (Claude Code) connects via SSE to `http://localhost:3001/sse/:conversationId`
   - Client calls `speak(text)` → Backend: SSML Enhancer (OpenAI) → ElevenLabs (stream) → saves audio asset → sends response with audio URL
   - Backend saves message to database → PWA polls or receives update → displays message + plays audio

2. **User → Listen (via PWA)**
   - PWA: User starts mic → VAD splits/filters → sends audio chunks to backend (future: WebSocket or REST)
   - Backend: Processes audio → Gemini STT → transcript
   - Backend: Returns transcript to PWA (if manual mode) OR calls MCP client's `listen` callback (if auto mode) → MCP client receives as user message
   - Backend: Saves message to conversation history

3. **TODO Management**
   - MCP client calls `todo_create(title, description, priority)` → Backend creates TODO in database → Returns TODO object
   - User or MCP client calls `todo_update(id, status: IN_PROGRESS)` → Backend updates TODO → Returns updated object
   - MCP client calls `todo_list(status: IN_PROGRESS)` → Backend queries database → Returns filtered list
   - PWA displays TODOs in sidebar or dedicated panel (future feature)

4. **Project Context**
   - MCP client calls `project_link(projectPath, devCommand, buildCommand, testCommand)` → Backend stores in ProjectContext table → Links to conversation
   - Other tools (process control, Claude orchestration) automatically retrieve project context from database
   - Process tools use stored commands if no explicit command provided

5. **Process Control**
   - MCP client calls `process_start(type: dev)` → Backend retrieves `devCommand` from ProjectContext → Spawns subprocess → Captures stdout/stderr → Returns process info
   - Backend continuously captures output in memory buffer
   - MCP client calls `process_output(type: dev)` → Backend returns captured output
   - MCP client calls `process_stop(type: dev)` → Backend kills subprocess → Returns confirmation

6. **Claude Orchestration**
   - MCP client calls `claude_chat(prompt, contextFiles)` → Backend retrieves project context → Spawns Claude CLI in project directory → Passes prompt and files
   - Backend captures Claude's response (stdout) → Returns output
   - Optional: Backend can then call `speak(output)` to vocalize Claude's response

7. **Multi-Session Management**
   - Each MCP client connection gets unique session ID
   - Backend maintains session → conversation mapping in SessionManager
   - PWA displays all conversations; user can switch between them

8. **Settings & Config**
   - PWA: User updates settings → REST API call → backend persists to Settings table
   - Backend: Reads settings; applies to MCP tool invocations (VAD thresholds, TTS/STT config)
   - Settings hot-reload where possible (no backend restart required)

---

## 8) Distribution & Deployment Strategy

### 8.1 Local Development (Current Implementation)

**Installation**:
```bash
git clone <repo>
cd speak2me-mcp
bun install
```

**Environment Setup**:
```bash
# apps/backend/.env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-..."
ELEVENLABS_API_KEY="..."
GEMINI_API_KEY="..."
ANTHROPIC_API_KEY="..."
```

**Start Development**:
```bash
# Start both backend and frontend
bun run dev

# Backend runs on: http://localhost:3001
# Frontend runs on: http://localhost:5174
```

**MCP Connection**:
```json
// .mcp.json in your Claude Code project
{
  "mcpServers": {
    "speak2me": {
      "url": "http://localhost:3001/sse/my-project-id"
    }
  }
}
```

### 8.2 Production Deployment (Future)

**Option 1: VPS/Cloud Server**
- Deploy backend to VPS (Digital Ocean, Linode, AWS, etc.)
- Serve frontend as static files via Nginx/Caddy
- Use systemd service for backend auto-start
- Configure HTTPS with Let's Encrypt
- Use PostgreSQL instead of SQLite for multi-user scenarios

**Option 2: Platform as a Service**
- Backend: Railway, Fly.io, Render
- Frontend: Vercel, Netlify, Cloudflare Pages
- Database: Managed PostgreSQL (Supabase, Neon, Railway)
- Environment variables configured via platform UI

**Option 3: Docker Compose (Future)**
- Single `docker-compose.yml` for backend + frontend + database
- One-command deployment: `docker-compose up -d`
- Volume mounts for data persistence

### 8.3 Data Storage & Portability

**Data Location** (development):
```
speak2me-mcp/
├── apps/backend/
│   ├── dev.db (SQLite database)
│   └── data/audio/ (saved audio assets)
```

**Backup**:
```bash
# Backup database and audio
tar -czf backup.tar.gz apps/backend/dev.db apps/backend/data/
```

**Restore**:
```bash
tar -xzf backup.tar.gz
```

**Migration to Production**:
- Export SQLite to PostgreSQL using Prisma migrate
- Copy audio files to cloud storage (S3, Cloudflare R2, etc.)
- Update `DATABASE_URL` in production `.env`

---

## 9) API & Contract Details

### 9.1 MCP Connection URL

**Format**: `http://localhost:3001/sse/:conversationId`

- **conversationId** (required): Unique identifier for the conversation. Each Claude Code project can set its own ID in `.mcp.json` to maintain project-specific conversation history.
- Example `.mcp.json` entry:
  ```json
  {
    "mcpServers": {
      "speak2me": {
        "url": "http://localhost:3001/sse/my-nextjs-project"
      }
    }
  }
  ```

### 9.2 MCP Tool Schemas (Zod Validation)

All tool schemas are defined in `packages/shared/src/schemas.ts` using Zod. The backend validates all tool inputs against these schemas before processing.

**Key Schemas**:
- `speakInputSchema`, `speakOutputSchema`
- `listenInputSchema`, `listenOutputSchema`
- `todoCreateInputSchema`, `todoUpdateInputSchema`, `todoListInputSchema`, `todoArchiveInputSchema`, `todoDeleteInputSchema`
- `projectLinkInputSchema`, `projectContextSchema`
- `claudeChatInputSchema`, `claudeChatOutputSchema`
- `processStartInputSchema`, `processStopInputSchema`, `processStatusInputSchema`, `processOutputInputSchema`

### 9.3 REST API Endpoints (Backend Port 3001)

**Projects**:
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Conversations**:
- `GET /api/conversations` - List all conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id` - Get conversation by ID
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

**Messages**:
- `GET /api/messages/:conversationId` - Get messages for conversation

**Settings**:
- `GET /api/settings` - Get global settings
- `PUT /api/settings` - Update global settings

**API Keys**:
- `GET /api/keys/:conversationId` - Get API keys for conversation
- `PUT /api/keys/:conversationId` - Update API keys for conversation

**Voices**:
- `GET /api/voices` - List available ElevenLabs voices

**System Metrics**:
- `GET /api/system-metrics` - Get system resource usage

**Filesystem**:
- `GET /api/filesystem/*` - File system operations

**Claude Config**:
- `GET /api/claude/:conversationId` - Get Claude config for conversation
- `PUT /api/claude/:conversationId` - Update Claude config for conversation

**Health Check**:
- `GET /health` - Server health status

---

## 10) SSML Enhancer Specification (OpenAI)

- **Prompting strategy**: Provide role: "You are an SSML editor. Add only valid SSML tags for ElevenLabs: `<speak>`, `<break>`, `<prosody>`, `<emphasis>`, `<phoneme>`. Do not alter semantic meaning; improve naturalness, clarity, and pacing."
- **Controls via settings**:
  - Max `<break>` per 100 words
  - Prosody bounds (± rate/pitch)
  - Enable/disable `<phoneme>`

- **Validation**:
  - XML parse; remove disallowed tags/attributes; strip nested breaks; cap overall length
  - If invalid → fall back to plain text or a minimal `<speak>` wrapper

- **Implementation**: `packages/core/src/services/ssml-enhancer.ts`

---

## 11) Audio Handling & Cost Controls

- **VAD**: Energy-based threshold + minimum speech duration via `@ricky0123/vad-web`
- **Silence Trimming**: Remove internal silences ≥ `minSilenceMs`
- **Chunking**: Max chunk size `maxUtteranceMs` (e.g., 12–20s). Overlap 100–200ms optional to avoid word cuts
- **Encoding**: Default **Opus/WebM** at 16k–24kHz mono; configurable
- **Do-Not-Send Rule**: Discard sub-threshold blips and under-min speech segments

---

## 12) Error Handling & Recovery

- **Network/API**: Exponential backoff; circuit breaker after N failures; user-visible status
- **Audio devices**: Enumerate devices; test tone; automatic fallback to default device
- **Service timeouts**: User-configurable (e.g., TTS/STT 20s default)
- **Graceful cancel**: Stop TTS stream; stop mic; clear pending STT requests
- **Telemetry**: Per-stage timings; error codes grouped by subsystem

---

## 13) Security & Privacy

- **API Keys**:
  - **Option 1** (Self-hosted / Development): Configure keys in `apps/backend/.env`
  - **Option 2** (Per-Conversation): User enters API keys via PWA Settings UI → stored per conversation via `/api/keys` endpoint → retrieved from database on tool invocation
  - Keys never logged; redacted in error messages

- **Conversation Data**:
  - Opt-in conversation history storage with configurable retention policy
  - Export/delete conversations from PWA (planned)

- **Transport Security**:
  - HTTPS recommended in production
  - SSE connections secured with same origin policy; optional auth token (future)

- **Privacy**:
  - Toggle PII scrubbing in transcripts (future)
  - Optional "ephemeral mode" (no server-side storage; conversation exists only in MCP client session) (future)

---

## 14) Testing & Acceptance

### 14.1 Unit/Integration

- SSML validator (XML + rules)
- VAD/Chunker unit tests (synthetic audio with labeled silences)
- ElevenLabs mock; Gemini mock; OpenAI mock
- Prisma storage layer tests
- Session manager tests
- Process manager tests

### 14.2 End-to-End Scenarios (must pass)

1. **Auto Mode**: Speak → hear TTS; talk → transcript auto-sends; round-trip under target latencies
2. **Manual Mode**: Speak → talk → review transcript → Send/Cancel works
3. **Push-to-Talk**: Only records while key held; sends on release (or manual if configured)
4. **Silence Handling**: Long pause results in split segments; only speech above threshold is sent
5. **Cost Reduction**: Silence trimming shows ≥30% reduction in audio seconds for the provided script
6. **SSML Validity**: 20 random messages enriched; 0 SSML parser errors at TTS
7. **Recovery**: Kill network mid-stream; app recovers; no crash; clear user messaging
8. **TODO Workflow**: Create → Update status → List with filters → Archive
9. **Project Linking**: Link project → Start dev server → Get output → Stop server
10. **Claude Orchestration**: Execute Claude CLI prompt → Capture output → Verify correct working directory
11. **Multi-Session**: Two Claude Code instances connect with different conversation IDs → No cross-contamination

---

## 15) Deliverables

- **Elysia Backend Server (Bun workspace package)**
  - Source (TypeScript), tests, README with API docs
  - SSE MCP server with 15 tools across 5 categories
  - REST API for full CRUD operations
  - Session management and conversation routing
  - Prisma database layer with 9 models
  - Example `.env` file and `.mcp.json` snippet for clients

- **PWA Frontend (Bun workspace package)**
  - React + TypeScript + TailwindCSS v4 + React Router 7
  - Responsive UI: project selector, conversation list, chat view, audio controls, settings, Claude config
  - Custom UI component library (@s2m-pac/ui)
  - Manifest.json (PWA-ready, icons pending)
  - Production build optimized (Bun bundler)

- **Bun Workspace Setup**
  - Monorepo with `apps/` and `packages/` structure
  - Shared types/schemas (Zod) between frontend and backend
  - Scripts for dev, build, test, typecheck, lint, format

- **Docs**
  - **CLAUDE.md**: Comprehensive guide for Claude Code when working in this repo
  - **Project Scope Document.md** (this file): Full product requirements and architecture
  - **TODO_FORMAT.md**: TODO comment format for automated issue creation
  - **Setup Guide** (planned): Installing dependencies, configuring API keys, running locally, deploying
  - **User Guide** (planned): Using PWA (conversation switching, modes, PTT, settings, audio replay)
  - **MCP Integration Guide** (planned): Configuring `.mcp.json` with conversation IDs for Claude Code projects
  - **Developer Guide** (planned): Extending tools, adding voice providers, customizing VAD

---

## 16) Constraints & Assumptions

- User has valid API keys for OpenAI, ElevenLabs, Gemini, Anthropic (entered in `.env` or via PWA UI)
- Internet access stable; browser grants mic permissions (HTTPS required for getUserMedia in production)
- MCP-capable client (e.g., Claude Code) connects via SSE and calls tools per spec
- **Browser Limitations**:
  - Push-to-talk hotkey only works when PWA window is focused (browser security constraint)
  - Global hotkeys require native wrapper (out of scope for pure PWA)
  - Audio processing may have higher latency than native apps (acceptable tradeoff)
- Modern browser with WebRTC support (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- Backend can run on any platform supporting Bun (macOS, Linux, Windows via WSL)
- Frontend requires modern browser with ES2020+ support

---

## 17) Risks & Mitigations

- **Latency spikes** → Use streaming everywhere; pre-connect; keep-alive; SSE reconnection logic
- **Gemini STT model drift** → Configurable model names; health check at startup; fallback models
- **SSML incompatibility** → Strict validator + safe fallback to plain text
- **Browser audio quirks** → Device test page in diagnostics; graceful degradation; user-selectable codecs
- **SSE connection drops** → Auto-reconnect with exponential backoff; session ID persistence; resume capability
- **Browser tab backgrounding** → Detect page visibility changes; pause recording; warn user
- **API key exposure** (client-side storage) → Recommend `.env` for sensitive deployments; optional per-conversation storage encrypted
- **Cross-browser compatibility** → Test matrix for Chrome/Firefox/Safari/Edge; feature detection
- **Concurrent session conflicts** → Robust session management; unique IDs; isolation between conversations
- **Process zombies** → Process manager tracks PIDs; cleanup on shutdown; auto-kill orphaned processes
- **Database corruption** → Regular backups; Prisma migrations; SQLite journal mode
- **Claude CLI hangs** → Timeout on subprocess; kill signal after N seconds; error recovery

---

## 18) Project Plan (high level)

### Phase 1: Foundation ✅ (Completed)
- Bun workspace setup: `apps/` (frontend + backend) + `packages/` (core, database, shared, ui, platform)
- Backend: Elysia server; SSE MCP endpoint; `speak`/`listen` tools; session manager
- Frontend: React PWA shell; conversation list UI; settings panel
- Integration: MCP client (Claude Code) connects; calls tools; receives responses
- Database: Prisma with SQLite; basic models (Conversation, Message, Settings)

### Phase 2: Voice Pipeline ✅ (Completed)
- Backend: SSML enhancer (OpenAI integration); validator; ElevenLabs streaming TTS; audio asset storage
- Frontend: Audio playback UI; display messages with audio player; handle audio URLs from backend
- Backend: Conversation history persistence; REST API for history
- Frontend: Display full conversation history; replay historical audio
- Frontend: Audio capture via getUserMedia; VAD implementation; chunking; send to backend (partial)
- Backend: `listen` tool; Gemini STT integration (partial)

### Phase 3: Orchestration & Management ✅ (Completed)
- Backend: TODO management tools (5 tools: create, update, list, archive, delete)
- Backend: Project context tools (3 tools: link, get, unlink)
- Backend: Process control tools (4 tools: start, stop, status, output)
- Backend: Claude CLI orchestration (1 tool: claude_chat)
- Database: Extended schema (Project, ProjectContext, Todo, ClaudeConfig, VoiceConfig, ApiKey)
- Frontend: Project selector; conversation list with project filtering
- Frontend: Claude config UI; project settings UI

### Phase 4: Polish & Optimization (In Progress)
- Frontend: Complete PWA features (service worker, icons, offline fallback)
- Frontend: Diagnostics panel (metrics, logs, device tests)
- Backend: WebSocket/SSE for real-time updates to PWA
- Cross-browser QA: Test on Chrome, Firefox, Safari, Edge (desktop + mobile)
- Performance optimization: Reduce bundle size, optimize database queries
- Documentation: Complete setup guide, user guide, MCP integration guide, deployment guides

### Phase 5: Production Readiness (Future)
- Production deployment guides (VPS, PaaS, Docker)
- Multi-user authentication and authorization
- Cloud storage for audio assets (S3, R2)
- PostgreSQL migration for production
- Monitoring and observability (Sentry, Grafana, etc.)
- Rate limiting and abuse prevention
- Backup and disaster recovery

---

## 19) Definition of Done (DoD)

- All **Success Criteria** in §2.2 met
- All **End-to-End** tests in §14.2 pass on Chrome, Firefox, and Safari (desktop)
- MCP tools validated by Claude Code; SSE connection stable; conversation IDs route correctly
- PWA manifest complete with icons; service worker implemented; installable
- Bun workspace builds successfully; production deployment works on at least one platform
- Documentation complete: CLAUDE.md, Project Scope Document, Setup guide, User guide, MCP integration guide
- Example `.mcp.json` configurations provided for common use cases
- All TODOs in codebase documented and tracked in GitHub Issues/Project Board

---

## 20) Glossary

- **MCP**: Model Context Protocol—tool discovery/invocation for AI assistants
- **SSE**: Server-Sent Events—HTTP streaming protocol for server-to-client push
- **PWA**: Progressive Web App—web app installable as standalone app with offline support
- **VAD**: Voice Activity Detection—detects speech vs. silence
- **SSML**: Speech Synthesis Markup Language—controls prosody and pacing in TTS
- **Bun**: Fast JavaScript runtime and bundler; alternative to Node.js
- **Elysia**: Fast, type-safe web framework for Bun; similar to Express
- **Conversation ID**: Unique identifier for a conversation; used in MCP SSE URL path parameter
- **Project Context**: Linked project directory with dev/build/test commands
- **TODO**: Task tracking item with status, priority, and metadata
- **Process Manager**: Service that manages subprocess lifecycle (dev servers, builds, tests)

---

## 21) Tech Stack Summary

### Backend
- **Runtime**: Bun
- **Framework**: Elysia (with TypeScript)
- **MCP**: `@modelcontextprotocol/sdk` (SSE transport)
- **Validation**: Zod
- **Database**: Prisma with SQLite (production: PostgreSQL)
- **AI Services**: OpenAI SDK, ElevenLabs SDK, Google Gemini SDK, Anthropic Claude (CLI)

### Frontend
- **Framework**: React 18+ with TypeScript
- **Routing**: React Router 7
- **Build Tool**: Bun bundler
- **Styling**: TailwindCSS v4
- **UI Library**: Custom components (@s2m-pac/ui package)
- **Icons**: lucide-react
- **State**: Zustand (client state), React Query (@tanstack/react-query) for server state
- **HTTP Client**: @better-fetch/fetch
- **Audio**: Web Audio API, MediaRecorder, getUserMedia, @ricky0123/vad-web
- **PWA**: Manifest.json (service worker pending)

### Shared
- **Monorepo**: Bun workspaces
- **Type Safety**: Zod schemas shared between frontend/backend
- **Package Namespace**: @s2m-pac/* (packages), @s2m-app/* (apps)

---

### One parting note

This system has evolved from a "Voice MCP Server" into a full **Claude Code Orchestration Platform**. The voice capabilities are just one of five major feature categories. The real power is in the integration: TODOs, project context, process control, and Claude CLI orchestration all work together to create a true "command center" for AI-driven development. Voice-first, keyboard-optional, hands-free coding - that's the vision.
