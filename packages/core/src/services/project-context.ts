import type { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * Project Context Service
 * Manages linking conversations to project directories
 */

export interface ProjectContextData {
  id: string;
  conversationId: string;
  projectPath: string;
  projectName: string;
  claudeMdPath: string | null;
  settings: Record<string, any> | null;
  createdAt: number;
  lastAccessedAt: number;
}

export interface CreateProjectContextInput {
  conversationId: string;
  projectPath: string;
  settings?: Record<string, any>;
}

export class ProjectContextService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a new project context
   * Auto-detects project name and CLAUDE.md location
   */
  async createProjectContext(
    input: CreateProjectContextInput
  ): Promise<ProjectContextData> {
    // Normalize path
    const normalizedPath = path.resolve(input.projectPath);

    // Extract project name from path
    const projectName = path.basename(normalizedPath);

    // Check for CLAUDE.md
    const claudeMdPath = await this.findClaudeMd(normalizedPath);

    const context = await this.prisma.projectContext.create({
      data: {
        conversationId: input.conversationId,
        projectPath: normalizedPath,
        projectName,
        claudeMdPath,
        settings: input.settings ? JSON.stringify(input.settings) : null,
      },
    });

    return this.formatProjectContext(context);
  }

  /**
   * Get project context for a conversation
   */
  async getProjectContext(conversationId: string): Promise<ProjectContextData | null> {
    const context = await this.prisma.projectContext.findUnique({
      where: { conversationId },
    });

    if (!context) return null;

    // Update last accessed timestamp
    await this.prisma.projectContext.update({
      where: { conversationId },
      data: { lastAccessedAt: new Date() },
    });

    return this.formatProjectContext(context);
  }

  /**
   * Update project context settings
   */
  async updateSettings(
    conversationId: string,
    settings: Record<string, any>
  ): Promise<ProjectContextData> {
    const context = await this.prisma.projectContext.update({
      where: { conversationId },
      data: {
        settings: JSON.stringify(settings),
      },
    });

    return this.formatProjectContext(context);
  }

  /**
   * Unlink project from conversation
   */
  async unlinkProject(conversationId: string): Promise<void> {
    await this.prisma.projectContext.delete({
      where: { conversationId },
    });
  }

  /**
   * Find CLAUDE.md in project directory
   * Checks root, .claude/, and docs/
   */
  private async findClaudeMd(projectPath: string): Promise<string | null> {
    const possiblePaths = [
      path.join(projectPath, "CLAUDE.md"),
      path.join(projectPath, ".claude", "CLAUDE.md"),
      path.join(projectPath, "docs", "CLAUDE.md"),
    ];

    for (const filePath of possiblePaths) {
      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        // File doesn't exist, continue
      }
    }

    return null;
  }

  /**
   * Read project's CLAUDE.md
   */
  async readClaudeMd(conversationId: string): Promise<string | null> {
    const context = await this.getProjectContext(conversationId);
    if (!context?.claudeMdPath) return null;

    try {
      return await fs.readFile(context.claudeMdPath, "utf-8");
    } catch {
      return null;
    }
  }

  /**
   * Write to project's CLAUDE.md
   * Creates file if it doesn't exist
   */
  async writeClaudeMd(conversationId: string, content: string): Promise<void> {
    const context = await this.getProjectContext(conversationId);
    if (!context) throw new Error("Project context not found");

    let filePath = context.claudeMdPath;

    // If no CLAUDE.md exists, create it in project root
    if (!filePath) {
      filePath = path.join(context.projectPath, "CLAUDE.md");
      await this.prisma.projectContext.update({
        where: { conversationId },
        data: { claudeMdPath: filePath },
      });
    }

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write file
    await fs.writeFile(filePath, content, "utf-8");
  }

  /**
   * Append content to CLAUDE.md
   */
  async appendToClaudeMd(conversationId: string, content: string): Promise<void> {
    const existing = (await this.readClaudeMd(conversationId)) || "";
    const newContent = existing + "\n\n" + content;
    await this.writeClaudeMd(conversationId, newContent);
  }

  /**
   * Detect project structure and metadata
   */
  async detectProjectInfo(projectPath: string): Promise<{
    hasPackageJson: boolean;
    hasTsConfig: boolean;
    hasGitRepo: boolean;
    packageManager?: "npm" | "yarn" | "pnpm" | "bun";
    framework?: string;
  }> {
    const info: any = {
      hasPackageJson: false,
      hasTsConfig: false,
      hasGitRepo: false,
    };

    // Check package.json
    try {
      await fs.access(path.join(projectPath, "package.json"));
      info.hasPackageJson = true;

      // Detect package manager
      if (await this.fileExists(path.join(projectPath, "bun.lockb"))) {
        info.packageManager = "bun";
      } else if (await this.fileExists(path.join(projectPath, "pnpm-lock.yaml"))) {
        info.packageManager = "pnpm";
      } else if (await this.fileExists(path.join(projectPath, "yarn.lock"))) {
        info.packageManager = "yarn";
      } else if (await this.fileExists(path.join(projectPath, "package-lock.json"))) {
        info.packageManager = "npm";
      }

      // Read package.json to detect framework
      const packageJson = JSON.parse(
        await fs.readFile(path.join(projectPath, "package.json"), "utf-8")
      );
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      if (deps.next) info.framework = "Next.js";
      else if (deps.react) info.framework = "React";
      else if (deps.vue) info.framework = "Vue";
      else if (deps.svelte) info.framework = "Svelte";
      else if (deps.elysia) info.framework = "Elysia";
      else if (deps.express) info.framework = "Express";
    } catch {}

    // Check tsconfig.json
    try {
      await fs.access(path.join(projectPath, "tsconfig.json"));
      info.hasTsConfig = true;
    } catch {}

    // Check git repo
    try {
      await fs.access(path.join(projectPath, ".git"));
      info.hasGitRepo = true;
    } catch {}

    return info;
  }

  /**
   * Helper to check if file exists
   */
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Format Prisma model to output format
   */
  private formatProjectContext(context: any): ProjectContextData {
    return {
      id: context.id,
      conversationId: context.conversationId,
      projectPath: context.projectPath,
      projectName: context.projectName,
      claudeMdPath: context.claudeMdPath,
      settings: context.settings ? JSON.parse(context.settings) : null,
      createdAt: context.createdAt.getTime(),
      lastAccessedAt: context.lastAccessedAt.getTime(),
    };
  }
}
