import * as React from "react";
import { cn } from "../../lib/utils";

interface KanbanBoardProps {
  children?: React.ReactNode;
  className?: string;
}

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          "scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

KanbanBoard.displayName = "KanbanBoard";
