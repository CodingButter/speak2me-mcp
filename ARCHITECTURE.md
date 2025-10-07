# speak2me-mcp Architecture

## Overview

speak2me-mcp is evolving from a voice I/O MCP server into a comprehensive development companion that augments Claude Code with project-specific context, tools, and persistent state.

## Core Concepts

### 1. Project Context System

Each conversation can be linked to a project directory. This enables:

- **Persistent Project State**: Todos, notes, decisions, metrics tied to the project
- **Auto-Documentation**: Automatically enhance project's CLAUDE.md with tool docs
- **Project-Specific Settings**: VAD thresholds, voice preferences per project
- **File System Access**: Read/write project files (with user permission)

**Data Model:**
```typescript
interface ProjectContext {
  conversationId: string;
  projectPath: string;
  projectName: string;
  claudeMdPath?: string;
  settings: ProjectSettings;
  createdAt: number;
  lastAccessedAt: number;
}
```

### 2. Tool Registry & Auto-Documentation

As we add MCP tools, they should automatically:

1. Register with metadata (name, description, when to use)
2. Generate documentation snippets
3. Update CLAUDE.md with usage instructions

**Tool Metadata:**
```typescript
interface ToolMetadata {
  name: string;
  description: string;
  category: 'voice' | 'project' | 'productivity' | 'development';
  whenToUse: string; // Instructions for Claude on when to invoke
  examples: ToolExample[];
  schema: JSONSchema;
}
```

**CLAUDE.md Structure:**
```markdown
# CLAUDE.md

[... existing project instructions ...]

---

## speak2me-mcp Tools

This project is connected to speak2me-mcp, giving you access to additional tools:

### Voice Tools

**speak** - Convert text to speech
- Use when: Providing responses that benefit from audio playback
- Example: After explaining a complex concept, use speak to create an audio summary

**listen** - Capture voice input
- Use when: User wants to provide input via voice
- Modes: auto (continuous), manual (click-to-record), ptt (push-to-talk)

### Project Tools

**todo_create** - Create a new todo item
- Use when: User requests a task to be tracked, or you identify action items
- Statuses: backlog, in-progress, blocked, completed, archived

**todo_update** - Update todo status or details
- Use when: Task progress changes or details need updating

**todo_list** - List todos by status
- Use when: User wants to see task status or you need project context

[... more tools ...]
```

### 3. TODO System

Full-featured task management integrated into the development workflow.

**Status Workflow:**
```
backlog → in-progress → completed
                ↓
              blocked → in-progress
                ↓
            archived (terminal)
```

**Database Schema:**
```typescript
model Todo {
  id            String   @id @default(uuid())
  conversationId String
  projectPath   String?
  title         String
  description   String?
  status        TodoStatus @default(BACKLOG)
  priority      Priority?
  tags          String[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  completedAt   DateTime?
  archivedAt    DateTime?
  blockedReason String?
  assignee      String?
  metadata      Json?
}

enum TodoStatus {
  BACKLOG
  IN_PROGRESS
  BLOCKED
  COMPLETED
  ARCHIVED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

**MCP Tools:**
- `todo_create(title, description, priority?, tags?)`
- `todo_update(id, updates)`
- `todo_list(status?, projectPath?)`
- `todo_archive(id)`
- `todo_delete(id)` // Admin only

### 4. Frontend Task View

Kanban-style board showing todos grouped by status:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   BACKLOG    │ IN PROGRESS  │   BLOCKED    │  COMPLETED   │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ • Task 1     │ • Task 3     │ • Task 5     │ • Task 7     │
│ • Task 2     │ • Task 4     │   (reason)   │ • Task 8     │
│ • Task 6     │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Features:
- Real-time updates via WebSocket
- Drag-and-drop status changes
- Filter by project, priority, tags
- Quick actions (edit, archive, delete)
- Metrics (velocity, cycle time)

## Expanded Tool Ideas

### Project Tools
- **todo_*** - Task management (implemented first)
- **note_create** - Project notes/documentation
- **decision_log** - Track architectural decisions
- **snippet_save** - Save reusable code snippets
- **diagram_create** - Generate/store architecture diagrams

### Development Tools
- **test_coverage** - Track test coverage metrics
- **performance_log** - Log performance measurements
- **error_track** - Track recurring errors/bugs
- **dependency_check** - Check for outdated dependencies

### Collaboration Tools
- **pr_checklist** - Generate PR checklists
- **review_notes** - Code review notes
- **meeting_notes** - Meeting summaries

### Context Tools
- **context_save** - Save conversation context for later
- **context_recall** - Recall saved context
- **pattern_save** - Save code patterns for reuse

## Implementation Phases

### Phase 1: Foundation (Current Sprint)
- ✅ Audio capture with VAD
- ✅ Platform adapters (Web/Electron)
- 🔄 Project context system
- 🔄 TODO tool implementation
- 🔄 CLAUDE.md auto-enhancement

### Phase 2: Core Tools (Next Sprint)
- Note/decision logging
- Code snippet library
- Enhanced project settings
- Frontend task view
- WebSocket real-time updates

### Phase 3: Development Tools
- Test coverage tracking
- Performance monitoring
- Error tracking
- Dependency management

### Phase 4: Advanced Features
- Context persistence
- Pattern library
- Team collaboration features
- Analytics dashboard

## Technical Architecture

### Backend (Elysia)

```
apps/backend/src/
  mcp/
    sse-server.ts          # Main MCP server
    tools/
      voice.ts             # speak, listen
      todo.ts              # todo_create, todo_update, etc.
      notes.ts             # note_create, note_list, etc.
      project.ts           # project_link, project_settings
  services/
    project-context.ts     # Project context management
    claude-md-enhancer.ts  # CLAUDE.md auto-enhancement
    tool-registry.ts       # Tool metadata and docs
```

### Database (Prisma)

```
packages/database/prisma/schema.prisma
  - Conversation
  - Message
  - Settings
  - ApiKey
  - ProjectContext (new)
  - Todo (new)
  - Note (new)
  - Decision (new)
  - Snippet (new)
```

### Frontend (React PWA)

```
apps/frontend/src/
  views/
    ChatView.tsx       # Conversation view
    TaskView.tsx       # Kanban board (new)
    NotesView.tsx      # Notes view (new)
    ProjectView.tsx    # Project overview (new)
  components/
    TodoCard.tsx       # Todo item display
    KanbanColumn.tsx   # Status column
    ProjectLinker.tsx  # Link conversation to project
```

## Design Principles

1. **Minimal User Friction**: Tools should be invisible until needed
2. **Smart Defaults**: Auto-detect project structure and settings
3. **Progressive Enhancement**: Web → Electron adds capabilities
4. **Real-time Updates**: Frontend always reflects current state
5. **Clear Documentation**: Auto-generated docs keep Claude informed
6. **Privacy First**: User controls what's tracked and stored

## Future Possibilities

- **Multi-user Projects**: Team collaboration on shared projects
- **Cloud Sync**: Sync project state across devices
- **Plugin System**: Third-party tools can register
- **AI Assistants**: Project-specific AI agents
- **Integration Hooks**: GitHub, Jira, Linear, etc.
- **Analytics**: Project health metrics, velocity tracking
