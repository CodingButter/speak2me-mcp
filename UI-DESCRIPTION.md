# speak2me-mcp UI Description

## Overview

An AI Development Dashboard that combines conversation with Claude Code, voice I/O, project management, process monitoring, task tracking, and system diagnostics in a unified interface.

**Target Platforms:** Progressive Web App (PWA) + Electron Desktop App

**Design Style:** Modern, dark-themed developer dashboard with neon accents. Think VS Code meets Discord meets system monitoring tools.

---

## Layout Structure

### Global Layout (Shell)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Top Bar: Project Name | System Stats (CPU/RAM) | Connection Status │
├──────────┬──────────────────────────────────────────────────────────┤
│          │                                                            │
│ Sidebar  │                    Main Content Area                      │
│  (Nav)   │              (Switches based on active view)              │
│          │                                                            │
│          │                                                            │
├──────────┴──────────────────────────────────────────────────────────┤
│                   Bottom Bar: Audio Controls                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Top Bar (Fixed, Always Visible)

**Left Section:**
- **Project Indicator**: Current project name with folder icon
  - Hover shows full project path
  - Click opens project selector dropdown
  - Badge shows project status (running/stopped/building)

**Center Section (System Stats - Compact):**
- **CPU Meter**: Mini circular gauge (0-100%)
  - Color codes: Green (<50%), Yellow (50-80%), Red (>80%)
  - Shows temperature on hover
- **RAM Meter**: Mini bar graph
  - Shows used/total on hover
- **Network**: Upload/download indicators (tiny arrows with kb/s)

**Right Section:**
- **Connection Status**: WebSocket/SSE connection indicator
  - Green dot = connected
  - Yellow dot = reconnecting
  - Red dot = disconnected
- **Settings Icon**: Opens settings modal
- **Notifications Icon**: Bell with badge count
- **User Menu**: Avatar/initials dropdown

### Sidebar (Collapsible, Resizable)

**Width:** 240px default, collapsible to 60px (icons only)

**Navigation Items:**

1. **Dashboard** 📊 - Overview of everything
2. **Chat** 💬 - Conversation view
3. **Tasks** ✓ - Kanban board
4. **Project** 🚀 - Project controls and stats
5. **Logs** 📜 - Process logs viewer
6. **Notes** 📝 - Project notes
7. **Files** 📁 - Quick file browser (Electron only)
8. **Settings** ⚙️ - Configuration

**Bottom of Sidebar:**
- **Conversations List**: Mini list of recent conversations
  - Current conversation highlighted
  - Click to switch
  - + button to create new

### Bottom Bar (Fixed, Audio Controls)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Volume Meter ▓▓▓▓▓▓░░░░] [Auto|Manual|PTT] [🎤] [Send] [Stop] [⚙] │
│ Mode: Auto | Threshold: ━━━━━●━━━━ 0.5 | Delay: 1.5s | Speaking...  │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Volume Meter**: Real-time audio level visualization
  - Smooth gradient bar with noise gate threshold indicator
  - Color: Green (normal), Red (clipping)
- **Mode Selector**: Segmented control (Auto/Manual/PTT)
- **Mic Button**: Large circular button
  - Auto mode: Toggle listening on/off
  - Manual mode: Start/stop recording
  - PTT mode: Hold to talk (visual press indicator)
- **Send Button**: Sends current transcript (Manual mode)
- **Stop Button**: Cancel recording/listening
- **Audio Settings**: Quick access to threshold slider
- **Status Text**: Current audio state with countdown timer
  - "Listening..." / "Speaking..." / "Auto-send in 1.5s" / "Idle"

---

## Views / Pages

### 1. Dashboard View (Home)

**Purpose:** At-a-glance overview of project health, recent activity, system stats

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Project Overview                                      System Health  │
├──────────────────────────────────┬──────────────────────────────────┤
│ Project: my-awesome-project      │  CPU: [████████░░] 80%          │
│ Status: ● Running                │  Temp: 65°C                      │
│ Uptime: 2h 34m                   │  RAM: [████░░░░░░] 6.2/16GB     │
│                                  │  Disk: [██░░░░░░░░] 245/500GB   │
│ Dev Server: http://localhost:3000│                                  │
│ [Stop] [Restart] [Build]        │  Network: ↑12kb/s ↓45kb/s       │
├──────────────────────────────────┴──────────────────────────────────┤
│ Quick Stats                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Tasks: 3 in progress | 12 backlog | 45 completed this week          │
│ Messages: 156 today | 1,234 total                                   │
│ Voice: 23m recording time | 45m playback time                       │
├─────────────────────────────────────────────────────────────────────┤
│ Recent Activity                                                      │
├─────────────────────────────────────────────────────────────────────┤
│ • 2m ago - Claude created task: "Implement authentication"          │
│ • 5m ago - Dev server restarted                                     │
│ • 8m ago - Build completed (2.3s)                                   │
│ • 12m ago - 3 tests passed                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Active Processes                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ ● dev-server  PID:1234  CPU: 12%  RAM: 234MB  Uptime: 2h 34m   │ │
│ │ ● build       PID:5678  CPU: 45%  RAM: 512MB  Running...       │ │
│ │ ○ test        PID:9012  CPU: 0%   RAM: 0MB    Stopped          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Project Info Card**: Name, status badge, uptime, dev server URL
- **Quick Actions**: Stop/Start/Restart dev server, Build, Run tests
- **System Health Panel**: CPU/RAM/Disk/Network gauges with real-time updates
- **Quick Stats Row**: High-level metrics
- **Activity Feed**: Timeline of recent events (scrollable)
- **Process List**: Table of managed processes with controls

### 2. Chat View (Conversation)

**Purpose:** Main conversation with Claude Code, with audio playback and visual feedback

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Conversation: Project Setup                         [Export] [Clear]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ 👤 User                                           2:34 PM      │   │
│ │ How do I set up authentication?                               │   │
│ │ [🎤 0:23 ──────●───── ]                                       │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ 🤖 Claude                                         2:34 PM      │   │
│ │ I'll help you set up authentication. First, let's install...  │   │
│ │ [🔊 1:45 ──●────────── ] [Copy] [Regenerate]                 │   │
│ │                                                                │   │
│ │ Created task: "Install auth dependencies"                     │   │
│ │ Created task: "Configure JWT middleware"                      │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ 🤖 Claude is typing...                                         │   │
│ │ [Audio generation in progress... 45%]                         │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Message List**: Scrollable conversation history
  - User messages: Right-aligned, gray background
  - Claude messages: Left-aligned, blue accent
  - System messages: Center, italic, muted color
- **Message Card**:
  - Avatar (user/Claude icon)
  - Timestamp
  - Message content (markdown rendered)
  - Audio player (if audio exists)
    - Waveform visualization
    - Play/pause button
    - Scrubber
    - Duration
    - Download button
  - Actions: Copy, Regenerate, Delete
  - Tool Usage Indicators: Pills showing which tools were used
  - Metadata Toggle: SSML used, metrics (TTFB, duration)
- **Typing Indicator**: Animated when Claude is responding
- **Audio Generation Progress**: Progress bar when TTS is generating
- **Auto-scroll**: Scrolls to bottom on new message
- **Scroll to Bottom Button**: Appears when scrolled up

### 3. Tasks View (Kanban Board)

**Purpose:** Visual task management with drag-and-drop

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Tasks                      [+ New Task] [Filter ▼] [Group by: Status]│
├─────────────────────────────────────────────────────────────────────┤
│ ┌──────────┬──────────┬──────────┬──────────┬──────────┐           │
│ │ BACKLOG  │IN PROGRESS│ BLOCKED  │COMPLETED │ ARCHIVED │           │
│ │    12    │    3     │    1     │    45    │   123    │           │
│ ├──────────┼──────────┼──────────┼──────────┼──────────┤           │
│ │┌────────┐│┌────────┐│┌────────┐│┌────────┐│┌────────┐│           │
│ ││  Task  ││││  Task  │││ Task   │││ Task   │││ Task   ││           │
│ ││ Card 1 ││││ Card 3 │││ Card 5 │││ Card 7 │││ Card 8 ││           │
│ ││        ││││        │││(reason) │││✓       │││        ││           │
│ │└────────┘││└────────┘│└────────┘│└────────┘│└────────┘│           │
│ │┌────────┐││┌────────┐│          │┌────────┐│          │           │
│ ││ Task 2 ││││ Task 4 ││          ││ Task 9 ││          │           │
│ │└────────┘││└────────┘│          │└────────┘│          │           │
│ │┌────────┐││          │          │          │          │           │
│ ││ Task 6 ││          │          │          │          │           │
│ │└────────┘││          │          │          │          │           │
│ └──────────┴──────────┴──────────┴──────────┴──────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Top Bar Actions**:
  - New Task Button: Opens create modal
  - Filter Dropdown: By priority, tags, assignee, date
  - Group By: Status (default), Priority, Tag, Assignee
  - View Toggle: Kanban / List / Calendar
- **Kanban Columns**: One per status
  - Column header with count badge
  - Drag-and-drop enabled
  - Add card button at bottom
  - Virtual scrolling for performance
- **Task Card**:
  ```
  ┌─────────────────────────────────┐
  │ ● HIGH | #bug #auth              │
  │ ───────────────────────────────  │
  │ Fix authentication bug           │
  │ ───────────────────────────────  │
  │ User sessions not persisting...  │
  │                                  │
  │ 👤 John | 📅 Due: 2h | 💬 3     │
  │ [Edit] [Archive]                 │
  └─────────────────────────────────┘
  ```
  - Priority indicator (colored dot)
  - Tags (pills)
  - Title (bold)
  - Description (truncated)
  - Assignee avatar
  - Due date (if set)
  - Comment count
  - Quick actions
  - Click to expand/edit
- **Virtual Scrolling**: Handle hundreds of tasks
- **Real-time Updates**: WebSocket syncs changes

### 4. Project View (Controls & Monitoring)

**Purpose:** Project-specific controls, process management, and detailed monitoring

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Project: my-awesome-project                                          │
│ Path: /Users/dev/projects/my-awesome-project                        │
├─────────────────────────────────────────────────────────────────────┤
│ Process Controls                                                     │
├────────────────────────────┬────────────────────────────────────────┤
│ Dev Server                 │ Build                                   │
│ ● Running (2h 34m)        │ ○ Not Running                          │
│ http://localhost:3000      │ Last: 5m ago (2.3s) ✓                 │
│ [Stop] [Restart] [Logs]   │ [Build] [Build & Deploy] [Logs]        │
├────────────────────────────┼────────────────────────────────────────┤
│ Test Runner                │ Type Check                              │
│ ○ Not Running             │ ○ Not Running                          │
│ Last: 12m ago (32 passed) │ Last: Never                            │
│ [Run Tests] [Watch] [Logs]│ [Type Check] [Watch] [Logs]            │
└────────────────────────────┴────────────────────────────────────────┘
├─────────────────────────────────────────────────────────────────────┤
│ Process Stats (Real-time)                                            │
├─────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ Process: dev-server (PID: 1234)                               │   │
│ │                                                                │   │
│ │ CPU Usage: [████████░░░░░░░░░░] 45%                          │   │
│ │ [Graph: Last 60s ─────/\─/\─────]                            │   │
│ │                                                                │   │
│ │ Memory: [██████░░░░░░░░░░░░░░] 234MB / 2GB                   │   │
│ │ [Graph: Last 60s ───────────/]                               │   │
│ │                                                                │   │
│ │ Uptime: 2h 34m 12s                                            │   │
│ │ Restarts: 0                                                    │   │
│ └───────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
├─────────────────────────────────────────────────────────────────────┤
│ System Resources (Overall)                                           │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┬─────────────────────┬──────────────────┐   │
│ │ CPU                 │ Memory              │ Disk             │   │
│ │ [Circular: 78%]    │ [Circular: 42%]    │ [Circular: 51%] │   │
│ │ Temp: 68°C         │ 6.7 / 16 GB        │ 256 / 500 GB    │   │
│ │ 4 cores @ 3.2GHz   │ Swap: 0 / 8 GB     │ SSD             │   │
│ └─────────────────────┴─────────────────────┴──────────────────┘   │
│ ┌─────────────────────┬─────────────────────┬──────────────────┐   │
│ │ Network             │ GPU (if available)  │ Battery          │   │
│ │ ↑ 45 kb/s          │ [Circular: 23%]    │ [Icon: 87%]     │   │
│ │ ↓ 128 kb/s         │ Temp: 52°C         │ Charging        │   │
│ │ Total: 234 MB      │ VRAM: 2/8 GB       │ 2h 34m left     │   │
│ └─────────────────────┴─────────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Project Info Header**: Name, path, description
- **Process Control Grid**: 2x2 or responsive grid
  - Each process: Status, uptime/last run, quick actions
  - Color-coded status indicators
- **Process Stats Panel**: Per-process monitoring
  - CPU/RAM usage with sparkline graphs
  - Real-time updates (every 1-2 seconds)
  - Historical graphs (last 60 seconds)
- **System Resources Panel**: Overall system stats
  - Circular gauges for percentages
  - Detailed breakdowns
  - Temperature monitoring
  - Network throughput
  - GPU stats (if available)
  - Battery info (if laptop)

### 5. Logs View (Process Output)

**Purpose:** View and search process logs with filtering and highlighting

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Logs                                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Process: [dev-server ▼] | Level: [All ▼] | Search: [________] 🔍  │
│ [Clear] [Download] [Follow] ✓                                       │
├─────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ [14:23:45] [INFO] Server started on http://localhost:3000    │   │
│ │ [14:23:46] [DEBUG] Loaded 234 routes                         │   │
│ │ [14:23:47] [INFO] Connected to database                      │   │
│ │ [14:24:12] [WARN] Slow query detected (234ms)                │   │
│ │ [14:24:45] [ERROR] Failed to authenticate user               │   │
│ │   at handleAuth (auth.ts:123)                                │   │
│ │   at middleware (index.ts:45)                                │   │
│ │ [14:25:03] [INFO] Request: GET /api/users                    │   │
│ │ [14:25:03] [INFO] Response: 200 (23ms)                       │   │
│ │ [14:25:12] [INFO] Hot reload triggered                       │   │
│ │ [14:25:13] [INFO] Build completed (1.2s)                     │   │
│ │ [14:25:14] [INFO] Server restarted                           │   │
│ │ ...                                                            │   │
│ │ [Auto-scrolling to bottom]                                    │   │
│ └───────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Components:**
- **Top Controls**:
  - Process Selector: Switch between process logs
  - Level Filter: All, Info, Debug, Warn, Error
  - Search Box: Full-text search with highlighting
  - Clear Button: Clear current logs
  - Download Button: Download logs as file
  - Follow Toggle: Auto-scroll to bottom
- **Log Viewer**:
  - Monospace font (developer-friendly)
  - Color-coded log levels:
    - INFO: Gray
    - DEBUG: Blue
    - WARN: Yellow/Orange
    - ERROR: Red
  - Timestamps on each line
  - Stack traces indented
  - Search term highlighting
  - Virtual scrolling for performance
  - Click line to copy
  - Line numbers (optional)
- **Performance**: Handle thousands of log lines without lag

### 6. Notes View

**Purpose:** Project-specific notes, decisions, and documentation

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Notes                                                 [+ New Note]   │
├──────────────────────┬──────────────────────────────────────────────┤
│ All Notes            │ Authentication Strategy                       │
│ • Authentication     │ Created: 2 days ago | Modified: 5m ago       │
│ • API Design         ├──────────────────────────────────────────────┤
│ • Database Schema    │                                               │
│ • Architecture       │ We decided to use JWT tokens for auth...     │
│                      │                                               │
│ Decisions            │ ## Options Considered                         │
│ • JWT vs Sessions    │ 1. Sessions with Redis                        │
│ • REST vs GraphQL    │ 2. JWT tokens                                 │
│                      │ 3. OAuth only                                 │
│ Quick Links          │                                               │
│ • Project Docs       │ ## Decision                                   │
│ • API Reference      │ Going with JWT because...                     │
│                      │                                               │
│                      │ [Edit] [Delete] [Share]                      │
└──────────────────────┴──────────────────────────────────────────────┘
```

**Components:**
- **Sidebar**: Note list with search and categories
- **Note Editor**: Markdown editor with live preview
- **Tags**: Add/remove tags for organization
- **Timestamps**: Created/modified dates
- **Collaboration**: Comments, @mentions (future)

### 7. Settings View

**Purpose:** Configuration for audio, projects, API keys, preferences

**Layout:** Tabbed interface with sections

**Tabs:**
1. **Audio**
   - Input device selector
   - VAD threshold slider (Discord-style)
   - Pre-roll/post-roll settings
   - Auto-send delay
   - Test recording button
2. **Project**
   - Link to project directory
   - Auto-detect package.json scripts
   - Custom commands
   - CLAUDE.md auto-enhancement toggle
3. **API Keys**
   - OpenAI key input
   - ElevenLabs key input
   - Gemini key input
   - Test connection buttons
4. **Voice**
   - Voice selection (ElevenLabs voices)
   - Model selection
   - SSML preferences
   - Playback settings
5. **Appearance**
   - Theme (dark/light/auto)
   - Font size
   - Compact mode
6. **Advanced**
   - Backend URL
   - WebSocket settings
   - Logging level
   - Debug mode

---

## Modals / Dialogs

### 1. New Task Modal

```
┌─────────────────────────────────────────────────┐
│ Create New Task                          [ X ]  │
├─────────────────────────────────────────────────┤
│                                                  │
│ Title: [_____________________________]          │
│                                                  │
│ Description:                                     │
│ ┌─────────────────────────────────────────────┐│
│ │                                              ││
│ │                                              ││
│ └─────────────────────────────────────────────┘│
│                                                  │
│ Priority: [◉ High  ○ Medium  ○ Low]            │
│                                                  │
│ Tags: [#bug] [#auth] [+ Add]                   │
│                                                  │
│ Assignee: [Claude ▼]                           │
│                                                  │
│ Due Date: [📅 Select Date]                     │
│                                                  │
│              [Cancel]  [Create Task]            │
└─────────────────────────────────────────────────┘
```

### 2. Task Detail Modal

```
┌───────────────────────────────────────────────────┐
│ Task Details                                [ X ] │
├───────────────────────────────────────────────────┤
│ ● HIGH | Status: IN PROGRESS                     │
│ Created: 2 days ago | Updated: 5m ago            │
├───────────────────────────────────────────────────┤
│                                                    │
│ ## Fix Authentication Bug                         │
│                                                    │
│ User sessions are not persisting after page       │
│ refresh. Need to investigate token storage...     │
│                                                    │
│ Tags: #bug #auth #high-priority                   │
│ Assignee: Claude                                  │
│ Due: 2024-01-15 (in 2 hours)                     │
│                                                    │
├───────────────────────────────────────────────────┤
│ Comments (3)                                      │
├───────────────────────────────────────────────────┤
│ Claude • 5m ago                                   │
│ I've identified the issue in auth.ts:123...      │
│                                                    │
│ User • 12m ago                                    │
│ Can you check the JWT expiration?                │
│                                                    │
├───────────────────────────────────────────────────┤
│ Activity                                          │
├───────────────────────────────────────────────────┤
│ • Claude moved to IN PROGRESS • 5m ago           │
│ • Claude added comment • 5m ago                  │
│ • User added comment • 12m ago                   │
│                                                    │
├───────────────────────────────────────────────────┤
│ [Edit] [Change Status ▼] [Archive] [Delete]     │
└───────────────────────────────────────────────────┘
```

### 3. Project Setup Modal

```
┌─────────────────────────────────────────────────┐
│ Link Project to Conversation              [ X ] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Project Directory:                               │
│ [/Users/dev/projects/my-app   ] [Browse]       │
│                                                  │
│ ✓ package.json detected                         │
│ ✓ CLAUDE.md found                               │
│                                                  │
│ Available Scripts (from package.json):          │
│ ☑ dev - Start dev server                       │
│ ☑ build - Build for production                 │
│ ☑ test - Run tests                              │
│ ☑ typecheck - TypeScript check                 │
│ ☐ deploy - Deploy to production                │
│                                                  │
│ CLAUDE.md Enhancement:                          │
│ ☑ Auto-add tool documentation                   │
│ ☑ Keep existing instructions                    │
│                                                  │
│ [Preview Changes]      [Cancel]  [Link Project] │
└─────────────────────────────────────────────────┘
```

### 4. Audio Threshold Calibration Modal

```
┌─────────────────────────────────────────────────┐
│ Calibrate Noise Gate                      [ X ] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Step 1: Stay silent for 3 seconds               │
│ [Measuring ambient noise... ▓▓▓░░░░░░░░]       │
│                                                  │
│ Step 2: Speak normally for 5 seconds            │
│ [Recording speech... ▓▓▓▓▓▓░░░░]               │
│                                                  │
│ Results:                                         │
│ Ambient: ▂ 0.05                                 │
│ Speech:  ▆ 0.78                                 │
│                                                  │
│ Recommended Threshold: 0.35                      │
│                                                  │
│ Volume Meter: [▓▓▓▓▓▓▓━●━━━━━━━]                │
│ Current: 0.67 | Threshold: 0.35                 │
│                                                  │
│ [Test Recording]      [Cancel]  [Apply]         │
└─────────────────────────────────────────────────┘
```

### 5. Command Output Modal (Full Screen)

```
┌─────────────────────────────────────────────────┐
│ npm run build                              [ X ] │
├─────────────────────────────────────────────────┤
│ > my-app@1.0.0 build                            │
│ > vite build                                     │
│                                                  │
│ vite v5.0.0 building for production...          │
│ ✓ 234 modules transformed.                      │
│ dist/index.html                    2.45 kB      │
│ dist/assets/index-a1b2c3d4.js   245.67 kB      │
│ dist/assets/index-e5f6g7h8.css   12.34 kB      │
│ ✓ built in 2.34s                                │
│                                                  │
│ ✓ Build completed successfully                  │
│                                                  │
│                                                  │
│ [Copy Output] [Download Log] [Close]            │
└─────────────────────────────────────────────────┘
```

---

## Shared Components

### 1. Volume Meter Component

**Usage:** Shows real-time audio levels

**Visual:**
```
▓▓▓▓▓▓▓▓━●━━━━━━━━━━
└─────┬─────┘
   Signal    Threshold marker
```

**Features:**
- Smooth gradient from green → yellow → red
- Threshold indicator line
- Current level numeric display
- Peak hold marker

### 2. Process Status Badge

```
● Running    (green dot + text)
◐ Starting   (animated yellow)
○ Stopped    (gray dot + text)
✗ Error      (red X + text)
```

### 3. Stats Gauge

**Circular Gauge:**
```
    ╱──────╲
   │   78%  │
   │  CPU   │
    ╲──────╱
```

**Bar Gauge:**
```
CPU [████████░░░░░░░░░░] 80%
```

### 4. Mini Sparkline

```
Usage: ─────/\─/\──/─────
```

Small inline graph showing recent history

### 5. Toast Notifications

```
┌─────────────────────────────────┐
│ ✓ Task created successfully     │
│ [Dismiss]                        │
└─────────────────────────────────┘
```

Position: Top-right corner
Duration: 3-5 seconds auto-dismiss
Types: Success, Error, Warning, Info

### 6. Context Menu (Right-click)

```
┌─────────────────────┐
│ Copy                │
│ Edit                │
│ Delete              │
│ ─────────────────── │
│ View Details        │
│ Open in New Window  │
└─────────────────────┘
```

### 7. Dropdown Menu

```
[Filter ▼]
┌─────────────────────┐
│ ✓ Show All          │
│ ○ High Priority     │
│ ○ In Progress       │
│ ○ Blocked           │
│ ─────────────────── │
│ Clear Filters       │
└─────────────────────┘
```

---

## Responsive Behavior

### Desktop (1920x1080+)
- Full layout with sidebar expanded
- Multi-column layouts
- Side-by-side panels

### Laptop (1366x768)
- Sidebar collapsible
- Responsive grid layouts
- Tabs for some panels

### Tablet (768x1024)
- Sidebar overlay (hamburger menu)
- Single column layouts
- Bottom sheet modals

### Mobile (375x667)
- Bottom navigation bar
- Stack layouts
- Full-screen modals
- Swipe gestures

---

## Real-time Updates

**WebSocket Events:**
- `process:start` - Process started
- `process:stop` - Process stopped
- `process:log` - New log line
- `process:stats` - CPU/RAM update
- `system:stats` - System stats update
- `task:created` - New task
- `task:updated` - Task changed
- `task:deleted` - Task removed
- `message:new` - New chat message
- `notification:new` - New notification

**Update Frequency:**
- System stats: Every 2 seconds
- Process stats: Every 1 second
- Logs: Real-time (as they occur)
- Tasks: Real-time (as they change)
- Audio volume: 60 FPS (smooth)

---

## Accessibility

- **Keyboard Navigation**: All interactions accessible via keyboard
- **Screen Reader Support**: ARIA labels on all interactive elements
- **Focus Indicators**: Clear focus states
- **Color Contrast**: WCAG AA compliant
- **Motion**: Respect prefers-reduced-motion
- **Text Size**: Responsive to browser zoom

---

## Performance Targets

- **First Paint**: < 1 second
- **Time to Interactive**: < 2 seconds
- **60 FPS**: All animations and real-time updates
- **Memory**: < 500MB with 1000+ log lines
- **Virtual Scrolling**: Handle 10k+ items smoothly

---

## Design Tokens

### Colors (Dark Theme Primary)

**Background:**
- `bg-primary`: #1a1a1a (main background)
- `bg-secondary`: #2a2a2a (cards, panels)
- `bg-tertiary`: #3a3a3a (hover states)

**Text:**
- `text-primary`: #ffffff (main text)
- `text-secondary`: #b0b0b0 (muted text)
- `text-tertiary`: #808080 (disabled text)

**Accent:**
- `accent-primary`: #00d4ff (neon blue)
- `accent-secondary`: #8b5cf6 (purple)
- `accent-success`: #10b981 (green)
- `accent-warning`: #f59e0b (orange)
- `accent-error`: #ef4444 (red)

**Status:**
- `status-running`: #10b981 (green)
- `status-stopped`: #6b7280 (gray)
- `status-error`: #ef4444 (red)
- `status-warning`: #f59e0b (orange)

### Typography

**Font Family:**
- UI: Inter, system-ui
- Code: JetBrains Mono, monospace

**Sizes:**
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px

### Spacing

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px

### Border Radius

- `radius-sm`: 4px
- `radius-md`: 8px
- `radius-lg`: 12px
- `radius-full`: 9999px

---

## Implementation Notes

1. **Framework**: React 18+ with TypeScript
2. **Styling**: TailwindCSS + shadcn/ui components
3. **State**: Zustand for global state
4. **Real-time**: WebSocket with auto-reconnect
5. **Charts**: Recharts or similar for graphs
6. **Audio**: Web Audio API + visualizations
7. **Drag-Drop**: @dnd-kit for Kanban
8. **Virtual Scroll**: @tanstack/react-virtual
9. **Markdown**: react-markdown with syntax highlighting
10. **Notifications**: react-hot-toast

---

## Animations & Transitions

- **Page Transitions**: Fade in (150ms)
- **Modal Open**: Scale + fade (200ms)
- **Dropdown**: Slide down (150ms)
- **Hover**: Scale 1.02 (100ms)
- **Status Change**: Color transition (300ms)
- **Volume Meter**: No delay (immediate)
- **Sparklines**: Smooth animation (500ms)
- **Loading Spinners**: Continuous rotation

---

This UI description provides everything needed for a designer to create comprehensive mockups and for developers to implement the interface consistently.
