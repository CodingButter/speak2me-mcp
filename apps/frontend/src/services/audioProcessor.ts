/**
 * Audio Processing Utilities
 * Handles silence detection, trimming, and splicing for voice recordings
 */

export interface AudioSegment {
  startTime: number;
  endTime: number;
  isSpeech: boolean;
  audioData?: Float32Array;
}

export interface ProcessedAudio {
  audioBlob: Blob;
  originalDuration: number;
  trimmedDuration: number;
  segments: AudioSegment[];
  trimmedSilenceMs: number;
}

export interface AudioProcessorConfig {
  sampleRate: number;
  silenceThreshold: number; // RMS threshold for silence detection
  minSilenceMs: number; // Minimum silence duration to consider as actual silence
  maxSilenceMs?: number; // Maximum allowed silence in middle (will splice out longer)
  preRollMs?: number; // Keep this much audio before speech starts
  postRollMs?: number; // Keep this much audio after speech ends
}

/**
 * Calculate RMS (Root Mean Square) of audio data
 * Used for volume level detection
 */
export function calculateRMS(audioData: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < audioData.length; i++) {
    sum += audioData[i] * audioData[i];
  }
  return Math.sqrt(sum / audioData.length);
}

/**
 * Detect speech/silence segments in audio data
 */
export function detectSegments(
  audioData: Float32Array,
  sampleRate: number,
  config: AudioProcessorConfig
): AudioSegment[] {
  const segments: AudioSegment[] = [];
  const frameSize = Math.floor(sampleRate * 0.02); // 20ms frames
  const minSilenceFrames = Math.floor(config.minSilenceMs / 20);

  let currentSegment: AudioSegment | null = null;
  let silenceFrameCount = 0;

  for (let i = 0; i < audioData.length; i += frameSize) {
    const frame = audioData.slice(i, i + frameSize);
    const rms = calculateRMS(frame);
    const isSpeech = rms > config.silenceThreshold;

    const timeMs = (i / sampleRate) * 1000;

    if (isSpeech) {
      // Speech detected
      silenceFrameCount = 0;

      if (!currentSegment || !currentSegment.isSpeech) {
        // Start new speech segment
        if (currentSegment) {
          currentSegment.endTime = timeMs;
          segments.push(currentSegment);
        }
        currentSegment = {
          startTime: timeMs,
          endTime: timeMs,
          isSpeech: true,
        };
      } else {
        // Continue speech segment
        currentSegment.endTime = timeMs;
      }
    } else {
      // Silence detected
      silenceFrameCount++;

      if (silenceFrameCount >= minSilenceFrames) {
        // Confirmed silence (not just a brief pause)
        if (!currentSegment || currentSegment.isSpeech) {
          // Start new silence segment
          if (currentSegment) {
            currentSegment.endTime = timeMs;
            segments.push(currentSegment);
          }
          currentSegment = {
            startTime: timeMs,
            endTime: timeMs,
            isSpeech: false,
          };
        } else {
          // Continue silence segment
          currentSegment.endTime = timeMs;
        }
      }
    }
  }

  // Push final segment
  if (currentSegment) {
    currentSegment.endTime = (audioData.length / sampleRate) * 1000;
    segments.push(currentSegment);
  }

  return segments;
}

/**
 * Trim silence from beginning and end of audio
 * Keeps pre-roll and post-roll buffers if specified
 */
export function trimSilence(
  audioData: Float32Array,
  sampleRate: number,
  config: AudioProcessorConfig
): { trimmedData: Float32Array; startOffset: number; endOffset: number } {
  const segments = detectSegments(audioData, sampleRate, config);

  // Find first and last speech segments
  const firstSpeech = segments.find((s) => s.isSpeech);
  const lastSpeech = segments.reverse().find((s) => s.isSpeech);
  segments.reverse(); // Restore original order

  if (!firstSpeech || !lastSpeech) {
    // No speech found, return empty
    return {
      trimmedData: new Float32Array(0),
      startOffset: 0,
      endOffset: audioData.length,
    };
  }

  // Calculate trim points with pre/post roll
  const preRollMs = config.preRollMs || 0;
  const postRollMs = config.postRollMs || 0;

  const startTimeMs = Math.max(0, firstSpeech.startTime - preRollMs);
  const endTimeMs = Math.min(
    (audioData.length / sampleRate) * 1000,
    lastSpeech.endTime + postRollMs
  );

  const startSample = Math.floor((startTimeMs / 1000) * sampleRate);
  const endSample = Math.floor((endTimeMs / 1000) * sampleRate);

  const trimmedData = audioData.slice(startSample, endSample);

  return {
    trimmedData,
    startOffset: startSample,
    endOffset: audioData.length - endSample,
  };
}

/**
 * Splice out extended silence from the middle of audio
 * Keeps silence under maxSilenceMs, removes anything longer
 */
export function spliceSilence(
  audioData: Float32Array,
  sampleRate: number,
  config: AudioProcessorConfig
): Float32Array {
  if (!config.maxSilenceMs) {
    return audioData; // No splicing configured
  }

  const segments = detectSegments(audioData, sampleRate, config);
  const outputChunks: Float32Array[] = [];

  for (const segment of segments) {
    const startSample = Math.floor((segment.startTime / 1000) * sampleRate);
    const endSample = Math.floor((segment.endTime / 1000) * sampleRate);
    const segmentData = audioData.slice(startSample, endSample);

    if (segment.isSpeech) {
      // Keep all speech
      outputChunks.push(segmentData);
    } else {
      // Silence segment - check if it's too long
      const silenceDuration = segment.endTime - segment.startTime;

      if (silenceDuration <= config.maxSilenceMs) {
        // Keep short silence
        outputChunks.push(segmentData);
      } else {
        // Splice out extended silence, keep only maxSilenceMs
        const keepSamples = Math.floor((config.maxSilenceMs / 1000) * sampleRate);
        const reducedSilence = segmentData.slice(0, keepSamples);
        outputChunks.push(reducedSilence);
      }
    }
  }

  // Concatenate all chunks
  const totalLength = outputChunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const splicedData = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of outputChunks) {
    splicedData.set(chunk, offset);
    offset += chunk.length;
  }

  return splicedData;
}

/**
 * Full audio processing pipeline
 * 1. Trim beginning/end silence
 * 2. Splice extended silence from middle
 * 3. Convert to audio blob
 */
export async function processAudio(
  audioData: Float32Array,
  sampleRate: number,
  config: AudioProcessorConfig
): Promise<ProcessedAudio> {
  const originalDuration = (audioData.length / sampleRate) * 1000;

  // Step 1: Trim beginning/end
  const { trimmedData, startOffset, endOffset } = trimSilence(audioData, sampleRate, config);

  // Step 2: Splice middle silence
  const splicedData = spliceSilence(trimmedData, sampleRate, config);

  // Step 3: Detect segments in final audio
  const segments = detectSegments(splicedData, sampleRate, config);

  const trimmedDuration = (splicedData.length / sampleRate) * 1000;
  const trimmedSilenceMs = originalDuration - trimmedDuration;

  // Convert to audio blob (WAV format)
  const audioBlob = await float32ToWavBlob(splicedData, sampleRate);

  return {
    audioBlob,
    originalDuration,
    trimmedDuration,
    segments,
    trimmedSilenceMs,
  };
}

/**
 * Convert Float32Array to WAV blob
 */
export async function float32ToWavBlob(
  audioData: Float32Array,
  sampleRate: number
): Promise<Blob> {
  // Convert float32 to int16
  const int16Data = new Int16Array(audioData.length);
  for (let i = 0; i < audioData.length; i++) {
    const s = Math.max(-1, Math.min(1, audioData[i]));
    int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  // Create WAV file
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = int16Data.length * bytesPerSample;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // WAV header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits per sample
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  // Write audio data
  const offset = 44;
  for (let i = 0; i < int16Data.length; i++) {
    view.setInt16(offset + i * 2, int16Data[i], true);
  }

  return new Blob([buffer], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

/**
 * Circular pre-roll buffer for capturing audio before speech starts
 */
export class PreRollBuffer {
  private buffer: Float32Array[];
  private maxBufferMs: number;
  private sampleRate: number;
  private samplesPerChunk: number;

  constructor(maxBufferMs: number, sampleRate: number, samplesPerChunk: number = 2048) {
    this.maxBufferMs = maxBufferMs;
    this.sampleRate = sampleRate;
    this.samplesPerChunk = samplesPerChunk;
    this.buffer = [];
  }

  /**
   * Add new audio chunk to buffer
   */
  push(audioData: Float32Array) {
    this.buffer.push(new Float32Array(audioData));

    // Calculate max chunks based on duration
    const maxChunks = Math.ceil((this.maxBufferMs / 1000) * this.sampleRate / this.samplesPerChunk);

    // Remove old chunks if buffer is too large
    while (this.buffer.length > maxChunks) {
      this.buffer.shift();
    }
  }

  /**
   * Get all buffered audio as a single Float32Array
   */
  getBuffer(): Float32Array {
    if (this.buffer.length === 0) {
      return new Float32Array(0);
    }

    const totalLength = this.buffer.reduce((sum, chunk) => sum + chunk.length, 0);
    const combined = new Float32Array(totalLength);
    let offset = 0;

    for (const chunk of this.buffer) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    return combined;
  }

  /**
   * Clear the buffer
   */
  clear() {
    this.buffer = [];
  }

  /**
   * Get current buffer duration in ms
   */
  getDuration(): number {
    const totalSamples = this.buffer.reduce((sum, chunk) => sum + chunk.length, 0);
    return (totalSamples / this.sampleRate) * 1000;
  }
}
