import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface MicButtonProps {
  isRecording: boolean;
  isDisabled?: boolean;
  onStart: () => void;
  onStop: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function MicButton({
  isRecording,
  isDisabled,
  onStart,
  onStop,
  className,
  size = "default",
}: MicButtonProps) {
  const handleClick = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      size={size}
      className={cn(
        "relative transition-all",
        isRecording && "bg-accent-error hover:bg-accent-error/90",
        !isRecording && "bg-accent-blue hover:bg-accent-blue/90",
        className
      )}
    >
      {isRecording ? (
        <>
          <Square className="w-4 h-4 mr-2" />
          Stop
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-error animate-pulse" />
        </>
      ) : (
        <>
          {isDisabled ? (
            <MicOff className="w-4 h-4 mr-2" />
          ) : (
            <Mic className="w-4 h-4 mr-2" />
          )}
          Record
        </>
      )}
    </Button>
  );
}
