import { useState } from "react";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  controls: React.ReactNode;
}

/**
 * Responsive Layout Component
 * Optimized for compact windows (256px+)
 *
 * Breakpoint behavior:
 * - xs (256px+): Sidebar hidden by default, overlay when opened
 * - sm (384px+): Sidebar hidden by default, overlay when opened
 * - md (512px+): Sidebar visible, collapsible
 * - lg (768px+): Sidebar always visible
 */

// TODO: Create Diagnostics Panel component
// Project Scope: §5.2.3 (Diagnostics Panel)
// Should be accessible via Settings or main menu
// Features to include:
// 1. Real-time metrics charts:
//    - End-to-end latency (line chart over time)
//    - Audio-seconds sent (bar chart per session)
//    - Chunk count (bar chart)
//    - Error rate (percentage, color-coded)
// 2. Logs viewer:
//    - Last 100 logs with filter by category:
//      audio, STT, TTS, SSML, MCP, backend
//    - Log level filter: debug, info, warn, error
//    - Search/filter by text
//    - Copy logs to clipboard
//    - Export logs as JSON
// 3. Connection status:
//    - MCP sessions active (count, list of IDs)
//    - WebSocket/SSE health (connected/disconnected/reconnecting)
//    - Backend API reachability (ping test button)
//    - API keys status (configured/missing per service)
// 4. Device tests:
//    - Mic check: Record 3s → play back → verify works
//    - Speaker check: Play test tone → user confirms hearing
//    - Device list: Show available input/output devices
//    - VAD test: Live meter showing speech detection
// 5. Performance info:
//    - Browser info (user agent, WebRTC support)
//    - Audio API support (getUserMedia, MediaRecorder, VAD)
//    - Network info (online/offline, connection type)
// Implementation:
// - Use Chart.js or Recharts for charts
// - Virtual scrolling for logs (react-window)
// - WebSocket for real-time metrics updates
// - Store metrics in IndexedDB for persistence
// File: Create apps/frontend/src/components/Diagnostics.tsx
// assignees: codingbutter
// labels: enhancement, frontend
// milestone: MVP Launch

// TODO: Add multi-session conversation switcher to sidebar
// Project Scope: §5.2.1 (Main Layout - Conversation List)
// Currently sidebar shows placeholder content
// Should display:
// - List of all active MCP sessions (conversations)
// - Each item shows:
//   - Session name/ID
//   - Last message timestamp
//   - Unread indicator (if new messages since last view)
//   - Active indicator (currently selected)
// - Click to switch between conversations
// - "New Conversation" button (for manual testing)
// - Search/filter conversations
// Implementation:
// - Fetch from /api/conversations
// - Subscribe to WebSocket for real-time updates
// - Persist selected conversation in localStorage
// - Show loading state while fetching
// labels: enhancement, frontend

export function Layout({ sidebar, main, controls }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header with menu toggle (hidden on lg+) */}
      <header className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-border">
        <h1 className="text-sm font-semibold">STT MCP</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-accent rounded-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            absolute lg:relative z-20
            h-full lg:h-auto
            w-64 lg:w-56
            bg-card border-r border-border
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {sidebar}
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden absolute inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat/Content area */}
          <main className="flex-1 overflow-auto">{main}</main>

          {/* Audio controls (bottom bar) */}
          <div className="border-t border-border bg-card">
            {controls}
          </div>
        </div>
      </div>
    </div>
  );
}
