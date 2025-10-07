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
    // Use Electron globalShortcut API via IPC (works even when app not focused)
    // @ts-ignore - electronAPI injected by preload script
    if (window.electronAPI?.registerGlobalShortcut) {
      // @ts-ignore
      await window.electronAPI.registerGlobalShortcut(key, callback);
    }
  }

  async unregisterHotkey(key: string): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.unregisterGlobalShortcut) {
      // @ts-ignore
      await window.electronAPI.unregisterGlobalShortcut(key);
    }
  }

  async readFile(path: string): Promise<string> {
    // @ts-ignore
    if (window.electronAPI?.readFile) {
      // @ts-ignore
      return await window.electronAPI.readFile(path);
    }
    return "";
  }

  async writeFile(path: string, content: string): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.writeFile) {
      // @ts-ignore
      await window.electronAPI.writeFile(path, content);
    }
  }

  async pickDirectory(): Promise<string | null> {
    // @ts-ignore
    if (window.electronAPI?.pickDirectory) {
      // @ts-ignore
      return await window.electronAPI.pickDirectory();
    }
    return null;
  }

  showNotification(title: string, body: string): void {
    // Electron has native notification support
    // @ts-ignore
    if (window.electronAPI?.showNotification) {
      // @ts-ignore
      window.electronAPI.showNotification(title, body);
    } else {
      new Notification(title, { body });
    }
  }

  // Audio Storage (Electron saves to disk directly via Node.js fs)
  async saveAudioFile(
    filename: string,
    audioBlob: Blob,
    conversationId: string
  ): Promise<string> {
    // Convert blob to buffer
    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // @ts-ignore
    if (window.electronAPI?.saveAudioFile) {
      // @ts-ignore
      return await window.electronAPI.saveAudioFile(filename, buffer, conversationId);
    }

    throw new Error("Electron API not available");
  }

  getAudioUrl(filename: string, conversationId: string): string {
    // Return file:// URL for local audio file
    // @ts-ignore
    if (window.electronAPI?.getAudioPath) {
      // @ts-ignore
      const path = window.electronAPI.getAudioPath(conversationId, filename);
      return `file://${path}`;
    }
    return "";
  }

  async deleteAudioFile(filename: string, conversationId: string): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.deleteAudioFile) {
      // @ts-ignore
      await window.electronAPI.deleteAudioFile(conversationId, filename);
    }
  }

  // Audio Playback (Electron can use native audio APIs)
  async playAudio(audioUrl: string): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.playAudio) {
      // @ts-ignore
      await window.electronAPI.playAudio(audioUrl);
    } else {
      // Fallback to HTML5 Audio
      const audio = new Audio(audioUrl);
      await audio.play();
    }
  }

  async stopAudio(): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.stopAudio) {
      // @ts-ignore
      await window.electronAPI.stopAudio();
    }
  }

  async pauseAudio(): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.pauseAudio) {
      // @ts-ignore
      await window.electronAPI.pauseAudio();
    }
  }

  async resumeAudio(): Promise<void> {
    // @ts-ignore
    if (window.electronAPI?.resumeAudio) {
      // @ts-ignore
      await window.electronAPI.resumeAudio();
    }
  }
}
