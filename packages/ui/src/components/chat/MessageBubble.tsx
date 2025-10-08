import { User, Bot } from "lucide-react";
import { AudioPlayer } from "../audio/AudioPlayer";
import { cn } from "../../lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  audioUrl?: string;
}

export interface MessageBubbleProps {
  message: Message;
  onPlayAudio?: (audioUrl: string) => void;
  className?: string;
}

export function MessageBubble({ message, onPlayAudio: _onPlayAudio, className }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-in fade-in slide-in-from-left-5 duration-300",
        isUser && "flex-row-reverse",
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          isUser
            ? "bg-accent-blue text-bg-primary"
            : "bg-accent-purple text-bg-primary"
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div
          className={cn(
            "rounded-lg border p-4",
            isUser
              ? "bg-accent-blue/10 border-accent-blue/30"
              : "bg-bg-secondary border-border"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm text-text-primary">
              {isUser ? "You" : "Assistant"}
            </span>
            <span className="text-xs text-text-tertiary">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {/* Message Text */}
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Audio Player */}
          {message.audioUrl && (
            <div className="mt-3">
              <AudioPlayer audioUrl={message.audioUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
