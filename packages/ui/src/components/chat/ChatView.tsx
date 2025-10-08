import { useEffect, useRef } from "react";
import { MessageBubble, Message } from "./MessageBubble";
import { cn } from "../../lib/utils";

export interface ChatViewProps {
  messages: Message[];
  onPlayAudio?: (audioUrl: string) => void;
  className?: string;
}

export function ChatView({ messages, onPlayAudio, className }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-text-primary">
                No messages yet
              </p>
              <p className="text-sm text-text-secondary">
                Start a conversation by recording your voice
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onPlayAudio={onPlayAudio}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}
