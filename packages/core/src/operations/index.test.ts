import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import { CoreOperations } from "./index";
import { PrismaStorage } from "@s2m-pac/database";
import { prisma } from "@s2m-pac/database";

describe("CoreOperations", () => {
  let operations: CoreOperations;
  let storage: PrismaStorage;

  beforeAll(() => {
    storage = new PrismaStorage();
    operations = new CoreOperations(storage);
  });

  afterAll(async () => {
    // Clean up all test data
    await prisma.message.deleteMany();
    await prisma.claudeConfig.deleteMany();
    await prisma.projectContext.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.project.deleteMany();
    await prisma.apiKey.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean between tests
    await prisma.message.deleteMany();
    await prisma.claudeConfig.deleteMany();
    await prisma.projectContext.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.project.deleteMany();
    await prisma.apiKey.deleteMany();
    await prisma.settings.deleteMany();
  });

  describe("Conversations", () => {
    test("getConversations returns all conversations", async () => {
      await operations.createConversation({ name: "Conv 1" });
      await operations.createConversation({ name: "Conv 2" });
      await operations.createConversation({ name: "Conv 3" });

      const conversations = await operations.getConversations();
      expect(conversations.length).toBeGreaterThanOrEqual(3);
    });

    test("getConversation retrieves by ID", async () => {
      const created = await operations.createConversation({ name: "Test Conv" });
      const retrieved = await operations.getConversation(created.id);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(created.id);
      expect(retrieved?.name).toBe("Test Conv");
    });

    test("getConversation returns null for non-existent ID", async () => {
      const conversation = await operations.getConversation("non-existent");
      expect(conversation).toBeNull();
    });

    test("createConversation generates ID if not provided", async () => {
      const conversation = await operations.createConversation({ name: "Auto ID" });
      expect(conversation.id).toBeTruthy();
      expect(conversation.messageCount).toBe(0);
    });

    test("createConversation uses provided ID", async () => {
      const customId = crypto.randomUUID();
      const conversation = await operations.createConversation({
        id: customId,
        name: "Custom ID",
      });

      expect(conversation.id).toBe(customId);
    });

    test("createConversation can link to project", async () => {
      const project = await operations.createProject("Test Project");
      const conversation = await operations.createConversation({
        name: "Project Conv",
        projectId: project.id,
      });

      expect(conversation.projectId).toBe(project.id);
    });

    test("deleteConversation removes conversation", async () => {
      const conversation = await operations.createConversation({
        name: "To Delete",
      });

      await operations.deleteConversation(conversation.id);

      const deleted = await operations.getConversation(conversation.id);
      expect(deleted).toBeNull();
    });

    test("getConversationsByProject filters by project", async () => {
      const project1 = await operations.createProject("Project 1");
      const project2 = await operations.createProject("Project 2");

      await operations.createConversation({
        name: "Conv 1",
        projectId: project1.id,
      });
      await operations.createConversation({
        name: "Conv 2",
        projectId: project1.id,
      });
      await operations.createConversation({
        name: "Conv 3",
        projectId: project2.id,
      });

      const project1Convs = await operations.getConversationsByProject(project1.id);
      expect(project1Convs.length).toBe(2);
    });
  });

  describe("Projects", () => {
    test("getAllProjects returns all projects", async () => {
      await operations.createProject("Project 1");
      await operations.createProject("Project 2");

      const projects = await operations.getAllProjects();
      expect(projects.length).toBeGreaterThanOrEqual(2);
    });

    test("getProject retrieves by ID", async () => {
      const created = await operations.createProject("Test Project");
      const retrieved = await operations.getProject(created.id);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe(created.id);
      expect(retrieved?.name).toBe("Test Project");
    });

    test("createProject with description", async () => {
      const project = await operations.createProject(
        "Named Project",
        "Project description"
      );

      expect(project.name).toBe("Named Project");
      expect(project.description).toBe("Project description");
    });

    test("updateProject updates fields", async () => {
      const project = await operations.createProject("Original");

      await operations.updateProject(project.id, {
        name: "Updated",
        description: "New description",
      });

      const updated = await operations.getProject(project.id);
      expect(updated?.name).toBe("Updated");
      expect(updated?.description).toBe("New description");
    });

    test("deleteProject removes project", async () => {
      const project = await operations.createProject("To Delete");

      await operations.deleteProject(project.id);

      const deleted = await operations.getProject(project.id);
      expect(deleted).toBeNull();
    });
  });

  describe("Messages", () => {
    test("createMessage stores message", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      const message = await operations.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: "Hello world",
      });

      expect(message.id).toBeTruthy();
      expect(message.conversationId).toBe(conversation.id);
      expect(message.role).toBe("user");
      expect(message.content).toBe("Hello world");
    });

    test("createMessage with audio metadata", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      const message = await operations.createMessage({
        conversationId: conversation.id,
        role: "assistant",
        content: "Response",
        audioUrl: "https://example.com/audio.mp3",
        ssmlUsed: "<speak>Response</speak>",
        metrics: { ttfbMs: 100, totalMs: 500 },
      });

      expect(message.audioUrl).toBe("https://example.com/audio.mp3");
      expect(message.ssmlUsed).toBe("<speak>Response</speak>");
      expect(message.metrics).toEqual({ ttfbMs: 100, totalMs: 500 });
    });

    test("getMessages retrieves conversation messages", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: "Message 1",
      });
      await operations.createMessage({
        conversationId: conversation.id,
        role: "assistant",
        content: "Message 2",
      });

      const messages = await operations.getMessages(conversation.id);
      expect(messages.length).toBe(2);
      expect(messages[0].content).toBe("Message 1");
      expect(messages[1].content).toBe("Message 2");
    });

    test("creating message increments conversation count", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: "Test",
      });

      const updated = await operations.getConversation(conversation.id);
      expect(updated?.messageCount).toBe(1);
    });
  });

  describe("Settings", () => {
    test("getSettings returns default settings", async () => {
      const settings = await operations.getSettings();
      expect(settings).toBeTruthy();
      expect(settings.vadThreshold).toBe(0.5);
      expect(settings.defaultMode).toBe("manual");
    });

    test("updateSettings modifies settings", async () => {
      await operations.updateSettings({
        vadThreshold: 0.7,
        defaultMode: "auto",
      });

      const settings = await operations.getSettings();
      expect(settings.vadThreshold).toBe(0.7);
      expect(settings.defaultMode).toBe("auto");
    });

    test("updateSettings partial update", async () => {
      await operations.updateSettings({ vadThreshold: 0.8 });

      const settings = await operations.getSettings();
      expect(settings.vadThreshold).toBe(0.8);
      expect(settings.defaultMode).toBe("manual"); // Unchanged
    });
  });

  describe("API Keys", () => {
    test("getApiKeys returns keys for conversation", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setApiKeys(conversation.id, {
        openai: "sk-test",
        elevenlabs: "el-test",
      });

      const keys = await operations.getApiKeys(conversation.id);
      expect(keys?.openai).toBe("sk-test");
      expect(keys?.elevenlabs).toBe("el-test");
    });

    test("setApiKeys stores keys", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setApiKeys(conversation.id, {
        openai: "sk-new",
        gemini: "gem-new",
      });

      const keys = await operations.getApiKeys(conversation.id);
      expect(keys?.openai).toBe("sk-new");
      expect(keys?.gemini).toBe("gem-new");
    });

    test("setApiKeys updates existing keys", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setApiKeys(conversation.id, { openai: "sk-old" });
      await operations.setApiKeys(conversation.id, {
        openai: "sk-new",
        elevenlabs: "el-new",
      });

      const keys = await operations.getApiKeys(conversation.id);
      expect(keys?.openai).toBe("sk-new");
      expect(keys?.elevenlabs).toBe("el-new");
    });
  });

  describe("Voice Config", () => {
    test("getVoiceConfig retrieves config", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setVoiceConfig(conversation.id, {
        voiceId: "test-voice",
        model: "eleven_flash_v2",
      });

      const config = await operations.getVoiceConfig(conversation.id);
      expect(config).toBeTruthy();
    });

    test("setVoiceConfig stores config", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setVoiceConfig(conversation.id, {
        voiceId: "custom-voice",
        model: "eleven_turbo_v2",
      });

      const config = await operations.getVoiceConfig(conversation.id);
      expect(config).toBeTruthy();
    });
  });

  describe("Project Context", () => {
    test("createProjectContext links project to conversation", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      const context = await operations.createProjectContext({
        conversationId: conversation.id,
        projectPath: "/test/path",
        projectName: "Test Project",
      });

      expect(context.conversationId).toBe(conversation.id);
      expect(context.projectPath).toBe("/test/path");
      expect(context.projectName).toBe("Test Project");
    });

    test("getProjectContext retrieves context", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.createProjectContext({
        conversationId: conversation.id,
        projectPath: "/test",
        projectName: "Test",
      });

      const context = await operations.getProjectContext(conversation.id);
      expect(context).not.toBeNull();
      expect(context?.projectPath).toBe("/test");
    });

    test("updateProjectContext modifies context", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.createProjectContext({
        conversationId: conversation.id,
        projectPath: "/old",
        projectName: "Old",
      });

      await operations.updateProjectContext(conversation.id, {
        projectPath: "/new",
        projectName: "New",
      });

      const context = await operations.getProjectContext(conversation.id);
      expect(context?.projectPath).toBe("/new");
      expect(context?.projectName).toBe("New");
    });

    test("deleteProjectContext removes context", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.createProjectContext({
        conversationId: conversation.id,
        projectPath: "/test",
        projectName: "Test",
      });

      await operations.deleteProjectContext(conversation.id);

      const context = await operations.getProjectContext(conversation.id);
      expect(context).toBeNull();
    });
  });

  describe("Claude Configuration", () => {
    test("getClaudeConfig retrieves config", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setClaudeConfig(conversation.id, {
        voiceEnabled: true,
        model: "claude-sonnet-4-5-20250929",
      });

      const config = await operations.getClaudeConfig(conversation.id);
      expect(config).not.toBeNull();
      expect(config?.voiceEnabled).toBe(true);
    });

    test("setClaudeConfig stores config", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setClaudeConfig(conversation.id, {
        model: "claude-opus-4-1-20250805",
        maxTurns: 15,
        voiceEnabled: true,
        voiceDirectives: "Speak clearly",
      });

      const config = await operations.getClaudeConfig(conversation.id);
      expect(config?.model).toBe("claude-opus-4-1-20250805");
      expect(config?.maxTurns).toBe(15);
      expect(config?.voiceEnabled).toBe(true);
      expect(config?.voiceDirectives).toBe("Speak clearly");
    });

    test("deleteClaudeConfig removes config", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setClaudeConfig(conversation.id, {
        voiceEnabled: true,
      });

      await operations.deleteClaudeConfig(conversation.id);

      const config = await operations.getClaudeConfig(conversation.id);
      expect(config).toBeNull();
    });

    test("setClaudeConfig with MCP servers", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setClaudeConfig(conversation.id, {
        mcpServers: {
          filesystem: {
            type: "stdio",
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
          },
        },
      });

      const config = await operations.getClaudeConfig(conversation.id);
      expect(config?.mcpServers).toBeDefined();
      expect(config?.mcpServers?.filesystem).toBeDefined();
    });

    test("setClaudeConfig with tool restrictions", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      await operations.setClaudeConfig(conversation.id, {
        allowedTools: ["Read", "Write", "Edit"],
        disallowedTools: ["Bash", "WebSearch"],
      });

      const config = await operations.getClaudeConfig(conversation.id);
      expect(config?.allowedTools).toEqual(["Read", "Write", "Edit"]);
      expect(config?.disallowedTools).toEqual(["Bash", "WebSearch"]);
    });
  });

  describe("processAudio", () => {
    test("creates placeholder message for audio", async () => {
      const conversation = await operations.createConversation({
        name: "Test",
      });

      const audioData = new ArrayBuffer(1024);
      const apiKeys = {
        gemini: "test-key",
      };

      const message = await operations.processAudio(
        conversation.id,
        audioData,
        apiKeys
      );

      expect(message).toBeTruthy();
      expect(message.conversationId).toBe(conversation.id);
      expect(message.role).toBe("user");
    });
  });
});
