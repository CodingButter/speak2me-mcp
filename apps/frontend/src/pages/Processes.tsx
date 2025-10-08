import {
  Card,
  Button,
  StatusBadge,
  Badge,
} from "@s2m-pac/ui";
import {
  Play,
  Square,
  RotateCw,
  Trash2,
  Activity,
  Clock,
} from "lucide-react";

interface Process {
  id: string;
  name: string;
  status: "running" | "idle" | "error" | "pending";
  uptime?: string;
  memory?: string;
  cpu?: string;
  lastRun?: string;
}

const mockProcesses: Process[] = [
  {
    id: "1",
    name: "MCP SSE Server",
    status: "running",
    uptime: "2h 34m",
    memory: "128 MB",
    cpu: "12%",
  },
  {
    id: "2",
    name: "Audio Processing Worker",
    status: "running",
    uptime: "2h 34m",
    memory: "64 MB",
    cpu: "8%",
  },
  {
    id: "3",
    name: "STT Service",
    status: "running",
    uptime: "2h 34m",
    memory: "92 MB",
    cpu: "15%",
  },
  {
    id: "4",
    name: "TTS Service",
    status: "idle",
    lastRun: "5 minutes ago",
  },
  {
    id: "5",
    name: "SSML Enhancer",
    status: "idle",
    lastRun: "10 minutes ago",
  },
  {
    id: "6",
    name: "Database Sync",
    status: "pending",
    lastRun: "1 hour ago",
  },
];

export function Processes() {
  const handleStart = (id: string) => {
    console.log("Start process:", id);
  };

  const handleStop = (id: string) => {
    console.log("Stop process:", id);
  };

  const handleRestart = (id: string) => {
    console.log("Restart process:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete process:", id);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Processes</h2>
        <Button>
          <Play className="w-4 h-4 mr-2" />
          Start All
        </Button>
      </div>

      <div className="grid gap-4">
        {mockProcesses.map((process) => (
          <Card
            key={process.id}
            className="p-4 bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              {/* Process Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {process.name}
                  </h3>
                  <StatusBadge status={process.status} />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  {process.status === "running" && (
                    <>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Uptime: {process.uptime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        <span>CPU: {process.cpu}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Memory: {process.memory}
                      </Badge>
                    </>
                  )}
                  {(process.status === "idle" || process.status === "pending") && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Last run: {process.lastRun}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {process.status === "running" ? (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStop(process.id)}
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRestart(process.id)}
                    >
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStart(process.id)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(process.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
