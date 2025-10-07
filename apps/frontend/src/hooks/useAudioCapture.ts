import { useState, useCallback, useRef, useEffect } from "react";
import { MicVAD } from "@ricky0123/vad-web";

interface WordTimestamp {
  word: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

interface AudioCaptureConfig {
  mode: "auto" | "manual" | "ptt";
  vadThreshold?: number;
  minSilenceMs?: number;
  maxUtteranceMs?: number;
  sampleRate?: number;
  preRollMs?: number; // Pre-roll buffer duration
  onTranscript?: (transcript: string, words: WordTimestamp[], audioBlob: Blob) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
}

interface AudioCaptureState {
  isRecording: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
}

export function useAudioCapture(config: AudioCaptureConfig) {
  const [state, setState] = useState<AudioCaptureState>({
    isRecording: false,
    isListening: false,
    isSpeaking: false,
    error: null,
  });

  const vadRef = useRef<MicVAD | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const preRollBufferRef = useRef<Float32Array[]>([]);
  const speechStartTimeRef = useRef<number>(0);
  const wordTimestampsRef = useRef<WordTimestamp[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize Web Speech API
  const initializeSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      return;
    }

    // Check if Web Speech API is available
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setState((prev) => ({
        ...prev,
        error: "Web Speech API not supported in this browser",
      }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = config.mode === "auto";
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setState((prev) => ({ ...prev, isSpeaking: true }));
      config.onSpeechStart?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        config.onTranscript?.(transcript);
        setState((prev) => ({ ...prev, isSpeaking: false }));
        config.onSpeechEnd?.();
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setState((prev) => ({
        ...prev,
        error: event.error,
        isSpeaking: false,
      }));
    };

    recognition.onend = () => {
      setState((prev) => ({ ...prev, isSpeaking: false }));
      // Auto-restart in continuous mode
      if (config.mode === "auto" && state.isRecording) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, [config, state.isRecording]);

  // Start listening (Auto mode)
  const startListening = useCallback(() => {
    if (config.mode !== "auto") {
      return;
    }

    initializeSpeechRecognition();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setState((prev) => ({ ...prev, isListening: true, isRecording: true, error: null }));
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  }, [config.mode, initializeSpeechRecognition]);

  // Stop listening (Auto mode)
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setState((prev) => ({ ...prev, isListening: false, isRecording: false, isSpeaking: false }));
    }
  }, []);

  // Start manual recording (Manual mode)
  const startRecording = useCallback(() => {
    if (config.mode !== "manual") {
      return;
    }

    initializeSpeechRecognition();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setState((prev) => ({ ...prev, isRecording: true, error: null }));
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  }, [config.mode, initializeSpeechRecognition]);

  // Stop manual recording (Manual mode)
  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setState((prev) => ({ ...prev, isRecording: false, isSpeaking: false }));
    }
  }, []);

  // PTT: Hold to record
  const startPTT = useCallback(() => {
    if (config.mode !== "ptt") {
      return;
    }

    initializeSpeechRecognition();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setState((prev) => ({ ...prev, isRecording: true, error: null }));
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  }, [config.mode, initializeSpeechRecognition]);

  const stopPTT = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setState((prev) => ({ ...prev, isRecording: false, isSpeaking: false }));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    startRecording,
    stopRecording,
    startPTT,
    stopPTT,
  };
}
