import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import { PrismaStorage } from "./storage";
import { prisma } from "./client";
import type { Conversation, Message, ApiKeys } from "@s2m-pac/shared";

describe("PrismaStorage", () => {
  let storage: PrismaStorage;

  beforeAll(() => {
    storage = new PrismaStorage();
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.message.deleteMany();
    await prisma.claudeConfig.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.apiKey.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean between tests
    await prisma.message.deleteMany();
    await prisma.claudeConfig.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.apiKey.deleteMany();
    await prisma.settings.deleteMany();
  });

  describe("Conversations", () => {
    test("creates conversation", async () => {
      const conversation = await storage.createConversation({
        id: "test-conv-1",
        name: "Test Conversation",
        messageCount: 0,
      });

      expect(conversation.id).toBe("test-conv-1");
      expect(conversation.name).toBe("Test Conversation");
      expect(conversation.messageCount).toBe(0);
      expect(conversation.createdAt).toBeGreaterThan(0);
      expect(conversation.updatedAt).toBeGreaterThan(0);
    });

    test("gets conversation by ID", async () => {
      await storage.createConversation({
        id: "test-conv-2",
        name: "Test",
        messageCount: 0,
      });

      const conversation = await storage.getConversation("test-conv-2");
      expect(conversation).not.toBeNull();
      expect(conversation?.id).toBe("test-conv-2");
    });

    test("returns null for non-existent conversation", async () => {
      const conversation = await storage.getConversation("non-existent");
      expect(conversation).toBeNull();
    });

    test("gets all conversations", async () => {
      await storage.createConversation({ id: "conv-1", messageCount: 0 });
      await storage.createConversation({ id: "conv-2", messageCount: 0 });
      await storage.createConversation({ id: "conv-3", messageCount: 0 });

      const conversations = await storage.getAllConversations();
      expect(conversations.length).toBeGreaterThanOrEqual(3);
    });

    test("updates conversation", async () => {
      await storage.createConversation({
        id: "test-conv-update",
        name: "Original",
        messageCount: 0,
      });

      await storage.updateConversation("test-conv-update", {
        name: "Updated Name",
        messageCount: 5,
      });

      const updated = await storage.getConversation("test-conv-update");
      expect(updated?.name).toBe("Updated Name");
      expect(updated?.messageCount).toBe(5);
    });

    test("deletes conversation", async () => {
      await storage.createConversation({
        id: "test-conv-delete",
        messageCount: 0,
      });

      await storage.deleteConversation("test-conv-delete");

      const deleted = await storage.getConversation("test-conv-delete");
      expect(deleted).toBeNull();
    });
  });

  describe("Messages", () => {
    beforeEach(async () => {
      await storage.createConversation({
        id: "msg-test-conv",
        messageCount: 0,
      });
    });

    test("creates message", async () => {
      const message = await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "user",
        content: "Hello world",
      });

      expect(message.id).toBeTruthy();
      expect(message.conversationId).toBe("msg-test-conv");
      expect(message.role).toBe("user");
      expect(message.content).toBe("Hello world");
      expect(message.timestamp).toBeGreaterThan(0);
    });

    test("creates assistant message with audio", async () => {
      const message = await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "assistant",
        content: "Hi there",
        audioUrl: "https://example.com/audio.mp3",
        ssmlUsed: "<speak>Hi there</speak>",
        metrics: { ttfbMs: 100, totalMs: 500 },
      });

      expect(message.role).toBe("assistant");
      expect(message.audioUrl).toBe("https://example.com/audio.mp3");
      expect(message.ssmlUsed).toBe("<speak>Hi there</speak>");
      expect(message.metrics).toEqual({ ttfbMs: 100, totalMs: 500 });
    });

    test("increments conversation message count", async () => {
      await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "user",
        content: "Test 1",
      });
      await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "assistant",
        content: "Test 2",
      });

      const conversation = await storage.getConversation("msg-test-conv");
      expect(conversation?.messageCount).toBe(2);
    });

    test("gets message by ID", async () => {
      const created = await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "user",
        content: "Test message",
      });

      const retrieved = await storage.getMessage(created.id);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(created.id);
      expect(retrieved?.content).toBe("Test message");
    });

    test("gets messages by conversation", async () => {
      await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "user",
        content: "Message 1",
      });
      await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "assistant",
        content: "Message 2",
      });

      const messages = await storage.getMessagesByConversation("msg-test-conv");
      expect(messages).toHaveLength(2);
      expect(messages[0].content).toBe("Message 1");
      expect(messages[1].content).toBe("Message 2");
    });

    test("deletes message and decrements count", async () => {
      const message = await storage.createMessage({
        conversationId: "msg-test-conv",
        role: "user",
        content: "To delete",
      });

      await storage.deleteMessage(message.id);

      const deleted = await storage.getMessage(message.id);
      expect(deleted).toBeNull();

      const conversation = await storage.getConversation("msg-test-conv");
      expect(conversation?.messageCount).toBe(0);
    });
  });

  describe("Settings", () => {
    test("gets default settings", async () => {
      const settings = await storage.getSettings();
      expect(settings).toBeTruthy();
      expect(settings.vadThreshold).toBe(0.5);
      expect(settings.defaultMode).toBe("manual");
    });

    test("updates settings", async () => {
      await storage.updateSettings({
        vadThreshold: 0.7,
        defaultMode: "auto",
      });

      const settings = await storage.getSettings();
      expect(settings.vadThreshold).toBe(0.7);
      expect(settings.defaultMode).toBe("auto");
    });
  });

  describe("API Keys", () => {
    beforeEach(async () => {
      await storage.createConversation({
        id: "keys-test-conv",
        messageCount: 0,
      });
    });

    test("returns environment variables for non-existent keys", async () => {
      const keys = await storage.getApiKeys("non-existent-conv");
      // Should return environment variables as fallback
      // If env vars are set, they will be returned; otherwise null
      if (process.env.OPENAI_API_KEY || process.env.ELEVENLABS_API_KEY ||
          process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY) {
        expect(keys).not.toBeNull();
      } else {
        expect(keys).toBeNull();
      }
    });

    test("sets API keys", async () => {
      const apiKeys: ApiKeys = {
        openai: "sk-test",
        elevenlabs: "el-test",
        gemini: "gem-test",
      };

      await storage.setApiKeys("keys-test-conv", apiKeys);

      const retrieved = await storage.getApiKeys("keys-test-conv");
      expect(retrieved).toEqual(apiKeys);
    });

    test("updates existing API keys", async () => {
      await storage.setApiKeys("keys-test-conv", {
        openai: "sk-old",
      });

      await storage.setApiKeys("keys-test-conv", {
        openai: "sk-new",
        gemini: "gem-test",
      });

      const retrieved = await storage.getApiKeys("keys-test-conv");
      expect(retrieved?.openai).toBe("sk-new");
      expect(retrieved?.gemini).toBe("gem-test");
    });

    test("handles partial API keys", async () => {
      await storage.setApiKeys("keys-test-conv", {
        openai: "sk-test",
      });

      const retrieved = await storage.getApiKeys("keys-test-conv");
      expect(retrieved?.openai).toBe("sk-test");
      expect(retrieved?.elevenlabs).toBeUndefined();
    });
  });

  describe("Claude Configuration", () => {
    beforeEach(async () => {
      await storage.createConversation({
        id: "claude-test-conv",
        name: "Claude Test",
        messageCount: 0,
      });
    });

    test("creates Claude config with default SSML prompt", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        voiceEnabled: true,
        voiceDirectives: "Speak clearly",
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.systemPromptTemplate).toContain("SSML");
      expect(config?.systemPromptTemplate).toContain("{{voiceDirectives}}");
      expect(config?.voiceEnabled).toBe(true);
      expect(config?.voiceDirectives).toBe("Speak clearly");
    });

    test("creates Claude config with custom system prompt", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        systemPromptTemplate: "You are a helpful assistant. {{custom}}",
        templateVars: { custom: "Test value" },
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.systemPromptTemplate).toBe("You are a helpful assistant. {{custom}}");
      expect(config?.templateVars).toEqual({ custom: "Test value" });
    });

    test("handles MCP server configuration", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        mcpServers: {
          filesystem: {
            type: "stdio",
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
          },
          github: {
            type: "stdio",
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-github"],
            env: { GITHUB_TOKEN: "test-token" },
          },
        },
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.mcpServers).toBeDefined();
      expect(config?.mcpServers?.filesystem).toBeDefined();
      expect(config?.mcpServers?.filesystem.command).toBe("npx");
      expect(config?.mcpServers?.github.env?.GITHUB_TOKEN).toBe("test-token");
    });

    test("handles tool configuration", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        allowedTools: ["Read", "Write", "Grep"],
        disallowedTools: ["WebSearch", "TodoWrite"],
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.allowedTools).toEqual(["Read", "Write", "Grep"]);
      expect(config?.disallowedTools).toEqual(["WebSearch", "TodoWrite"]);
    });

    test("updates existing Claude config", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        model: "claude-sonnet-4-5-20250929",
        maxTurns: 10,
      });

      await storage.setClaudeConfig("claude-test-conv", {
        model: "claude-opus-4-1-20250805",
        maxTurns: 20,
        voiceEnabled: true,
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.model).toBe("claude-opus-4-1-20250805");
      expect(config?.maxTurns).toBe(20);
      expect(config?.voiceEnabled).toBe(true);
    });

    test("deletes Claude config", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        voiceEnabled: true,
      });

      let config = await storage.getClaudeConfig("claude-test-conv");
      expect(config).toBeDefined();

      await storage.deleteClaudeConfig("claude-test-conv");

      config = await storage.getClaudeConfig("claude-test-conv");
      expect(config).toBeNull();
    });

    test("returns null for non-existent config", async () => {
      const config = await storage.getClaudeConfig("non-existent-conv");
      expect(config).toBeNull();
    });

    test("handles all permission modes", async () => {
      const modes: Array<"default" | "acceptEdits" | "bypassPermissions" | "plan"> = [
        "default",
        "acceptEdits",
        "bypassPermissions",
        "plan",
      ];

      for (const mode of modes) {
        await storage.setClaudeConfig("claude-test-conv", {
          permissionMode: mode,
        });

        const config = await storage.getClaudeConfig("claude-test-conv");
        expect(config?.permissionMode).toBe(mode);
      }
    });

    test("handles custom instructions", async () => {
      await storage.setClaudeConfig("claude-test-conv", {
        customInstructions: "Always provide detailed explanations with examples.",
      });

      const config = await storage.getClaudeConfig("claude-test-conv");
      expect(config?.customInstructions).toBe("Always provide detailed explanations with examples.");
    });
  });
});
