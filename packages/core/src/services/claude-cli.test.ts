import { describe, test, expect, beforeEach } from "bun:test";
import { ClaudeCliService } from "./claude-cli";
import * as os from "os";

describe("ClaudeCliService", () => {
  describe("constructor and mode detection", () => {
    test("auto mode detects WSL on Windows", () => {
      const service = new ClaudeCliService("auto");
      // Can't test actual platform detection without mocking os.platform()
      // but we can test that it doesn't throw
      expect(service).toBeDefined();
    });

    test("explicit native mode", () => {
      const service = new ClaudeCliService("native");
      expect(service).toBeDefined();
    });

    test("explicit wsl mode", () => {
      const service = new ClaudeCliService("wsl");
      expect(service).toBeDefined();
    });

    test("defaults to auto mode", () => {
      const service = new ClaudeCliService();
      expect(service).toBeDefined();
    });
  });

  describe("buildClaudeArgs", () => {
    test("builds basic prompt argument", () => {
      const service = new ClaudeCliService("native");
      // Access private method via any cast for testing
      const args = (service as any).buildClaudeArgs({
        prompt: "Hello, Claude!",
      });
      expect(args).toEqual(["-p", "Hello, Claude!"]);
    });

    test("includes context files", () => {
      const service = new ClaudeCliService("native");
      const args = (service as any).buildClaudeArgs({
        prompt: "Review this code",
        contextFiles: ["/path/to/file1.ts", "/path/to/file2.ts"],
      });
      expect(args).toEqual([
        "-p",
        "Review this code",
        "-f",
        "/path/to/file1.ts",
        "-f",
        "/path/to/file2.ts",
      ]);
    });

    test("handles empty context files", () => {
      const service = new ClaudeCliService("native");
      const args = (service as any).buildClaudeArgs({
        prompt: "Test",
        contextFiles: [],
      });
      expect(args).toEqual(["-p", "Test"]);
    });
  });

  describe("convertToWSLPath", () => {
    test("converts Windows drive path to WSL mount", () => {
      const service = new ClaudeCliService("wsl");
      const wslPath = (service as any).convertToWSLPath("C:\\Users\\foo\\project");
      expect(wslPath).toBe("/mnt/c/Users/foo/project");
    });

    test("handles lowercase drive letter", () => {
      const service = new ClaudeCliService("wsl");
      const wslPath = (service as any).convertToWSLPath("d:\\projects\\test");
      expect(wslPath).toBe("/mnt/d/projects/test");
    });

    test("handles path without drive letter", () => {
      const service = new ClaudeCliService("wsl");
      const wslPath = (service as any).convertToWSLPath("/home/user/project");
      expect(wslPath).toBe("/home/user/project");
    });

    test("handles mixed slashes", () => {
      const service = new ClaudeCliService("wsl");
      const wslPath = (service as any).convertToWSLPath("C:/Users/foo/project");
      expect(wslPath).toBe("/mnt/c/Users/foo/project");
    });
  });

  describe("escapeShellArg", () => {
    test("wraps simple string in single quotes", () => {
      const service = new ClaudeCliService("wsl");
      const escaped = (service as any).escapeShellArg("hello");
      expect(escaped).toBe("'hello'");
    });

    test("escapes single quotes within string", () => {
      const service = new ClaudeCliService("wsl");
      const escaped = (service as any).escapeShellArg("hello's world");
      expect(escaped).toBe("'hello'\\''s world'");
    });

    test("handles multiple single quotes", () => {
      const service = new ClaudeCliService("wsl");
      const escaped = (service as any).escapeShellArg("it's the world's best");
      expect(escaped).toBe("'it'\\''s the world'\\''s best'");
    });

    test("preserves spaces", () => {
      const service = new ClaudeCliService("wsl");
      const escaped = (service as any).escapeShellArg("hello world");
      expect(escaped).toBe("'hello world'");
    });

    test("handles special characters", () => {
      const service = new ClaudeCliService("wsl");
      const escaped = (service as any).escapeShellArg('test$var`cmd`');
      expect(escaped).toBe("'test$var`cmd`'");
    });
  });

  describe("buildWSLCommand", () => {
    test("builds simple command without cwd", () => {
      const service = new ClaudeCliService("wsl");
      const cmd = (service as any).buildWSLCommand(["-p", "Hello"]);
      expect(cmd).toBe("claude '-p' 'Hello'");
    });

    test("includes cd when cwd is provided", () => {
      const service = new ClaudeCliService("wsl");
      const cmd = (service as any).buildWSLCommand(
        ["-p", "Hello"],
        "/home/user/project"
      );
      expect(cmd).toBe("cd '/home/user/project' && claude '-p' 'Hello'");
    });

    test("escapes arguments properly", () => {
      const service = new ClaudeCliService("wsl");
      const cmd = (service as any).buildWSLCommand(["-p", "Hello's world"]);
      expect(cmd).toBe("claude '-p' 'Hello'\\''s world'");
    });

    test("handles multiple context files", () => {
      const service = new ClaudeCliService("wsl");
      const cmd = (service as any).buildWSLCommand([
        "-p",
        "Review",
        "-f",
        "/path/to/file.ts",
      ]);
      expect(cmd).toBe("claude '-p' 'Review' '-f' '/path/to/file.ts'");
    });
  });

  describe("integration scenarios", () => {
    test("native mode creates proper args for simple prompt", () => {
      const service = new ClaudeCliService("native");
      const args = (service as any).buildClaudeArgs({
        prompt: "What is 2+2?",
      });
      expect(args).toEqual(["-p", "What is 2+2?"]);
    });

    test("wsl mode creates proper command for prompt with cwd", () => {
      const service = new ClaudeCliService("wsl");
      const args = (service as any).buildClaudeArgs({
        prompt: "Review this code",
        projectPath: "C:\\Users\\dev\\myproject",
      });

      const wslPath = (service as any).convertToWSLPath(
        "C:\\Users\\dev\\myproject"
      );
      expect(wslPath).toBe("/mnt/c/Users/dev/myproject");

      const cmd = (service as any).buildWSLCommand(args, wslPath);
      expect(cmd).toBe(
        "cd '/mnt/c/Users/dev/myproject' && claude '-p' 'Review this code'"
      );
    });

    test("wsl mode handles complex prompt with special characters", () => {
      const service = new ClaudeCliService("wsl");
      const args = (service as any).buildClaudeArgs({
        prompt: "Fix the user's bug in main.ts",
        contextFiles: ["/project/src/main.ts"],
      });

      const cmd = (service as any).buildWSLCommand(args);
      expect(cmd).toBe(
        "claude '-p' 'Fix the user'\\''s bug in main.ts' '-f' '/project/src/main.ts'"
      );
    });
  });
});
