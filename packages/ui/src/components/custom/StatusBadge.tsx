import { cn } from "../../lib/utils";

export type StatusType = "idle" | "listening" | "processing" | "speaking" | "error" | "connected" | "disconnected" | "running" | "pending";

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showPulse?: boolean;
}

const statusConfig: Record<StatusType, { color: string; label: string; bgColor: string }> = {
  idle: {
    color: "text-text-tertiary",
    bgColor: "bg-bg-tertiary",
    label: "Idle",
  },
  listening: {
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
    label: "Listening",
  },
  processing: {
    color: "text-accent-warning",
    bgColor: "bg-accent-warning/10",
    label: "Processing",
  },
  speaking: {
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    label: "Speaking",
  },
  error: {
    color: "text-accent-error",
    bgColor: "bg-accent-error/10",
    label: "Error",
  },
  connected: {
    color: "text-accent-success",
    bgColor: "bg-accent-success/10",
    label: "Connected",
  },
  disconnected: {
    color: "text-text-tertiary",
    bgColor: "bg-bg-tertiary",
    label: "Disconnected",
  },
  running: {
    color: "text-accent-success",
    bgColor: "bg-accent-success/10",
    label: "Running",
  },
  pending: {
    color: "text-accent-warning",
    bgColor: "bg-accent-warning/10",
    label: "Pending",
  },
};

export function StatusBadge({ status, className, showPulse = true }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.color,
        className
      )}
    >
      <div className="relative">
        <div className={cn("w-2 h-2 rounded-full", config.color.replace("text-", "bg-"))} />
        {showPulse && (status === "listening" || status === "speaking" || status === "processing" || status === "running") && (
          <div
            className={cn(
              "absolute inset-0 w-2 h-2 rounded-full animate-ping",
              config.color.replace("text-", "bg-")
            )}
          />
        )}
      </div>
      {config.label}
    </div>
  );
}
