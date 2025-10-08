import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

export interface VolumeMeterProps {
  level: number; // 0-1
  isSpeaking?: boolean;
  className?: string;
}

export function VolumeMeter({ level, isSpeaking, className }: VolumeMeterProps) {
  const normalizedLevel = Math.max(0, Math.min(100, level * 100));

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>Volume</span>
        <span>{normalizedLevel.toFixed(0)}%</span>
      </div>
      <Progress
        value={normalizedLevel}
        className={cn(
          "h-2 transition-all",
          isSpeaking && "bg-accent-blue/20"
        )}
        indicatorClassName={cn(
          isSpeaking ? "bg-accent-blue" : "bg-text-tertiary"
        )}
      />
      {isSpeaking && (
        <div className="flex items-center gap-1 text-xs text-accent-blue">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          Speaking
        </div>
      )}
    </div>
  );
}
