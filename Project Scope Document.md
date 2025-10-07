Here's a crisp, end-to-end scope you can hand to Claude (or any builder) and get the same thing back you described—no "surprise features," no mush. A little classic craftsmanship, a little cleverness.

# Project Scope Document — Voice MCP Server + PWA Client

## 1) Executive Summary

Build a Model Context Protocol (MCP) **SSE server** integrated into an Elysia backend that exposes voice tools and a **Progressive Web App (PWA)** that acts as the operator console.
The system lets you:

- **Speak**: Convert assistant text to high-quality speech (ElevenLabs), with **OpenAI-assisted SSML enrichment**.
- **Listen**: Capture your voice, apply smart **voice activity detection (VAD)** and **silence trimming/chunking**, transcribe via **Google Gemini** STT, then send results into the MCP conversation.
- **Chat**: Full text conversation history with audio replay for each message.
- **Multi-Session**: Support multiple concurrent MCP client connections (e.g., multiple Claude Code instances), each appearing as a separate conversation in the UI.
- **Operate**: Control modes (auto-send, manual, push-to-talk) and audio thresholds via a polished settings UI.

The result is a low-latency, streaming, "radio-operator" style interface for conversational AI, with cost-sensitive audio handling, tight tool semantics via MCP, and the flexibility to be hosted as a service or installed locally as a PWA.

---

## 2) Goals & Success Criteria

### 2.1 Business/Experience Goals

- Provide a **hands-free or push-to-talk** conversational UX with **studio-quality TTS** and **robust STT**.
- Keep **latency low**, **transcription cost modest**, and **control obvious**.
- Make it trivial for **any MCP-enabled client** to “speak” and “listen” via well-defined tools.

### 2.2 Measurable Success Criteria

1. **MCP Conformance**: MCP tools discoverable via `@modelcontextprotocol/sdk` over SSE; tool schemas validated by clients.
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
12. **PWA Installability**: App passes Chrome PWA audit; can be installed as standalone app.

---

## 3) Product Scope

### 3.1 In Scope

- **Elysia Backend Server** with:

  - **SSE MCP Server** exposing:
    - `speak` tool: `{ text: string, ssml?: string, voiceId?: string, model?: string, stream?: boolean }`
    - `listen` tool: `{ mode: "auto" | "manual" | "ptt", vadThreshold?: number, minSilenceMs?: number, maxUtteranceMs?: number, locale?: string }`
  - **REST API** for web app (settings, conversation history, audio assets)
  - **Session Management**: Track multiple concurrent MCP connections; unique conversation per client
  - **WebSocket/SSE** for real-time UI updates (new messages, status changes)

- **SSML Enhancer** (OpenAI): Input raw assistant text; output enriched SSML (pauses, prosody, emphasis, phoneme hints). Fallback to raw text if enhancement fails.
- **TTS Engine** (ElevenLabs): Streaming playback; audio assets saved for replay.
- **STT Engine** (Google Gemini): Chunked streaming recognition; silence trimming and pre-chunking to reduce token-seconds.
- **PWA (React + TypeScript + TailwindCSS + shadcn/ui)**:

  - **Conversation Switcher**: Sidebar showing all active MCP sessions; click to switch between conversations.
  - **Chat View**: Full message history (user + assistant); inline audio player for each message; auto-scroll; copy/export.
  - **Audio Controls**: Waveform/VU meter, mode selector (Auto/Manual/PTT), PTT button/keybinding (works when window focused), Send/Cancel/Retry.
  - **Settings Panel**: Audio device picker, VAD thresholds, STT/TTS config, SSML enhancer options, keybindings, privacy settings.
  - **Diagnostics Panel**: Real-time metrics charts, logs viewer, connection status, device tests.
  - **PWA Features**: Service worker, offline fallback, manifest.json, installable via Chrome.

- **Audio Pipeline** (Browser WebRTC APIs):

  - **getUserMedia** for mic access; browser-based device selection.
  - **VAD** (volume threshold + min-silence window).
  - **Smart chunking**: Split on silence boundaries; cap chunk length; optional overlap to avoid word snips.
  - **Compression**: Opus/WebM or PCM; configurable.

- **Chat & History**:

  - Persistent conversation storage (DB or filesystem).
  - Each message stored with: text, audio URL, timestamp, role (user/assistant), metadata (SSML, metrics).
  - Audio replay: Click to play any historical message.
  - Export conversations (JSON, Markdown).

- **Security & Secrets**:

  - API keys stored server-side via `.env` or cloud secret manager.
  - Optional client-side storage for user preferences (LocalStorage/IndexedDB).
  - CORS configured for PWA origin; HTTPS required for production.

### 3.2 Out of Scope

- Mobile-specific native apps (PWA works on mobile browsers), multi-user voice conferencing, diarization beyond single speaker, global push-to-talk hotkeys (PTT only works when window is focused due to browser security), cloud-hosted key management UI, non-English voice cloning.

---

## 4) Users & Roles

- **Primary Operator (You)**: Uses PWA via browser or installed app; monitors multiple MCP sessions; controls modes and thresholds; reviews chat history.
- **MCP Clients (e.g., Claude Code, others)**: Connect via SSE to backend; discover and invoke `speak`/`listen` tools; each connection creates a separate conversation.
- **Developers**: Extend voices, tweak VAD, add metrics sinks, deploy as hosted service or local instance.
- **Future: Remote Users** (optional): Access hosted instance with authentication; manage their own conversations.

---

## 5) Functional Requirements

### 5.1 MCP Tools

#### 5.1.1 `speak`

- **Input**

  - `text` (required): assistant content to vocalize.
  - `ssml` (optional): if provided, bypass enhancer.
  - `voiceId` (optional): ElevenLabs voice; default from settings.
  - `model` (optional): ElevenLabs model; default from settings.
  - `stream` (optional, default true): stream audio as it’s generated.

- **Process**

  1. If `ssml` absent → call **OpenAI SSML Enhancer**:

     - Adds `<prosody rate/pitch>`, `<break time>`, `<emphasis>`, optional `<phoneme>`.
     - Validate against ElevenLabs SSML constraints; sanitize.

  2. Call ElevenLabs streaming API; start playback immediately.
  3. Emit MCP tool events: `started`, `first_audio`, `completed`, `error`, `metrics`.

- **Output**

  - `{ ok: true, ssmlUsed: string, audioUrl?: string, metrics: { ttfbMs, totalMs } }`
  - Errors return `{ ok: false, reason }`.

#### 5.1.2 `listen`

- **Input**

  - `mode`: `"auto"` | `"manual"` | `"ptt"`
  - `vadThreshold`: float 0–1 (default from settings).
  - `minSilenceMs`: number (split floor).
  - `maxUtteranceMs`: cap per utterance.
  - `locale`: e.g., `"en-US"`.

- **Process**

  1. Start mic; show VU meter.
  2. VAD gates segments; trim leading/trailing silence; split by `minSilenceMs`.
  3. Encode each segment (Opus/WebM). **Do not send** segments that fail the loudness floor.
  4. Stream to **Gemini STT**; accumulate partials; on final, produce stable text.
  5. Respect mode:

     - **auto**: auto-send final transcript to MCP client.
     - **manual**: hold transcript; require “Send”.
     - **ptt**: only record while hotkey held; send on release (or manual, per setting).

- **Output**

  - `{ ok: true, transcript: string, segments: [...], metrics: { audioSecSent, chunks, latencyMs } }`

### 5.2 PWA (React + TypeScript)

#### 5.2.1 Main Layout

- **Sidebar (Left)**:
  - **Conversation List**: All active MCP sessions; show session name/ID, last message timestamp, unread indicator.
  - Click to switch between conversations.
  - "New Conversation" button (manual session creation for testing).

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

#### 5.2.2 Settings Panel (Modal or Sidebar Tab)

- **Audio Capture**

  - Input device picker (browser-based); gain control; noise suppression toggle (browser API).

- **VAD & Chunking**

  - `vadThreshold` slider (with live meter preview).
  - `minSilenceMs`, `maxUtteranceMs`, **minSpeechMs** (to ignore blips).
  - "Trim long silences" on/off; "Max chunk length (ms)".

- **STT**

  - Provider: **Gemini** (model list); language/locale; encoding (Opus/WebM or PCM).
  - "Send partials" toggle (advanced).

- **TTS**

  - Provider: **ElevenLabs**; `voiceId`; model; speaking rate/pitch bias (pre-SSML).
  - "Stream playback" toggle; "Autoplay" toggle.

- **SSML Enhancer (OpenAI)**

  - Model; "Enable prosody", "Enable emphasis", "Enable phonemes".
  - Formality slider (casual ↔ neutral ↔ formal), "Max breaks per 100 words".

- **Interaction**

  - Default mode; auto-send in auto mode on/off; PTT keybinding (works only when window focused).

- **Privacy & Storage**

  - "Keep conversation history" on/off; retention days; export conversations (JSON/MD).

- **Advanced**

  - Logging level; metrics panel on/off; backend URL (for self-hosted deployments).

#### 5.2.3 Diagnostics Panel (Modal or Sidebar Tab)

- Real-time charts: end-to-end latency, audio-seconds sent, chunk count, error rate (per session or aggregate).
- Last 100 logs with filter (audio, STT, TTS, SSML, MCP, backend).
- Connection status: MCP sessions active, WebSocket/SSE health, backend API reachability.
- Device tests: Mic check (record 3s + playback), speaker check (test tone).

---

## 6) Non-Functional Requirements

- **Performance**: TTFB (Speak) < 500ms; E2E "mic-to-text" < 1500ms typical; PWA initial load < 2s on broadband.
- **Reliability**: Auto-reconnect SSE/WebSocket; exponential backoff on API failures; offline warning; service worker for offline fallback UI.
- **Security**: API keys stored server-side (`.env` or secret manager); HTTPS required in production; CORS configured for PWA origin; CSP headers set.
- **Cross-Platform**: Works in modern browsers (Chrome, Edge, Firefox, Safari) on desktop and mobile. PWA installable on Chrome/Edge.
- **Browser APIs**: Uses WebRTC `getUserMedia` for mic; Web Audio API for VAD/processing; MediaRecorder for encoding.
- **Accessibility**: Keyboard-first operation (PTT when focused), ARIA labels, large touch targets, high-contrast mode support, screen reader friendly.
- **Observability**: Structured logs (JSON) sent to backend; metrics exposed in diagnostics panel; optional telemetry for hosted deployments.
- **PWA Compliance**: Service worker registered; manifest.json with icons; offline fallback page; installable; add-to-homescreen prompt.

---

## 7) Architecture Overview

### 7.1 High-Level Components

- **PWA Frontend (React + TypeScript)**
  - UI: conversation list, chat view, audio controls, settings, diagnostics
  - Audio capture/playback via browser APIs (getUserMedia, Web Audio, MediaRecorder)
  - State management (React Context or Zustand)
  - Communicates with backend via REST API + WebSocket/SSE for real-time updates

- **Elysia Backend Server (Bun + TypeScript)**
  - **SSE MCP Server**: Exposes `speak`/`listen` tools; handles multiple concurrent MCP clients
  - **REST API**: CRUD for conversations, messages, settings; serves audio assets
  - **WebSocket/SSE**: Pushes real-time updates to PWA (new messages, status changes)
  - **Session Manager**: Tracks MCP connections; maps clients to conversations
  - **Audio Processing**: VAD, chunking, encoding (or delegates to PWA for some)
  - **Persistence**: Conversation history, audio files, user settings (SQLite, PostgreSQL, or filesystem)

- **AI Services** (called by backend)

  - **OpenAI**: SSML enrichment (text-in → SSML-out)
  - **ElevenLabs**: TTS (SSML-in → audio stream; saved to asset storage)
  - **Google Gemini**: STT (audio-in → text stream)

### 7.2 Data Flows (concise)

1. **MCP Client → Speak**

   - MCP client (e.g., Claude Code) connects via SSE to backend
   - Client calls `speak(text)` → Backend: SSML Enhancer (OpenAI) → ElevenLabs (stream) → saves audio asset → sends response with audio URL
   - Backend pushes new message to PWA via WebSocket → PWA displays message + plays audio

2. **User → Listen (via PWA)**

   - PWA: User starts mic → VAD splits/filters → sends audio chunks to backend REST API
   - Backend: Processes audio → Gemini STT → transcript
   - Backend: Returns transcript to PWA (if manual mode) OR calls MCP client's `listen` callback (if auto mode) → MCP client receives as user message
   - Backend: Saves message to conversation history → pushes to PWA via WebSocket

3. **Multi-Session Management**

   - Each MCP client connection gets unique session ID
   - Backend maintains session → conversation mapping
   - PWA subscribes to all session updates via WebSocket; displays conversations in sidebar

4. **Settings & Config**

   - PWA: User updates settings → REST API call → backend persists
   - Backend: Reads settings; applies to MCP tool invocations (VAD thresholds, TTS/STT config)
   - Settings hot-reload where possible (no backend restart required)

---

## 8) Distribution & Deployment Strategy

### 8.1 Standalone Binary Compilation

**Bun Standalone Binary**: The entire backend server (including embedded frontend) compiles to a **single executable binary** with no external dependencies.

```bash
# Compile server with embedded frontend
bun build ./apps/backend/src/index.ts \
  --compile \
  --target=bun-linux-x64 \
  --outfile speak2me-server

# Result: Single ~50MB binary containing:
# - Bun runtime
# - All backend code
# - Embedded React PWA (dist folder)
# - All dependencies bundled
```

**Benefits**:
- Zero dependencies required at runtime
- No `node_modules` or package installation
- Single file distribution
- Fast startup (native binary)
- Works offline after initial setup

### 8.2 Distribution Modes

#### Mode 1: Electron App (Windows/WSL Users)

**Target Audience**: Windows users who want a native desktop app experience but need WSL for development tools (Claude CLI, dev servers, etc.)

**Architecture**:
```
Windows (Electron UI)
    ↓ HTTP/WebSocket
WSL (speak2me-server binary)
    ↓ Native spawning
WSL (Claude CLI, dev tools)
```

**Installation Flow**:

1. **User downloads**: `speak2me-setup.exe` (Windows installer)
2. **Electron detects WSL**:
   ```javascript
   // Check if WSL installed
   const hasWSL = await spawn('wsl', ['--status']).catch(() => false);
   ```
3. **WSL home detection**:
   ```javascript
   const wslHome = execSync('wsl echo ~').toString().trim();
   // Returns: /home/username
   ```
4. **Binary installation**:
   - Copy `speak2me-server` from Electron resources to WSL
   - Install to: `~/.speak2me/bin/speak2me-server`
   - Make executable: `chmod +x`
   - Add to PATH via `~/.bashrc`
5. **Systemd service setup** (optional, default ON):
   - Create `~/.config/systemd/user/speak2me-server.service`
   - Enable auto-start on WSL boot
   - User-scoped (no sudo required)
6. **First launch**:
   - Start server: `wsl bash -l -c "speak2me-server"`
   - Health check loop: `http://localhost:3000/health`
   - Load Electron UI when server ready

**Systemd Service Template**:
```ini
[Unit]
Description=Speak2Me MCP Server
After=network.target

[Service]
Type=simple
ExecStart=%h/.speak2me/bin/speak2me-server
Restart=always
RestartSec=10
Environment="DATABASE_URL=file:%h/.speak2me/data/dev.db"

[Install]
WantedBy=default.target
```

**Update Strategy**:
- Electron checks for updates on launch
- Downloads new binary if available
- Stops service → replaces binary → restarts service
- User data (database, config) preserved in `~/.speak2me/data/`

#### Mode 2: Standalone Linux Binary (Native Linux/Mac, Remote Servers)

**Target Audience**:
- Linux/Mac users who prefer terminal/browser interface
- Self-hosters running on VPS/cloud
- Power users who want lightweight deployment

**Installation Flow**:

1. **Download**: `speak2me-server` (single binary)
2. **Install**:
   ```bash
   mkdir -p ~/.speak2me/bin
   mv speak2me-server ~/.speak2me/bin/
   chmod +x ~/.speak2me/bin/speak2me-server
   echo 'export PATH="$HOME/.speak2me/bin:$PATH"' >> ~/.bashrc
   ```
3. **Optional: Systemd service** (same as Mode 1)
4. **Run**:
   ```bash
   speak2me-server
   # Server starts on http://localhost:3000
   # Frontend accessible at http://localhost:3000
   # API at http://localhost:3000/api/*
   # MCP SSE at http://localhost:3000/sse/:conversationId
   ```
5. **Access**: Open browser to `http://localhost:3000` (or remote IP)

**Remote Deployment**:
```bash
# SSH into VPS
ssh user@server

# Install
curl -fsSL https://speak2me.dev/install.sh | bash

# Configure systemd (system-wide)
sudo systemctl enable speak2me-server
sudo systemctl start speak2me-server

# Access from anywhere
https://speak2me.yourserver.com
```

### 8.3 Claude CLI Integration Architecture

**Goal**: Eliminate the need for users to run Claude Code in a separate terminal. The server orchestrates Claude CLI, capturing responses and streaming them back via TTS.

**Flow**:
```
User Voice Input (PWA)
    ↓ STT
Server receives transcript
    ↓ Spawn subprocess
claude -p "user message" --file CLAUDE.md --file context.ts
    ↓ Capture stdout/stderr
Claude Code responds (text + tool calls)
    ↓ Parse response
Server processes tool outputs
    ↓ TTS
User hears response (PWA)
```

**Implementation** (`packages/core/src/services/claude-cli.ts`):

```typescript
interface ClaudeCliConfig {
  projectPath: string;
  contextFiles?: string[];  // --file flags
  model?: string;           // claude-sonnet-4, etc.
  timeout?: number;
}

class ClaudeCliService {
  async executePrompt(
    prompt: string,
    config: ClaudeCliConfig
  ): Promise<ClaudeResponse> {
    // Build command
    const args = [
      'bash', '-l', '-c',
      `cd ${config.projectPath} && claude -p "${prompt}"`,
    ];

    if (config.contextFiles) {
      args.push(...config.contextFiles.map(f => `--file "${f}"`));
    }

    // Spawn in WSL (if Windows) or native
    const process = spawn('wsl', args);

    // Capture output
    const stdout = [];
    process.stdout.on('data', chunk => stdout.push(chunk));

    await process;

    return parseClaudeResponse(stdout.join(''));
  }

  async streamPrompt(
    prompt: string,
    config: ClaudeCliConfig
  ): AsyncGenerator<ClaudeChunk> {
    // Real-time streaming for live TTS
  }
}
```

**Context Injection**:
- Auto-include project's `CLAUDE.md`
- Include files mentioned in recent conversation
- Include files with recent errors (from logs)
- Include files from current TODOs

**Smart Features**:
- **Hands-free development**: User never leaves PWA
- **Full context retention**: All tool outputs in conversation history
- **Process monitoring**: See logs, CPU, RAM in real-time dashboard
- **Error detection**: Parse stderr, auto-create TODOs for failures
- **Voice-driven coding**: True conversational development workflow

### 8.4 Process Management

**Dev Server Control** (via `project_link` tool):
```typescript
// User: "start the dev server"
// MCP tool stores: devCommand="bun run dev"
processManager.start('dev', projectContext.devCommand);

// Real-time stdout/stderr streaming to PWA via WebSocket
// CPU/RAM monitoring per process
// Auto-restart on crash

// User: "stop the dev server"
processManager.stop('dev');
```

**Process Types**:
- **dev**: Development server (hot-reload, etc.)
- **build**: Production build
- **test**: Test runner
- **claude**: Claude CLI subprocess

**Monitoring**:
- Per-process CPU/RAM usage
- stdout/stderr logs streamed to PWA
- Exit codes tracked
- Auto-restart policies

### 8.5 Data Storage & Portability

**User Data Location** (all modes):
```
~/.speak2me/
├── bin/
│   └── speak2me-server (binary)
├── data/
│   ├── dev.db (SQLite database)
│   └── audio/ (saved audio assets)
└── config.json (user preferences)
```

**Portability**:
- Backup: `tar -czf backup.tar.gz ~/.speak2me/data/`
- Restore: `tar -xzf backup.tar.gz -C ~/`
- Database migrations handled automatically on version updates

**Multi-Device**:
- Same binary works on any Linux x64 system
- Data directory portable between machines
- Remote server accessible from any device with browser

---

## 9) API & Contract Details

### 8.1 MCP Connection URL

**Format**: `https://<backend-host>/mcp/sse?conversationId=<conversation-id>`

- **conversationId** (required): Unique identifier for the conversation. Each Claude Code project can set its own ID in `.mcp.json` to maintain project-specific conversation history.
- Example `.mcp.json` entry:
  ```json
  {
    "mcpServers": {
      "voice": {
        "url": "https://localhost:3000/mcp/sse?conversationId=my-project-foo"
      }
    }
  }
  ```

### 8.2 MCP Tool Schemas (JSON Schema gist)

**`speak` request**

```json
{
  "type": "object",
  "required": ["text"],
  "properties": {
    "text": { "type": "string", "minLength": 1 },
    "ssml": { "type": "string" },
    "voiceId": { "type": "string" },
    "model": { "type": "string" },
    "stream": { "type": "boolean", "default": true }
  }
}
```

**`speak` response**

```json
{
  "type": "object",
  "required": ["ok", "metrics"],
  "properties": {
    "ok": { "type": "boolean" },
    "ssmlUsed": { "type": "string" },
    "audioUrl": { "type": "string" },
    "metrics": {
      "type": "object",
      "properties": { "ttfbMs": { "type": "number" }, "totalMs": { "type": "number" } }
    },
    "reason": { "type": "string" }
  }
}
```

**`listen` request**

```json
{
  "type": "object",
  "required": ["mode"],
  "properties": {
    "mode": { "enum": ["auto", "manual", "ptt"] },
    "vadThreshold": { "type": "number", "minimum": 0, "maximum": 1 },
    "minSilenceMs": { "type": "number", "minimum": 0 },
    "maxUtteranceMs": { "type": "number", "minimum": 5000 },
    "locale": { "type": "string" }
  }
}
```

**`listen` response**

```json
{
  "type": "object",
  "required": ["ok", "transcript", "metrics"],
  "properties": {
    "ok": { "type": "boolean" },
    "transcript": { "type": "string" },
    "segments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "startMs": { "type": "number" },
          "endMs": { "type": "number" },
          "sent": { "type": "boolean" }
        }
      }
    },
    "metrics": {
      "type": "object",
      "properties": {
        "audioSecSent": { "type": "number" },
        "chunks": { "type": "number" },
        "latencyMs": { "type": "number" }
      }
    },
    "reason": { "type": "string" }
  }
}
```

---

## 9) SSML Enhancer Specification (OpenAI)

- **Prompting strategy**: Provide role: “You are an SSML editor. Add only valid SSML tags for ElevenLabs: `<speak>`, `<break>`, `<prosody>`, `<emphasis>`, `<phoneme>`. Do not alter semantic meaning; improve naturalness, clarity, and pacing.”
- **Controls via settings**:

  - Max `<break>` per 100 words.
  - Prosody bounds (± rate/pitch).
  - Enable/disable `<phoneme>`.

- **Validation**:

  - XML parse; remove disallowed tags/attributes; strip nested breaks; cap overall length.
  - If invalid → fall back to plain text or a minimal `<speak>` wrapper.

---

## 10) Audio Handling & Cost Controls

- **VAD**: Energy-based threshold + minimum speech duration. Pre-listen calibration tool in diagnostics.
- **Silence Trimming**: Remove internal silences ≥ `minSilenceMs`.
- **Chunking**: Max chunk size `maxUtteranceMs` (e.g., 12–20s). Overlap 100–200ms optional to avoid word cuts.
- **Encoding**: Default **Opus/WebM** at 16k–24kHz mono; configurable.
- **Do-Not-Send Rule**: Discard sub-threshold blips and under-min speech segments.

---

## 11) Error Handling & Recovery

- **Network/API**: Exponential backoff; circuit breaker after N failures; user-visible status.
- **Audio devices**: Enumerate devices; test tone; automatic fallback to default device.
- **Service timeouts**: User-configurable (e.g., TTS/STT 20s default).
- **Graceful cancel**: Stop TTS stream; stop mic; clear pending STT requests.
- **Telemetry**: Per-stage timings; error codes grouped by subsystem.

---

## 12) Security & Privacy

- **API Keys**:
  - **Option 1** (Self-hosted / Development): User enters API keys (ElevenLabs, OpenAI, Gemini) in PWA Settings UI → stored in browser LocalStorage/IndexedDB (encrypted) → sent to backend with each request.
  - **Option 2** (Hosted Service): Admin configures keys server-side via `.env` or cloud secret manager; users don't need to provide keys.
  - Keys never logged; redacted in error messages.
- **Conversation Data**:
  - Opt-in conversation history storage with configurable retention policy.
  - Export/delete conversations from PWA.
- **Transport Security**:
  - HTTPS required in production.
  - WebSocket/SSE connections secured with same origin policy; optional auth token.
- **Privacy**:
  - Toggle PII scrubbing in transcripts.
  - Optional "ephemeral mode" (no server-side storage; conversation exists only in MCP client session).

---

## 13) Testing & Acceptance

### 13.1 Unit/Integration

- SSML validator (XML + rules).
- VAD/Chunker unit tests (synthetic audio with labeled silences).
- ElevenLabs mock; Gemini mock; OpenAI mock.

### 13.2 End-to-End Scenarios (must pass)

1. **Auto Mode**: Speak → hear TTS; talk → transcript auto-sends; round-trip under target latencies.
2. **Manual Mode**: Speak → talk → review transcript → Send/Cancel works.
3. **Push-to-Talk**: Only records while key held; sends on release (or manual if configured).
4. **Silence Handling**: Long pause results in split segments; only speech above threshold is sent.
5. **Cost Reduction**: Silence trimming shows ≥30% reduction in audio seconds for the provided script.
6. **SSML Validity**: 20 random messages enriched; 0 SSML parser errors at TTS.
7. **Recovery**: Kill network mid-stream; app recovers; no crash; clear user messaging.

---

## 14) Deliverables

- **Elysia Backend Server (Bun workspace package)**

  - Source (TypeScript), tests, README with API docs.
  - SSE MCP server with `speak`/`listen` tools.
  - REST API for conversation management.
  - WebSocket/SSE for real-time updates.
  - Session management and conversation routing.
  - Example `.env` file and `.mcp.json` snippet for clients.

- **PWA Frontend (Bun workspace package)**

  - React + TypeScript + TailwindCSS + shadcn/ui.
  - Responsive UI: conversation list, chat view, audio controls, settings, diagnostics.
  - Service worker, manifest.json, PWA-ready.
  - Production build optimized for deployment (Vite or similar).

- **Bun Workspace Setup**

  - Monorepo with `frontend/` and `backend/` packages.
  - Shared types/schemas (Zod) between frontend and backend.
  - Scripts for dev, build, test, deploy.

- **Infrastructure**

  - `.env.example` for backend config (or user-provided keys via UI).
  - Docker Compose for local development (optional).
  - Deployment guides for: localhost, VPS (Nginx reverse proxy), cloud platforms (Vercel, Railway, Fly.io).

- **Docs**

  - **Setup Guide**: Installing dependencies, configuring API keys (UI or `.env`), running locally, deploying.
  - **User Guide**: Using PWA (conversation switching, modes, PTT, settings, audio replay).
  - **MCP Integration Guide**: Configuring `.mcp.json` with conversation IDs for Claude Code projects.
  - **Developer Guide**: Extending tools, adding voice providers, customizing VAD.

---

## 15) Constraints & Assumptions

- User has valid API keys for ElevenLabs, OpenAI, Gemini (entered in UI or configured server-side).
- Internet access stable; browser grants mic permissions (HTTPS required for getUserMedia).
- MCP-capable client (e.g., Claude Code) connects via SSE and calls tools per spec.
- **Browser Limitations**:
  - Push-to-talk hotkey only works when PWA window is focused (browser security constraint).
  - Global hotkeys require native wrapper (out of scope for pure PWA).
  - Audio processing may have higher latency than native apps (acceptable tradeoff).
- Modern browser with WebRTC support (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+).
- Backend can run on any platform supporting Bun (macOS, Linux, Windows via WSL).

---

## 16) Risks & Mitigations

- **Latency spikes** → Use streaming everywhere; pre-connect; keep-alive; SSE reconnection logic.
- **Gemini STT model drift** → Configurable model names; health check at startup; fallback models.
- **SSML incompatibility** → Strict validator + safe fallback to plain text.
- **Browser audio quirks** → Device test page in diagnostics; graceful degradation; user-selectable codecs.
- **SSE connection drops** → Auto-reconnect with exponential backoff; session ID persistence; resume capability.
- **Browser tab backgrounding** → Detect page visibility changes; pause recording; warn user.
- **API key leakage** (client-side storage) → Encrypt keys in LocalStorage; warn users about browser security; recommend `.env` for sensitive deployments.
- **Cross-browser compatibility** → Test matrix for Chrome/Firefox/Safari/Edge; feature detection; polyfills where needed.
- **Concurrent session conflicts** → Robust session management; unique IDs; isolation between conversations.

---

## 17) Project Plan (high level)

### Phase 1: Foundation (Week 1)
- **Bun workspace setup**: `frontend/` (Vite + React) + `backend/` (Elysia) + shared types.
- **Backend**: Basic Elysia server; SSE MCP endpoint; `speak` tool (happy path, no SSML); session manager stub.
- **Frontend**: Basic PWA shell; conversation list UI (stub); settings panel (API key inputs).
- **Integration**: MCP client (Claude Code) connects; calls `speak`; receives response.

### Phase 2: Voice Pipeline (Week 2)
- **Backend**: SSML enhancer (OpenAI integration); validator; ElevenLabs streaming TTS; audio asset storage.
- **Frontend**: Audio playback UI; display messages with audio player; handle audio URLs from backend.
- **Backend**: Conversation history persistence (SQLite or filesystem); REST API for history.
- **Frontend**: Display full conversation history; replay historical audio.

### Phase 3: Listen & STT (Week 3)
- **Frontend**: Audio capture via getUserMedia; VAD implementation (Web Audio API); chunking; send to backend.
- **Backend**: `listen` tool; receive audio chunks; Gemini STT streaming; return transcript.
- **Frontend**: Auto/manual/PTT modes; PTT keybinding (focused window); send/cancel/retry controls.
- **Backend**: Route transcripts to MCP client (auto mode) or hold for manual send; WebSocket push to frontend.

### Phase 4: Polish & Deploy (Week 4)
- **Frontend**: PWA features (service worker, manifest, offline fallback); diagnostics panel (metrics, logs).
- **Backend**: Telemetry; error handling; health checks; multi-session stress testing.
- **Cross-browser QA**: Test on Chrome, Firefox, Safari, Edge (desktop + mobile).
- **Docs**: Setup, user guide, MCP integration guide, deployment guides.
- **Deploy**: Localhost dev setup; optional Docker Compose; production deployment guide.

(We respect tradition: build foundations first, then the ornament.)

---

## 18) Definition of Done (DoD)

- All **Success Criteria** in §2.2 met.
- All **End-to-End** tests in §13.2 pass on Chrome, Firefox, and Safari (desktop).
- MCP tools validated by Claude Code; SSE connection stable; conversation IDs route correctly.
- PWA passes Chrome Lighthouse audit (PWA badge, performance > 90).
- Bun workspace builds successfully; production deployment works on at least one platform.
- Documentation complete: Setup guide, user guide, MCP integration guide, deployment guide.
- Example `.mcp.json` configurations provided for common use cases.

---

## 19) Glossary

- **MCP**: Model Context Protocol—tool discovery/invocation for AI assistants.
- **SSE**: Server-Sent Events—HTTP streaming protocol for server-to-client push.
- **PWA**: Progressive Web App—web app installable as standalone app with offline support.
- **VAD**: Voice Activity Detection—detects speech vs. silence.
- **SSML**: Speech Synthesis Markup Language—controls prosody and pacing in TTS.
- **Bun**: Fast JavaScript runtime and bundler; alternative to Node.js.
- **Elysia**: Fast, type-safe web framework for Bun; similar to Express.
- **Conversation ID**: Unique identifier for a conversation; used in MCP SSE URL to route sessions.

---

## 20) Tech Stack Summary

### Backend
- **Runtime**: Bun
- **Framework**: Elysia (with TypeScript)
- **MCP**: `@modelcontextprotocol/sdk` (SSE transport)
- **Validation**: Zod
- **Database**: SQLite (or PostgreSQL for production)
- **AI Services**: OpenAI SDK, ElevenLabs SDK, Google Gemini SDK

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: TailwindCSS + shadcn/ui
- **Icons**: lucide-react
- **State**: React Context or Zustand
- **Audio**: Web Audio API, MediaRecorder, getUserMedia
- **PWA**: Workbox (service worker), Vite PWA plugin

### Shared
- **Monorepo**: Bun workspaces
- **Type Safety**: Zod schemas shared between frontend/backend
- **Deployment**: Docker (optional), Vercel/Railway/Fly.io, or VPS

---

### One parting note

Push-to-talk is the "old-school ham radio" of AI UX—reliable, snappy, respectful of noise. We'll honor that tradition, then layer in the modern magic. And by making it a PWA with SSE MCP, we get the best of both worlds: the accessibility of the web and the power of native-like experiences. Each project gets its own conversation just by tweaking a URL parameter. Elegant.
