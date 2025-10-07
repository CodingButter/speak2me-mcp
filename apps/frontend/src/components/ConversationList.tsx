import { MessageSquare, Plus } from "lucide-react";
import type { Conversation } from "@stt-mcp/shared";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

/**
 * Conversation List Component
 * Optimized for compact sidebar (56px-256px)
 */
export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNew,
}: ConversationListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No conversations yet
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`
                  w-full flex items-start gap-2 px-3 py-2 rounded-md text-left
                  transition-colors
                  ${
                    activeId === conv.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }
                `}
              >
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {conv.name || "Untitled"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {conv.messageCount} messages
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
