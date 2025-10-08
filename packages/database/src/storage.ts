import type { Conversation, Message, Settings, ApiKeys } from "@s2m-pac/shared";
import { settingsSchema } from "@s2m-pac/shared";
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
        projectId: conversation.projectId,
      },
    });

    return {
      id: created.id,
      name: created.name || undefined,
      createdAt: created.createdAt.getTime(),
      updatedAt: created.updatedAt.getTime(),
      messageCount: created.messageCount,
      projectId: created.projectId || undefined,
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
      projectId: c.projectId || undefined,
    }));
  }

  async getConversationsByProject(projectId: string): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
      where: { projectId },
      orderBy: { updatedAt: "desc" },
    });

    return conversations.map((c) => ({
      id: c.id,
      name: c.name || undefined,
      createdAt: c.createdAt.getTime(),
      updatedAt: c.updatedAt.getTime(),
      messageCount: c.messageCount,
      projectId: c.projectId || undefined,
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

  // Projects
  async getAllProjects() {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || undefined,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  async getProject(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) return null;

    return {
      id: project.id,
      name: project.name,
      description: project.description || undefined,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };
  }

  async createProject(data: { name: string; description?: string }) {
    const created = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return {
      id: created.id,
      name: created.name,
      description: created.description || undefined,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
  }

  async updateProject(id: string, updates: { name?: string; description?: string }) {
    const updated = await prisma.project.update({
      where: { id },
      data: {
        name: updates.name,
        description: updates.description,
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      description: updated.description || undefined,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  async deleteProject(id: string) {
    await prisma.project.delete({
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

    // Fall back to environment variables if DB keys not found
    const envFallback: ApiKeys = {
      openai: process.env.OPENAI_API_KEY,
      elevenlabs: process.env.ELEVENLABS_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      anthropic: process.env.ANTHROPIC_API_KEY,
    };

    if (!apiKey) {
      // Return environment variables if any are set
      const hasAnyEnvKey = Object.values(envFallback).some(v => v);
      return hasAnyEnvKey ? envFallback : null;
    }

    // Merge DB keys with environment fallback (DB keys take precedence)
    return {
      openai: apiKey.openai || envFallback.openai || undefined,
      elevenlabs: apiKey.elevenlabs || envFallback.elevenlabs || undefined,
      gemini: apiKey.gemini || envFallback.gemini || undefined,
      anthropic: apiKey.anthropic || envFallback.anthropic || undefined,
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

  // Project Context
  async createProjectContext(data: {
    conversationId: string;
    projectPath: string;
    projectName: string;
    claudeMdPath?: string;
    devCommand?: string;
    buildCommand?: string;
    testCommand?: string;
  }) {
    return await prisma.projectContext.create({
      data,
    });
  }

  async getProjectContext(conversationId: string) {
    return await prisma.projectContext.findUnique({
      where: { conversationId },
    });
  }

  async updateProjectContext(
    conversationId: string,
    updates: {
      projectPath?: string;
      projectName?: string;
      claudeMdPath?: string;
      devCommand?: string;
      buildCommand?: string;
      testCommand?: string;
    }
  ) {
    return await prisma.projectContext.update({
      where: { conversationId },
      data: {
        ...updates,
        lastAccessedAt: new Date(),
      },
    });
  }

  async deleteProjectContext(conversationId: string) {
    await prisma.projectContext.delete({
      where: { conversationId },
    });
  }

  // Claude Configuration
  async getClaudeConfig(conversationId: string) {
    const config = await prisma.claudeConfig.findUnique({
      where: { conversationId },
    });

    if (!config) return null;

    return {
      id: config.id,
      conversationId: config.conversationId,
      systemPromptTemplate: config.systemPromptTemplate,
      voiceEnabled: config.voiceEnabled,
      voiceDirectives: config.voiceDirectives,
      model: config.model,
      maxTurns: config.maxTurns,
      permissionMode: config.permissionMode as "default" | "acceptEdits" | "bypassPermissions" | "plan",
      allowedTools: config.allowedTools ? JSON.parse(config.allowedTools) : null,
      disallowedTools: config.disallowedTools ? JSON.parse(config.disallowedTools) : null,
      mcpServers: config.mcpServers ? JSON.parse(config.mcpServers) : null,
      customInstructions: config.customInstructions,
      templateVars: config.templateVars ? JSON.parse(config.templateVars) : null,
      createdAt: config.createdAt.getTime(),
      updatedAt: config.updatedAt.getTime(),
    };
  }

  async setClaudeConfig(conversationId: string, input: any) {
    return await prisma.claudeConfig.upsert({
      where: { conversationId },
      update: {
        systemPromptTemplate: input.systemPromptTemplate,
        voiceEnabled: input.voiceEnabled,
        voiceDirectives: input.voiceDirectives,
        model: input.model,
        maxTurns: input.maxTurns,
        permissionMode: input.permissionMode,
        allowedTools: input.allowedTools ? JSON.stringify(input.allowedTools) : null,
        disallowedTools: input.disallowedTools ? JSON.stringify(input.disallowedTools) : null,
        mcpServers: input.mcpServers ? JSON.stringify(input.mcpServers) : null,
        customInstructions: input.customInstructions,
        templateVars: input.templateVars ? JSON.stringify(input.templateVars) : null,
      },
      create: {
        conversationId,
        systemPromptTemplate: input.systemPromptTemplate,
        voiceEnabled: input.voiceEnabled ?? false,
        voiceDirectives: input.voiceDirectives,
        model: input.model ?? "claude-sonnet-4-5-20250929",
        maxTurns: input.maxTurns ?? 10,
        permissionMode: input.permissionMode ?? "acceptEdits",
        allowedTools: input.allowedTools ? JSON.stringify(input.allowedTools) : null,
        disallowedTools: input.disallowedTools ? JSON.stringify(input.disallowedTools) : null,
        mcpServers: input.mcpServers ? JSON.stringify(input.mcpServers) : null,
        customInstructions: input.customInstructions,
        templateVars: input.templateVars ? JSON.stringify(input.templateVars) : null,
      },
    });
  }

  async deleteClaudeConfig(conversationId: string) {
    await prisma.claudeConfig.delete({
      where: { conversationId },
    });
  }
}

export const storage = new PrismaStorage();
