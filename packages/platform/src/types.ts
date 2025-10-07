import type { ApiKeys, Conversation, Message, Settings } from "@stt-mcp/shared";

/**
 * Platform Interface
 * Defines environment-specific capabilities
 */

export interface IPlatform {
  // Environment detection
  readonly isElectron: boolean;
  readonly isWeb: boolean;

  // Hotkey management
  registerHotkey(key: string, callback: () => void): Promise<void>;
  unregisterHotkey(key: string): Promise<void>;

  // File system operations (Electron only)
  readFile?(path: string): Promise<string>;
  writeFile?(path: string, content: string): Promise<void>;
  pickDirectory?(): Promise<string | null>;

  // Notifications
  showNotification(title: string, body: string): void;

  // API Client
  apiClient: IApiClient;
}

/**
 * API Client Interface
 * Web: HTTP requests to backend
 * Electron: IPC calls to embedded core
 */

export interface IApiClient {
  // Conversations
  getConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation>;
  createConversation(conversation: Partial<Conversation>): Promise<Conversation>;
  deleteConversation(id: string): Promise<void>;

  // Messages
  getMessages(conversationId: string): Promise<Message[]>;
  sendAudio(conversationId: string, audioData: ArrayBuffer): Promise<Message>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(settings: Partial<Settings>): Promise<void>;

  // API Keys
  setApiKeys(conversationId: string, apiKeys: ApiKeys): Promise<void>;

  // MCP Config (Electron only)
  updateMCPConfig?(projectPath: string, conversationId: string): Promise<void>;
}
