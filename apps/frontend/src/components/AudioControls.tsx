import { useState } from "react";
import { Mic, MicOff, Send, Square, Settings } from "lucide-react";

type ListenMode = "auto" | "manual" | "ptt";

interface AudioControlsProps {
  mode: ListenMode;
  onModeChange: (mode: ListenMode) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSend: () => void;
  onCancel: () => void;
  hasTranscript: boolean;
  onOpenSettings: () => void;
}

/**
 * Audio Controls Component
 * Compact design for small windows
 *
 * Breakpoint behavior:
 * - xs (256px+): Vertical stack, icons only
 * - sm (384px+): Horizontal layout with minimal text
 * - md (512px+): Full labels
 */
export function AudioControls({
  mode,
  onModeChange,
  isRecording,
  onStartRecording,
  onStopRecording,
  onSend,
  onCancel,
  hasTranscript,
  onOpenSettings,
}: AudioControlsProps) {
  const [isPTTHeld, setIsPTTHeld] = useState(false);

  return (
    <div className="p-2 sm:p-3 space-y-2">
      {/* Top row: Mode selector */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex-1 flex gap-1 bg-muted rounded-md p-1">
          <button
            onClick={() => onModeChange("auto")}
            className={`
              flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors
              ${mode === "auto" ? "bg-background shadow-sm" : "hover:bg-background/50"}
            `}
          >
            <span className="hidden sm:inline">Auto</span>
            <span className="sm:hidden">A</span>
          </button>
          <button
            onClick={() => onModeChange("manual")}
            className={`
              flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors
              ${mode === "manual" ? "bg-background shadow-sm" : "hover:bg-background/50"}
            `}
          >
            <span className="hidden sm:inline">Manual</span>
            <span className="sm:hidden">M</span>
          </button>
          <button
            onClick={() => onModeChange("ptt")}
            className={`
              flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors
              ${mode === "ptt" ? "bg-background shadow-sm" : "hover:bg-background/50"}
            `}
          >
            <span className="hidden sm:inline">PTT</span>
            <span className="sm:hidden">P</span>
          </button>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom row: Recording controls */}
      <div className="flex items-center gap-2">
        {/* Recording/PTT button */}
        {mode === "ptt" ? (
          <button
            onMouseDown={() => {
              setIsPTTHeld(true);
              onStartRecording();
            }}
            onMouseUp={() => {
              setIsPTTHeld(false);
              onStopRecording();
            }}
            onMouseLeave={() => {
              if (isPTTHeld) {
                setIsPTTHeld(false);
                onStopRecording();
              }
            }}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium
              transition-colors
              ${
                isPTTHeld
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
            `}
          >
            {isPTTHeld ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline text-sm">Recording...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Hold to Talk</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium
              transition-colors
              ${
                isRecording
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
            `}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Record</span>
              </>
            )}
          </button>
        )}

        {/* Send/Cancel buttons (manual mode only) */}
        {mode === "manual" && hasTranscript && (
          <>
            <button
              onClick={onCancel}
              className="px-3 py-3 sm:px-4 hover:bg-accent rounded-md transition-colors"
              aria-label="Cancel"
            >
              <span className="text-sm font-medium">Cancel</span>
            </button>
            <button
              onClick={onSend}
              className="px-3 py-3 sm:px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Send</span>
            </button>
          </>
        )}
      </div>

      {/* VU Meter placeholder */}
      {isRecording && (
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse" style={{ width: "60%" }} />
        </div>
      )}
    </div>
  );
}
