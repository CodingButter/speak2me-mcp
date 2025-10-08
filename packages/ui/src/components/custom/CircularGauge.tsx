import { cn } from "../../lib/utils";

export interface CircularGaugeProps {
  value: number; // 0-100
  label: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  unit?: string; // default "%"
  maxValue?: number; // for scaling non-percentage values (e.g., temp max 100°C)
}

export function CircularGauge({
  value,
  label,
  className,
  size = 120,
  strokeWidth = 8,
  color,
  showValue = true,
  unit = "%",
  maxValue = 100,
}: CircularGaugeProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedValue / 100) * circumference;

  // Calculate display value (for non-percentage units)
  const displayValue = unit === "%" ? Math.round(normalizedValue) : Math.round(value);

  // Determine color based on value if not explicitly provided
  const gaugeColor = color || (
    normalizedValue >= 80 ? "#ef4444" : // red
    normalizedValue >= 60 ? "#f59e0b" : // warning
    "#10b981" // success
  );

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2d2d3d"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">
              {displayValue}{unit}
            </span>
          </div>
        )}
      </div>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
