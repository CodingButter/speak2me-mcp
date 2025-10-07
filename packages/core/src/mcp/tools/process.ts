import type { PrismaClient } from "@prisma/client";
import { ProcessManager, type ProcessType, type ProcessInfo } from "../../services/process-manager";
import { ProjectContextService } from "../../services/project-context";

interface ProcessContext {
  conversationId: string;
  prisma: PrismaClient;
  processManager: ProcessManager;
}

// Input/Output types
export interface ProcessStartInput {
  type: ProcessType;
  command?: string; // Optional - will use project context command if not provided
  cwd?: string; // Optional - will use project context path if not provided
}

export interface ProcessStopInput {
  type?: ProcessType; // If not provided, stops all processes
}

export interface ProcessStatusInput {
  type?: ProcessType; // If not provided, returns all processes
}

export interface ProcessOutput {
  ok: boolean;
  process?: ProcessInfo;
  processes?: ProcessInfo[];
  reason?: string;
}

/**
 * Start a project process (dev server, build, test)
 */
export async function handleProcessStart(
  input: ProcessStartInput,
  context: ProcessContext
): Promise<ProcessOutput> {
  try {
    const projectService = new ProjectContextService(context.prisma);
    const projectContext = await projectService.getProjectContext(context.conversationId);

    // Determine command
    let command = input.command;
    if (!command) {
      if (!projectContext) {
        return {
          ok: false,
          reason: "No command provided and no project linked. Use project_link first or provide a command.",
        };
      }

      // Get command from project context
      switch (input.type) {
        case "dev":
          command = projectContext.devCommand || undefined;
          break;
        case "build":
          command = projectContext.buildCommand || undefined;
          break;
        case "test":
          command = projectContext.testCommand || undefined;
          break;
        default:
          break;
      }

      if (!command) {
        return {
          ok: false,
          reason: `No ${input.type} command configured for this project. Use project_link to set commands.`,
        };
      }
    }

    // Determine working directory
    const cwd = input.cwd || projectContext?.projectPath;

    // Start the process
    const processId = context.processManager.startProcess({
      conversationId: context.conversationId,
      type: input.type,
      command,
      cwd,
    });

    const process = context.processManager.getProcess(processId);

    return {
      ok: true,
      process,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to start process",
    };
  }
}

/**
 * Stop a project process
 */
export async function handleProcessStop(
  input: ProcessStopInput,
  context: ProcessContext
): Promise<ProcessOutput> {
  try {
    if (input.type) {
      // Stop specific process type
      const process = context.processManager.findProcess(context.conversationId, input.type);
      if (!process) {
        return {
          ok: false,
          reason: `No ${input.type} process found for this conversation`,
        };
      }

      await context.processManager.stopProcess(process.id);

      return {
        ok: true,
        process: context.processManager.getProcess(process.id),
      };
    } else {
      // Stop all processes
      await context.processManager.stopAll(context.conversationId);

      return {
        ok: true,
        processes: context.processManager.getProcesses(context.conversationId),
      };
    }
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to stop process",
    };
  }
}

/**
 * Get status of project processes
 */
export async function handleProcessStatus(
  input: ProcessStatusInput,
  context: ProcessContext
): Promise<ProcessOutput> {
  try {
    if (input.type) {
      // Get specific process type
      const process = context.processManager.findProcess(context.conversationId, input.type);
      if (!process) {
        return {
          ok: false,
          reason: `No ${input.type} process found for this conversation`,
        };
      }

      return {
        ok: true,
        process,
      };
    } else {
      // Get all processes
      const processes = context.processManager.getProcesses(context.conversationId);

      return {
        ok: true,
        processes,
      };
    }
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to get process status",
    };
  }
}

/**
 * Get output from a process
 */
export async function handleProcessOutput(
  input: { type: ProcessType },
  context: ProcessContext
): Promise<ProcessOutput & { output?: string[]; errors?: string[] }> {
  try {
    const process = context.processManager.findProcess(context.conversationId, input.type);
    if (!process) {
      return {
        ok: false,
        reason: `No ${input.type} process found for this conversation`,
      };
    }

    const output = context.processManager.getOutput(process.id);
    if (!output) {
      return {
        ok: false,
        reason: `Process ${process.id} not found`,
      };
    }

    return {
      ok: true,
      process,
      output: output.output,
      errors: output.errors,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to get process output",
    };
  }
}
