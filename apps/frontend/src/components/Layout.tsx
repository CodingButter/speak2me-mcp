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
