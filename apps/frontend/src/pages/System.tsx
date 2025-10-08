import { useQuery } from "@tanstack/react-query";
import { Card, Badge, CircularGauge } from "@s2m-pac/ui";
import { Server, Cpu, MemoryStick, HardDrive, Network, MonitorSmartphone } from "lucide-react";
import { systemMetricsApi } from "../lib/api-client";

export function System() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["system-metrics"],
    queryFn: () => systemMetricsApi.get(),
    refetchInterval: 2000,
  });

  if (isLoading || !metrics) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-slate-400">Loading system information...</p>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">System Information</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* System Overview */}
        <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Server className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">System Overview</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem label="Hostname" value={metrics.system.hostname} />
          <InfoItem label="Platform" value={metrics.system.platform} />
          <InfoItem label="Architecture" value={metrics.system.arch} />
          <InfoItem label="Kernel" value={metrics.system.release} />
          <InfoItem label="Uptime" value={formatUptime(metrics.system.uptime)} />
          <InfoItem
            label="Load Average"
            value={metrics.system.loadAverage.join(", ")}
          />
        </div>
        </Card>

        {/* CPU Information */}
        <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-slate-100">CPU</h3>
        </div>

        {/* Gauges */}
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <CircularGauge
            value={metrics.cpu.usage}
            label="CPU Usage"
            size={140}
          />
          {metrics.cpu.temperature && (
            <CircularGauge
              value={metrics.cpu.temperature}
              label="CPU Temp"
              unit="°C"
              maxValue={100}
              size={140}
            />
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Model" value={metrics.cpu.model} mono />
          <InfoItem
            label="Cores / Threads"
            value={`${metrics.cpu.cores} cores / ${metrics.cpu.threads} threads`}
          />
          <InfoItem
            label="Speed"
            value={`${(metrics.cpu.speed / 1000).toFixed(2)} GHz`}
          />
        </div>
        </Card>

        {/* Memory Information */}
        <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <MemoryStick className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-slate-100">Memory</h3>
        </div>

        {/* Gauges */}
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <CircularGauge
            value={metrics.memory.usagePercent}
            label="RAM Usage"
            size={140}
          />
          {metrics.memory.swap && metrics.memory.swap.total > 0 && (
            <CircularGauge
              value={metrics.memory.swap.usagePercent}
              label="Swap Usage"
              size={140}
            />
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Total" value={`${metrics.memory.total} GB`} />
          <InfoItem label="Used" value={`${metrics.memory.used} GB`} />
          <InfoItem label="Free" value={`${metrics.memory.free} GB`} />
          {metrics.memory.swap && metrics.memory.swap.total > 0 && (
            <>
              <InfoItem
                label="Swap Total"
                value={`${metrics.memory.swap.total} GB`}
              />
              <InfoItem
                label="Swap Used"
                value={`${metrics.memory.swap.used} GB (${metrics.memory.swap.usagePercent}%)`}
              />
            </>
          )}
        </div>
        </Card>

        {/* Disk Information */}
        <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">Disk</h3>
        </div>

        {/* Gauges */}
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <CircularGauge
            value={metrics.disk.usagePercent}
            label="Disk Usage"
            size={140}
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Total" value={`${metrics.disk.total} GB`} />
          <InfoItem label="Used" value={`${metrics.disk.used} GB`} />
          <InfoItem label="Free" value={`${metrics.disk.free} GB`} />
          {metrics.disk.filesystem && (
            <InfoItem label="Filesystem" value={metrics.disk.filesystem} mono />
          )}
        </div>
        </Card>

        {/* Network Information */}
        <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-slate-100">Network</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Upload Speed"
              value={`${metrics.network.upload} kb/s`}
            />
            <InfoItem
              label="Download Speed"
              value={`${metrics.network.download} kb/s`}
            />
          </div>
          {metrics.network.interfaces.length > 0 && (
            <div>
              <p className="text-sm text-slate-400 mb-2">Interfaces:</p>
              <div className="space-y-2">
                {metrics.network.interfaces.map((iface, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 p-3 rounded border border-slate-700"
                  >
                    <p className="text-sm text-slate-300 font-semibold">
                      {iface.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      IP: {iface.address}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      MAC: {iface.mac}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </Card>

        {/* GPU Information */}
        {metrics.gpu && (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <MonitorSmartphone className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-slate-100">GPU</h3>
          </div>

          {/* Gauges */}
          <div className="relative z-10 flex flex-wrap justify-center gap-8 mb-6">
            <CircularGauge
              value={metrics.gpu.usage}
              label="GPU Usage"
              size={140}
            />
            <CircularGauge
              value={metrics.gpu.memory.usagePercent}
              label="VRAM Usage"
              size={140}
            />
            <CircularGauge
              value={metrics.gpu.temperature}
              label="GPU Temp"
              unit="°C"
              maxValue={100}
              size={140}
            />
          </div>

          {/* Details */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Model" value={metrics.gpu.name} mono />
            <InfoItem
              label="VRAM Total"
              value={`${metrics.gpu.memory.total} MB`}
            />
            <InfoItem
              label="VRAM Used"
              value={`${metrics.gpu.memory.used} MB`}
            />
            {metrics.gpu.driver && (
              <InfoItem label="Driver Version" value={metrics.gpu.driver} />
            )}
          </div>
          </Card>
        )}
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  mono?: boolean;
  badge?: string;
}

function InfoItem({ label, value, mono, badge }: InfoItemProps) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p
        className={`text-sm text-slate-200 ${mono ? "font-mono" : ""} ${
          badge || ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
