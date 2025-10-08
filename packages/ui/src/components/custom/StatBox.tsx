import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatBox({ label, value, icon: Icon, trend, className }: StatBoxProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-bg-secondary border border-border space-y-2",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-text-tertiary" />}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-accent-success" : "text-accent-error"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
