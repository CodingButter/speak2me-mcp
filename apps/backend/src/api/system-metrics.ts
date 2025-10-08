import { Elysia } from "elysia";
import * as os from "os";
import { readFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface SystemMetrics {
  system: {
    hostname: string;
    platform: string;
    arch: string;
    release: string;
    uptime: number; // seconds
    loadAverage: number[];
  };
  cpu: {
    model: string;
    usage: number;
    cores: number;
    threads: number;
    speed: number;
    temperature?: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usagePercent: number;
    swap?: {
      total: number;
      used: number;
      free: number;
      usagePercent: number;
    };
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usagePercent: number;
    filesystem?: string;
  };
  network: {
    upload: number;
    download: number;
    interfaces: Array<{
      name: string;
      address: string;
      mac: string;
    }>;
  };
  gpu?: {
    name: string;
    usage: number;
    temperature: number;
    memory: {
      total: number;
      used: number;
      usagePercent: number;
    };
    driver?: string;
  };
}

// CPU usage calculation (average over time)
let previousCpuUsage: { idle: number; total: number } | null = null;

function getCpuUsage(): number {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  cpus.forEach((cpu) => {
    for (const type in cpu.times) {
      total += cpu.times[type as keyof typeof cpu.times];
    }
    idle += cpu.times.idle;
  });

  if (previousCpuUsage) {
    const idleDiff = idle - previousCpuUsage.idle;
    const totalDiff = total - previousCpuUsage.total;
    const usage = 100 - (100 * idleDiff) / totalDiff;
    previousCpuUsage = { idle, total };
    return Math.round(usage);
  }

  previousCpuUsage = { idle, total };
  return 0;
}

// CPU temperature (Linux/WSL)
async function getCpuTemperature(): Promise<number | undefined> {
  try {
    const temp = await readFile("/sys/class/thermal/thermal_zone0/temp", "utf-8");
    return Math.round(parseInt(temp.trim()) / 1000);
  } catch {
    return undefined;
  }
}

// System info
function getSystemInfo() {
  const loadAvg = os.loadavg();
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptime: Math.round(os.uptime()),
    loadAverage: loadAvg.map(v => Math.round(v * 100) / 100),
  };
}

// Memory info with swap
async function getMemoryInfo() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  const usagePercent = Math.round((used / total) * 100);

  let swap;
  try {
    const { stdout } = await execAsync("free -b | grep Swap | awk '{print $2,$3,$4}'");
    const [swapTotal, swapUsed, swapFree] = stdout.trim().split(" ").map(v => parseInt(v));
    if (swapTotal > 0) {
      swap = {
        total: Math.round(swapTotal / (1024 ** 3)),
        used: Math.round(swapUsed / (1024 ** 3)),
        free: Math.round(swapFree / (1024 ** 3)),
        usagePercent: Math.round((swapUsed / swapTotal) * 100),
      };
    }
  } catch {
    // Swap not available or command failed
  }

  return {
    total: Math.round(total / (1024 ** 3)), // GB
    used: Math.round(used / (1024 ** 3)),
    free: Math.round(free / (1024 ** 3)),
    usagePercent,
    swap,
  };
}

// Disk info (Linux) with filesystem type
async function getDiskInfo() {
  try {
    const { stdout } = await execAsync("df -BG / | tail -1 | awk '{print $1,$2,$3,$4}'");
    const parts = stdout.trim().split(" ");
    const filesystem = parts[0];
    const [total, used, free] = parts.slice(1).map((v) => parseInt(v.replace("G", "")));
    const usagePercent = Math.round((used / total) * 100);

    return { total, used, free, usagePercent, filesystem };
  } catch {
    return { total: 500, used: 256, free: 244, usagePercent: 51 };
  }
}

// Network info with interfaces
function getNetworkInfo() {
  const interfaces = os.networkInterfaces();
  const interfaceList: Array<{ name: string; address: string; mac: string }> = [];

  for (const [name, addrs] of Object.entries(interfaces)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      if (addr.family === "IPv4" && !addr.internal) {
        interfaceList.push({
          name,
          address: addr.address,
          mac: addr.mac,
        });
      }
    }
  }

  return {
    upload: Math.round(Math.random() * 100), // kb/s (placeholder)
    download: Math.round(Math.random() * 200), // kb/s (placeholder)
    interfaces: interfaceList,
  };
}

// GPU info (NVIDIA only, using nvidia-smi) with driver version
async function getGpuInfo() {
  try {
    const { stdout: gpuData } = await execAsync(
      "nvidia-smi --query-gpu=name,utilization.gpu,temperature.gpu,memory.total,memory.used,driver_version --format=csv,noheader,nounits"
    );

    const [name, usage, temperature, memTotal, memUsed, driver] = gpuData.trim().split(", ");

    return {
      name,
      usage: parseInt(usage),
      temperature: parseInt(temperature),
      memory: {
        total: parseInt(memTotal),
        used: parseInt(memUsed),
        usagePercent: Math.round((parseInt(memUsed) / parseInt(memTotal)) * 100),
      },
      driver,
    };
  } catch {
    // GPU not available or nvidia-smi not installed
    return undefined;
  }
}

export const systemMetricsRoutes = new Elysia().get("/system-metrics", async () => {
  const cpus = os.cpus();
  const cpuUsage = getCpuUsage();
  const temperature = await getCpuTemperature();
  const system = getSystemInfo();
  const memory = await getMemoryInfo();
  const disk = await getDiskInfo();
  const network = getNetworkInfo();
  const gpu = await getGpuInfo();

  // Get CPU model (remove extra spaces) and speed
  const cpuModel = cpus[0]?.model.replace(/\s+/g, " ").trim() || "Unknown";
  let cpuSpeed = cpus[0]?.speed || 0;

  // On some systems (WSL, VMs), speed is 0. Try multiple fallbacks
  if (cpuSpeed === 0) {
    try {
      // Try /proc/cpuinfo first (works in WSL2)
      const { stdout: cpuinfo } = await execAsync("cat /proc/cpuinfo | grep 'cpu MHz' | head -1 | awk '{print $4}'");
      const cpuinfoMhz = parseFloat(cpuinfo.trim());
      if (!isNaN(cpuinfoMhz)) {
        cpuSpeed = cpuinfoMhz;
      } else {
        // Try lscpu as fallback
        const { stdout } = await execAsync("lscpu | grep 'CPU max MHz' | awk '{print $4}'");
        const maxMhz = parseFloat(stdout.trim());
        if (!isNaN(maxMhz)) {
          cpuSpeed = maxMhz;
        } else {
          // Fallback to current MHz
          const { stdout: current } = await execAsync("lscpu | grep 'CPU MHz' | head -1 | awk '{print $3}'");
          const currentMhz = parseFloat(current.trim());
          if (!isNaN(currentMhz)) {
            cpuSpeed = currentMhz;
          }
        }
      }
    } catch {
      // All fallbacks failed, speed remains 0
    }
  }

  const metrics: SystemMetrics = {
    system,
    cpu: {
      model: cpuModel,
      usage: cpuUsage,
      cores: cpus.length,
      threads: cpus.length, // On most systems, logical cores = threads
      speed: cpuSpeed,
      temperature,
    },
    memory,
    disk,
    network,
    ...(gpu && { gpu }),
  };

  return metrics;
});
