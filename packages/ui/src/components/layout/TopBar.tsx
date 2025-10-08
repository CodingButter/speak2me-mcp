import { Settings, Bell, User } from "lucide-react"
import { Button } from "../ui/button"
import { StatusBadge, StatusType } from "../custom/StatusBadge"
import { Logo } from "../icons/Logo"
import { cn } from "../../lib/utils"

export interface TopBarProps {
  projectName: string
  status: StatusType
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  gpuUsage?: number
  onSettingsClick?: () => void
  onNotificationsClick?: () => void
  onProfileClick?: () => void
  className?: string
}

export function TopBar({
  projectName,
  status,
  cpuUsage,
  memoryUsage,
  diskUsage,
  gpuUsage,
  onSettingsClick,
  onNotificationsClick,
  onProfileClick,
  className,
}: TopBarProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center px-6 py-3 bg-slate-900/30 backdrop-blur-xl border-b border-slate-700/50 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none",
        className
      )}
    >
      <div className="relative z-10 flex items-center gap-4">
        <Logo size={32} className="text-accent-blue bg-white" />
        <h1 className="text-lg font-semibold text-text-primary">{projectName}</h1>
        <StatusBadge status={status} />
      </div>

      <div className="relative z-10 flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          <MiniGauge label="CPU" value={cpuUsage} />
          <MiniGauge label="MEM" value={memoryUsage} />
          <MiniGauge label="DISK" value={diskUsage} />
          {gpuUsage !== undefined && <MiniGauge label="GPU" value={gpuUsage} />}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationsClick}
            className="text-text-secondary hover:text-text-primary"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-text-secondary hover:text-text-primary"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onProfileClick}
            className="text-text-secondary hover:text-text-primary"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface MiniGaugeProps {
  label: string
  value: number
}

function MiniGauge({ label, value }: MiniGaugeProps) {
  const color = value >= 80 ? "#ef4444" : value >= 60 ? "#f59e0b" : "#10b981"

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#2d2d3d" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${value}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-text-primary">
          {Math.round(value)}%
        </div>
      </div>
      <span className="text-xs text-text-tertiary">{label}</span>
    </div>
  )
}
