/**
 * Speech-to-Text using Google Gemini
 */

export interface STTConfig {
  model: string;
  locale: string;
  encoding: "opus" | "webm" | "pcm";
}

export interface STTResult {
  transcript: string;
  segments: Array<{
    startMs: number;
    endMs: number;
    sent: boolean;
  }>;
  metrics: {
    audioSecSent: number;
    chunks: number;
    latencyMs: number;
  };
}

export async function speechToText(
  audioData: ArrayBuffer,
  apiKey: string,
  config: STTConfig
): Promise<STTResult> {
  // TODO: Implement Gemini STT
  return {
    transcript: "",
    segments: [],
    metrics: {
      audioSecSent: 0,
      chunks: 0,
      latencyMs: 0,
    },
  };
}
