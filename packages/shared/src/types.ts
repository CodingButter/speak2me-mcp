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
  todoCreateInputSchema,
  todoUpdateInputSchema,
  todoListInputSchema,
  todoArchiveInputSchema,
  todoDeleteInputSchema,
  todoSchema,
  todoOutputSchema,
  todoStatusSchema,
  prioritySchema,
  projectLinkInputSchema,
  projectContextSchema,
  projectLinkOutputSchema,
  claudeChatInputSchema,
  claudeChatOutputSchema,
} from "./schemas";

// MCP Tool Types
export type SpeakInput = z.infer<typeof speakInputSchema>;
export type SpeakOutput = z.infer<typeof speakOutputSchema>;
export type ListenInput = z.infer<typeof listenInputSchema>;
export type ListenOutput = z.infer<typeof listenOutputSchema>;

// TODO Tool Types
export type TodoCreateInput = z.infer<typeof todoCreateInputSchema>;
export type TodoUpdateInput = z.infer<typeof todoUpdateInputSchema>;
export type TodoListInput = z.infer<typeof todoListInputSchema>;
export type TodoArchiveInput = z.infer<typeof todoArchiveInputSchema>;
export type TodoDeleteInput = z.infer<typeof todoDeleteInputSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type TodoOutput = z.infer<typeof todoOutputSchema>;
export type TodoStatus = z.infer<typeof todoStatusSchema>;
export type Priority = z.infer<typeof prioritySchema>;

// Project Link Tool Types
export type ProjectLinkInput = z.infer<typeof projectLinkInputSchema>;
export type ProjectContext = z.infer<typeof projectContextSchema>;
export type ProjectLinkOutput = z.infer<typeof projectLinkOutputSchema>;

// Claude Chat Tool Types
export type ClaudeChatInput = z.infer<typeof claudeChatInputSchema>;
export type ClaudeChatOutput = z.infer<typeof claudeChatOutputSchema>;

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
