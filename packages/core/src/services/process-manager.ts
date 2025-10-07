import { spawn, type ChildProcess } from "child_process";
import * as os from "os";

export type ProcessType = "dev" | "build" | "test" | "custom";
export type ProcessStatus = "starting" | "running" | "stopped" | "failed";

export interface ProcessInfo {
  id: string;
  conversationId: string;
  type: ProcessType;
  command: string;
  cwd?: string;
  status: ProcessStatus;
  pid?: number;
  startedAt: number;
  stoppedAt?: number;
  exitCode?: number;
  output: string[];
  errors: string[];
}

export interface StartProcessOptions {
  conversationId: string;
  type: ProcessType;
  command: string;
  cwd?: string;
  mode?: "wsl" | "native" | "auto";
  onOutput?: (line: string) => void;
  onError?: (line: string) => void;
  onExit?: (code: number | null) => void;
}

export class ProcessManager {
  private processes: Map<string, ProcessInfo> = new Map();
  private childProcesses: Map<string, ChildProcess> = new Map();
  private mode: "wsl" | "native";

  constructor(mode: "wsl" | "native" | "auto" = "auto") {
    if (mode === "auto") {
      // Auto-detect: if we're on Windows, assume WSL mode
      this.mode = os.platform() === "win32" ? "wsl" : "native";
    } else {
      this.mode = mode;
    }
  }

  /**
   * Start a new process
   * Returns the process ID
   */
  startProcess(options: StartProcessOptions): string {
    const processId = this.generateProcessId(options.conversationId, options.type);

    // Check if process of this type is already running for this conversation
    const existing = this.findProcess(options.conversationId, options.type);
    if (existing && (existing.status === "starting" || existing.status === "running")) {
      throw new Error(
        `Process of type '${options.type}' is already running for conversation ${options.conversationId}`
      );
    }

    // Create process info
    const processInfo: ProcessInfo = {
      id: processId,
      conversationId: options.conversationId,
      type: options.type,
      command: options.command,
      cwd: options.cwd,
      status: "starting",
      startedAt: Date.now(),
      output: [],
      errors: [],
    };

    this.processes.set(processId, processInfo);

    // Spawn the process
    try {
      const child = this.spawnProcess(options);

      // Store child process
      this.childProcesses.set(processId, child);
      processInfo.pid = child.pid;
      processInfo.status = "running";

      // Handle stdout
      child.stdout?.on("data", (data: Buffer) => {
        const line = data.toString();
        processInfo.output.push(line);
        options.onOutput?.(line);
      });

      // Handle stderr
      child.stderr?.on("data", (data: Buffer) => {
        const line = data.toString();
        processInfo.errors.push(line);
        options.onError?.(line);
      });

      // Handle exit
      child.on("close", (code) => {
        processInfo.status = code === 0 ? "stopped" : "failed";
        processInfo.stoppedAt = Date.now();
        processInfo.exitCode = code ?? undefined;
        this.childProcesses.delete(processId);
        options.onExit?.(code);
      });

      // Handle errors
      child.on("error", (error) => {
        const errorMsg = `Process error: ${error.message}`;
        processInfo.errors.push(errorMsg);
        processInfo.status = "failed";
        processInfo.stoppedAt = Date.now();
        this.childProcesses.delete(processId);
      });

      return processId;
    } catch (error) {
      processInfo.status = "failed";
      processInfo.stoppedAt = Date.now();
      processInfo.errors.push(
        error instanceof Error ? error.message : "Failed to start process"
      );
      throw error;
    }
  }

  /**
   * Stop a running process
   */
  async stopProcess(processId: string): Promise<void> {
    const processInfo = this.processes.get(processId);
    if (!processInfo) {
      throw new Error(`Process ${processId} not found`);
    }

    const child = this.childProcesses.get(processId);
    if (!child) {
      // Process not running anymore
      if (processInfo.status === "running" || processInfo.status === "starting") {
        processInfo.status = "stopped";
        processInfo.stoppedAt = Date.now();
      }
      return;
    }

    // Set up close handler before killing
    const closePromise = new Promise<void>((resolve) => {
      child.once("close", () => {
        resolve();
      });
    });

    // Try graceful shutdown first
    try {
      child.kill("SIGTERM");
    } catch (error) {
      // Process may have already exited
      this.childProcesses.delete(processId);
      if (processInfo.status === "running" || processInfo.status === "starting") {
        processInfo.status = "stopped";
        processInfo.stoppedAt = Date.now();
      }
      return;
    }

    // Wait up to 5 seconds for graceful shutdown
    const timeout = new Promise<void>((resolve) => {
      setTimeout(() => {
        // Force kill if still running
        try {
          if (this.childProcesses.has(processId)) {
            child.kill("SIGKILL");
          }
        } catch {
          // Ignore errors on force kill
        }
        resolve();
      }, 2000); // Reduced to 2 seconds for tests
    });

    await Promise.race([closePromise, timeout]);

    // Update status regardless
    if (processInfo.status === "running" || processInfo.status === "starting") {
      processInfo.status = "stopped";
      processInfo.stoppedAt = Date.now();
    }
    this.childProcesses.delete(processId);
  }

  /**
   * Get process info by ID
   */
  getProcess(processId: string): ProcessInfo | undefined {
    return this.processes.get(processId);
  }

  /**
   * Get all processes for a conversation
   */
  getProcesses(conversationId: string): ProcessInfo[] {
    return Array.from(this.processes.values()).filter(
      (p) => p.conversationId === conversationId
    );
  }

  /**
   * Find a process by conversation ID and type
   */
  findProcess(conversationId: string, type: ProcessType): ProcessInfo | undefined {
    return Array.from(this.processes.values()).find(
      (p) => p.conversationId === conversationId && p.type === type
    );
  }

  /**
   * Get output for a process
   */
  getOutput(processId: string): { output: string[]; errors: string[] } | undefined {
    const processInfo = this.processes.get(processId);
    if (!processInfo) {
      return undefined;
    }

    return {
      output: processInfo.output,
      errors: processInfo.errors,
    };
  }

  /**
   * Clear completed processes for a conversation
   */
  clearCompleted(conversationId: string): void {
    const toDelete: string[] = [];

    for (const [id, info] of this.processes.entries()) {
      if (
        info.conversationId === conversationId &&
        (info.status === "stopped" || info.status === "failed")
      ) {
        toDelete.push(id);
      }
    }

    for (const id of toDelete) {
      this.processes.delete(id);
    }
  }

  /**
   * Stop all processes for a conversation
   */
  async stopAll(conversationId: string): Promise<void> {
    const processes = this.getProcesses(conversationId);
    const stopPromises = processes
      .filter((p) => p.status === "running" || p.status === "starting")
      .map((p) => this.stopProcess(p.id));

    await Promise.all(stopPromises);
  }

  /**
   * Generate a unique process ID
   */
  private generateProcessId(conversationId: string, type: ProcessType): string {
    return `${conversationId}-${type}-${Date.now()}`;
  }

  /**
   * Spawn a process based on mode (native vs WSL)
   */
  private spawnProcess(options: StartProcessOptions): ChildProcess {
    const mode = options.mode || this.mode;

    if (mode === "wsl") {
      return this.spawnProcessWSL(options);
    } else {
      return this.spawnProcessNative(options);
    }
  }

  /**
   * Spawn process natively
   */
  private spawnProcessNative(options: StartProcessOptions): ChildProcess {
    // Parse command into command and args
    const parts = this.parseCommand(options.command);

    return spawn(parts.command, parts.args, {
      cwd: options.cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });
  }

  /**
   * Spawn process via WSL
   */
  private spawnProcessWSL(options: StartProcessOptions): ChildProcess {
    // Convert Windows path to WSL path if provided
    const wslCwd = options.cwd ? this.convertToWSLPath(options.cwd) : undefined;

    // Build the command to run in WSL
    const wslCommand = this.buildWSLCommand(options.command, wslCwd);

    return spawn("wsl.exe", ["bash", "-l", "-c", wslCommand], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });
  }

  /**
   * Parse command string into command and args
   */
  private parseCommand(command: string): { command: string; args: string[] } {
    const parts = command.split(" ");
    return {
      command: parts[0],
      args: parts.slice(1),
    };
  }

  /**
   * Build command string for WSL execution
   */
  private buildWSLCommand(command: string, cwd?: string): string {
    if (cwd) {
      return `cd ${this.escapeShellArg(cwd)} && ${command}`;
    } else {
      return command;
    }
  }

  /**
   * Convert Windows path to WSL path
   */
  private convertToWSLPath(windowsPath: string): string {
    // Handle drive letter (e.g., C:\ or C:/)
    const driveMatch = windowsPath.match(/^([A-Z]):[\/\\]/i);
    if (driveMatch) {
      const drive = driveMatch[1].toLowerCase();
      const restOfPath = windowsPath.slice(3).replace(/\\/g, "/");
      return `/mnt/${drive}/${restOfPath}`;
    }

    // If no drive letter, assume it's already a WSL path
    return windowsPath.replace(/\\/g, "/");
  }

  /**
   * Escape shell argument for safe execution
   */
  private escapeShellArg(arg: string): string {
    // Wrap in single quotes and escape any single quotes within
    return `'${arg.replace(/'/g, "'\\''")}'`;
  }
}
