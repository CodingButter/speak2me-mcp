import React from "react";
import { LucideIcon, LayoutDashboard, MessageSquare, ListChecks, Activity, FileText, StickyNote, Settings as SettingsIcon, ChevronLeft, Plus, Server, Menu, Trash2, GripHorizontal, AlertTriangle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface Conversation {
  id: string;
  name?: string;
  updatedAt: number;
}

export interface SidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationClick: (conversationId: string) => void;
  onNewConversation?: () => void;
  onDeleteConversation?: (conversationId: string) => void;
  onConversationSettings?: (conversationId: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onMobileToggle?: () => void;
  className?: string;
  projectId?: string;
}

const defaultNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "tasks", label: "Tasks", icon: ListChecks, path: "/tasks" },
  { id: "notes", label: "Notes", icon: StickyNote, path: "/notes" },
  { id: "project", label: "Project", icon: SettingsIcon, path: "/project" },
  { id: "processes", label: "Processes", icon: Activity, path: "/processes" },
  { id: "system", label: "System", icon: Server, path: "/system" },
  { id: "logs", label: "Logs", icon: FileText, path: "/logs" },
];

export function Sidebar({
  conversations,
  activeConversationId,
  onConversationClick,
  onNewConversation,
  onDeleteConversation,
  onConversationSettings,
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileToggle,
  className,
  projectId,
}: SidebarProps) {
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const handleNavClick = () => {
    // Close mobile menu when a nav item is clicked
    if (onMobileToggle && mobileOpen) {
      onMobileToggle();
    }
  };

  const toggleMobile = () => {
    if (onMobileToggle) {
      onMobileToggle();
    }
  };

  // Compute nav items with project prefix if projectId is present
  const navItems = React.useMemo(() => {
    const prefix = projectId ? `/project/${projectId}` : "";
    return defaultNavItems.map(item => ({
      ...item,
      path: `${prefix}${item.path}`,
    }));
  }, [projectId]);

  // Find dashboard item for mobile
  const dashboardItem = navItems.find(item => item.id === "dashboard");

  return (
    <>
      {/* Mobile: Icon Bar (collapsed) or Full Sidebar (expanded) */}
      <div className={cn(
        "md:hidden",
        className
      )}>
        {!mobileOpen ? (
          // Mobile Icon Bar (hamburger, dashboard, chat)
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border-b border-border">
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleMobile}
              className="text-text-secondary hover:text-text-primary p-3"
            >
              <Menu className="w-7 h-7" />
            </Button>
            {dashboardItem && (
              <NavLink
                to={dashboardItem.path}
                className={({ isActive }) =>
                  cn(
                    "p-3 rounded transition-all",
                    "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                    isActive && "bg-accent-blue/10 text-accent-blue"
                  )
                }
              >
                <dashboardItem.icon className="w-7 h-7" />
              </NavLink>
            )}
          </div>
        ) : (
          // Mobile Expanded Sidebar
          <div className="flex flex-col bg-bg-secondary border-b border-border relative overflow-hidden max-h-96">
            {/* Background image overlay */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative z-10 flex flex-col">
              {/* Hamburger button at top */}
              <div className="flex justify-start p-3 border-b border-border">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleMobile}
                  className="text-text-secondary hover:text-text-primary p-3"
                >
                  <Menu className="w-7 h-7" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="py-4 overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      cn(
                        "w-full flex items-center gap-4 px-6 py-4 text-lg transition-all",
                        "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                        isActive &&
                          "bg-accent-blue/10 text-accent-blue border-l-4 border-accent-blue"
                      )
                    }
                  >
                    <item.icon className="w-8 h-8 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Normal Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-bg-secondary border-r border-border transition-all duration-300 relative overflow-hidden",
          collapsed ? "w-16" : "w-60",
          className
        )}
      >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Collapse toggle */}
        {onToggleCollapse && (
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="text-text-secondary hover:text-text-primary"
            >
              <ChevronLeft
                className={cn(
                  "w-4 h-4 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
          </div>
        )}

        {!collapsed ? (
          <PanelGroup direction="vertical" className="flex-1">
            {/* Navigation Panel */}
            <Panel defaultSize={60} minSize={30}>
              <nav className="h-full py-3 overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      cn(
                        "w-full flex items-center gap-3 px-5 py-3 text-sm transition-all",
                        "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                        isActive &&
                          "bg-accent-blue/10 text-accent-blue border-l-3 border-accent-blue"
                      )
                    }
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="h-6 bg-border hover:bg-accent-blue/30 transition-colors flex items-center justify-center group relative">
              <GripHorizontal className="w-4 h-4 text-text-tertiary group-hover:text-text-primary transition-colors" />
            </PanelResizeHandle>

            {/* Conversations Panel */}
            <Panel defaultSize={40} minSize={15} maxSize={70}>
              <div className="border-t border-border h-full flex flex-col">
                <div className="p-3 space-y-2 flex-1 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs uppercase font-semibold text-text-tertiary tracking-wide">
                      Conversations
                    </h3>
                    {onNewConversation && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNewConversation}
                        className="h-6 w-6 text-text-tertiary hover:text-text-primary"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1 overflow-y-auto flex-1">
                    {conversations.length === 0 ? (
                      <p className="text-xs text-text-tertiary py-2">No conversations yet</p>
                    ) : (
                      conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={cn(
                            "group relative w-full text-left px-2 py-2 rounded text-sm transition-all",
                            "text-text-secondary hover:bg-bg-hover",
                            activeConversationId === conv.id &&
                              "bg-accent-purple/15 text-accent-purple"
                          )}
                        >
                          <button
                            onClick={() => onConversationClick(conv.id)}
                            className="w-full text-left"
                          >
                            <div className="truncate pr-14">{conv.name || `Conversation ${conv.id.slice(0, 8)}`}</div>
                            <div className="text-xs text-text-tertiary">
                              {new Date(conv.updatedAt).toLocaleDateString()}
                            </div>
                          </button>
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                            {onConversationSettings && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onConversationSettings(conv.id);
                                }}
                                className="p-1 rounded hover:bg-accent-blue/10 hover:text-accent-blue transition-all"
                                aria-label="Conversation settings"
                              >
                                <SettingsIcon className="w-3 h-3" />
                              </button>
                            )}
                            {onDeleteConversation && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirmId(conv.id);
                                }}
                                className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                                aria-label="Delete conversation"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        ) : (
          // Collapsed view - just navigation
          <nav className="flex-1 py-3 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  cn(
                    "w-full flex items-center gap-3 px-5 py-3 text-sm transition-all",
                    "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                    isActive &&
                      "bg-accent-blue/10 text-accent-blue border-l-3 border-accent-blue"
                  )
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </div>

    {/* Delete Confirmation Modal */}
    {deleteConfirmId && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteConfirmId(null)}>
        <div className="bg-bg-primary border border-border rounded-lg p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Delete Conversation?</h3>
              <p className="text-sm text-text-secondary">
                This will permanently delete this conversation and all its messages. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (onDeleteConversation) {
                  onDeleteConversation(deleteConfirmId);
                }
                setDeleteConfirmId(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
