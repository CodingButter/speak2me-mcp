import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Stream } from "@elysiajs/stream";
import type { Context } from "elysia";
import type { CoreOperations, SessionManager } from "@stt-mcp/core";
import { handleSpeak, handleListen } from "@stt-mcp/core/mcp";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { speakInputSchema, listenInputSchema } from "@stt-mcp/shared";

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
