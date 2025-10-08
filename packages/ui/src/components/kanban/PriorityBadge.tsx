import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

export type Priority = "high" | "medium" | "low";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
  medium: "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25",
  low: "bg-blue-500/15 text-blue-400 hover:bg-blue-500/25",
};

export const PriorityBadge = React.forwardRef<
  HTMLDivElement,
  PriorityBadgeProps
>(({ priority, className }, ref) => {
  return (
    <Badge
      ref={ref}
      variant="outline"
      className={cn(
        "text-xs font-semibold uppercase tracking-wide border-0",
        priorityStyles[priority],
        className
      )}
    >
      {priority}
    </Badge>
  );
});

PriorityBadge.displayName = "PriorityBadge";
