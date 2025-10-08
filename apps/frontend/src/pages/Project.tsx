import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Button,
  CircularGauge,
  Badge,
} from "@s2m-pac/ui";
import {
  Square,
  RotateCw,
  FileText,
  Play,
  Eye,
  CheckCircle,
} from "lucide-react";
import { systemMetricsApi } from "../lib/api-client";

interface ProjectProcess {
  id: string;
  name: string;
  status: "running" | "idle";
  info: string;
  url?: string;
}

const projectProcesses: ProjectProcess[] = [
  {
    id: "dev-server",
    name: "Dev Server",
    status: "running",
    info: "http://localhost:3000",
    url: "http://localhost:3000",
  },
  {
    id: "build",
    name: "Build",
    status: "idle",
    info: "Last: 5m ago (2.3s) ✓",
  },
  {
    id: "test-runner",
    name: "Test Runner",
    status: "idle",
    info: "Last: 12m ago (32 passed)",
  },
  {
    id: "type-check",
    name: "Type Check",
    status: "idle",
    info: "Last: Never",
  },
];

export function Project() {
  // Fetch system metrics with auto-refresh every 2 seconds
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["system-metrics"],
    queryFn: () => systemMetricsApi.get(),
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const handleStop = (id: string) => {
    console.log("Stop:", id);
  };

  const handleRestart = (id: string) => {
    console.log("Restart:", id);
  };

  const handleViewLogs = (id: string) => {
    console.log("View logs:", id);
  };

  const handleStart = (id: string) => {
    console.log("Start:", id);
  };

  const handleWatch = (id: string) => {
    console.log("Watch:", id);
  };

  return (
    <div className="h-full overflow-auto">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">
        Project Controls
      </h2>

      {/* Process Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {projectProcesses.map((process) => (
          <Card
            key={process.id}
            className="p-5 bg-slate-900/50 border-slate-700"
          >
            {/* Process Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-100 mb-1">
                  {process.name}
                </h3>
                <div className="flex items-center gap-2">
                  {process.status === "running" ? (
                    <>
                      <span className="flex items-center gap-2 text-sm text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Running (2h 34m)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-2 h-2 bg-slate-500 rounded-full" />
                        Not Running
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="mb-4">
              {process.url ? (
                <a
                  href={process.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:underline"
                >
                  {process.info}
                </a>
              ) : (
                <p className="text-sm text-slate-400">{process.info}</p>
              )}
            </div>

            {/* Process Actions */}
            <div className="flex items-center gap-2">
              {process.status === "running" ? (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStop(process.id)}
                  >
                    <Square className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRestart(process.id)}
                  >
                    <RotateCw className="w-4 h-4 mr-1" />
                    Restart
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewLogs(process.id)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Logs
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleStart(process.id)}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {process.id === "build"
                      ? "Build"
                      : process.id === "test-runner"
                      ? "Run Tests"
                      : "Type Check"}
                  </Button>
                  {process.id !== "build" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleWatch(process.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                  )}
                  {process.id === "build" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStart("build-deploy")}
                    >
                      Build & Deploy
                    </Button>
                  )}
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* System Resources */}
      <div>
        <h2 className="text-xl font-semibold text-slate-100 mb-6">
          System Resources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CPU Gauge */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 flex flex-col items-center">
            <CircularGauge
              value={metrics?.cpu.usage || 0}
              size={120}
              color="#f59e0b"
            />
            <h3 className="text-sm font-semibold text-slate-300 mt-4">CPU</h3>
            <p className="text-xs text-slate-500 mt-1">
              {metrics?.cpu.cores || 0} cores @ {((metrics?.cpu.speed || 0) / 1000).toFixed(1)}GHz
            </p>
            {metrics?.cpu.temperature && (
              <Badge
                variant="outline"
                className="mt-2 text-xs border-orange-500/30 text-orange-400"
              >
                {metrics.cpu.temperature}°C
              </Badge>
            )}
          </Card>

          {/* Memory Gauge */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 flex flex-col items-center">
            <CircularGauge
              value={metrics?.memory.usagePercent || 0}
              size={120}
              color="#10b981"
            />
            <h3 className="text-sm font-semibold text-slate-300 mt-4">
              Memory
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {metrics?.memory.used || 0} / {metrics?.memory.total || 0} GB
            </p>
            {metrics?.memory.swap && (
              <p className="text-xs text-slate-500 mt-1">
                Swap: {metrics.memory.swap.used} / {metrics.memory.swap.total} GB
              </p>
            )}
          </Card>

          {/* Disk Gauge */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 flex flex-col items-center">
            <CircularGauge
              value={metrics?.disk.usagePercent || 0}
              size={120}
              color="#00d4ff"
            />
            <h3 className="text-sm font-semibold text-slate-300 mt-4">Disk</h3>
            <p className="text-xs text-slate-500 mt-1">
              {metrics?.disk.used || 0} / {metrics?.disk.total || 0} GB
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              SSD
            </Badge>
          </Card>

          {/* Network Gauge */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 flex flex-col items-center">
            <CircularGauge
              value={Math.min(((metrics?.network.download || 0) / 1000) * 100, 100)}
              size={120}
              color="#8b5cf6"
            />
            <h3 className="text-sm font-semibold text-slate-300 mt-4">
              Network
            </h3>
            <p className="text-xs text-slate-500 mt-1">↑ {metrics?.network.upload || 0} kb/s</p>
            <p className="text-xs text-slate-500 mt-1">↓ {metrics?.network.download || 0} kb/s</p>
          </Card>

          {/* GPU Gauge (conditional) */}
          {metrics?.gpu && (
            <Card className="p-6 bg-slate-900/50 border-slate-700 flex flex-col items-center">
              <CircularGauge
                value={metrics.gpu.usage}
                size={120}
                color="#ec4899"
              />
              <h3 className="text-sm font-semibold text-slate-300 mt-4">GPU</h3>
              <p className="text-xs text-slate-500 mt-1">{metrics.gpu.name}</p>
              <Badge
                variant="outline"
                className="mt-2 text-xs border-pink-500/30 text-pink-400"
              >
                {metrics.gpu.temperature}°C
              </Badge>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
