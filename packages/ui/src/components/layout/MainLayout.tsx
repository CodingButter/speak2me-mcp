import { ReactNode } from "react"
import { cn } from "../../lib/utils"

export interface MainLayoutProps {
  topBar?: ReactNode
  sidebar?: ReactNode
  bottomBar?: ReactNode
  children: ReactNode
  className?: string
}

export function MainLayout({ topBar, sidebar, bottomBar, children, className }: MainLayoutProps) {
  return (
    <div className={cn("flex flex-col h-screen bg-bg-primary", className)}>
      {/* Top Bar */}
      {topBar}

      {/* Main Layout - Row on desktop, Column on mobile */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        {sidebar}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {/* Background overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
            style={{
              backgroundImage:
                "url('https://unsplash.com/photos/closeup-photo-of-computer-code-screengrab-SXihyA4oEJs')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="relative z-10">{children}</div>
        </main>
      </div>

      {/* Bottom Bar */}
      {bottomBar}
    </div>
  )
}
