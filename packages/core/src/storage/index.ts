import type { Conversation, Message, Settings } from "@stt-mcp/shared";

/**
 * Storage interface for conversations and messages
 * Can be implemented with SQLite, PostgreSQL, filesystem, etc.
 */

export interface IStorage {
  // Conversations
  createConversation(conversation: Omit<Conversation, "createdAt" | "updatedAt">): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | null>;
  getAllConversations(): Promise<Conversation[]>;
  updateConversation(id: string, updates: Partial<Conversation>): Promise<void>;
  deleteConversation(id: string): Promise<void>;

  // Messages
  createMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message>;
  getMessage(id: string): Promise<Message | null>;
  getMessagesByConversation(conversationId: string): Promise<Message[]>;
  deleteMessage(id: string): Promise<void>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(settings: Partial<Settings>): Promise<void>;
}

/**
 * In-memory storage implementation (for development/testing)
 */
export class InMemoryStorage implements IStorage {
  private conversations = new Map<string, Conversation>();
  private messages = new Map<string, Message>();
  private settings: Settings | null = null;

  async createConversation(conversation: Omit<Conversation, "createdAt" | "updatedAt">): Promise<Conversation> {
    const now = Date.now();
    const newConversation: Conversation = {
      ...conversation,
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(newConversation.id, newConversation);
    return newConversation;
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return this.conversations.get(id) || null;
  }

  async getAllConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values());
  }

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<void> {
    const conversation = this.conversations.get(id);
    if (conversation) {
      Object.assign(conversation, updates, { updatedAt: Date.now() });
    }
  }

  async deleteConversation(id: string): Promise<void> {
    this.conversations.delete(id);
    // Delete associated messages
    for (const [msgId, msg] of this.messages.entries()) {
      if (msg.conversationId === id) {
        this.messages.delete(msgId);
      }
    }
  }

  async createMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    this.messages.set(newMessage.id, newMessage);

    // Update conversation message count
    const conversation = this.conversations.get(message.conversationId);
    if (conversation) {
      conversation.messageCount++;
      conversation.updatedAt = Date.now();
    }

    return newMessage;
  }

  async getMessage(id: string): Promise<Message | null> {
    return this.messages.get(id) || null;
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((msg) => msg.conversationId === conversationId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async deleteMessage(id: string): Promise<void> {
    const message = this.messages.get(id);
    if (message) {
      this.messages.delete(id);
      const conversation = this.conversations.get(message.conversationId);
      if (conversation && conversation.messageCount > 0) {
        conversation.messageCount--;
      }
    }
  }

  async getSettings(): Promise<Settings> {
    if (!this.settings) {
      // Return default settings
      this.settings = {
        inputDeviceId: undefined,
        sampleRate: 48000,
        noiseSuppressionEnabled: true,
        vadThreshold: 0.5,
        minSilenceMs: 500,
        maxUtteranceMs: 15000,
        minSpeechMs: 200,
        trimLongSilences: true,
        maxChunkLengthMs: 20000,
        sttProvider: "gemini",
        sttModel: "gemini-1.5-flash",
        sttLocale: "en-US",
        sttEncoding: "webm",
        sendPartials: false,
        ttsProvider: "elevenlabs",
        ttsVoiceId: undefined,
        ttsModel: "eleven_flash_v2",
        ttsStreamPlayback: true,
        ttsAutoplay: true,
        ssmlEnabled: true,
        ssmlModel: "gpt-4o-mini",
        ssmlEnableProsody: true,
        ssmlEnableEmphasis: true,
        ssmlEnablePhonemes: false,
        ssmlFormality: "neutral",
        ssmlMaxBreaksPer100Words: 3,
        defaultMode: "manual",
        autoSendInAutoMode: true,
        pttKeybinding: "Space",
        keepConversationHistory: true,
        retentionDays: 30,
        loggingLevel: "info",
        metricsEnabled: true,
        backendUrl: "http://localhost:3000",
      };
    }
    return this.settings;
  }

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    const current = await this.getSettings();
    this.settings = { ...current, ...settings };
  }
}
