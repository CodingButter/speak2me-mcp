import type { IPlatform, IApiClient } from "./types";
import type { ApiKeys, Conversation, Message, Settings } from "@stt-mcp/shared";

/**
 * Electron API Client
 * Calls core functions via IPC instead of HTTP
 */
class ElectronApiClient implements IApiClient {
  async getConversations(): Promise<Conversation[]> {
    // TODO: Call Electron IPC
    // return window.electronAPI.getConversations();
    return [];
  }

  async getConversation(id: string): Promise<Conversation> {
    // TODO: Call Electron IPC
    // return window.electronAPI.getConversation(id);
    throw new Error("Not implemented");
  }

  async createConversation(conversation: Partial<Conversation>): Promise<Conversation> {
    // TODO: Call Electron IPC
    throw new Error("Not implemented");
  }

  async deleteConversation(id: string): Promise<void> {
    // TODO: Call Electron IPC
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    // TODO: Call Electron IPC
    return [];
  }

  async sendAudio(conversationId: string, audioData: ArrayBuffer): Promise<Message> {
    // TODO: Call Electron IPC
    throw new Error("Not implemented");
  }

  async getSettings(): Promise<Settings> {
    // TODO: Call Electron IPC
    throw new Error("Not implemented");
  }

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    // TODO: Call Electron IPC
  }

  async setApiKeys(conversationId: string, apiKeys: ApiKeys): Promise<void> {
    // TODO: Call Electron IPC
  }

  async updateMCPConfig(projectPath: string, conversationId: string): Promise<void> {
    // TODO: Call Electron IPC to update .mcp.json
  }
}

/**
 * Electron Platform Implementation
 */
export class ElectronPlatform implements IPlatform {
  readonly isElectron = true;
  readonly isWeb = false;
  readonly apiClient: IApiClient;

  constructor() {
    this.apiClient = new ElectronApiClient();
  }

  async registerHotkey(key: string, callback: () => void): Promise<void> {
    // TODO: Use Electron globalShortcut API via IPC
    // window.electronAPI.registerGlobalShortcut(key, callback);
  }

  async unregisterHotkey(key: string): Promise<void> {
    // TODO: Use Electron globalShortcut API via IPC
  }

  async readFile(path: string): Promise<string> {
    // TODO: Call Electron IPC
    // return window.electronAPI.readFile(path);
    return "";
  }

  async writeFile(path: string, content: string): Promise<void> {
    // TODO: Call Electron IPC
  }

  async pickDirectory(): Promise<string | null> {
    // TODO: Call Electron dialog API via IPC
    return null;
  }

  showNotification(title: string, body: string): void {
    // TODO: Use Electron Notification API
    new Notification(title, { body });
  }
}
