/**
 * Web Speech API Integration
 * Provides free browser-based speech-to-text transcription
 * Word-level timestamps are obtained via ElevenLabs Forced Alignment API
 */

export interface TranscriptResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface RecognitionConfig {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

/**
 * Web Speech API Wrapper
 * Simple transcription service - timestamps are handled by Forced Alignment
 */
export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private config: RecognitionConfig;

  constructor(config: RecognitionConfig = {}) {
    this.config = {
      language: "en-US",
      continuous: true,
      interimResults: true,
      maxAlternatives: 1,
      ...config,
    };
  }

  /**
   * Initialize Speech Recognition
   */
  initialize(): void {
    // Check for browser support
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      throw new Error("Web Speech API not supported in this browser");
    }

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = this.config.language!;
    this.recognition.continuous = this.config.continuous!;
    this.recognition.interimResults = this.config.interimResults!;
    this.recognition.maxAlternatives = this.config.maxAlternatives!;
  }

  /**
   * Start recognition
   */
  start(
    onResult: (result: TranscriptResult) => void,
    onError?: (error: Error) => void,
    onEnd?: () => void,
    onSpeechStart?: () => void,
    onSpeechEnd?: () => void
  ): void {
    if (!this.recognition) {
      this.initialize();
    }

    this.recognition!.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[event.results.length - 1];
      const alternative = speechResult[0];

      const result: TranscriptResult = {
        transcript: alternative.transcript,
        confidence: alternative.confidence || 1.0,
        isFinal: speechResult.isFinal,
      };

      onResult(result);
    };

    this.recognition!.onerror = (event: any) => {
      if (onError) {
        onError(new Error(`Speech recognition error: ${event.error}`));
      }
    };

    this.recognition!.onend = () => {
      if (onEnd) {
        onEnd();
      }
    };

    // Wire up speech start/end events for precise speech detection
    this.recognition!.onspeechstart = () => {
      if (onSpeechStart) {
        onSpeechStart();
      }
    };

    this.recognition!.onspeechend = () => {
      if (onSpeechEnd) {
        onSpeechEnd();
      }
    };

    this.recognition!.start();
  }

  /**
   * Stop recognition
   */
  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  /**
   * Abort recognition
   */
  abort(): void {
    if (this.recognition) {
      this.recognition.abort();
    }
  }

  /**
   * Destroy and cleanup
   */
  destroy(): void {
    if (this.recognition) {
      this.recognition.abort();
      this.recognition = null;
    }
  }
}
