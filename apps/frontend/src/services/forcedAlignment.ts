/**
 * ElevenLabs Forced Alignment Service
 * Aligns audio with transcript to get precise word-level timestamps
 */

export interface WordAlignment {
  word: string;
  start_time: number; // seconds
  end_time: number; // seconds
  aligned_word: string;
  confidence: number;
}

export interface CharacterAlignment {
  char: string;
  start_time: number; // seconds
  end_time: number; // seconds
}

export interface ForcedAlignmentResult {
  words: WordAlignment[];
  characters: CharacterAlignment[];
  loss: number; // Overall alignment confidence (lower is better)
}

export interface ForcedAlignmentConfig {
  apiKey: string;
  enabledSpooledFile?: boolean; // For large files
}

/**
 * Call ElevenLabs Forced Alignment API
 * @param audioBlob The audio file (WAV, MP3, etc.)
 * @param transcript The text transcript
 * @param config API configuration
 */
export async function alignAudioWithTranscript(
  audioBlob: Blob,
  transcript: string,
  config: ForcedAlignmentConfig
): Promise<ForcedAlignmentResult> {
  const formData = new FormData();

  // Add audio file
  formData.append('file', audioBlob, 'audio.wav');

  // Add transcript text (plain string, not JSON)
  formData.append('text', transcript);

  // Add optional spooled file flag
  if (config.enabledSpooledFile) {
    formData.append('enabled_spooled_file', 'true');
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/forced-alignment', {
      method: 'POST',
      headers: {
        'xi-api-key': config.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs Forced Alignment failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    return {
      words: result.words || [],
      characters: result.characters || [],
      loss: result.loss || 0,
    };
  } catch (error) {
    console.error('Forced alignment error:', error);
    throw error;
  }
}

/**
 * Convert word alignments to milliseconds for easier UI usage
 */
export function convertToMilliseconds(
  result: ForcedAlignmentResult
): {
  words: Array<{ word: string; startMs: number; endMs: number; confidence: number }>;
  characters: Array<{ char: string; startMs: number; endMs: number }>;
} {
  return {
    words: result.words.map((w) => ({
      word: w.aligned_word || w.word,
      startMs: w.start_time * 1000,
      endMs: w.end_time * 1000,
      confidence: w.confidence,
    })),
    characters: result.characters.map((c) => ({
      char: c.char,
      startMs: c.start_time * 1000,
      endMs: c.end_time * 1000,
    })),
  };
}
