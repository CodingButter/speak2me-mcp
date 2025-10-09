# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repo.

---

## ️ CRITICAL dev REQUIREMENT ️

**BEFORE you write ANY code in this project, you MUST read and follow the "TODO-Driven dev Workflow" section below.**

**ALL code dev MUST be accompanied by TODO comments. This is not optional.**

Jump to: [TODO-Driven dev Workflow](#todo-driven-dev-workflow-mandatory)

---

## Project Overview

This is a **Claude Code Orchestration Platform** - a comprehensive MCP (Model Context Protocol) server monorepo that enables Claude to:

- **Voice Communication**: Speech-to-text (STT) and text-to-speech (TTS) with SSML enhancement
- **Task Management**: Create, track, and manage TODOs with GitHub integration
- **Project Context**: Link projects to convs for context-aware dev
- **Claude Orchestration**: Run and manage Claude CLI instances programmatically
- ️ **Process Control**: Start, monitor, and manage dev servers, builds, and tests

### System cmps

- **Elysia BE** (port 3001): MCP SSE server with 15 tools across 5 categories
- **React PWA FE** (port 5174): Operator console for managing convs, projects, and audio
- **Shared pkgs**: Core logic, DB (Prisma), platform adapters, UI cmps

## Architecture

### Monorepo Structure

```
apps/
  backend/          Elysia server with MCP SSE endpoints
  frontend/         React PWA with audio capture/playback

packages/
  core/             MCP tools, services, session management
  database/         Prisma client and storage layer
  shared/           Zod schemas, shared types
  platform/         Web/Electron platform adapters
  ui/               Shared React components
  config/           Shared TypeScript/ESLint configs
  claude-agent/     Claude SDK type definitions
```

### Core Flows

#### 1. Voice Communication Flow

1. **MCP Client Connection**: Claude Code connects via SSE to `/sse/:conversationId`
2. **Session Management**: Each conv gets a session with API keys
3. **Voice Tools**:

- `speak(text)` → SSML enrichment (OpenAI) → ElevenLabs TTS → audio saved → msg stored
- `listen(mode)` → Audio capture (PWA) → VAD/chunking → Gemini STT → transcript stored

#### 2. Task Management Flow

1. **TODO Creation**: Use `todo_create` to track tasks
2. **Status Updates**: Use `todo_update` to mark progress (BACKLOG → IN_PROGRESS → COMPLETED)
3. **Filtering**: Use `todo_list` with filters (status, priority, tags, project)
4. **Archival**: Use `todo_archive` to clean up completed tasks

#### 3. Project Context Flow

1. **Link Project**: Use `project_link` with path and commands (dev, build, test)
2. **Context-Aware Tools**: Other tools automatically use project context
3. **Process Management**: Start dev servers with `process_start`, monitor with `process_status`

#### 4. Claude Orchestration Flow

1. **Run Claude CLI**: Use `claude_chat` with prompt and optional context files
2. **Project Integration**: Automatically uses linked project dir as working dir
3. **Capture Output**: Returns Claude's full resp for processing

### Key Technologies

- **Runtime**: Bun
- **BE**: Elysia (web framework), MCP SDK (@modelcontextprotocol/sdk), Prisma
- **FE**: React 18, React Router 7, Zustand (state), TailwindCSS v4, @ricky0123/vad-web
- **AI Services**:
- OpenAI (SSML enhancement)
- ElevenLabs (TTS)
- Google Gemini (STT)
- Anthropic Claude (via Claude SDK for orchestration)
- **Validation**: Zod schemas shared between FE/BE

## TODO-Driven dev Workflow (MANDATORY)

** CRITICAL - READ THIS FIRST:**

**TODOs are NOT optional. They are the REQUIRED way we plan, track, and manage ALL work in this project.**

### ️ ABSOLUTE REQUIREMENTS

**YOU MUST use TODO comments during dev. This is non-negotiable.**

1. **BEFORE writing ANY code** - Add a comprehensive TODO comment
2. **BEFORE implementing ANY feature** - Document it with a TODO first
3. **BEFORE fixing ANY bug** - Create a TODO describing the fix
4. **BEFORE making ANY placeholder** - Add a TODO explaining what's missing

**If you are developing code, you MUST be creating TODOs. Period.**

### Why This is Critical

- **Automated Issue Tracking**: TODOs automatically become GitHub issues
- **Project Board Sync**: Work is instantly visible on the project board
- **docs**: Every piece of work is documented in-context
- **Collaboration**: Team knows what's planned, in-progress, and done
- **No Lost Work**: Nothing falls through the cracks

**NOT using TODOs means work is invisible, untracked, and will be lost.**

### The TODO-First Approach

**Workflow (ALWAYS follow this):**

1. **Plan with TODOs** - Add detailed TODO comments describing the feature/fix
2. **Commit TODOs** - Push TODOs to trigger automated issue creation
3. **Implement** - Write the actual code impl
4. **Commit impl** - Push impl (TODOs get replaced with issue URLs)

### TODO Format

All TODOs must follow the format defined in `TODO_FORMAT.md`:

```typescript
// TODO: Brief description of what needs to be done
// Project Scope: §X.X (reference to Project Scope Document.md section)
//
// Detailed implementation steps:
// 1. First step with specific details
// 2. Second step with code examples or API references
// 3. Third step with configuration or setup requirements
//
// Related files: path/to/related/file.ts
// Dependencies: package-name, another-package
// assignees: github-username
// labels: enhancement, backend, voice
// milestone: MVP Launch
```

**Key points:**

- **Project Scope reference** - Always link to relevant section in Project Scope Document.md
- **impl steps** - Be detailed! Include SDK installation, API endpoints, config options
- **Labels** - Use appropriate labels (enhancement, bug, tech-debt, FE, BE, voice, pwa, etc.)
- **Assignees** - Default to `codingbutter` unless specified otherwise
- **Milestone** - Use "MVP Launch" for core features

### Automated TODO → Issue → Project Workflow

When TODOs are committed and pushed:

1. **GitHub Action** (`.github/workflows/todo-to-issue.yml`) scans code for TODO comments
2. **Issues Created** - Each TODO becomes a GitHub issue with proper labels
3. **Added to Project** - Issues automatically added to [GitHub Project #11](https://github.com/users/CodingButter/projects/11)
4. **Status Set** - New issues set to "Backlog" status
5. **Sync Workflow** - Every 15 minutes, project status syncs to issue labels:

- `Backlog` → `status: backlog`
- `In Progress` → `status: in-progress`
- `Done` → `status: done`
- `Todo` → `status: todo`

### Creating/Editing/Removing TODOs

**Creating TODOs:**

```typescript
// Good example - Comprehensive TODO with all required fields
// TODO: Implement ElevenLabs TTS streaming API integration
// Project Scope: §5.1.1 (speak tool), §6 (performance requirements)
//
// Implementation steps:
// 1. Install ElevenLabs SDK: `bun add elevenlabs`
// 2. Initialize client with apiKey
// 3. Call text-to-speech endpoint with voice_id and model_id
// 4. Stream audio data and measure TTFB (target < 500ms)
// 5. Save audio file to ./data/audio/:conversationId/:messageId.mp3
// 6. Return audioData ArrayBuffer and metrics
//
// assignees: codingbutter
// labels: enhancement, backend, voice
// milestone: MVP Launch
export async function textToSpeech(text: string, apiKey: string) {
  // Placeholder implementation
  return { audioData: new ArrayBuffer(0), metrics: { ttfbMs: 0, totalMs: 0 } }
}

// Bad example - Vague TODO without details
// TODO: Add TTS support
export async function textToSpeech(text: string, apiKey: string) {
  return { audioData: new ArrayBuffer(0), metrics: { ttfbMs: 0, totalMs: 0 } }
}
```

**Editing TODOs:**

- **Before issue creation** - Edit TODO comments freely
- **After issue creation** - The action inserts the issue URL into the code. Editing the TODO after this point creates a NEW issue
- **Best practice** - Update the GitHub issue directly instead of editing the TODO comment

**Removing TODOs:**

- When feature is implemented, remove the TODO comment
- The `CLOSE_ISSUES: true` setting will automatically close the corresponding GitHub issue

### Testing the Workflow Without Pushing

**Option 1: Manual Workflow Trigger** (Recommended)

```bash
# Trigger the todo-to-issue workflow manually on current branch
gh workflow run "todo-to-issue.yml" --ref $(git branch --show-current)

# Watch the workflow
gh run watch
```

**Option 2: Test in a Draft PR**

```bash
# Create a draft PR to test workflow without merging
git checkout -b test-todos
git add .
git commit -m "test: Add TODOs for feature X"
git push -u origin test-todos
gh pr create --draft --title "Test TODOs" --body "Testing TODO workflow"

# Issues will be created from the PR
# Close PR when done testing (issues remain)
```

**Option 3: Dry Run Locally** (Manual check)

```bash
# Search for all TODOs in codebase
rg "TODO:" --type ts --type tsx -A 10

# Verify format matches TODO_FORMAT.md
# Then commit and push to trigger automation
```

### Common TODO dev Patterns

**Pattern 1: Placeholder impl**

```typescript
export async function processAudio(data: ArrayBuffer): Promise<void> {
  // TODO: Implement complete audio processing pipeline
  // Project Scope: §10 (Audio Handling & Cost Controls)
  // ... detailed steps ...
  // assignees: codingbutter
  // labels: enhancement, voice
  // Placeholder - does nothing yet
}
```

**Pattern 2: Missing Integration**

```typescript
const apiKey = config.elevenLabsApiKey

// TODO: Wire up ElevenLabs API key from session
// Project Scope: §8 (API Keys & Configuration)
// Currently using hardcoded/env value - need to:
// 1. Get apiKeys from session context
// 2. Fall back to env variable if not in session
// 3. Throw error if no key found
// assignees: codingbutter
// labels: enhancement, backend

if (!apiKey) {
  throw new Error("ElevenLabs API key not configured")
}
```

**Pattern 3: UI cmp Stub**

```typescript
export function DiagnosticsPanel() {
  // TODO: Create Diagnostics Panel component
  // Project Scope: §5.2.3 (Diagnostics Panel)
  //
  // Required features:
  // 1. Real-time metrics display (TTFB, latency, audio duration)
  // 2. Connection status indicator (MCP, backend, audio devices)
  // 3. Recent logs with filtering
  // 4. Audio device test controls
  //
  // assignees: codingbutter
  // labels: enhancement, frontend, pwa

  return <div>Diagnostics Panel - Coming Soon</div>
}
```

**Pattern 4: cfg Missing**

```json
{
  "icons": [],
  "__TODO": "Add PWA icon assets",
  "__TODO_details": "Need icons in sizes: 72x72, 96x96, 128x128, 192x192, 512x512. Use logo.svg as source. labels: enhancement, pwa"
}
```

### When to Add TODOs

**Always add TODOs when:**

- Creating placeholder/stub impls
- Using dummy data that needs real integration
- Implementing partial features that need completion
- Finding bugs that need fixing later
- Identifying technical debt or code smells
- Planning new features or enhancements
- Noting missing docs
- Identifying perf optimizations

**Never skip TODOs for:**

- API integrations (TTS, STT, SSML)
- DB operations (if using placeholders)
- auth/authz
- Error handling
- Security concerns
- perf-critical code
- User-facing features

### TODO Identifiers

The workflow recognizes multiple identifiers with automatic labeling:

- **`TODO:`** - General tasks and enhancements → labels: `todo`
- **`FIXME:`** - Code that works but needs improvement → labels: `bug`, `fixme`
- **`HACK:`** - Temporary workarounds → labels: `tech-debt`, `hack`
- **`BUG:`** - Known bugs that need fixing → labels: `bug`, `todo`
- **`NOTE:`** - docs needed → labels: `docs`
- **`OPTIMIZE:`** - perf improvements → labels: `perf`, `enhancement`

**Examples:**

```typescript
// TODO: Implement user authentication
// Creates issue with label: todo

// FIXME: Authentication token refresh is unreliable
// Creates issue with labels: bug, fixme

// HACK: Temporary workaround for React 18 strict mode double-mounting
// Creates issue with labels: tech-debt, hack

// BUG: Race condition in WebSocket message handler
// Creates issue with labels: bug, todo

// NOTE: Document the MCP protocol integration steps
// Creates issue with label: documentation

// OPTIMIZE: Cache API responses to reduce backend load
// Creates issue with labels: performance, enhancement
```

**Use the right id:**

- `TODO` - For new features or general improvements
- `FIXME` - For code that works but has issues
- `HACK` - For temporary solutions that need proper fixes
- `BUG` - For confirmed bugs
- `NOTE` - For missing docs
- `OPTIMIZE` - For perf improvements

### Monitoring TODOs

**View all TODO issues:**

```bash
gh issue list --label todo
```

**View project board:**

```bash
gh project item-list 11
```

**Check workflow status:**

```bash
gh run list --workflow=todo-to-issue.yml
```

**View sync workflow status:**

```bash
gh run list --workflow=sync-project-status.yml
```

### Automated Workflow Features

The TODO workflow (`.github/workflows/todo-to-issue.yml`) provides:

**Automatic Issue Creation:**

- Scans all code changes for TODO comments
- Creates GitHub issues with proper formatting
- Inserts issue URLs back into code (`INSERT_ISSUE_URLS: true`)
- Assigns issues to the commit author (`AUTO_ASSIGN: true`)
- Closes issues when TODOs are removed (`CLOSE_ISSUES: true`)

**Project Board Integration:**

- Automatically adds issues to [Project #11](https://github.com/users/CodingButter/projects/11)
- Sets new issues to "Backlog" status by default
- Syncs status changes between project board and issue labels

**Multi-Branch Support:**

- Triggers on ALL branches (not just main)
- Triggers on pull reqs
- Manual workflow dispatch available

**Smart Labeling:**

- Extracts labels from TODO comments
- Applies default labels based on id type
- Supports custom labels per TODO

**Rich Metadata:**

- Captures file path and line number
- Records commit author
- Links to Project Scope sections
- Tracks assignees and milestones

### REMEMBER: Use TODOs ALWAYS

**Every dev session should create TODOs:**

- Starting a new feature? → Add TODOs first
- Found a bug? → Add a TODO
- Writing a placeholder? → Add a TODO
- Missing docs? → Add a TODO with NOTE id
- perf issue? → Add a TODO with OPTIMIZE id

**The project board is the single source of truth. If it's not a TODO/Issue, it doesn't exist.**

## dev Commands

### Root Level

```bash
# Start both backend and frontend in dev mode
bun run dev

# Start backend only (port 3001)
bun run dev:backend

# Start frontend only (port 5174)
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

### BE (apps/BE)

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

BE runs on **http://localhost:3001** with:

- MCP SSE endpoint: `/sse/:conversationId`
- REST API routes:
- `/api/projects` - Project management
- `/api/convs` - conv CRUD
- `/api/msgs` - msg history
- `/api/settings` - Global settings
- `/api/keys` - API key management per conv
- `/api/voices` - ElevenLabs voice listing
- `/api/system-mx` - System resource monitoring
- `/api/filesystem` - File system operations
- `/api/claude` - Claude cfg management
- Health check: `/health`

### FE (apps/FE)

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

FE runs on **http://localhost:5174** with hot module reloading enabled.

## MCP Integration

### Connecting from Claude Code

Add to `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "speak2me": {
      "url": "http://localhost:3001/sse/my-project-id"
    }
  }
}
```

Each project can have its own **conversationId** (the last path segment) to maintain separate conv histories.

### Available MCP Tools (15 Total)

#### Voice Tools (2)

**`speak`**

- Converts text to speech using ElevenLabs with optional SSML enrichment via OpenAI
- params: `text` (required), `ssml` (optional), `voiceId`, `model`, `stream`
- Returns: `{ ok, ssmlUsed, audioUrl, mx: { ttfbMs, totalMs } }`
- Audio quality optimized for speed (16kHz, lower latency)

**`listen`**

- Captures and transcribes voice using Google Gemini STT with VAD and chunking
- params: `mode` (auto/manual/ptt), `vadThreshold`, `minSilenceMs`, `maxUtteranceMs`, `locale`
- Returns: `{ ok, transcript, segments, mx: { audioSecSent, chunks, latencyMs } }`
- Uses Opus 16kHz mono for optimal bandwidth

#### TODO Management Tools (5)

**`todo_create`**

- Create a new TODO item
- params: `title` (required), `description`, `priority` (LOW/MEDIUM/HIGH/CRITICAL), `tags`, `assignee`, `projectPath`
- Returns: `{ ok, todo: { id, title, status, ... } }`
- Use when tracking tasks or identifying action items

**`todo_update`**

- Update an existing TODO item
- params: `id` (required), `title`, `description`, `status` (BACKLOG/IN_PROGRESS/BLOCKED/COMPLETED/ARCHIVED), `priority`, `tags`, `blockedReason`, `assignee`
- Returns: `{ ok, todo: { ... } }`
- Use when marking progress or changing task details

**`todo_list`**

- List TODO items with optional filters
- params: `status`, `projectPath`, `priority`, `tags`
- Returns: `{ ok, todos: [...] }`
- Use when you need task context or project overview

**`todo_archive`**

- Archive a completed TODO item
- params: `id` (required)
- Returns: `{ ok, archivedAt }`
- Use when cleaning up completed tasks

**`todo_delete`**

- Permanently delete a TODO item
- params: `id` (required)
- Returns: `{ ok }`
- Use with caution - archives are preferred

#### Project Management Tools (3)

**`project_link`**

- Link a project to this conv
- params: `projectPath` (required), `projectName`, `devCommand`, `buildCommand`, `testCommand`, `stopCommand`, `settings`
- Returns: `{ ok, project: { ... } }`
- Initializes project context for other tools to use

**`project_get`**

- Get the currently linked project for this conv
- No params
- Returns: `{ ok, project: { ... } }` or `{ ok: false }` if no project linked

**`project_unlink`**

- Unlink the project from this conv
- No params
- Returns: `{ ok }`

#### Claude Orchestration Tool (1)

**`claude_chat`**

- Run Claude CLI and capture its output
- params: `prompt` (required), `contextFiles` (array), `useProjectContext` (boolean)
- Returns: `{ ok, output, error }`
- Automatically uses linked project dir as working dir
- Enables server-side Claude orchestration

#### Process Control Tools (4)

**`process_start`**

- Start a project process (dev/build/test/custom)
- params: `type` (required: dev/build/test/custom), `command`, `cwd`
- Returns: `{ ok, process: { type, status, pid } }`
- Automatically uses project commands if linked

**`process_stop`**

- Stop a running process
- params: `type` (optional - if omitted, stops all processes for conv)
- Returns: `{ ok, stoppedProcesses: [...] }`

**`process_status`**

- Get status of running processes
- params: `type` (optional - if omitted, returns all processes for conv)
- Returns: `{ ok, processes: [...] }`

**`process_output`**

- Get output from a running or completed process
- params: `type` (required: dev/build/test/custom)
- Returns: `{ ok, output, error }`

## Important File Locations

### BE Core Logic

- `apps/BE/src/index.ts` - Main Elysia server setup (port 3001)
- `apps/BE/src/mcp/sse-server.ts` - SSE transport and MCP tool registration
- `apps/BE/src/api/` - REST API routes:
- `projects.ts` - Project CRUD
- `convs.ts` - conv management
- `msgs.ts` - msg history
- `settings.ts` - Global settings
- `keys.ts` - API key management
- `voices.ts` - ElevenLabs voice listing
- `system-mx.ts` - Resource monitoring
- `filesystem.ts` - File operations
- `claude.ts` - Claude cfg
- `claude-test.ts` - Claude testing endpoints

### Core pkg (MCP Tools & Services)

**MCP Tool impls (modular structure):**

- `pkgs/core/src/mcp/tools.ts` - Re-exports and voice tool handlers (`handleSpeak`, `handleListen`)
- `pkgs/core/src/mcp/tools/todo.ts` - TODO tool handlers (create, update, list, archive, delete)
- `pkgs/core/src/mcp/tools/project.ts` - Project tool handlers (link, get, unlink)
- `pkgs/core/src/mcp/tools/claude.ts` - Claude orchestration handler (`handleClaudeChat`)
- `pkgs/core/src/mcp/tools/process.ts` - Process control handlers (start, stop, status, output)
- `pkgs/core/src/mcp/tools/index.ts` - Central export point

**Services:**

- `pkgs/core/src/services/ssml-enhancer.ts` - OpenAI SSML enhancement
- `pkgs/core/src/services/tts.ts` - ElevenLabs TTS integration
- `pkgs/core/src/services/stt.ts` - Gemini STT integration
- `pkgs/core/src/services/project-context.ts` - ProjectContextService (project management)
- `pkgs/core/src/services/process-manager.ts` - ProcessManager (process lifecycle)
- `pkgs/core/src/services/claude-md-enhancer.ts` - ClaudeMdEnhancer (CLAUDE.md generation)
- `pkgs/core/src/services/claude-cli.ts` - ClaudeCliService (CLI orchestration)
- `pkgs/core/src/services/template.ts` - TemplateRenderer (template engine)

**Core Systems:**

- `pkgs/core/src/session/index.ts` - SessionManager (tracks MCP sessions)
- `pkgs/core/src/operations/index.ts` - CoreOperations (business logic)
- `pkgs/core/src/storage/index.ts` - Storage interfaces

### DB

- `pkgs/DB/src/storage.ts` - PrismaStorage impl
- `pkgs/DB/src/client.ts` - Prisma client singleton
- `pkgs/DB/prisma/schema.prisma` - DB schema (see below for full model list)

### FE cmps

- `apps/FE/src/App.tsx` - Root app cmp with routing
- `apps/FE/src/cmps/Layout.tsx` - Main layout with sidebar (deprecated in favor of RootLayout)
- `apps/FE/src/cmps/RootLayout.tsx` - New root layout cmp
- `apps/FE/src/cmps/ProjectLayout.tsx` - Project-specific layout wrapper
- `apps/FE/src/cmps/ConversationList.tsx` - conv switcher
- `apps/FE/src/cmps/ChatView.tsx` - msg history with audio replay
- `apps/FE/src/cmps/AudioControls.tsx` - Mic controls, mode selector
- `apps/FE/src/cmps/Settings.tsx` - Settings panel
- `apps/FE/src/cmps/VolumeMeter.tsx` - VAD visualization
- `apps/FE/src/cmps/ClaudeConfig.tsx` - Claude agent cfg UI
- `apps/FE/src/cmps/McpServerDialog.tsx` - MCP server management dialog

**FE Services:**

- `apps/FE/src/services/audioProcessor.ts` - Audio processing utils
- `apps/FE/src/services/audioEncoder.ts` - Audio encoding
- `apps/FE/src/services/forcedAlignment.ts` - Text-audio alignment
- `apps/FE/src/services/speechRecognition.ts` - Web Speech API integration

**FE Hooks:**

- `apps/FE/src/hooks/useAudioCapture.ts` - Audio capture hook

### Shared Schemas & Types

- `pkgs/shared/src/schemas.ts` - Zod schemas for all MCP tools and API endpoints
- `pkgs/shared/src/types.ts` - TypeScript types (msg, conv, ApiKeys, Todo, ProjectContext, etc.)

### UI pkg

- `pkgs/ui/src/cmps/` - Reusable UI cmps:
- `audio/` - Audio-related cmps
- `chat/` - Chat UI cmps
- `dashboard/` - Dashboard widgets
- `icons/` - Icon cmps
- `kanban/` - Kanban board cmps
- `layout/` - Layout cmps
- `modal/` - Modal dialogs
- `notes/` - Note-taking cmps
- `ui/` - Base UI primitives
- `custom/` - Custom cmps

## DB Schema

The DB uses **Prisma with SQLite** (or PostgreSQL for production). The schema includes:

### Models

**`Project`** - Top-level organizational unit

- `id`, `name`, `description`, `createdAt`, `updatedAt`
- Relations: `convs[]`

**`conv`** - Individual conv/session

- `id`, `projectId`, `name`, `createdAt`, `updatedAt`, `messageCount`
- Relations: `project`, `msgs[]`, `apiKeys`, `voiceConfig`, `projectContext`, `claudeConfig`

**`msg`** - Chat msgs with audio

- `id`, `conversationId`, `role` (user/assistant), `content`, `audioUrl`, `ssmlUsed`, `timestamp`, `mx` (JSON)
- Relations: `conv`

**`ApiKey`** - API keys per conv

- `id`, `conversationId`, `openai`, `elevenlabs`, `gemini`, `anthropic`, `createdAt`, `updatedAt`
- Relations: `conv`

**`VoiceConfig`** - Voice settings per conv

- `id`, `conversationId`, `voiceId`, `model`, `ssmlEnabled`, `ssmlModel`, `prosodyEnabled`, `emphasisEnabled`, `phonemesEnabled`, `formality`, `maxBreaksPer100Words`
- Relations: `conv`

**`ClaudeConfig`** - Claude agent cfg per conv

- `id`, `conversationId`, `systemPromptTemplate`, `voiceEnabled`, `voiceDirectives`, `model`, `maxTurns`, `permissionMode`, `allowedTools`, `disallowedTools`, `mcpServers`, `customInstructions`, `templateVars`
- Relations: `conv`

**`Settings`** - Global settings (single row)

- Audio capture, VAD/chunking, STT, TTS, SSML, interaction, privacy, advanced settings
- See schema.prisma for full field list

**`ProjectContext`** - Links convs to project directories

- `id`, `conversationId`, `projectPath`, `projectName`, `claudeMdPath`, `devCommand`, `buildCommand`, `testCommand`, `stopCommand`, `settings` (JSON)
- Relations: `conv`

**`Todo`** - Task management

- `id`, `conversationId`, `projectPath`, `title`, `description`, `status` (enum), `priority` (enum), `tags` (JSON), `createdAt`, `updatedAt`, `completedAt`, `archivedAt`, `blockedReason`, `assignee`, `metadata` (JSON)
- Indexes on `[conversationId, status]`, `[projectPath, status]`

### Enums

- **`TodoStatus`**: BACKLOG, IN_PROGRESS, BLOCKED, COMPLETED, ARCHIVED
- **`Priority`**: LOW, MEDIUM, HIGH, CRITICAL

## API Keys & cfg

API keys can be stored **two ways**:

1. **Server-side** (recommended for self-hosted): `.env` file in `apps/BE/`
2. **Client-side** (PWA UI): User enters keys in Settings → stored per conv via `/api/keys` endpoint

Required keys:

- `OPENAI_API_KEY` (for SSML enhancement)
- `ELEVENLABS_API_KEY` (for TTS)
- `GEMINI_API_KEY` (for STT)
- `ANTHROPIC_API_KEY` (for Claude orchestration)

Keys are accessed from session context in MCP tool handlers (see `apps/BE/src/mcp/sse-server.ts:334-337`).

## Important impl Details

### Session Management

- **SessionManager** (`pkgs/core/src/session/index.ts`) tracks active MCP connections
- Each MCP connection is mapped to a `conversationId`
- Sessions store API keys and are created when a client connects
- Sessions can be retrieved by session ID or conv ID

### Audio Pipeline (FE)

- Browser-based audio capture via `getUserMedia`
- VAD implemented using `@ricky0123/vad-web`
- Audio chunking and silence trimming to reduce STT costs
- Audio sent to BE as base64 or ArrayBuffer (see `handleListen` in `pkgs/core/src/mcp/tools.ts`)

### SSML Enrichment

- OpenAI is used to enrich plain text with SSML tags (`<break>`, `<prosody>`, `<emphasis>`)
- Validation ensures only ElevenLabs-compatible SSML is sent
- Fallback to plain text if enrichment fails
- See `pkgs/core/src/services/ssml-enhancer.ts`

### Project Context Integration

- Projects can be linked to convs via `project_link` tool
- Once linked, other tools (process control, Claude orchestration) automatically use project context
- Project commands (dev, build, test) are stored and reused
- See `pkgs/core/src/services/project-context.ts`

### Process Management

- **ProcessManager** (`pkgs/core/src/services/process-manager.ts`) handles lifecycle of dev servers, builds, tests
- Supports multiple process types per conv
- Captures stdout/stderr for retrieval via `process_output` tool
- Automatic cleanup on server shutdown

### Claude Orchestration

- **ClaudeCliService** (`pkgs/core/src/services/claude-cli.ts`) wraps Claude CLI
- Executes Claude commands programmatically
- Integrates with project context for working dir
- Captures full Claude output for processing

### DB Persistence

- Prisma with SQLite (or PostgreSQL for production)
- Stores: Projects, convs, msgs (with audio URLs), Settings, API Keys, Voice Config, Claude Config, Project Context, TODOs
- Storage interface in `pkgs/DB/src/storage.ts`
- Core operations use `PrismaStorage` for all DB access

## Common dev Tasks

### Adding a New MCP Tool

1. Define Zod schema in `pkgs/shared/src/schemas.ts`
2. Add TypeScript types in `pkgs/shared/src/types.ts`
3. Implement handler in appropriate file:

- Voice tools → `pkgs/core/src/mcp/tools.ts`
- TODO tools → `pkgs/core/src/mcp/tools/todo.ts`
- Project tools → `pkgs/core/src/mcp/tools/project.ts`
- Claude tools → `pkgs/core/src/mcp/tools/claude.ts`
- Process tools → `pkgs/core/src/mcp/tools/process.ts`
- New category → Create new file in `pkgs/core/src/mcp/tools/`

4. Export from `pkgs/core/src/mcp/tools/index.ts`
5. Register tool in `apps/BE/src/mcp/sse-server.ts`:

- Add to `ListToolsRequestSchema` handler (tools array)
- Add to `CallToolRequestSchema` handler (tool invocation)

6. Create TODO comments for impl steps

### Adding a New FE cmp

1. Create cmp in `apps/FE/src/cmps/`
2. Import shared UI cmps from `@s2m-pac/ui` pkg
3. Use Zustand store for state management (or React Query for server state)
4. Call BE REST API via `@better-fetch/fetch` (see existing cmps for patterns)
5. Add routing if needed in `apps/FE/src/App.tsx`

### Adding a New Service

1. Create service file in `pkgs/core/src/services/`
2. Export class or functions
3. Add tests in `.test.ts` file
4. Export from `pkgs/core/src/services/index.ts`
5. Use in tool handlers or operations

### Updating DB Schema

```bash
cd packages/database

# Edit prisma/schema.prisma
# Then generate client
bun prisma generate

# Create migration
bun prisma migrate dev --name my_migration

# Reset database (development only)
bun prisma migrate reset
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
    "speak2me": {
      "url": "http://localhost:3001/sse/test-convo"
    }
  }
}

# Claude Code will auto-discover all 15 tools
```

## Gotchas & Design Notes

- **conversationId** is the primary routing key - MCP clients specify it in SSE URL path
- **API keys** are loaded per-session, not globally - allows multi-user scenarios
- **Audio assets** are stored as files (not in DB) - see TTS service for path generation
- **SSE transport** is adapted to work with Elysia Stream (see hack in `handleSSEConnection`)
- **listen tool** currently has placeholder `audioData` - PWA must send audio to BE (see TODO in `sse-server.ts:370`)
- **Platform pkg** supports both Web (PWA) and Electron wrappers - see `pkgs/platform/src/index.ts`
- **Port numbers**: BE runs on **3001**, FE on **5174** (not 3000/5173 as in older docs)
- **Tool handlers** are modular - organized by category in `pkgs/core/src/mcp/tools/` subdirectory
- **Process management** uses "auto" mode by default - processes are conv-scoped
- **Project context** is conv-scoped - each conv can link to one project at a time

## Project Scope Document

For full product requirements and architecture details, see **`Project Scope Document.md`** in the root. It covers:

- Business goals and success criteria
- Audio pipeline (VAD, chunking, cost controls)
- SSML enrichment strategy
- Multi-session support
- Security & privacy considerations
- Deployment options
- TODO management integration
- Project context system
- Claude orchestration capabilities
- Process lifecycle management
