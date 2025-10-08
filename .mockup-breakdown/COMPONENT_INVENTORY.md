# Component Inventory & Architecture

## Current State Analysis

### Existing in `packages/ui`
✅ **Base UI (shadcn/ui)**
- Button, Card, Badge, Input, Label, Select, Textarea, Slider, Progress, Sonner (toast)

✅ **Audio Components**
- VolumeMeter, MicButton, ModeSelector, AudioPlayer, Waveform

✅ **Custom Components**
- StatusBadge, CircularGauge, StatBox

✅ **Layout Components**
- MainLayout, TopBar, BottomBar, Sidebar

✅ **Chat Components**
- ChatView, MessageBubble

✅ **Icons**
- Logo

### Missing from Mockup (Need to Add to `packages/ui`)

#### Task/Kanban Components
- **KanbanBoard** - Container for kanban columns
- **KanbanColumn** - Single column (Backlog, In Progress, Blocked, Completed)
- **TaskCard** - Individual task card with priority, tags, assignee
- **PriorityBadge** - HIGH/MEDIUM/LOW badge
- **TaskTag** - Tag component (#api, #backend, etc.)

#### Modal Components
- **Modal** - Base modal component
- **ModalOverlay** - Overlay/backdrop
- **ModalContent** - Modal content container
- **ModalHeader** - Modal header with title
- **ModalFooter** - Modal footer with actions

#### Notes Components
- **NotesList** - Sidebar list of notes
- **NoteEditor** - Rich text editor for notes
- **NoteCard** - Preview card for notes

#### Dashboard Components
- **MetricCard** - Card with stat display
- **DashboardGrid** - Responsive grid layout
- **ChartCard** - Card container for charts/graphs

#### Form Components (if not covered by shadcn/ui)
- **FormField** - Wrapper for form fields
- **FormError** - Error message display

## Application Structure

### `packages/ui` (Reusable Components)
```
packages/ui/src/components/
├── ui/                    # Base shadcn/ui components
├── audio/                 # Audio-specific components
├── chat/                  # Chat-specific components
├── custom/                # Custom reusable components
├── layout/                # Layout components
├── icons/                 # Icon components
├── kanban/                # NEW: Kanban board components
│   ├── KanbanBoard.tsx
│   ├── KanbanColumn.tsx
│   ├── TaskCard.tsx
│   ├── PriorityBadge.tsx
│   └── TaskTag.tsx
├── modal/                 # NEW: Modal components
│   ├── Modal.tsx
│   ├── ModalOverlay.tsx
│   ├── ModalContent.tsx
│   ├── ModalHeader.tsx
│   └── ModalFooter.tsx
├── notes/                 # NEW: Notes components
│   ├── NotesList.tsx
│   ├── NoteEditor.tsx
│   └── NoteCard.tsx
└── dashboard/             # NEW: Dashboard components
    ├── MetricCard.tsx
    ├── DashboardGrid.tsx
    └── ChartCard.tsx
```

### `apps/frontend` (Application-Specific)
```
apps/frontend/src/
├── pages/                 # Page components (business logic)
│   ├── Chat.tsx          # Chat page layout
│   ├── Dashboard.tsx     # Dashboard page with metrics
│   ├── Tasks.tsx         # Tasks page with Kanban board
│   ├── Notes.tsx         # Notes page with editor
│   ├── Project.tsx       # Project controls page
│   ├── Processes.tsx     # Processes management page
│   ├── Logs.tsx          # Logs viewer page
│   └── Settings.tsx      # Settings page
├── components/            # App-specific components
│   ├── RootLayout.tsx    # Root layout wrapper
│   └── [specific components that don't belong in UI package]
├── hooks/                 # Custom hooks
│   └── useAudioCapture.ts
├── contexts/              # React contexts (state management)
│   ├── AudioContext.tsx
│   ├── ConversationContext.tsx
│   └── SettingsContext.tsx
├── lib/                   # Utilities
│   └── api-client.ts
└── types/                 # Type definitions
    └── better-fetch.d.ts
```

## Pages Breakdown

### 1. Dashboard (`pages/Dashboard.tsx`)
**Purpose**: System overview with metrics and stats
**Components Used**:
- `DashboardGrid` (from UI package)
- `MetricCard` (from UI package)
- `CircularGauge` (existing in UI)
- `StatBox` (existing in UI)
- `ChartCard` (from UI package)

### 2. Chat (`pages/Chat.tsx`)
**Purpose**: Main conversation interface
**Components Used**:
- `ChatView` (existing in UI)
- `MessageBubble` (existing in UI)
- `AudioPlayer` (existing in UI)
- `AudioControls` (app-specific wrapper)
- `MicButton` (existing in UI)
- `ModeSelector` (existing in UI)
- `VolumeMeter` (existing in UI)

### 3. Tasks (`pages/Tasks.tsx`)
**Purpose**: Kanban board for task management
**Components Used**:
- `KanbanBoard` (from UI package)
- `KanbanColumn` (from UI package)
- `TaskCard` (from UI package)
- `PriorityBadge` (from UI package)
- `TaskTag` (from UI package)
- `Modal` (from UI package) - for creating new tasks
- `Select` (existing in UI) - for filters

### 4. Notes (`pages/Notes.tsx`)
**Purpose**: Note-taking and architecture decisions
**Components Used**:
- `NotesList` (from UI package)
- `NoteEditor` (from UI package)
- `NoteCard` (from UI package)
- `Button` (existing in UI)

### 5. Project (`pages/Project.tsx`)
**Purpose**: Project controls and configuration
**Components Used**:
- `Card` (existing in UI)
- `Button` (existing in UI)
- `Input` (existing in UI)
- `Select` (existing in UI)
- Custom project-specific components

### 6. Processes (`pages/Processes.tsx`)
**Purpose**: Process management and monitoring
**Components Used**:
- `Card` (existing in UI)
- `StatusBadge` (existing in UI)
- `Button` (existing in UI)
- Custom process-specific components

### 7. Logs (`pages/Logs.tsx`)
**Purpose**: System logs and debugging
**Components Used**:
- `Card` (existing in UI)
- `Select` (existing in UI) - for log filtering
- Custom log viewer components

### 8. Settings (`pages/Settings.tsx`)
**Purpose**: Application settings
**Components Used**:
- `Card` (existing in UI)
- `Input` (existing in UI)
- `Label` (existing in UI)
- `Select` (existing in UI)
- `Slider` (existing in UI)
- `Button` (existing in UI)

## Component Reusability Principles

### What Goes in `packages/ui`:
✅ Generic, reusable components
✅ No business logic
✅ Accepts props for customization
✅ Can be used across multiple pages/projects
✅ Styled with Tailwind (no app-specific styles)

### What Stays in `apps/frontend`:
✅ Page components with routing
✅ Business logic and data fetching
✅ App-specific state management
✅ Components tightly coupled to app features
✅ One-off components used in single location

## Next Steps

1. **Build Missing UI Components** (in `packages/ui`)
   - Kanban components
   - Modal components
   - Notes components
   - Dashboard components

2. **Build Page Components** (in `apps/frontend/src/pages`)
   - Notes page
   - Enhanced Tasks page with kanban
   - Enhanced Project page
   - All other pages with proper data integration

3. **Convert Styles**
   - Extract CSS variables to Tailwind config
   - Convert inline styles to Tailwind classes
   - Ensure consistent theming

4. **Wire Up Routing**
   - Add missing routes in App.tsx
   - Ensure all navigation works

5. **Add State Management**
   - Create contexts for shared state
   - Connect pages to backend API
