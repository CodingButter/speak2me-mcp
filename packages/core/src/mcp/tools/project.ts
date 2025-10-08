import type { ProjectLinkInput, ProjectLinkOutput } from "@s2m-pac/shared";
import { ProjectContextService } from "../../services/project-context";
import type { PrismaClient } from "@prisma/client";

/**
 * Core business logic for Project MCP tools
 * Framework-agnostic - can be called from Elysia, Electron, or anywhere
 */

interface ProjectContext {
  conversationId: string;
  prisma: PrismaClient;
}

/**
 * Link a project to the current conversation
 * Initializes project context with path, commands, and settings
 */
export async function handleProjectLink(
  input: ProjectLinkInput,
  context: ProjectContext
): Promise<ProjectLinkOutput> {
  try {
    const service = new ProjectContextService(context.prisma);

    // Check if project already linked
    const existing = await service.getProjectContext(context.conversationId);
    if (existing) {
      return {
        ok: false,
        reason: `Project already linked: ${existing.projectPath}. Unlink first or use a different conversation.`,
      };
    }

    // Create project context
    const projectContext = await service.createProjectContext({
      conversationId: context.conversationId,
      projectPath: input.projectPath,
      projectName: input.projectName,
      devCommand: input.devCommand,
      buildCommand: input.buildCommand,
      testCommand: input.testCommand,
      stopCommand: input.stopCommand,
      settings: input.settings,
    });

    return {
      ok: true,
      projectContext,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to link project",
    };
  }
}

/**
 * Get the currently linked project for this conversation
 */
export async function handleProjectGet(
  context: ProjectContext
): Promise<ProjectLinkOutput> {
  try {
    const service = new ProjectContextService(context.prisma);
    const projectContext = await service.getProjectContext(context.conversationId);

    if (!projectContext) {
      return {
        ok: false,
        reason: "No project linked to this conversation",
      };
    }

    return {
      ok: true,
      projectContext,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to get project",
    };
  }
}

/**
 * Unlink the project from this conversation
 */
export async function handleProjectUnlink(
  context: ProjectContext
): Promise<ProjectLinkOutput> {
  try {
    const service = new ProjectContextService(context.prisma);
    await service.unlinkProject(context.conversationId);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to unlink project",
    };
  }
}
