/**
 * Text-to-Speech using ElevenLabs
 *
 * Project Scope Reference: §5.1.1, §7.2.1
 */

import { ElevenLabsClient } from "elevenlabs";

export interface TTSConfig {
  voiceId?: string;
  model: string;
  stream: boolean;
  outputFormat?: string;
  optimizeStreamingLatency?: number;
}

export interface TTSMetrics {
  ttfbMs: number;
  totalMs: number;
  audioLengthSeconds?: number;
  characterCount: number;
}

export interface TTSResult {
  audioData: ArrayBuffer;
  metrics: TTSMetrics;
}

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Default "Rachel" voice
const DEFAULT_MODEL = "eleven_flash_v2"; // Optimized for speed
const DEFAULT_OUTPUT_FORMAT = "mp3_44100_128";
const DEFAULT_STREAMING_LATENCY = 3; // Balance between speed and quality (0-4)

export async function textToSpeech(
  text: string,
  apiKey: string,
  config: TTSConfig
): Promise<TTSResult> {
  const startTime = performance.now();
  let firstByteTime: number | null = null;

  try {
    // Initialize ElevenLabs client
    const client = new ElevenLabsClient({ apiKey });

    // Use provided config or defaults
    const voiceId = config.voiceId || DEFAULT_VOICE_ID;
    const model = config.model || DEFAULT_MODEL;
    const outputFormat = config.outputFormat || DEFAULT_OUTPUT_FORMAT;
    const optimizeStreamingLatency =
      config.optimizeStreamingLatency ?? DEFAULT_STREAMING_LATENCY;

    // Call text-to-speech stream API
    // Note: Using convertAsStream (older SDK version) instead of stream
    const audioStream = await client.textToSpeech.convertAsStream(voiceId, {
      text,
      modelId: model,
      outputFormat: outputFormat as any,
      optimizeStreamingLatency,
    });

    // Accumulate audio chunks from ReadableStream
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    // Get a reader from the stream
    const reader = audioStream.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Track time to first byte
        if (firstByteTime === null) {
          firstByteTime = performance.now();
        }

        chunks.push(value);
        totalBytes += value.length;
      }
    } finally {
      reader.releaseLock();
    }

    // Combine chunks into single ArrayBuffer
    const audioData = new ArrayBuffer(totalBytes);
    const uint8View = new Uint8Array(audioData);
    let offset = 0;
    for (const chunk of chunks) {
      uint8View.set(chunk, offset);
      offset += chunk.length;
    }

    const endTime = performance.now();

    // Calculate metrics
    const ttfbMs = firstByteTime ? firstByteTime - startTime : 0;
    const totalMs = endTime - startTime;

    // Estimate audio length (rough approximation)
    // MP3 @ 128kbps = 16000 bytes/second
    const audioLengthSeconds =
      outputFormat.includes("128") ? totalBytes / 16000 : undefined;

    const metrics: TTSMetrics = {
      ttfbMs: Math.round(ttfbMs),
      totalMs: Math.round(totalMs),
      audioLengthSeconds,
      characterCount: text.length,
    };

    return {
      audioData,
      metrics,
    };
  } catch (error) {
    // Log error for debugging
    console.error("TTS generation failed:", error);

    // Rethrow with context
    throw new Error(
      `ElevenLabs TTS failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
