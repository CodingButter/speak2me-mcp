import * as React from "react";
import { cn } from "../../lib/utils";

interface DashboardGridProps {
  children?: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export const DashboardGrid = React.forwardRef<
  HTMLDivElement,
  DashboardGridProps
>(({ children, columns = 3, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-4",
        columnClasses[columns],
        className
      )}
    >
      {children}
    </div>
  );
});

DashboardGrid.displayName = "DashboardGrid";
