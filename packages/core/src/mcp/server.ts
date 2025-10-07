import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { speakInputSchema, listenInputSchema } from "@stt-mcp/shared";
import { handleSpeak, handleListen } from "./tools";

/**
 * Creates an MCP server instance
 * Can be used with different transports (stdio, SSE, etc.)
 */
export function createMCPServer(options: {
  name: string;
  version: string;
  getApiKeys: (conversationId: string) => Promise<{ openai?: string; elevenlabs?: string; gemini?: string }>;
  getAudioData?: (conversationId: string) => Promise<ArrayBuffer>;
}) {
  const server = new Server(
    {
      name: options.name,
      version: options.version,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "speak",
          description:
            "Convert text to speech using ElevenLabs with optional SSML enrichment via OpenAI",
          inputSchema: {
            type: "object",
            properties: {
              text: { type: "string", description: "Text to speak" },
              ssml: { type: "string", description: "Optional SSML (bypasses enhancer)" },
              voiceId: { type: "string", description: "ElevenLabs voice ID" },
              model: { type: "string", description: "ElevenLabs model" },
              stream: { type: "boolean", description: "Stream audio (default: true)" },
            },
            required: ["text"],
          },
        },
        {
          name: "listen",
          description:
            "Capture and transcribe voice using Google Gemini STT with VAD and chunking",
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
    // Extract conversationId from request context (implementation specific)
    const conversationId = "default"; // TODO: Get from context

    try {
      if (request.params.name === "speak") {
        const input = speakInputSchema.parse(request.params.arguments);
        const apiKeys = await options.getApiKeys(conversationId);
        const result = await handleSpeak(input, { apiKeys, conversationId });

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
        const apiKeys = await options.getApiKeys(conversationId);
        const audioData = options.getAudioData
          ? await options.getAudioData(conversationId)
          : new ArrayBuffer(0);
        const result = await handleListen(input, { apiKeys, conversationId, audioData });

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
 * Run MCP server with stdio transport (for traditional MCP clients)
 */
export async function runStdioMCPServer(options: Parameters<typeof createMCPServer>[0]) {
  const server = createMCPServer(options);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}
