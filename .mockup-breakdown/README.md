# Mockup Breakdown

This directory contains the extracted components from `speak2me-mockup.html` for easier conversion to React/Tailwind.

## Structure

```
.mockup-breakdown/
├── pages/              # Individual page HTML (dashboard, chat, tasks, notes, etc.)
├── components/         # Reusable component HTML (top-bar, sidebar, modals)
├── styles/             # Extracted CSS
├── logic.js            # JavaScript logic extracted from mockup
├── COMPONENT_INVENTORY.md  # Detailed component breakdown and architecture
└── README.md           # This file
```

## Files

### Pages
- `dashboard.html` - System overview with metrics
- `chat.html` - Main conversation interface
- `tasks.html` - **Kanban board with 4 columns** (Backlog, In Progress, Blocked, Completed)
- `notes.html` - **Note-taking interface** (missing from current frontend!)
- `project.html` - **Project controls page** (missing from current frontend!)
- `logs.html` - System logs viewer
- `settings.html` - Application settings

### Components
- `top-bar.html` - Top navigation bar with project info and system stats
- `sidebar.html` - Left sidebar with navigation and conversation list
- `modals.html` - Modal overlays (new task modal, etc.)

### Styles
- `main.css` - All CSS extracted from mockup (1385 lines)
  - CSS variables for theming
  - Component styles
  - Animations
  - Responsive breakpoints

### Logic
- `logic.js` - JavaScript functions extracted from mockup
  - View switching
  - Modal handling
  - Audio controls
  - Toast notifications
  - Form handling

## Key Findings

### Missing from Current Frontend
1. **Notes Page** - Complete note-taking interface with sidebar
2. **Project Controls Page** - Project configuration and controls
3. **Kanban Board in Tasks** - Current Tasks page is empty, mockup has full kanban with:
   - 4 columns (Backlog, In Progress, Blocked, Completed)
   - Task cards with priority badges
   - Tags system (#api, #backend, etc.)
   - Assignee tracking
   - Comment counts

### Components to Build (in `packages/ui`)
- Kanban board system (KanbanBoard, KanbanColumn, TaskCard, PriorityBadge, TaskTag)
- Modal system (Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter)
- Notes components (NotesList, NoteEditor, NoteCard)
- Dashboard components (MetricCard, DashboardGrid, ChartCard)

### Pages to Build (in `apps/frontend/src/pages`)
- Notes.tsx (new)
- Enhanced Tasks.tsx with kanban
- Enhanced Project.tsx with controls
- All other pages with proper component usage

## CSS Variables (for Tailwind Config)

The mockup uses these CSS variables that should be integrated into Tailwind theme:

```css
--bg-primary: #0f0f14
--bg-secondary: #1a1a24
--bg-tertiary: #252534
--bg-hover: #2d2d3d
--text-primary: #ffffff
--text-secondary: #b0b0c0
--text-tertiary: #808090
--accent-blue: #00d4ff
--accent-purple: #8b5cf6
--accent-success: #10b981
--accent-warning: #f59e0b
--accent-error: #ef4444
--border-color: #2d2d3d
```

## Next Steps

1. Build missing UI components in `packages/ui`
2. Convert CSS variables to Tailwind theme
3. Build page components in `apps/frontend/src/pages`
4. Add missing routes to `App.tsx`
5. Wire up state management and API integration

See `COMPONENT_INVENTORY.md` for detailed architecture and component breakdown.
