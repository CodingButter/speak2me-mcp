import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export interface WaveformProps {
  audioData?: Float32Array;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  className?: string;
  barCount?: number;
  barColor?: string;
  progressColor?: string;
}

// Mark isPlaying as unused for now
const _unusedIsPlaying = (props: WaveformProps) => props.isPlaying;

export function Waveform({
  audioData,
  isPlaying,
  currentTime = 0,
  duration = 1,
  className,
  barCount = 50,
  barColor = "#808090",
  progressColor = "#00d4ff",
}: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / barCount;
    const progress = duration > 0 ? currentTime / duration : 0;

    // Draw waveform bars
    for (let i = 0; i < barCount; i++) {
      const x = i * barWidth;
      let barHeight: number;

      if (audioData && audioData.length > 0) {
        // Use actual audio data
        const dataIndex = Math.floor((i / barCount) * audioData.length);
        const amplitude = Math.abs(audioData[dataIndex] || 0);
        barHeight = amplitude * height * 0.8;
      } else {
        // Generate placeholder bars
        barHeight = (Math.sin(i * 0.5) * 0.3 + 0.4) * height * 0.6;
      }

      barHeight = Math.max(2, barHeight);

      // Color based on progress
      const isPast = i / barCount <= progress;
      ctx.fillStyle = isPast ? progressColor : barColor;

      const y = (height - barHeight) / 2;
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
    }
  }, [audioData, currentTime, duration, barCount, barColor, progressColor]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={60}
      className={cn("w-full h-full", className)}
      style={{ maxHeight: "60px" }}
    />
  );
}
