import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import { ProjectContextService } from "./project-context";
import { prisma } from "@s2m-pac/database";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";

describe("ProjectContextService", () => {
  let service: ProjectContextService;
  let testDir: string;
  let testProjectDir: string;

  beforeAll(async () => {
    service = new ProjectContextService(prisma);

    // Create temporary test directory
    testDir = path.join(os.tmpdir(), `project-context-test-${Date.now()}`);
    await fs.mkdir(testDir, { recursive: true });

    // Create test project directory
    testProjectDir = path.join(testDir, "test-project");
    await fs.mkdir(testProjectDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.projectContext.deleteMany();
    await prisma.conversation.deleteMany();

    // Remove test directory
    await fs.rm(testDir, { recursive: true, force: true });

    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean between tests
    await prisma.projectContext.deleteMany();
    await prisma.conversation.deleteMany();

    // Clean test project directory
    const files = await fs.readdir(testProjectDir);
    for (const file of files) {
      await fs.rm(path.join(testProjectDir, file), { recursive: true, force: true });
    }
  });

  describe("createProjectContext", () => {
    test("creates project context with path", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      expect(context.conversationId).toBe(conversationId);
      expect(context.projectPath).toBe(testProjectDir);
      expect(context.projectName).toBeTruthy();
      expect(context.createdAt).toBeGreaterThan(0);
    });

    test("auto-detects project name from path", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      expect(context.projectName).toBe("test-project");
    });

    test("uses provided project name", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
        projectName: "Custom Project Name",
      });

      expect(context.projectName).toBe("Custom Project Name");
    });

    test("finds CLAUDE.md in root", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      // Create CLAUDE.md in project root
      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      await fs.writeFile(claudeMdPath, "# Test CLAUDE.md");

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      expect(context.claudeMdPath).toBe(claudeMdPath);
    });

    test("finds CLAUDE.md in .claude/ directory", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      // Create CLAUDE.md in .claude/
      const claudeDir = path.join(testProjectDir, ".claude");
      await fs.mkdir(claudeDir, { recursive: true });
      const claudeMdPath = path.join(claudeDir, "CLAUDE.md");
      await fs.writeFile(claudeMdPath, "# Test CLAUDE.md");

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      expect(context.claudeMdPath).toBe(claudeMdPath);
    });

    test("stores custom commands", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
        devCommand: "bun run dev",
        buildCommand: "bun run build",
        testCommand: "bun test",
        stopCommand: "pkill -f 'bun run dev'",
      });

      expect(context.devCommand).toBe("bun run dev");
      expect(context.buildCommand).toBe("bun run build");
      expect(context.testCommand).toBe("bun test");
      expect(context.stopCommand).toBe("pkill -f 'bun run dev'");
    });

    test("stores custom settings", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const settings = {
        autoFormat: true,
        linter: "eslint",
        customOption: "value",
      };

      const context = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
        settings,
      });

      expect(context.settings).toEqual(settings);
    });
  });

  describe("getProjectContext", () => {
    test("retrieves existing context", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      const context = await service.getProjectContext(conversationId);
      expect(context).not.toBeNull();
      expect(context?.conversationId).toBe(conversationId);
    });

    test("returns null for non-existent context", async () => {
      const context = await service.getProjectContext("non-existent");
      expect(context).toBeNull();
    });

    test("updates lastAccessedAt timestamp", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const created = await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 10));

      const retrieved = await service.getProjectContext(conversationId);
      expect(retrieved?.lastAccessedAt).toBeGreaterThanOrEqual(
        created.lastAccessedAt
      );
    });
  });

  describe("updateSettings", () => {
    test("updates project settings", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
        settings: { original: "value" },
      });

      const updated = await service.updateSettings(conversationId, {
        new: "setting",
        another: "value",
      });

      expect(updated.settings).toEqual({
        new: "setting",
        another: "value",
      });
    });
  });

  describe("unlinkProject", () => {
    test("deletes project context", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      await service.unlinkProject(conversationId);

      const context = await service.getProjectContext(conversationId);
      expect(context).toBeNull();
    });
  });

  describe("readClaudeMd", () => {
    test("reads CLAUDE.md content", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const content = "# Test Project\nThis is a test CLAUDE.md file.";
      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      await fs.writeFile(claudeMdPath, content);

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      const readContent = await service.readClaudeMd(conversationId);
      expect(readContent).toBe(content);
    });

    test("returns null when no CLAUDE.md exists", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      const content = await service.readClaudeMd(conversationId);
      expect(content).toBeNull();
    });

    test("returns null for non-existent project context", async () => {
      const content = await service.readClaudeMd("non-existent");
      expect(content).toBeNull();
    });
  });

  describe("writeClaudeMd", () => {
    test("writes CLAUDE.md content", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      const content = "# New Project\nNew content";
      await service.writeClaudeMd(conversationId, content);

      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      const written = await fs.readFile(claudeMdPath, "utf-8");
      expect(written).toBe(content);
    });

    test("creates CLAUDE.md in project root if none exists", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      await service.writeClaudeMd(conversationId, "New content");

      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      const exists = await fs
        .access(claudeMdPath)
        .then(() => true)
        .catch(() => false);
      expect(exists).toBe(true);
    });

    test("overwrites existing CLAUDE.md", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      await fs.writeFile(claudeMdPath, "Old content");

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      await service.writeClaudeMd(conversationId, "New content");

      const content = await fs.readFile(claudeMdPath, "utf-8");
      expect(content).toBe("New content");
    });
  });

  describe("appendToClaudeMd", () => {
    test("appends to existing content", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      await fs.writeFile(claudeMdPath, "Original content");

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      await service.appendToClaudeMd(conversationId, "Appended content");

      const content = await fs.readFile(claudeMdPath, "utf-8");
      expect(content).toBe("Original content\n\nAppended content");
    });

    test("creates file if it doesn't exist", async () => {
      const conversationId = crypto.randomUUID();
      await prisma.conversation.create({
        data: { id: conversationId, messageCount: 0 },
      });

      await service.createProjectContext({
        conversationId,
        projectPath: testProjectDir,
      });

      await service.appendToClaudeMd(conversationId, "New content");

      const claudeMdPath = path.join(testProjectDir, "CLAUDE.md");
      const content = await fs.readFile(claudeMdPath, "utf-8");
      expect(content).toContain("New content");
    });
  });

  describe("detectProjectInfo", () => {
    test("detects package.json", async () => {
      await fs.writeFile(
        path.join(testProjectDir, "package.json"),
        JSON.stringify({ name: "test" })
      );

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.hasPackageJson).toBe(true);
    });

    test("detects TypeScript config", async () => {
      await fs.writeFile(
        path.join(testProjectDir, "tsconfig.json"),
        JSON.stringify({})
      );

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.hasTsConfig).toBe(true);
    });

    test("detects Git repository", async () => {
      await fs.mkdir(path.join(testProjectDir, ".git"), { recursive: true });

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.hasGitRepo).toBe(true);
    });

    test("detects Bun package manager", async () => {
      await fs.writeFile(
        path.join(testProjectDir, "package.json"),
        JSON.stringify({ name: "test" })
      );
      await fs.writeFile(path.join(testProjectDir, "bun.lockb"), "");

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.packageManager).toBe("bun");
    });

    test("detects pnpm package manager", async () => {
      await fs.writeFile(
        path.join(testProjectDir, "package.json"),
        JSON.stringify({ name: "test" })
      );
      await fs.writeFile(path.join(testProjectDir, "pnpm-lock.yaml"), "");

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.packageManager).toBe("pnpm");
    });

    test("detects framework from dependencies", async () => {
      await fs.writeFile(
        path.join(testProjectDir, "package.json"),
        JSON.stringify({
          name: "test",
          dependencies: { next: "^14.0.0" },
        })
      );

      const info = await service.detectProjectInfo(testProjectDir);
      expect(info.framework).toBe("Next.js");
    });
  });
});
