/**
 * Audio Encoder Service
 * Converts Float32Array audio from VAD to optimized formats for transmission
 */

export interface AudioEncoderOptions {
  sampleRate: number;
  encoding: "opus" | "webm" | "pcm";
}

export class AudioEncoder {
  private options: AudioEncoderOptions;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private dest: MediaStreamAudioDestinationNode | null = null;

  constructor(options: AudioEncoderOptions) {
    this.options = options;
  }

  /**
   * Initialize the encoder with a media stream
   */
  async initialize(): Promise<void> {
    // Create audio context
    this.audioContext = new AudioContext({
      sampleRate: this.options.sampleRate,
    });

    // Create destination node for recording
    this.dest = this.audioContext.createMediaStreamDestination();

    // Determine MIME type based on encoding
    const mimeType = this.getMimeType();

    // Create MediaRecorder
    this.mediaRecorder = new MediaRecorder(this.dest.stream, {
      mimeType,
      audioBitsPerSecond: 16000, // Low bitrate for bandwidth optimization
    });
  }

  /**
   * Get MIME type for MediaRecorder based on encoding preference
   */
  private getMimeType(): string {
    const { encoding } = this.options;

    if (encoding === "opus") {
      // Try opus in different containers
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        return "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
        return "audio/ogg;codecs=opus";
      }
    }

    if (encoding === "webm") {
      if (MediaRecorder.isTypeSupported("audio/webm")) {
        return "audio/webm";
      }
    }

    // Fallback to any supported type
    return "audio/webm";
  }

  /**
   * Encode Float32Array to Blob
   */
  async encode(audioData: Float32Array): Promise<Blob> {
    if (!this.audioContext || !this.dest || !this.mediaRecorder) {
      throw new Error("Encoder not initialized");
    }

    return new Promise((resolve, reject) => {
      const chunks: Blob[] = [];

      this.mediaRecorder!.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      this.mediaRecorder!.onstop = () => {
        const blob = new Blob(chunks, { type: this.mediaRecorder!.mimeType });
        resolve(blob);
      };

      this.mediaRecorder!.onerror = (event: Event) => {
        reject(new Error(`MediaRecorder error: ${event}`));
      };

      // Create audio buffer from Float32Array
      const audioBuffer = this.audioContext!.createBuffer(
        1, // mono
        audioData.length,
        this.options.sampleRate
      );

      audioBuffer.copyToChannel(audioData, 0);

      // Create buffer source
      const source = this.audioContext!.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.dest!);

      // Start recording
      this.mediaRecorder!.start();

      // Play audio (triggers recording)
      source.start(0);

      // Stop recording when audio finishes
      source.onended = () => {
        this.mediaRecorder!.stop();
      };
    });
  }

  /**
   * Encode to PCM (fallback for unsupported browsers)
   */
  encodeToPCM(audioData: Float32Array): ArrayBuffer {
    // Convert Float32 to Int16 PCM
    const pcm = new Int16Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      const s = Math.max(-1, Math.min(1, audioData[i]));
      pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return pcm.buffer;
  }

  /**
   * Get the encoding format being used
   */
  getFormat(): string {
    if (!this.mediaRecorder) {
      return "unknown";
    }
    return this.mediaRecorder.mimeType;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
    }
    this.mediaRecorder = null;
    this.audioContext = null;
    this.dest = null;
  }
}
