import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type AudioMode = "auto" | "manual" | "ptt";

export interface ModeSelectorProps {
  mode: AudioMode;
  onChange: (mode: AudioMode) => void;
  className?: string;
}

const modes: { value: AudioMode; label: string; description: string }[] = [
  { value: "auto", label: "Auto", description: "Auto-send transcripts" },
  { value: "manual", label: "Manual", description: "Review before sending" },
  { value: "ptt", label: "PTT", description: "Push-to-talk" },
];

export function ModeSelector({ mode, onChange, className }: ModeSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-text-secondary">
        Recording Mode
      </label>
      <div className="flex gap-2">
        {modes.map((m) => (
          <Button
            key={m.value}
            variant={mode === m.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(m.value)}
            className={cn(
              "flex-1 transition-all",
              mode === m.value
                ? "bg-accent-blue text-bg-primary"
                : "bg-bg-tertiary text-text-secondary hover:bg-bg-hover"
            )}
          >
            {m.label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-text-tertiary">
        {modes.find((m) => m.value === mode)?.description}
      </p>
    </div>
  );
}
