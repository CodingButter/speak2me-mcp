import { useEffect, useRef, useState } from "react";

interface VolumeMeterProps {
  /** VAD threshold (0-1) */
  threshold: number;
  /** Callback when threshold changes */
  onThresholdChange: (threshold: number) => void;
  /** Whether to actively monitor audio */
  isActive?: boolean;
}

/**
 * Discord-style volume meter with adjustable noise gate threshold
 * Shows live microphone volume with a yellow bar that grows with volume
 */
export function VolumeMeter({ threshold, onThresholdChange, isActive = false }: VolumeMeterProps) {
  const [volume, setVolume] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  // Start/stop audio monitoring
  useEffect(() => {
    if (isActive && !isListening) {
      startListening();
    } else if (!isActive && isListening) {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isActive]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setIsListening(true);
      monitorVolume();
    } catch (error) {
      console.error("Failed to access microphone:", error);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsListening(false);
    setVolume(0);
  };

  const monitorVolume = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume (0-1)
    const avg = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length / 255;
    setVolume(avg);

    animationFrameRef.current = requestAnimationFrame(monitorVolume);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThreshold = parseFloat(event.target.value);
    onThresholdChange(newThreshold);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Input Sensitivity</label>
        <span className="text-xs text-muted-foreground">{Math.round(threshold * 100)}%</span>
      </div>

      {/* Volume meter container */}
      <div className="relative h-8 bg-muted rounded-md overflow-hidden">
        {/* Yellow volume bar */}
        <div
          className="absolute left-0 top-0 h-full bg-yellow-500 transition-all duration-75"
          style={{ width: `${volume * 100}%` }}
        />

        {/* Threshold indicator line */}
        <div
          className="absolute top-0 h-full w-0.5 bg-red-500 z-10"
          style={{ left: `${threshold * 100}%` }}
        />

        {/* Slider overlay */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={threshold}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {isListening
          ? "Speak to see your volume. Adjust the slider so the yellow bar reaches the red line when you speak normally."
          : "Click 'Test Microphone' to calibrate your input sensitivity."}
      </p>

      <button
        onClick={() => (isListening ? stopListening() : startListening())}
        className="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isListening ? "Stop Testing" : "Test Microphone"}
      </button>
    </div>
  );
}
