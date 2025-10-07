import type { IPlatform, IApiClient } from "./types";
import type { ApiKeys, Conversation, Message, Settings } from "@stt-mcp/shared";

/**
 * Web API Client
 * Makes HTTP requests to Elysia backend
 */
class WebApiClient implements IApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getConversations(): Promise<Conversation[]> {
    return this.fetch<Conversation[]>("/api/conversations");
  }

  async getConversation(id: string): Promise<Conversation> {
    return this.fetch<Conversation>(`/api/conversations/${id}`);
  }

  async createConversation(conversation: Partial<Conversation>): Promise<Conversation> {
    return this.fetch<Conversation>("/api/conversations", {
      method: "POST",
      body: JSON.stringify(conversation),
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await this.fetch<void>(`/api/conversations/${id}`, { method: "DELETE" });
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.fetch<Message[]>(`/api/conversations/${conversationId}/messages`);
  }

  async sendAudio(conversationId: string, audioData: ArrayBuffer): Promise<Message> {
    const response = await fetch(`${this.baseUrl}/api/conversations/${conversationId}/audio`, {
      method: "POST",
      body: audioData,
      headers: {
        "Content-Type": "audio/webm",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getSettings(): Promise<Settings> {
    return this.fetch<Settings>("/api/settings");
  }

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    await this.fetch<void>("/api/settings", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });
  }

  async setApiKeys(conversationId: string, apiKeys: ApiKeys): Promise<void> {
    await this.fetch<void>(`/api/conversations/${conversationId}/keys`, {
      method: "POST",
      body: JSON.stringify(apiKeys),
    });
  }
}

/**
 * Web Platform Implementation
 */
export class WebPlatform implements IPlatform {
  readonly isElectron = false;
  readonly isWeb = true;
  readonly apiClient: IApiClient;

  private hotkeyListeners = new Map<string, () => void>();
  private audioElement: HTMLAudioElement | null = null;
  private baseUrl: string;

  constructor(backendUrl: string = "http://localhost:3000") {
    this.baseUrl = backendUrl;
    this.apiClient = new WebApiClient(backendUrl);
  }

  async registerHotkey(key: string, callback: () => void): Promise<void> {
    // Browser keyboard events - only work when window is focused
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        e.preventDefault();
        callback();
      }
    };

    this.hotkeyListeners.set(key, callback);
    document.addEventListener("keydown", handler as EventListener);
  }

  async unregisterHotkey(key: string): Promise<void> {
    this.hotkeyListeners.delete(key);
    // Note: In production, we'd need to keep track of the handler to remove it properly
  }

  showNotification(title: string, body: string): void {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  }

  // Audio Storage (Web sends to backend)
  async saveAudioFile(
    filename: string,
    audioBlob: Blob,
    conversationId: string
  ): Promise<string> {
    // Upload audio to backend
    const formData = new FormData();
    formData.append("audio", audioBlob, filename);
    formData.append("conversationId", conversationId);

    const response = await fetch(`${this.baseUrl}/api/audio/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload audio: ${response.statusText}`);
    }

    const { url } = await response.json();
    return url;
  }

  getAudioUrl(filename: string, conversationId: string): string {
    // Return backend URL for audio file
    return `${this.baseUrl}/api/audio/${conversationId}/${filename}`;
  }

  // Audio Playback (HTML5 Audio)
  async playAudio(audioUrl: string): Promise<void> {
    // Stop current audio if playing
    await this.stopAudio();

    // Create new audio element
    this.audioElement = new Audio(audioUrl);

    return new Promise((resolve, reject) => {
      if (!this.audioElement) {
        reject(new Error("Failed to create audio element"));
        return;
      }

      this.audioElement.onended = () => {
        resolve();
      };

      this.audioElement.onerror = () => {
        reject(new Error("Audio playback error"));
      };

      this.audioElement.play().catch(reject);
    });
  }

  async stopAudio(): Promise<void> {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
  }

  async pauseAudio(): Promise<void> {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  async resumeAudio(): Promise<void> {
    if (this.audioElement) {
      await this.audioElement.play();
    }
  }
}
