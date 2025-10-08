import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MicButton } from "../audio/MicButton";
import { ModeSelector, AudioMode } from "../audio/ModeSelector";
import { VolumeMeter } from "../audio/VolumeMeter";
import { FireFlyBackground } from "../custom/FireFlyBackground";
import { FileUpload, UploadedFile } from "../custom/FileUpload";
import { cn } from "../../lib/utils";

export interface BottomBarProps {
  mode: AudioMode;
  isRecording: boolean;
  isSpeaking: boolean;
  volumeLevel: number;
  hasTranscript: boolean;
  currentTranscript?: string;
  textMessage: string;
  files: UploadedFile[];
  onModeChange: (mode: AudioMode) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTextMessageChange: (text: string) => void;
  onFilesAdded: (files: File[]) => void;
  onFileRemoved: (id: string) => void;
  onSend?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function BottomBar({
  mode,
  isRecording,
  isSpeaking,
  volumeLevel,
  textMessage,
  files,
  onModeChange,
  onStartRecording,
  onStopRecording,
  onTextMessageChange,
  onFilesAdded,
  onFileRemoved,
  onSend,
  className,
}: BottomBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter sends the message
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && onSend) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-4 px-4 py-3 bg-bg-secondary border-t border-border overflow-hidden",
        className
      )}
    >
      {/* Firefly Background */}
      <FireFlyBackground
        particleCount={12}
        minSize={80}
        maxSize={180}
        blurRadius={20}
        maxOpacity={0.3}
        maxSpeed={4}
      />

      {/* Left: File Upload - takes remaining space */}
      <div className="relative z-10 flex-1 hidden lg:flex min-w-0">
        <FileUpload
          files={files}
          onFilesAdded={onFilesAdded}
          onFileRemoved={onFileRemoved}
          maxFiles={5}
          className="w-full"
        />
      </div>

      {/* Center: Recording Controls - fixed width, centered */}
      <div className="relative z-10 flex items-center gap-3 shrink-0">
        {/* Mode Selector - hidden on mobile */}
        <div className="hidden md:block">
          <ModeSelector mode={mode} onChange={onModeChange} />
        </div>

        {/* Volume Meter - hidden on smaller screens */}
        <div className="hidden xl:block w-32">
          <VolumeMeter level={volumeLevel} isSpeaking={isSpeaking} />
        </div>

        {/* Mic Button */}
        <MicButton
          isRecording={isRecording}
          onStart={onStartRecording}
          onStop={onStopRecording}
          size="lg"
        />
      </div>

      {/* Right: Text Input - takes remaining space equal to left */}
      <div className="relative z-10 flex-1 flex items-start gap-2 min-w-0">
        <Textarea
          placeholder="Type a message... (Ctrl+Enter to send)"
          value={textMessage}
          onChange={(e) => onTextMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-bg-primary border-border focus:border-accent-blue resize-none min-h-[2.5rem] max-h-32"
          rows={1}
        />
        {onSend && (
          <Button
            size="icon"
            onClick={onSend}
            disabled={!textMessage.trim() && files.length === 0}
            className="bg-accent-blue hover:bg-accent-blue/90 text-bg-primary shrink-0 mt-1"
          >
            <Send className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
