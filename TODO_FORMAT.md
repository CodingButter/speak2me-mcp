# TODO Comment Format Guide

This project uses [alstr/todo-to-issue-action](https://github.com/alstr/todo-to-issue-action) to automatically create GitHub issues from TODO comments in code.

## Format Specification

### Basic TODO
```typescript
// TODO: Brief description of what needs to be done
```

### TODO with Assignee
```typescript
// TODO(@username): Task description
```

### TODO with Label
```typescript
// TODO(!label-name): Task with specific label
// TODO(!bug): Fix the authentication issue
// TODO(!enhancement): Add dark mode support
```

### TODO with Issue Reference
```typescript
// TODO(#99): Related to existing issue #99
```

### Multi-line TODO with Metadata
```typescript
// TODO: Implement ElevenLabs TTS streaming API integration
// - Use ElevenLabs SDK to convert SSML/text to speech
// - Support streaming mode for low-latency playback
// - Track TTFB (time to first byte) and total generation time
// assignees: codingbutter
// labels: enhancement, voice
// milestone: MVP Launch
```

## Standard Labels

Use these standard labels for categorization:

### Category Labels

- `!bug` - Something isn't working
- `!enhancement` - New feature or request
- `!documentation` - Documentation improvements
- `!refactor` - Code cleanup or restructuring
- `!testing` - Test coverage improvements
- `!performance` - Performance optimization
- `!security` - Security-related changes
- `!voice` - Voice/audio pipeline related
- `!frontend` - React PWA frontend
- `!backend` - Elysia backend server
- `!mcp` - MCP integration
- `!database` - Database/storage layer
- `!deployment` - Deployment and DevOps
- `!pwa` - PWA-specific features

### Priority Labels
**Always include a priority label for new TODOs:**

- `priority: P0` - **Critical** - Blocking MVP launch (core voice features)
- `priority: P1` - **High** - Important for MVP quality
- `priority: P2` - **Medium** - Nice to have enhancements

**Example:**
```typescript
// TODO: Implement ElevenLabs TTS streaming API
// labels: enhancement, voice, priority: P0
// milestone: MVP Launch
```

**Note:** Priority labels automatically sync to the GitHub Project Priority field via scheduled workflow.

## Best Practices

### 1. Reference Project Scope
Always include a reference to the relevant section of the Project Scope Document:
```typescript
// TODO: Implement VAD-based audio chunking
// Project Scope: §5.2.2 (VAD & Chunking settings)
// - Implement volume threshold detection
// - Add min-silence window for segment splitting
// labels: enhancement, voice
```

### 2. Be Specific and Actionable
```typescript
// ❌ Bad
// TODO: Fix this

// ✅ Good
// TODO: Fix race condition in audio stream cleanup
// When stopping recording, ensure WebRTC stream is released before
// transitioning UI state to prevent "device still in use" errors.
// labels: bug, voice
```

### 3. Include Implementation Hints
```typescript
// TODO: Add offline fallback for PWA
// - Implement service worker caching strategy
// - Cache critical assets: HTML, CSS, JS bundles
// - Use network-first strategy for API calls with offline fallback
// - Display offline indicator in UI when network unavailable
// Project Scope: §5.2 (PWA Features)
// labels: enhancement, pwa
```

### 4. Link Related TODOs
```typescript
// TODO(#123): Add WebSocket reconnection logic
// Depends on #123 - connection state management refactor
// labels: enhancement, backend
```

### 5. Mark Blockers
```typescript
// TODO(!urgent): Implement API key validation
// BLOCKER: Cannot test TTS/STT without valid API keys
// - Add validation on settings save
// - Show clear error messages for invalid keys
// - Test with all three providers (OpenAI, ElevenLabs, Gemini)
// labels: bug, backend
```

## Integration with Project Scope

Always reference the relevant section when adding TODOs:

```typescript
/**
 * Text-to-Speech using ElevenLabs
 *
 * Project Scope Reference: §5.1.1, §7.2.1
 */
export async function textToSpeech() {
  // TODO: Implement ElevenLabs streaming API
  // Project Scope: §5.1.1 (speak tool specification)
  // - Target TTFB < 500ms per §2.2.4
  // - Handle streaming mode for low-latency playback
  // - Save audio assets for replay (§7.2.1)
  // - Emit progress events: started, first_audio, completed, error
  // labels: enhancement, voice
}
```

## Automated Issue Creation

When you push commits containing new TODOs:

1. GitHub Action scans the diff for TODO comments
2. Creates an issue for each TODO with:
   - Title from the first line of the TODO
   - Body from the multi-line description
   - Assignees from `assignees:` field
   - Labels from `labels:` field or `!label` syntax
   - Milestone from `milestone:` field
3. Inserts the issue URL back into the comment (if configured)
4. Closes the issue when the TODO is removed

## Supported Identifiers

The workflow recognizes multiple comment identifiers, each with automatic default labels:

- **TODO** → labels: `todo`
- **FIXME** → labels: `bug`, `fixme`
- **HACK** → labels: `tech-debt`, `hack`
- **BUG** → labels: `bug`, `todo`
- **NOTE** → labels: `documentation`
- **OPTIMIZE** → labels: `performance`, `enhancement`

### Examples:
```typescript
// TODO: Implement feature X
// → Creates issue with label: todo

// FIXME: Authentication fails on token refresh
// → Creates issue with labels: bug, fixme

// HACK: Temporary workaround for React 18 strict mode
// → Creates issue with labels: tech-debt, hack

// BUG: Race condition in WebSocket handler
// → Creates issue with labels: bug, todo

// NOTE: Document the MCP protocol integration
// → Creates issue with label: documentation

// OPTIMIZE: Cache API responses to reduce latency
// → Creates issue with labels: performance, enhancement
```

## Configuration

The GitHub Action is configured in `.github/workflows/todo-to-issue.yml`:

```yaml
name: "TODO to Issue"
on:
  push:
    branches:
      - '**'  # All branches
  pull_request:
    branches:
      - '**'  # All PRs
  workflow_dispatch:  # Manual trigger

jobs:
  create-issues:
    name: Create issues from TODOs
    runs-on: ubuntu-latest
    permissions:
      issues: write
      contents: write  # For INSERT_ISSUE_URLS
      pull-requests: write
    steps:
      - uses: "actions/checkout@v4"
      - name: "TODO to Issue"
        uses: "alstr/todo-to-issue-action@v5"
        with:
          INSERT_ISSUE_URLS: true  # Insert issue URLs into code
          AUTO_ASSIGN: true  # Assign to TODO author
          CLOSE_ISSUES: true  # Close when TODO removed
          ESCAPE_SEQUENCES: true  # Handle special characters
          IDENTIFIERS: '[...]'  # Custom identifiers
          ISSUE_TEMPLATE: |  # Custom issue format
            **File:** `{{ file }}`
            **Line:** {{ line }}
            ...
```

### Key Features:
- **Multi-branch support**: Works on all branches, not just main
- **Manual triggering**: Can be run manually via GitHub UI
- **Issue URL insertion**: Automatically inserts issue URLs back into code
- **Auto-assignment**: Issues assigned to the commit author
- **Auto-close**: Issues closed when TODOs are removed
- **Special characters**: Properly escapes markdown and special chars
- **Custom templates**: Consistent issue formatting with file/line info
- **Project integration**: Automatically adds issues to project board

## Examples from Project

### Service Implementation
```typescript
// TODO: Implement Gemini STT streaming integration
// Project Scope: §5.1.2 (listen tool), §7.2.2
// - Set up Gemini SDK with streaming recognition
// - Implement chunking logic (split on minSilenceMs boundaries)
// - Apply silence trimming to reduce audio-seconds sent (target: 30% reduction per §2.2.7)
// - Handle all three modes: auto, manual, PTT
// - Track metrics: audioSecSent, chunks, latencyMs
// - Target end-to-end latency < 1500ms per §6
// assignees: codingbutter
// labels: enhancement, voice
// milestone: MVP Launch
```

### Frontend Component
```typescript
// TODO: Build AudioControls component with waveform visualization
// Project Scope: §5.2.1 (Audio Controls)
// - Add real-time waveform/VU meter using Web Audio API
// - Implement mode selector: Auto / Manual / Push-to-talk
// - Add PTT button with hold-to-record interaction
// - Display keybinding configuration (works when window focused)
// - Add Send/Cancel/Retry/Mute controls
// - Show device status indicator
// labels: enhancement, frontend
```

### Bug Fix
```typescript
// TODO(!bug): Fix WebSocket reconnection after network loss
// Project Scope: §11 (Error Handling & Recovery)
// When network drops and reconnects, SSE connection doesn't
// automatically resume. Need to implement exponential backoff
// with session ID persistence.
// assignees: codingbutter
// labels: bug, backend
```
