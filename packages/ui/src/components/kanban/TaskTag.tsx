import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

interface TaskTagProps {
  tag: string;
  className?: string;
}

export const TaskTag = React.forwardRef<HTMLDivElement, TaskTagProps>(
  ({ tag, className }, ref) => {
    return (
      <Badge
        ref={ref}
        variant="secondary"
        className={cn(
          "text-xs font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700",
          className
        )}
      >
        {tag}
      </Badge>
    );
  }
);

TaskTag.displayName = "TaskTag";
