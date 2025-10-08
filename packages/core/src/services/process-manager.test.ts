import { describe, test, expect, beforeEach } from "bun:test";
import { ProcessManager, type ProcessType } from "./process-manager";

describe("ProcessManager", () => {
  let manager: ProcessManager;

  beforeEach(() => {
    manager = new ProcessManager("native");
  });

  describe("constructor and mode detection", () => {
    test("explicit native mode", () => {
      const mgr = new ProcessManager("native");
      expect(mgr).toBeDefined();
    });

    test("explicit wsl mode", () => {
      const mgr = new ProcessManager("wsl");
      expect(mgr).toBeDefined();
    });

    test("auto mode detection", () => {
      const mgr = new ProcessManager("auto");
      expect(mgr).toBeDefined();
    });
  });

  describe("startProcess", () => {
    test("starts a simple process", async () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "echo 'hello world'",
      });

      expect(processId).toBeTruthy();
      expect(processId).toContain("test-conv");
      expect(processId).toContain("custom");

      const info = manager.getProcess(processId);
      expect(info).toBeDefined();
      expect(info?.status).toMatch(/starting|running/);
      expect(info?.command).toBe("echo 'hello world'");

      // Clean up
      await manager.stopProcess(processId);
    });

    test("prevents duplicate processes of same type", () => {
      const processId1 = manager.startProcess({
        conversationId: "test-conv",
        type: "dev",
        command: "sleep 10",
      });

      expect(() => {
        manager.startProcess({
          conversationId: "test-conv",
          type: "dev",
          command: "sleep 5",
        });
      }).toThrow();

      // Clean up
      manager.stopProcess(processId1);
    });

    test("captures process output", async () => {
      const output: string[] = [];

      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "echo 'test output'",
        onOutput: (line) => output.push(line),
      });

      // Wait a bit for output
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(output.length).toBeGreaterThan(0);
      expect(output.join("")).toContain("test output");

      // Clean up
      await manager.stopProcess(processId);
    });

    test("handles process exit", async () => {
      let exitCode: number | null = null;

      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "exit 0",
        onExit: (code) => {
          exitCode = code;
        },
      });

      // Wait for process to exit
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(exitCode).toBe(0);

      const info = manager.getProcess(processId);
      expect(info?.status).toBe("stopped");
      expect(info?.exitCode).toBe(0);
    });

    test("detects failed processes", async () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "exit 1",
      });

      // Wait for process to exit
      await new Promise((resolve) => setTimeout(resolve, 100));

      const info = manager.getProcess(processId);
      expect(info?.status).toBe("failed");
      expect(info?.exitCode).toBe(1);
    });

    test("sets working directory", () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "pwd",
        cwd: "/tmp",
      });

      const info = manager.getProcess(processId);
      expect(info?.cwd).toBe("/tmp");

      // Clean up
      manager.stopProcess(processId);
    });
  });

  describe("getProcess", () => {
    test("retrieves process info", () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "echo 'test'",
      });

      const info = manager.getProcess(processId);
      expect(info).toBeDefined();
      expect(info?.id).toBe(processId);
      expect(info?.conversationId).toBe("test-conv");
      expect(info?.type).toBe("custom");

      // Clean up
      manager.stopProcess(processId);
    });

    test("returns undefined for non-existent process", () => {
      const info = manager.getProcess("non-existent");
      expect(info).toBeUndefined();
    });
  });

  describe("getProcesses", () => {
    test("retrieves all processes for conversation", () => {
      const pid1 = manager.startProcess({
        conversationId: "conv-1",
        type: "dev",
        command: "sleep 10",
      });

      const pid2 = manager.startProcess({
        conversationId: "conv-1",
        type: "build",
        command: "echo 'building'",
      });

      const pid3 = manager.startProcess({
        conversationId: "conv-2",
        type: "dev",
        command: "sleep 10",
      });

      const conv1Processes = manager.getProcesses("conv-1");
      expect(conv1Processes.length).toBe(2);
      expect(conv1Processes.map((p) => p.id)).toContain(pid1);
      expect(conv1Processes.map((p) => p.id)).toContain(pid2);

      const conv2Processes = manager.getProcesses("conv-2");
      expect(conv2Processes.length).toBe(1);
      expect(conv2Processes[0].id).toBe(pid3);

      // Clean up
      manager.stopProcess(pid1);
      manager.stopProcess(pid2);
      manager.stopProcess(pid3);
    });

    test("returns empty array for conversation with no processes", () => {
      const processes = manager.getProcesses("non-existent");
      expect(processes).toEqual([]);
    });
  });

  describe("findProcess", () => {
    test("finds process by conversation and type", () => {
      const pid = manager.startProcess({
        conversationId: "test-conv",
        type: "dev",
        command: "sleep 10",
      });

      const found = manager.findProcess("test-conv", "dev");
      expect(found).toBeDefined();
      expect(found?.id).toBe(pid);

      // Clean up
      manager.stopProcess(pid);
    });

    test("returns undefined when not found", () => {
      const found = manager.findProcess("test-conv", "dev");
      expect(found).toBeUndefined();
    });
  });

  describe("stopProcess", () => {
    test("stops a running process", async () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "sleep 30",
      });

      // Wait a bit for process to start
      await new Promise((resolve) => setTimeout(resolve, 50));

      await manager.stopProcess(processId);

      const info = manager.getProcess(processId);
      expect(info?.status).toBe("stopped");
      expect(info?.stoppedAt).toBeDefined();
    });

    test("throws for non-existent process", async () => {
      await expect(manager.stopProcess("non-existent")).rejects.toThrow();
    });

    test("handles already stopped process gracefully", async () => {
      const processId = manager.startProcess({
        conversationId: "test-conv",
        type: "custom",
        command: "echo 'quick'",
      });

      // Wait for process to exit
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should not throw
      await manager.stopProcess(processId);
    });
  });

  describe("clearCompleted", () => {
    test("clears completed and failed processes", async () => {
      const pid1 = manager.startProcess({
        conversationId: "test-conv",
        type: "build",
        command: "echo 'done'",
      });

      const pid2 = manager.startProcess({
        conversationId: "test-conv",
        type: "test",
        command: "exit 1",
      });

      // Wait for processes to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      manager.clearCompleted("test-conv");

      expect(manager.getProcess(pid1)).toBeUndefined();
      expect(manager.getProcess(pid2)).toBeUndefined();
    });

    test("does not clear running processes", () => {
      const pid = manager.startProcess({
        conversationId: "test-conv",
        type: "dev",
        command: "sleep 30",
      });

      manager.clearCompleted("test-conv");

      expect(manager.getProcess(pid)).toBeDefined();

      // Clean up
      manager.stopProcess(pid);
    });
  });

  describe("stopAll", () => {
    test("stops all processes for a conversation", async () => {
      const pid1 = manager.startProcess({
        conversationId: "test-conv",
        type: "dev",
        command: "sleep 30",
      });

      const pid2 = manager.startProcess({
        conversationId: "test-conv",
        type: "build",
        command: "sleep 30",
      });

      // Wait a bit for processes to start
      await new Promise((resolve) => setTimeout(resolve, 100));

      await manager.stopAll("test-conv");

      const info1 = manager.getProcess(pid1);
      const info2 = manager.getProcess(pid2);

      // Process should be either stopped or failed (if it failed before being stopped)
      expect(["stopped", "failed"]).toContain(info1?.status);
      expect(["stopped", "failed"]).toContain(info2?.status);
    });
  });

  describe("path conversion", () => {
    test("converts Windows path to WSL path", () => {
      const wslManager = new ProcessManager("wsl");
      // Access private method via any cast for testing
      const wslPath = (wslManager as any).convertToWSLPath("C:\\Users\\foo\\project");
      expect(wslPath).toBe("/mnt/c/Users/foo/project");
    });

    test("handles forward slashes", () => {
      const wslManager = new ProcessManager("wsl");
      const wslPath = (wslManager as any).convertToWSLPath("C:/Users/foo/project");
      expect(wslPath).toBe("/mnt/c/Users/foo/project");
    });
  });

  describe("shell escaping", () => {
    test("escapes shell arguments", () => {
      const escaped = (manager as any).escapeShellArg("hello's world");
      expect(escaped).toBe("'hello'\\''s world'");
    });
  });
});
