import { useState, useCallback, useRef, useEffect } from "react";
import { MicVAD } from "@ricky0123/vad-web";
import {
  processAudio,
  PreRollBuffer,
  calculateRMS,
  type AudioProcessorConfig,
  type ProcessedAudio,
} from "../services/audioProcessor";

export interface AudioCaptureConfig {
  mode: "auto" | "manual" | "ptt";
  // Noise gate / VAD settings
  vadThreshold?: number; // 0-1, threshold for speech detection
  minSpeechMs?: number; // Minimum speech duration to consider valid
  minSilenceMs?: number; // Minimum silence to consider end of speech
  maxSilenceMs?: number; // Max silence in middle before splicing
  // Recording settings
  sampleRate?: number;
  preRollMs?: number; // Buffer before speech starts
  postRollMs?: number; // Buffer after speech ends
  autoSendDelayMs?: number; // Delay before auto-sending in auto mode
  // Callbacks
  onTranscript?: (transcript: string, processedAudio: ProcessedAudio) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeChange?: (volume: number) => void; // For volume meter UI
  onAutoSendCountdown?: (remainingMs: number) => void;
}

export interface AudioCaptureState {
  isRecording: boolean;
  isListening: boolean; // Mic is active and listening
  isSpeaking: boolean; // Speech detected
  currentVolume: number; // Current RMS volume (0-1)
  error: string | null;
  autoSendCountdown: number | null; // Countdown timer for auto-send (ms)
}

/**
 * Audio capture hook with VAD noise gate, silence trimming, and multiple modes
 *
 * Modes:
 * - auto: Starts listening automatically, auto-sends after silence delay
 * - manual: User clicks to start/stop recording
 * - ptt: Push-to-talk - hold button/key to record
 */
export function useAudioCapture(config: AudioCaptureConfig) {
  const [state, setState] = useState<AudioCaptureState>({
    isRecording: false,
    isListening: false,
    isSpeaking: false,
    currentVolume: 0,
    error: null,
    autoSendCountdown: null,
  });

  // Refs
  const vadRef = useRef<MicVAD | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const preRollBufferRef = useRef<PreRollBuffer | null>(null);
  const recordedChunksRef = useRef<Float32Array[]>([]);
  const speechStartTimeRef = useRef<number | null>(null);
  const autoSendTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  // Get config with defaults
  const getConfig = useCallback((): Required<Omit<AudioCaptureConfig, "onTranscript" | "onSpeechStart" | "onSpeechEnd" | "onVolumeChange" | "onAutoSendCountdown">> => {
    return {
      mode: config.mode,
      vadThreshold: config.vadThreshold ?? 0.5,
      minSpeechMs: config.minSpeechMs ?? 200,
      minSilenceMs: config.minSilenceMs ?? 500,
      maxSilenceMs: config.maxSilenceMs ?? 2000,
      sampleRate: config.sampleRate ?? 16000,
      preRollMs: config.preRollMs ?? 300,
      postRollMs: config.postRollMs ?? 200,
      autoSendDelayMs: config.autoSendDelayMs ?? 1500,
    };
  }, [config]);

  /**
   * Process and finalize recorded audio
   */
  const finalizeRecording = useCallback(async () => {
    const cfg = getConfig();

    // Get pre-roll buffer
    const preRoll = preRollBufferRef.current?.getBuffer() || new Float32Array(0);

    // Combine pre-roll + recorded chunks
    const totalLength = preRoll.length + recordedChunksRef.current.reduce((sum, chunk) => sum + chunk.length, 0);
    const combinedAudio = new Float32Array(totalLength);
    combinedAudio.set(preRoll, 0);

    let offset = preRoll.length;
    for (const chunk of recordedChunksRef.current) {
      combinedAudio.set(chunk, offset);
      offset += chunk.length;
    }

    if (combinedAudio.length === 0) {
      return;
    }

    // Process audio (trim silence, splice extended silence)
    const processorConfig: AudioProcessorConfig = {
      sampleRate: cfg.sampleRate,
      silenceThreshold: cfg.vadThreshold * 0.3, // Lower threshold for silence detection
      minSilenceMs: cfg.minSilenceMs,
      maxSilenceMs: cfg.maxSilenceMs,
      preRollMs: 0, // Already included in recording
      postRollMs: cfg.postRollMs,
    };

    const processed = await processAudio(combinedAudio, cfg.sampleRate, processorConfig);

    // For now, just return the audio blob
    // In full implementation, this would send to STT service
    config.onTranscript?.("", processed);

    // Clear buffers
    recordedChunksRef.current = [];
    preRollBufferRef.current?.clear();
    speechStartTimeRef.current = null;
  }, [config, getConfig]);

  /**
   * Start auto-send countdown timer
   */
  const startAutoSendCountdown = useCallback(() => {
    const cfg = getConfig();

    if (config.mode !== "auto" || cfg.autoSendDelayMs <= 0) {
      return;
    }

    // Clear existing timers
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    let remainingMs = cfg.autoSendDelayMs;
    setState((prev) => ({ ...prev, autoSendCountdown: remainingMs }));
    config.onAutoSendCountdown?.(remainingMs);

    // Update countdown every 100ms
    countdownIntervalRef.current = window.setInterval(() => {
      remainingMs -= 100;
      setState((prev) => ({ ...prev, autoSendCountdown: Math.max(0, remainingMs) }));
      config.onAutoSendCountdown?.(Math.max(0, remainingMs));

      if (remainingMs <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      }
    }, 100);

    // Set timeout to finalize recording
    autoSendTimerRef.current = window.setTimeout(() => {
      finalizeRecording();
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        autoSendCountdown: null,
      }));
      config.onSpeechEnd?.();
    }, cfg.autoSendDelayMs);
  }, [config, getConfig, finalizeRecording]);

  /**
   * Cancel auto-send countdown (speech resumed)
   */
  const cancelAutoSendCountdown = useCallback(() => {
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setState((prev) => ({ ...prev, autoSendCountdown: null }));
  }, []);

  /**
   * Initialize VAD and audio context
   */
  const initializeVAD = useCallback(async () => {
    if (vadRef.current) {
      return;
    }

    const cfg = getConfig();

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: cfg.sampleRate,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({ sampleRate: cfg.sampleRate });
      audioContextRef.current = audioContext;

      // Initialize pre-roll buffer
      preRollBufferRef.current = new PreRollBuffer(
        cfg.preRollMs,
        cfg.sampleRate,
        2048
      );

      // Initialize VAD
      const vad = await MicVAD.new({
        stream,
        positiveSpeechThreshold: cfg.vadThreshold,
        negativeSpeechThreshold: cfg.vadThreshold * 0.7,
        minSpeechFrames: Math.floor(cfg.minSpeechMs / 10), // VAD uses 10ms frames
        onSpeechStart: () => {
          console.log("VAD: Speech start");
          speechStartTimeRef.current = Date.now();
          cancelAutoSendCountdown();
          setState((prev) => ({ ...prev, isSpeaking: true }));
          config.onSpeechStart?.();
        },
        onSpeechEnd: (audio: Float32Array) => {
          console.log("VAD: Speech end", audio.length);

          // Add audio to recorded chunks
          recordedChunksRef.current.push(new Float32Array(audio));

          // Start auto-send countdown if in auto mode
          if (config.mode === "auto") {
            startAutoSendCountdown();
          } else {
            setState((prev) => ({ ...prev, isSpeaking: false }));
          }
        },
        onFrameProcessed: (_probs: { isSpeech: number; notSpeech: number }, audio: Float32Array) => {
          // Calculate and report volume for UI
          const volume = calculateRMS(audio);
          setState((prev) => ({ ...prev, currentVolume: volume }));
          config.onVolumeChange?.(volume);

          // Add to pre-roll buffer if not currently speaking
          if (!speechStartTimeRef.current) {
            preRollBufferRef.current?.push(audio);
          }
        },
      });

      vadRef.current = vad;
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      console.error("Failed to initialize VAD:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to access microphone",
      }));
    }
  }, [config, getConfig, startAutoSendCountdown, cancelAutoSendCountdown]);

  /**
   * Start listening (auto mode) or recording (manual/ptt modes)
   */
  const start = useCallback(async () => {
    await initializeVAD();

    if (vadRef.current) {
      vadRef.current.start();
      setState((prev) => ({
        ...prev,
        isListening: true,
        isRecording: true,
      }));
    }
  }, [initializeVAD]);

  /**
   * Stop listening/recording
   */
  const stop = useCallback(async () => {
    if (vadRef.current) {
      vadRef.current.pause();
    }

    // Cancel any pending auto-send
    cancelAutoSendCountdown();

    // Finalize recording if there's audio
    if (recordedChunksRef.current.length > 0 || (preRollBufferRef.current && preRollBufferRef.current.getDuration() > 0)) {
      await finalizeRecording();
    }

    setState((prev) => ({
      ...prev,
      isListening: false,
      isRecording: false,
      isSpeaking: false,
      currentVolume: 0,
    }));
  }, [finalizeRecording, cancelAutoSendCountdown]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (vadRef.current) {
        vadRef.current.destroy();
        vadRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return {
    ...state,
    // Mode-agnostic controls
    start,
    stop,
    // Legacy aliases for compatibility
    startListening: start,
    stopListening: stop,
    startRecording: start,
    stopRecording: stop,
    startPTT: start,
    stopPTT: stop,
  };
}
