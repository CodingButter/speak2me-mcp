import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      description,
      icon: Icon,
      trend,
      trendValue,
      className,
    },
    ref
  ) => {
    const trendColors = {
      up: "text-green-400",
      down: "text-red-400",
      neutral: "text-slate-400",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "p-6 bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-colors",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-slate-100 mb-1">{value}</p>
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
            {trend && trendValue && (
              <p className={cn("text-xs mt-2", trendColors[trend])}>
                {trendValue}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
          )}
        </div>
      </Card>
    );
  }
);

MetricCard.displayName = "MetricCard";
