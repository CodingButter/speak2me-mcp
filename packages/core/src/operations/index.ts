import type { PrismaStorage } from "@stt-mcp/database";
import type { Conversation, Message, Settings, ApiKeys } from "@stt-mcp/shared";

/**
 * Core Operations
 * All business logic for conversations, messages, settings
 * Elysia/Electron call these functions instead of accessing storage directly
 */

export class CoreOperations {
  constructor(private storage: PrismaStorage) {}

  // Conversations
  async getConversations(): Promise<Conversation[]> {
    return await this.storage.getAllConversations();
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return await this.storage.getConversation(id);
  }

  async createConversation(data: { id?: string; name?: string }): Promise<Conversation> {
    return await this.storage.createConversation({
      id: data.id || crypto.randomUUID(),
      name: data.name,
      messageCount: 0,
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await this.storage.deleteConversation(id);
  }

  // Messages
  async getMessages(conversationId: string): Promise<Message[]> {
    return await this.storage.getMessagesByConversation(conversationId);
  }

  async createMessage(data: {
    conversationId: string;
    role: "user" | "assistant";
    content: string;
    audioUrl?: string;
    ssmlUsed?: string;
    metrics?: any;
  }): Promise<Message> {
    return await this.storage.createMessage(data);
  }

  // Settings
  async getSettings(): Promise<Settings> {
    return await this.storage.getSettings();
  }

  async updateSettings(updates: Partial<Settings>): Promise<void> {
    await this.storage.updateSettings(updates);
  }

  // API Keys
  async getApiKeys(conversationId: string): Promise<ApiKeys | null> {
    return await this.storage.getApiKeys(conversationId);
  }

  async setApiKeys(conversationId: string, keys: ApiKeys): Promise<void> {
    await this.storage.setApiKeys(conversationId, keys);
  }

  // Voice Config
  async getVoiceConfig(conversationId: string) {
    return await this.storage.getVoiceConfig(conversationId);
  }

  async setVoiceConfig(conversationId: string, config: any): Promise<void> {
    await this.storage.setVoiceConfig(conversationId, config);
  }

  // Audio processing
  async processAudio(
    conversationId: string,
    audioData: ArrayBuffer,
    apiKeys: ApiKeys
  ): Promise<Message> {
    // TODO: Implement VAD + chunking + Gemini STT
    // For now, create placeholder message
    const message = await this.createMessage({
      conversationId,
      role: "user",
      content: "[Audio transcription pending]",
    });

    return message;
  }
}
