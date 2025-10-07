import { z } from "zod";
import {
  speakInputSchema,
  speakOutputSchema,
  listenInputSchema,
  listenOutputSchema,
  apiKeysSchema,
  messageSchema,
  conversationSchema,
  settingsSchema,
} from "./schemas";

// MCP Tool Types
export type SpeakInput = z.infer<typeof speakInputSchema>;
export type SpeakOutput = z.infer<typeof speakOutputSchema>;
export type ListenInput = z.infer<typeof listenInputSchema>;
export type ListenOutput = z.infer<typeof listenOutputSchema>;

// API Types
export type ApiKeys = z.infer<typeof apiKeysSchema>;
export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type Settings = z.infer<typeof settingsSchema>;

// Session Types
export type SessionInfo = {
  id: string;
  conversationId: string;
  connectedAt: number;
  lastActivityAt: number;
  apiKeys?: ApiKeys;
};

// WebSocket Event Types
export type WSEvent =
  | {
      type: "message:new";
      payload: Message;
    }
  | {
      type: "conversation:updated";
      payload: Conversation;
    }
  | {
      type: "session:connected";
      payload: SessionInfo;
    }
  | {
      type: "session:disconnected";
      payload: { sessionId: string };
    }
  | {
      type: "error";
      payload: { message: string; code?: string };
    };
