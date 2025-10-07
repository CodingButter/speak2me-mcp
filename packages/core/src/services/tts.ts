/**
 * Text-to-Speech using ElevenLabs
 */

export interface TTSConfig {
  voiceId?: string;
  model: string;
  stream: boolean;
}

export async function textToSpeech(
  text: string,
  apiKey: string,
  config: TTSConfig
): Promise<{ audioData: ArrayBuffer; metrics: { ttfbMs: number; totalMs: number } }> {
  // TODO: Implement ElevenLabs TTS
  return {
    audioData: new ArrayBuffer(0),
    metrics: {
      ttfbMs: 0,
      totalMs: 0,
    },
  };
}
