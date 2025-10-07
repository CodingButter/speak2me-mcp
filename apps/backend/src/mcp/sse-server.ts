import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Stream } from "@elysiajs/stream";
import type { Context } from "elysia";
import type { CoreOperations, SessionManager } from "@stt-mcp/core";
import {
  handleSpeak,
  handleListen,
  handleTodoCreate,
  handleTodoUpdate,
  handleTodoList,
  handleTodoArchive,
  handleTodoDelete,
  handleProjectLink,
  handleProjectGet,
  handleProjectUnlink,
  handleClaudeChat,
} from "@stt-mcp/core/mcp";
import { prisma } from "@stt-mcp/database";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  speakInputSchema,
  listenInputSchema,
  todoCreateInputSchema,
  todoUpdateInputSchema,
  todoListInputSchema,
  todoArchiveInputSchema,
  todoDeleteInputSchema,
  projectLinkInputSchema,
  claudeChatInputSchema,
} from "@stt-mcp/shared";

/**
 * Create SSE MCP Server for a conversation
 * Each conversation gets its own MCP server instance
 */
export async function createSSEMCPServer(
  conversationId: string,
  core: CoreOperations,
  sessionManager: SessionManager
) {
  const server = new Server(
    {
      name: "stt-mcp-voice",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Create or get session for this conversation
  let session = sessionManager.getSessionByConversationId(conversationId);
  if (!session) {
    // Load API keys via core if they exist
    const apiKeys = await core.getApiKeys(conversationId);
    session = sessionManager.createSession(conversationId, apiKeys || undefined);
  }

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "speak",
          description:
            "Convert text to speech using ElevenLabs with optional SSML enrichment via OpenAI. Audio quality optimized for speed (16kHz, lower latency).",
          inputSchema: {
            type: "object",
            properties: {
              text: { type: "string", description: "Text to speak" },
              ssml: { type: "string", description: "Optional SSML (bypasses enhancer)" },
              voiceId: { type: "string", description: "ElevenLabs voice ID" },
              model: { type: "string", description: "ElevenLabs model (default: eleven_flash_v2)" },
              stream: { type: "boolean", description: "Stream audio (default: true)" },
            },
            required: ["text"],
          },
        },
        {
          name: "listen",
          description:
            "Capture and transcribe voice using Google Gemini STT with VAD and chunking. Uses Opus 16kHz mono for optimal bandwidth and speed.",
          inputSchema: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["auto", "manual", "ptt"],
                description: "Listening mode",
              },
              vadThreshold: { type: "number", description: "VAD threshold (0-1)" },
              minSilenceMs: { type: "number", description: "Minimum silence duration" },
              maxUtteranceMs: { type: "number", description: "Maximum utterance length" },
              locale: { type: "string", description: "Locale (e.g., en-US)" },
            },
            required: ["mode"],
          },
        },
        {
          name: "todo_create",
          description:
            "Create a new TODO item. Use when the user requests a task to be tracked, or when you identify action items during conversation.",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string", description: "TODO title" },
              description: { type: "string", description: "Detailed description" },
              priority: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                description: "Priority level",
              },
              tags: { type: "array", items: { type: "string" }, description: "Tags for categorization" },
              assignee: { type: "string", description: "Person assigned to this task" },
              projectPath: { type: "string", description: "Link to specific project" },
            },
            required: ["title"],
          },
        },
        {
          name: "todo_update",
          description:
            "Update an existing TODO item. Use when task progress changes, or when marking tasks as in-progress, blocked, or completed.",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string", description: "TODO ID" },
              title: { type: "string", description: "Updated title" },
              description: { type: "string", description: "Updated description" },
              status: {
                type: "string",
                enum: ["BACKLOG", "IN_PROGRESS", "BLOCKED", "COMPLETED", "ARCHIVED"],
                description: "Task status",
              },
              priority: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                description: "Priority level",
              },
              tags: { type: "array", items: { type: "string" }, description: "Updated tags" },
              blockedReason: { type: "string", description: "Reason if status is BLOCKED" },
              assignee: { type: "string", description: "Updated assignee" },
            },
            required: ["id"],
          },
        },
        {
          name: "todo_list",
          description:
            "List TODO items with optional filters. Use when you need to see task status or get project context.",
          inputSchema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: ["BACKLOG", "IN_PROGRESS", "BLOCKED", "COMPLETED", "ARCHIVED"],
                description: "Filter by status",
              },
              projectPath: { type: "string", description: "Filter by project" },
              priority: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                description: "Filter by priority",
              },
              tags: { type: "array", items: { type: "string" }, description: "Filter by tags (match any)" },
            },
          },
        },
        {
          name: "todo_archive",
          description: "Archive a completed TODO item. Use when cleaning up completed tasks.",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string", description: "TODO ID to archive" },
            },
            required: ["id"],
          },
        },
        {
          name: "project_link",
          description:
            "Link a project to this conversation. Initializes project context with path, commands, and settings. Use this at the start of a project to configure dev server, build, and test commands.",
          inputSchema: {
            type: "object",
            properties: {
              projectPath: { type: "string", description: "Absolute path to project directory" },
              projectName: { type: "string", description: "Project name (optional, auto-detected from path)" },
              devCommand: { type: "string", description: "Command to start dev server (e.g., 'bun run dev')" },
              buildCommand: { type: "string", description: "Command to build project (e.g., 'bun run build')" },
              testCommand: { type: "string", description: "Command to run tests (e.g., 'bun test')" },
              stopCommand: { type: "string", description: "Command to stop dev server (optional)" },
              settings: { type: "object", description: "Additional project settings (optional)" },
            },
            required: ["projectPath"],
          },
        },
        {
          name: "project_get",
          description: "Get the currently linked project for this conversation.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "project_unlink",
          description: "Unlink the project from this conversation.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "claude_chat",
          description: "Run Claude CLI and capture its output. Automatically uses linked project context if available. This allows the server to orchestrate Claude Code instead of requiring the user to run it separately.",
          inputSchema: {
            type: "object",
            properties: {
              prompt: {
                type: "string",
                description: "The prompt to send to Claude CLI",
              },
              contextFiles: {
                type: "array",
                items: { type: "string" },
                description: "Optional array of file paths to include as context",
              },
              useProjectContext: {
                type: "boolean",
                description: "Whether to automatically use linked project's directory as working directory (default: true)",
              },
            },
            required: ["prompt"],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      if (request.params.name === "speak") {
        const input = speakInputSchema.parse(request.params.arguments);

        // Get API keys from session
        const apiKeys = session!.apiKeys || {};
        if (!apiKeys.openai || !apiKeys.elevenlabs) {
          throw new Error("API keys not configured. Please set OpenAI and ElevenLabs keys in settings.");
        }

        const result = await handleSpeak(input, { apiKeys, conversationId });

        // Save message via core
        await core.createMessage({
          conversationId,
          role: "assistant",
          content: input.text,
          audioUrl: result.audioUrl,
          ssmlUsed: result.ssmlUsed,
          metrics: result.metrics,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "listen") {
        const input = listenInputSchema.parse(request.params.arguments);

        // Get API keys from session
        const apiKeys = session!.apiKeys || {};
        if (!apiKeys.gemini) {
          throw new Error("Gemini API key not configured. Please set it in settings.");
        }

        // TODO: Get audio data from PWA or buffer
        const audioData = new ArrayBuffer(0);

        const result = await handleListen(input, { apiKeys, conversationId, audioData });

        // Save message via core
        if (result.transcript) {
          await core.createMessage({
            conversationId,
            role: "user",
            content: result.transcript,
            metrics: result.metrics,
          });
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      // TODO Tools
      if (request.params.name === "todo_create") {
        const input = todoCreateInputSchema.parse(request.params.arguments);
        const result = await handleTodoCreate(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "todo_update") {
        const input = todoUpdateInputSchema.parse(request.params.arguments);
        const result = await handleTodoUpdate(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "todo_list") {
        const input = todoListInputSchema.parse(request.params.arguments || {});
        const result = await handleTodoList(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "todo_archive") {
        const input = todoArchiveInputSchema.parse(request.params.arguments);
        const result = await handleTodoArchive(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      // Project Tools
      if (request.params.name === "project_link") {
        const input = projectLinkInputSchema.parse(request.params.arguments);
        const result = await handleProjectLink(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "project_get") {
        const result = await handleProjectGet({ conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "project_unlink") {
        const result = await handleProjectUnlink({ conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      if (request.params.name === "claude_chat") {
        const input = claudeChatInputSchema.parse(request.params.arguments);
        const result = await handleClaudeChat(input, { conversationId, prisma });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      }

      throw new Error(`Unknown tool: ${request.params.name}`);
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              ok: false,
              reason: error instanceof Error ? error.message : "Unknown error",
            }),
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

/**
 * Handle SSE MCP connection endpoint using Elysia Stream
 */
export async function handleSSEConnection(
  context: Context,
  core: CoreOperations,
  sessionManager: SessionManager
) {
  const conversationId = (context as any).params?.id;

  if (!conversationId) {
    context.set.status = 400;
    return { error: "conversationId path parameter is required" };
  }

  // Ensure conversation exists via core
  let conversation = await core.getConversation(conversationId);
  if (!conversation) {
    // Create conversation if it doesn't exist
    conversation = await core.createConversation({
      id: conversationId,
      name: `Conversation ${conversationId}`,
    });
  }

  // Create MCP server for this conversation
  const server = await createSSEMCPServer(conversationId, core, sessionManager);

  // Use Elysia Stream with custom adapter for MCP SSE transport
  return new Stream(async (stream) => {
    try {
      // Create a minimal Node.js-compatible response adapter
      const responseAdapter = {
        writeHead: (status: number, headers: Record<string, string>) => {
          // Elysia Stream handles headers automatically
          context.set.headers = {
            ...context.set.headers,
            ...headers,
          };
        },
        write: (chunk: string) => {
          stream.send(chunk);
          return true;
        },
        end: () => {
          stream.close();
        },
      };

      // Create transport with adapter
      const transport = new SSEServerTransport(`/sse/${conversationId}`, context.request);

      // Hack: Replace the response object with our adapter
      (transport as any).res = responseAdapter;

      await server.connect(transport);

      // Keep stream alive until transport closes
      await new Promise((resolve) => {
        (transport as any).on?.("close", resolve) || setTimeout(resolve, 60000);
      });
    } catch (error) {
      console.error("SSE connection error:", error);
      stream.close();
    }
  });
}
