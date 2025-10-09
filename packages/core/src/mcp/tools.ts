import type { SpeakInput, SpeakOutput, ListenInput, ListenOutput } from "@s2m-pac/shared";
import { enhanceWithSSML } from "../services/ssml-enhancer";
import { textToSpeech } from "../services/tts";
import { saveAudioAsset, generateMessageId } from "../services/audio-storage";

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
  const { text, ssml, voiceId, model, stream } = input;
  const { apiKeys, conversationId } = context;

  // Validate API keys
  if (!apiKeys.elevenlabs) {
    throw new Error("ElevenLabs API key not configured");
  }

  try {
    // Step 1: SSML enhancement (if no SSML provided and OpenAI key available)
    let finalSSML = ssml || text;
    if (!ssml && apiKeys.openai) {
      try {
        finalSSML = await enhanceWithSSML(text, apiKeys.openai, {
          model: "gpt-4o-mini",
          enableProsody: true,
          enableEmphasis: true,
          enablePhonemes: false,
          formality: "neutral",
          maxBreaksPer100Words: 10,
        });
      } catch (error) {
        console.warn("SSML enhancement failed, using plain text:", error);
        finalSSML = `<speak>${text}</speak>`;
      }
    } else if (!ssml) {
      // No OpenAI key, wrap in speak tag
      finalSSML = `<speak>${text}</speak>`;
    }

    // Step 2: Call ElevenLabs TTS
    const ttsResult = await textToSpeech(finalSSML, apiKeys.elevenlabs, {
      voiceId,
      model: model || "eleven_flash_v2",
      stream: stream ?? true,
      optimizeStreamingLatency: 3,
    });

    // Step 3: Save audio asset
    const messageId = generateMessageId();
    const audioAsset = await saveAudioAsset({
      conversationId,
      messageId,
      audioData: ttsResult.audioData,
      format: "mp3",
    });

    // Step 4: Return response with audio URL
    return {
      ok: true,
      ssmlUsed: finalSSML,
      audioUrl: audioAsset.publicUrl,
      metrics: {
        ttfbMs: ttsResult.metrics.ttfbMs,
        totalMs: ttsResult.metrics.totalMs,
      },
    };
  } catch (error) {
    console.error("handleSpeak failed:", error);
    throw error;
  }
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
