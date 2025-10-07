import type { Conversation, Message, Settings, ApiKeys } from "@stt-mcp/shared";
import { settingsSchema } from "@stt-mcp/shared";
import { prisma } from "./client";

/**
 * Prisma implementation of IStorage interface
 * Handles all database operations for conversations, messages, settings, API keys
 */

export class PrismaStorage {
  // Conversations
  async createConversation(
    conversation: Omit<Conversation, "createdAt" | "updatedAt">
  ): Promise<Conversation> {
    const created = await prisma.conversation.create({
      data: {
        id: conversation.id,
        name: conversation.name,
        messageCount: conversation.messageCount || 0,
      },
    });

    return {
      id: created.id,
      name: created.name || undefined,
      createdAt: created.createdAt.getTime(),
      updatedAt: created.updatedAt.getTime(),
      messageCount: created.messageCount,
    };
  }

  async getConversation(id: string): Promise<Conversation | null> {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!conversation) return null;

    return {
      id: conversation.id,
      name: conversation.name || undefined,
      createdAt: conversation.createdAt.getTime(),
      updatedAt: conversation.updatedAt.getTime(),
      messageCount: conversation.messageCount,
    };
  }

  async getAllConversations(): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return conversations.map((c) => ({
      id: c.id,
      name: c.name || undefined,
      createdAt: c.createdAt.getTime(),
      updatedAt: c.updatedAt.getTime(),
      messageCount: c.messageCount,
    }));
  }

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<void> {
    await prisma.conversation.update({
      where: { id },
      data: {
        name: updates.name,
        messageCount: updates.messageCount,
      },
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await prisma.conversation.delete({
      where: { id },
    });
  }

  // Messages
  async createMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    const created = await prisma.message.create({
      data: {
        conversationId: message.conversationId,
        role: message.role,
        content: message.content,
        audioUrl: message.audioUrl,
        ssmlUsed: message.ssmlUsed,
        metrics: message.metrics ? JSON.stringify(message.metrics) : undefined,
      },
    });

    // Increment conversation message count
    await prisma.conversation.update({
      where: { id: message.conversationId },
      data: { messageCount: { increment: 1 } },
    });

    return {
      id: created.id,
      conversationId: created.conversationId,
      role: created.role as "user" | "assistant",
      content: created.content,
      audioUrl: created.audioUrl || undefined,
      ssmlUsed: created.ssmlUsed || undefined,
      timestamp: created.timestamp.getTime(),
      metrics: created.metrics ? JSON.parse(created.metrics) : undefined,
    };
  }

  async getMessage(id: string): Promise<Message | null> {
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (!message) return null;

    return {
      id: message.id,
      conversationId: message.conversationId,
      role: message.role as "user" | "assistant",
      content: message.content,
      audioUrl: message.audioUrl || undefined,
      ssmlUsed: message.ssmlUsed || undefined,
      timestamp: message.timestamp.getTime(),
      metrics: message.metrics ? JSON.parse(message.metrics) : undefined,
    };
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: "asc" },
    });

    return messages.map((m) => ({
      id: m.id,
      conversationId: m.conversationId,
      role: m.role as "user" | "assistant",
      content: m.content,
      audioUrl: m.audioUrl || undefined,
      ssmlUsed: m.ssmlUsed || undefined,
      timestamp: m.timestamp.getTime(),
      metrics: m.metrics ? JSON.parse(m.metrics) : undefined,
    }));
  }

  async deleteMessage(id: string): Promise<void> {
    const message = await prisma.message.findUnique({ where: { id } });
    if (message) {
      await prisma.message.delete({ where: { id } });
      await prisma.conversation.update({
        where: { id: message.conversationId },
        data: { messageCount: { decrement: 1 } },
      });
    }
  }

  // Settings
  async getSettings(): Promise<Settings> {
    let settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 1 },
      });
    }

    // Convert to Settings type
    return settingsSchema.parse({
      inputDeviceId: settings.inputDeviceId,
      sampleRate: settings.sampleRate,
      noiseSuppressionEnabled: settings.noiseSuppressionEnabled,
      vadThreshold: settings.vadThreshold,
      minSilenceMs: settings.minSilenceMs,
      maxUtteranceMs: settings.maxUtteranceMs,
      minSpeechMs: settings.minSpeechMs,
      trimLongSilences: settings.trimLongSilences,
      maxChunkLengthMs: settings.maxChunkLengthMs,
      sttProvider: settings.sttProvider,
      sttModel: settings.sttModel,
      sttLocale: settings.sttLocale,
      sttEncoding: settings.sttEncoding,
      sendPartials: settings.sendPartials,
      ttsProvider: settings.ttsProvider,
      ttsVoiceId: settings.ttsVoiceId,
      ttsModel: settings.ttsModel,
      ttsStreamPlayback: settings.ttsStreamPlayback,
      ttsAutoplay: settings.ttsAutoplay,
      ssmlEnabled: settings.ssmlEnabled,
      ssmlModel: settings.ssmlModel,
      ssmlEnableProsody: settings.ssmlEnableProsody,
      ssmlEnableEmphasis: settings.ssmlEnableEmphasis,
      ssmlEnablePhonemes: settings.ssmlEnablePhonemes,
      ssmlFormality: settings.ssmlFormality as "casual" | "neutral" | "formal",
      ssmlMaxBreaksPer100Words: settings.ssmlMaxBreaksPer100Words,
      defaultMode: settings.defaultMode as "auto" | "manual" | "ptt",
      autoSendInAutoMode: settings.autoSendInAutoMode,
      pttKeybinding: settings.pttKeybinding,
      keepConversationHistory: settings.keepConversationHistory,
      retentionDays: settings.retentionDays,
      loggingLevel: settings.loggingLevel as "debug" | "info" | "warn" | "error",
      metricsEnabled: settings.metricsEnabled,
      backendUrl: settings.backendUrl,
    });
  }

  async updateSettings(updates: Partial<Settings>): Promise<void> {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: updates,
      create: { id: 1, ...updates },
    });
  }

  // API Keys
  async getApiKeys(conversationId: string): Promise<ApiKeys | null> {
    const apiKey = await prisma.apiKey.findUnique({
      where: { conversationId },
    });

    if (!apiKey) return null;

    return {
      openai: apiKey.openai || undefined,
      elevenlabs: apiKey.elevenlabs || undefined,
      gemini: apiKey.gemini || undefined,
    };
  }

  async setApiKeys(conversationId: string, apiKeys: ApiKeys): Promise<void> {
    await prisma.apiKey.upsert({
      where: { conversationId },
      update: apiKeys,
      create: {
        conversationId,
        ...apiKeys,
      },
    });
  }

  // Voice Config
  async getVoiceConfig(conversationId: string) {
    return await prisma.voiceConfig.findUnique({
      where: { conversationId },
    });
  }

  async setVoiceConfig(conversationId: string, config: any): Promise<void> {
    await prisma.voiceConfig.upsert({
      where: { conversationId },
      update: config,
      create: {
        conversationId,
        ...config,
      },
    });
  }
}

export const storage = new PrismaStorage();
