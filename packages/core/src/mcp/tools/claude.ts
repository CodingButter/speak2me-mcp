import type { ClaudeChatInput, ClaudeChatOutput } from "@stt-mcp/shared";
import { ClaudeCliService } from "../../services/claude-cli";
import { ProjectContextService } from "../../services/project-context";
import type { PrismaClient } from "@prisma/client";

interface ClaudeContext {
  conversationId: string;
  prisma: PrismaClient;
}

/**
 * Handle claude_chat tool invocation
 * Runs Claude CLI and captures output
 */
export async function handleClaudeChat(
  input: ClaudeChatInput,
  context: ClaudeContext
): Promise<ClaudeChatOutput> {
  try {
    // Get project context if requested
    let projectPath: string | undefined;
    if (input.useProjectContext !== false) {
      const projectService = new ProjectContextService(context.prisma);
      const projectContext = await projectService.getProjectContext(
        context.conversationId
      );
      if (projectContext) {
        projectPath = projectContext.projectPath;
      }
    }

    // Initialize Claude CLI service
    const claudeService = new ClaudeCliService("auto");

    // Check if Claude is available
    const isAvailable = await claudeService.checkClaudeAvailable();
    if (!isAvailable) {
      return {
        ok: false,
        error:
          "Claude CLI is not available. Please install Claude Code and ensure it's in your PATH.",
      };
    }

    // Run Claude
    const result = await claudeService.runClaude({
      prompt: input.prompt,
      projectPath,
      contextFiles: input.contextFiles,
    });

    // Check if Claude succeeded
    if (result.exitCode !== 0) {
      return {
        ok: false,
        exitCode: result.exitCode,
        error: result.error || "Claude CLI exited with non-zero code",
        output: result.output,
        projectPath,
      };
    }

    return {
      ok: true,
      output: result.output,
      exitCode: result.exitCode,
      projectPath,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error running Claude",
    };
  }
}

/**
 * Handle claude_chat_streaming tool invocation
 * Runs Claude CLI and streams output chunks
 */
export async function handleClaudeChatStreaming(
  input: ClaudeChatInput,
  context: ClaudeContext,
  onChunk: (chunk: string) => void
): Promise<ClaudeChatOutput> {
  try {
    // Get project context if requested
    let projectPath: string | undefined;
    if (input.useProjectContext !== false) {
      const projectService = new ProjectContextService(context.prisma);
      const projectContext = await projectService.getProjectContext(
        context.conversationId
      );
      if (projectContext) {
        projectPath = projectContext.projectPath;
      }
    }

    // Initialize Claude CLI service
    const claudeService = new ClaudeCliService("auto");

    // Check if Claude is available
    const isAvailable = await claudeService.checkClaudeAvailable();
    if (!isAvailable) {
      return {
        ok: false,
        error:
          "Claude CLI is not available. Please install Claude Code and ensure it's in your PATH.",
      };
    }

    // Accumulate output
    let fullOutput = "";

    // Run Claude with streaming
    const exitCode = await claudeService.runClaudeStreaming(
      {
        prompt: input.prompt,
        projectPath,
        contextFiles: input.contextFiles,
      },
      (chunk) => {
        if (chunk.type === "stdout") {
          fullOutput += chunk.data;
          onChunk(chunk.data);
        }
      }
    );

    // Check if Claude succeeded
    if (exitCode !== 0) {
      return {
        ok: false,
        exitCode,
        error: "Claude CLI exited with non-zero code",
        output: fullOutput,
        projectPath,
      };
    }

    return {
      ok: true,
      output: fullOutput,
      exitCode,
      projectPath,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error running Claude",
    };
  }
}
