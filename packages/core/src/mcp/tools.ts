import type { SpeakInput, SpeakOutput, ListenInput, ListenOutput } from "@stt-mcp/shared";

/**
 * Core business logic for the 'speak' MCP tool
 * Framework-agnostic - can be called from Elysia, Electron, or anywhere
 */
export async function handleSpeak(
  input: SpeakInput,
  context: {
    apiKeys: { openai?: string; elevenlabs?: string };
    conversationId: string;
  }
): Promise<SpeakOutput> {
  // TODO: Implement
  // 1. SSML enhancement (if no ssml provided)
  // 2. Call ElevenLabs TTS
  // 3. Save audio asset
  // 4. Return response with audio URL

  return {
    ok: true,
    ssmlUsed: input.ssml || input.text,
    audioUrl: undefined,
    metrics: {
      ttfbMs: 0,
      totalMs: 0,
    },
  };
}

/**
 * Core business logic for the 'listen' MCP tool
 * Framework-agnostic - can be called from Elysia, Electron, or anywhere
 */
export async function handleListen(
  input: ListenInput,
  context: {
    apiKeys: { gemini?: string };
    conversationId: string;
    audioData: ArrayBuffer;
  }
): Promise<ListenOutput> {
  // TODO: Implement
  // 1. Apply VAD and chunking
  // 2. Call Gemini STT
  // 3. Return transcript with metrics

  return {
    ok: true,
    transcript: "",
    segments: [],
    metrics: {
      audioSecSent: 0,
      chunks: 0,
      latencyMs: 0,
    },
  };
}

// Re-export TODO tools
export * from "./tools/todo";

// Re-export Project tools
export * from "./tools/project";

// Re-export Claude tools
export * from "./tools/claude";

// Re-export Process tools
export * from "./tools/process";
