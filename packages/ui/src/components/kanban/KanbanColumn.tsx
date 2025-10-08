import * as React from "react";
import { cn } from "../../lib/utils";

interface KanbanColumnProps {
  title: string;
  count?: number;
  children?: React.ReactNode;
  className?: string;
}

export const KanbanColumn = React.forwardRef<HTMLDivElement, KanbanColumnProps>(
  ({ title, count, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col min-w-[300px] max-w-[350px]",
          className
        )}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between px-4 py-3 mb-3 bg-slate-800/50 border border-slate-700 rounded-lg">
          <h2 className="text-sm font-semibold text-slate-200">{title}</h2>
          {typeof count === "number" && (
            <span className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">
              {count}
            </span>
          )}
        </div>

        {/* Column Content */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-300px)]">
          {children}
        </div>
      </div>
    );
  }
);

KanbanColumn.displayName = "KanbanColumn";
