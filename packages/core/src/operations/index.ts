import type { PrismaStorage } from "@s2m-pac/database";
import type { Conversation, Message, Settings, ApiKeys, ClaudeConfig, ClaudeConfigInput } from "@s2m-pac/shared";
import { query } from "@s2m-pac/claude-agent";
import { templateRenderer } from "../services/template";

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

  async getConversationsByProject(projectId: string): Promise<Conversation[]> {
    return await this.storage.getConversationsByProject(projectId);
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return await this.storage.getConversation(id);
  }

  async createConversation(data: { id?: string; name?: string; projectId?: string }): Promise<Conversation> {
    return await this.storage.createConversation({
      id: data.id || crypto.randomUUID(),
      name: data.name,
      projectId: data.projectId,
      messageCount: 0,
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await this.storage.deleteConversation(id);
  }

  // Projects
  async getAllProjects() {
    return await this.storage.getAllProjects();
  }

  async getProject(id: string) {
    return await this.storage.getProject(id);
  }

  async createProject(name: string, description?: string) {
    return await this.storage.createProject({ name, description });
  }

  async updateProject(id: string, updates: { name?: string; description?: string }) {
    return await this.storage.updateProject(id, updates);
  }

  async deleteProject(id: string) {
    return await this.storage.deleteProject(id);
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
    // TODO: Implement complete audio processing pipeline
    // Project Scope: §10 (Audio Handling & Cost Controls)
    // Steps:
    // 1. Apply VAD to detect speech segments (energy-based threshold)
    // 2. Trim leading/trailing silence from each segment
    // 3. Remove internal silences ≥ minSilenceMs (Project Scope §10)
    // 4. Split into chunks if > maxUtteranceMs (12-20s recommended)
    // 5. Add 100-200ms overlap between chunks to avoid word cuts
    // 6. Apply do-not-send rule: discard sub-threshold blips and segments < minSpeechMs
    // 7. Encode chunks (Opus/WebM at 16-24kHz mono)
    // 8. Call Gemini STT on each chunk
    // 9. Aggregate transcripts and timing info
    // 10. Track metrics: audioSecSent, chunks, latencyMs
    // 11. Verify 30% cost reduction from silence trimming (Project Scope §2.2.7)
    // Related services:
    // - packages/core/src/services/stt.ts (Gemini STT integration)
    // - Frontend: apps/frontend/src/services/audioProcessor.ts (VAD logic)
    // assignees: codingbutter
    // labels: enhancement, voice
    // milestone: MVP Launch

    // For now, create placeholder message
    const message = await this.createMessage({
      conversationId,
      role: "user",
      content: "[Audio transcription pending]",
    });

    return message;
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
    return await this.storage.createProjectContext(data);
  }

  async getProjectContext(conversationId: string) {
    return await this.storage.getProjectContext(conversationId);
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
    return await this.storage.updateProjectContext(conversationId, updates);
  }

  async deleteProjectContext(conversationId: string) {
    return await this.storage.deleteProjectContext(conversationId);
  }

  // Claude Configuration
  async getClaudeConfig(conversationId: string): Promise<ClaudeConfig | null> {
    return await this.storage.getClaudeConfig(conversationId);
  }

  async setClaudeConfig(conversationId: string, input: ClaudeConfigInput): Promise<void> {
    await this.storage.setClaudeConfig(conversationId, input);
  }

  async deleteClaudeConfig(conversationId: string): Promise<void> {
    await this.storage.deleteClaudeConfig(conversationId);
  }

  // Claude Query with Template Rendering
  async executeClaudeQuery(params: {
    conversationId: string;
    prompt: string;
    cwd?: string;
    maxTurns?: number;
    allowedTools?: string[];
  }): Promise<{
    ok: boolean;
    messageCount?: number;
    messages?: any[];
    usage?: any;
    totalCost?: number;
    error?: string;
    stack?: string;
  }> {
    const { conversationId, prompt, cwd, maxTurns, allowedTools } = params;

    // Get API keys
    const apiKeys = await this.getApiKeys(conversationId);
    if (!apiKeys || !apiKeys.anthropic) {
      throw new Error("Anthropic API key not configured for this conversation");
    }

    // Get Claude configuration
    const claudeConfig = await this.getClaudeConfig(conversationId);

    // Get project context for working directory
    const projectContext = await this.getProjectContext(conversationId);
    const workingDirectory = cwd || projectContext?.projectPath || process.cwd();

    // Prepare system prompt with template rendering
    let systemPrompt: string | undefined;
    if (claudeConfig?.systemPromptTemplate) {
      const templateVars = claudeConfig.templateVars || {};

      // Add voice directives if voice is enabled
      if (claudeConfig.voiceEnabled && claudeConfig.voiceDirectives) {
        templateVars['voiceDirectives'] = claudeConfig.voiceDirectives;
      }

      systemPrompt = templateRenderer.render(claudeConfig.systemPromptTemplate, templateVars);
    }

    // Prepare query options
    const queryOptions: any = {
      apiKey: apiKeys.anthropic,
      cwd: workingDirectory,
      maxTurns: maxTurns || claudeConfig?.maxTurns || 10,
      allowedTools: allowedTools || (claudeConfig?.allowedTools as any) || ['Read', 'Write', 'Edit', 'Grep', 'Glob', 'Bash'],
      permissionMode: (claudeConfig?.permissionMode as any) || 'acceptEdits',
      includePartialMessages: true,
    };

    // Add custom system prompt if available
    if (systemPrompt) {
      queryOptions.customSystemPrompt = systemPrompt;
    }

    // Add custom instructions if available
    if (claudeConfig?.customInstructions) {
      queryOptions.appendSystemPrompt = claudeConfig.customInstructions;
    }

    // Add MCP servers if configured
    if (claudeConfig?.mcpServers) {
      queryOptions.mcpServers = claudeConfig.mcpServers;
    }

    // Add disallowed tools if configured
    if (claudeConfig?.disallowedTools) {
      queryOptions.disallowedTools = claudeConfig.disallowedTools;
    }

    // Use configured model if available
    if (claudeConfig?.model) {
      queryOptions.model = claudeConfig.model;
    }

    try {
      const messages: any[] = [];
      let usage: any = null;
      let totalCost = 0;

      // Stream messages from Claude Agent SDK
      for await (const message of query({
        prompt,
        options: queryOptions,
      })) {
        messages.push({
          type: message.type,
          timestamp: Date.now(),
          data: message,
        });

        // Track usage and cost from result message
        if (message.type === 'result' && !(message as any).is_error) {
          usage = (message as any).usage;
          totalCost = (message as any).total_cost_usd;
        }
      }

      // Store the query as a user message
      await this.createMessage({
        conversationId,
        role: 'user',
        content: prompt,
        metrics: {
          source: 'claude-query',
          workingDirectory,
        },
      });

      // Store the final result as an assistant message
      const resultMessage = messages.find((m) => m.type === 'result');
      if (resultMessage) {
        await this.createMessage({
          conversationId,
          role: 'assistant',
          content: resultMessage.data.result || 'Query completed',
          metrics: {
            source: 'claude-query',
            usage,
            totalCost,
            messageCount: messages.length,
            numTurns: resultMessage.data.num_turns,
          },
        });
      }

      return {
        ok: true,
        messageCount: messages.length,
        messages,
        usage,
        totalCost,
      };
    } catch (error: any) {
      console.error('Claude Agent SDK error:', error);

      // Store error message
      await this.createMessage({
        conversationId,
        role: 'assistant',
        content: `Error: ${error.message}`,
        metrics: {
          source: 'claude-query',
          error: true,
        },
      });

      return {
        ok: false,
        error: error.message,
        stack: error.stack,
      };
    }
  }
}
