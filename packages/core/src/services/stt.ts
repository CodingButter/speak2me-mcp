/**
 * Speech-to-Text using Google Gemini
 *
 * Project Scope Reference: §5.1.2, §7.2.2
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
  // TODO: Implement Google Gemini STT streaming recognition
  // Project Scope: §5.1.2 (listen tool), §7.2.2 (data flow), §10 (cost controls)
  //
  // Implementation steps:
  // 1. Install Google Generative AI SDK: `bun add @google/generative-ai`
  // 2. Initialize Gemini client with apiKey
  // 3. Validate audio data:
  //    - Check audioData.byteLength > 0
  //    - Verify format matches config.encoding (opus/webm/pcm)
  //    - Log audio duration in seconds for metrics
  // 4. Encode audio based on config.encoding:
  //    - webm: Send as-is (most common from PWA MediaRecorder)
  //    - opus: Send as-is
  //    - pcm: Convert to base64 or binary stream
  // 5. Call Gemini Speech API:
  //    - Model: gemini-1.5-flash (fast) or gemini-1.5-pro (accurate)
  //    - Language: config.locale (e.g., "en-US", "es-ES")
  //    - Stream: true (for partial results if config.sendPartials)
  //    - Audio format: match config.encoding
  // 6. Process response:
  //    - Accumulate partial transcripts if streaming
  //    - Extract final stable transcript
  //    - Parse segment timing (startMs, endMs) if available
  //    - Mark segments as "sent" (for cost tracking)
  // 7. Calculate metrics:
  //    - audioSecSent: Total audio duration sent to API (for cost monitoring)
  //    - chunks: Number of audio segments processed
  //    - latencyMs: Time from audio upload to final transcript
  //    - Verify 30% cost reduction from silence trimming (Project Scope §2.2.7)
  // 8. Error handling (Project Scope §11):
  //    - Exponential backoff on rate limits (429, 503)
  //    - Circuit breaker after N failures
  //    - Timeout handling (default 20s per §11)
  //    - Clear error messages for invalid API keys or unsupported formats
  // 9. Return:
  //    - transcript: Final stable text
  //    - segments: Array of { startMs, endMs, sent } for UI visualization
  //    - metrics: { audioSecSent, chunks, latencyMs }
  //
  // Reference: https://ai.google.dev/gemini-api/docs/audio
  // assignees: codingbutter
  // labels: enhancement, voice
  // milestone: MVP Launch

  // TODO: Add audio format validation utility
  // Create helper: validateAudioFormat(audioData, expectedFormat)
  // - Check magic bytes for WebM (0x1A 0x45 0xDF 0xA3)
  // - Check magic bytes for Opus in Ogg container (OggS)
  // - Validate PCM header if raw audio
  // - Return format mismatch errors before API call to save costs
  // labels: enhancement, voice

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
