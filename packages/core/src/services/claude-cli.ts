import { spawn, type ChildProcess } from "child_process";
import * as os from "os";

export interface ClaudeCliOptions {
  prompt: string;
  projectPath?: string;
  contextFiles?: string[];
  mode?: "wsl" | "native" | "auto";
}

export interface ClaudeCliResponse {
  output: string;
  exitCode: number;
  error?: string;
}

export type ClaudeOutputChunk = {
  type: "stdout" | "stderr";
  data: string;
};

export class ClaudeCliService {
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
   * Run Claude CLI and return the full output when complete
   */
  async runClaude(options: ClaudeCliOptions): Promise<ClaudeCliResponse> {
    const chunks: string[] = [];
    const errorChunks: string[] = [];

    try {
      const exitCode = await this.runClaudeStreaming(options, (chunk) => {
        if (chunk.type === "stdout") {
          chunks.push(chunk.data);
        } else {
          errorChunks.push(chunk.data);
        }
      });

      return {
        output: chunks.join(""),
        exitCode,
        error: errorChunks.length > 0 ? errorChunks.join("") : undefined,
      };
    } catch (error) {
      return {
        output: chunks.join(""),
        exitCode: 1,
        error:
          error instanceof Error ? error.message : "Unknown error running Claude CLI",
      };
    }
  }

  /**
   * Run Claude CLI and stream output chunks as they arrive
   * Returns exit code when process completes
   */
  async runClaudeStreaming(
    options: ClaudeCliOptions,
    onChunk: (chunk: ClaudeOutputChunk) => void
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const args = this.buildClaudeArgs(options);
      const child = this.spawnClaude(args, options.projectPath);

      // Stream stdout
      child.stdout?.on("data", (data: Buffer) => {
        onChunk({ type: "stdout", data: data.toString() });
      });

      // Stream stderr
      child.stderr?.on("data", (data: Buffer) => {
        onChunk({ type: "stderr", data: data.toString() });
      });

      // Handle exit
      child.on("close", (code) => {
        resolve(code ?? 0);
      });

      // Handle errors
      child.on("error", (error) => {
        reject(error);
      });
    });
  }

  /**
   * Build command line arguments for Claude CLI
   */
  private buildClaudeArgs(options: ClaudeCliOptions): string[] {
    const args: string[] = [];

    // Add prompt
    args.push("-p", options.prompt);

    // Add context files if provided
    if (options.contextFiles && options.contextFiles.length > 0) {
      for (const file of options.contextFiles) {
        args.push("-f", file);
      }
    }

    return args;
  }

  /**
   * Spawn the Claude process, handling WSL vs native execution
   */
  private spawnClaude(args: string[], cwd?: string): ChildProcess {
    if (this.mode === "wsl") {
      return this.spawnClaudeWSL(args, cwd);
    } else {
      return this.spawnClaudeNative(args, cwd);
    }
  }

  /**
   * Spawn Claude natively (Linux/Mac or directly on Windows if Claude is installed there)
   */
  private spawnClaudeNative(args: string[], cwd?: string): ChildProcess {
    return spawn("claude", args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });
  }

  /**
   * Spawn Claude via WSL from Windows
   * Uses bash -l -c to ensure profile is loaded and Claude is in PATH
   */
  private spawnClaudeWSL(args: string[], cwd?: string): ChildProcess {
    // Convert Windows path to WSL path if provided
    const wslCwd = cwd ? this.convertToWSLPath(cwd) : undefined;

    // Build the command to run in WSL
    // Use bash -l -c to load profile (which should have Claude in PATH)
    const claudeCommand = this.buildWSLCommand(args, wslCwd);

    return spawn("wsl.exe", ["bash", "-l", "-c", claudeCommand], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });
  }

  /**
   * Build the command string to execute in WSL
   */
  private buildWSLCommand(args: string[], cwd?: string): string {
    // Escape arguments for shell
    const escapedArgs = args.map((arg) => this.escapeShellArg(arg)).join(" ");

    // If cwd is provided, cd to it first
    if (cwd) {
      return `cd ${this.escapeShellArg(cwd)} && claude ${escapedArgs}`;
    } else {
      return `claude ${escapedArgs}`;
    }
  }

  /**
   * Convert Windows path to WSL path
   * e.g., C:\Users\foo\project -> /mnt/c/Users/foo/project
   * Also handles C:/Users/foo/project (mixed slashes)
   */
  private convertToWSLPath(windowsPath: string): string {
    // Handle drive letter (e.g., C:\ or C:/)
    const driveMatch = windowsPath.match(/^([A-Z]):[\/\\]/i);
    if (driveMatch) {
      const drive = driveMatch[1].toLowerCase();
      const restOfPath = windowsPath
        .slice(3)
        .replace(/\\/g, "/");
      return `/mnt/${drive}/${restOfPath}`;
    }

    // If no drive letter, assume it's already a WSL path
    return windowsPath.replace(/\\/g, "/");
  }

  /**
   * Escape shell argument for safe execution in bash
   */
  private escapeShellArg(arg: string): string {
    // Wrap in single quotes and escape any single quotes within
    return `'${arg.replace(/'/g, "'\\''")}'`;
  }

  /**
   * Check if Claude CLI is available
   */
  async checkClaudeAvailable(): Promise<boolean> {
    try {
      const result = await this.runClaude({ prompt: "--version" });
      return result.exitCode === 0;
    } catch {
      return false;
    }
  }
}
