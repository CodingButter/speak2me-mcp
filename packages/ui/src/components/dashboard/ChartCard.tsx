import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ChartCardProps {
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(
  ({ title, children, actions, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-6 bg-slate-900/50 border-slate-700",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>

        {/* Chart Content */}
        <div className="w-full">{children}</div>
      </Card>
    );
  }
);

ChartCard.displayName = "ChartCard";
