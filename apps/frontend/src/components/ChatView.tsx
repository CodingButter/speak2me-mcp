import { useEffect, useRef } from "react";
import { User, Bot, Play } from "lucide-react";
import type { Message } from "@s2m-pac/shared";

interface ChatViewProps {
  messages: Message[];
  onPlayAudio?: (audioUrl: string) => void;
}

/**
 * Chat View Component
 * Displays message history with audio playback
 * Responsive: stacks on small screens, adapts text size
 */
// TODO: Add conversation export functionality
// Project Scope: §3.1 (Export conversations - JSON, Markdown)
// Add prop: onExport?: (format: "json" | "markdown") => void
// UI: Add toolbar above messages with export buttons
// Implementation:
// - JSON export: Serialize full conversation with all metadata
// - Markdown export: Format as readable chat transcript
// - Include audio URLs (or embed as base64 if offline export)
// - Save to file using download link or File System API
// labels: enhancement, frontend

// TODO: Add copy message functionality
// Allow copying individual messages or entire conversation
// UI: Add copy button to each message bubble
// Use navigator.clipboard.writeText()
// labels: enhancement, frontend

export function ChatView({ messages, onPlayAudio }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No messages yet</p>
          <p className="text-xs mt-1">Start speaking or connect an MCP client</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto p-3 sm:p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 sm:gap-3 ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Avatar */}
          <div
            className={`
              w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full flex items-center justify-center
              ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }
            `}
          >
            {message.role === "user" ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>

          {/* Message content */}
          <div
            className={`
              flex-1 min-w-0
              ${message.role === "user" ? "text-right" : ""}
            `}
          >
            <div
              className={`
                inline-block max-w-full px-3 py-2 rounded-lg text-sm
                ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }
              `}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>

              {/* Audio player */}
              {message.audioUrl && (
                <button
                  onClick={() => onPlayAudio?.(message.audioUrl!)}
                  className="mt-2 flex items-center gap-1.5 text-xs opacity-75 hover:opacity-100 transition-opacity"
                >
                  <Play className="w-3 h-3" />
                  <span>Play audio</span>
                </button>
              )}

              {/* TODO: Add metadata toggle for message details */}
              {/* Project Scope: §5.2.1 (Chat View - metadata toggle) */}
              {/* Show expandable section with: */}
              {/* - SSML used (if assistant message) */}
              {/* - Metrics: ttfbMs, totalMs, audioSecSent, chunks, latencyMs */}
              {/* - Timestamp (full format) */}
              {/* - Audio duration */}
              {/* - Cost estimate (based on audio-seconds) */}
              {/* Implementation: Add <Collapsible> or details/summary element */}
              {/* labels: enhancement, frontend */}
            </div>

            {/* Timestamp */}
            <div
              className={`
                text-xs text-muted-foreground mt-1 px-1
                ${message.role === "user" ? "text-right" : ""}
              `}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
