import { describe, test, expect, beforeEach, mock } from "bun:test";
import { ClaudeMdEnhancer, type ToolMetadata } from "./claude-md-enhancer";
import type { ProjectContextService } from "./project-context";

describe("ClaudeMdEnhancer", () => {
  let enhancer: ClaudeMdEnhancer;
  let mockProjectContextService: ProjectContextService;

  beforeEach(() => {
    // Create mock project context service
    mockProjectContextService = {
      readClaudeMd: mock(async () => null),
      writeClaudeMd: mock(async () => {}),
      appendToClaudeMd: mock(async () => {}),
    } as any;

    enhancer = new ClaudeMdEnhancer(mockProjectContextService);
  });

  describe("built-in tools registration", () => {
    test("registers speak tool", () => {
      const speakTool = enhancer.getTool("speak");
      expect(speakTool).toBeDefined();
      expect(speakTool?.name).toBe("speak");
      expect(speakTool?.category).toBe("voice");
    });

    test("registers listen tool", () => {
      const listenTool = enhancer.getTool("listen");
      expect(listenTool).toBeDefined();
      expect(listenTool?.name).toBe("listen");
      expect(listenTool?.category).toBe("voice");
    });

    test("registers todo_create tool", () => {
      const todoTool = enhancer.getTool("todo_create");
      expect(todoTool).toBeDefined();
      expect(todoTool?.name).toBe("todo_create");
      expect(todoTool?.category).toBe("productivity");
    });

    test("registers todo_update tool", () => {
      const todoTool = enhancer.getTool("todo_update");
      expect(todoTool).toBeDefined();
      expect(todoTool?.category).toBe("productivity");
    });

    test("registers todo_list tool", () => {
      const todoTool = enhancer.getTool("todo_list");
      expect(todoTool).toBeDefined();
      expect(todoTool?.category).toBe("productivity");
    });

    test("registers todo_archive tool", () => {
      const todoTool = enhancer.getTool("todo_archive");
      expect(todoTool).toBeDefined();
      expect(todoTool?.category).toBe("productivity");
    });

    test("all built-in tools have required properties", () => {
      const tools = enhancer.getTools();
      expect(tools.length).toBeGreaterThan(0);

      tools.forEach((tool) => {
        expect(tool.name).toBeTruthy();
        expect(tool.description).toBeTruthy();
        expect(tool.category).toBeTruthy();
        expect(tool.whenToUse).toBeTruthy();
        expect(Array.isArray(tool.examples)).toBe(true);
        expect(typeof tool.inputSchema).toBe("object");
      });
    });
  });

  describe("registerTool", () => {
    test("registers custom tool", () => {
      const customTool: ToolMetadata = {
        name: "custom_tool",
        description: "A custom tool",
        category: "development",
        whenToUse: "Use for custom tasks",
        examples: [
          {
            description: "Example usage",
            code: "custom_tool({ param: 'value' })",
          },
        ],
        inputSchema: {
          param: "string (required) - A parameter",
        },
      };

      enhancer.registerTool(customTool);

      const retrieved = enhancer.getTool("custom_tool");
      expect(retrieved).toEqual(customTool);
    });

    test("overwrites existing tool with same name", () => {
      const tool1: ToolMetadata = {
        name: "test_tool",
        description: "First version",
        category: "development",
        whenToUse: "First",
        examples: [],
        inputSchema: {},
      };

      const tool2: ToolMetadata = {
        name: "test_tool",
        description: "Second version",
        category: "development",
        whenToUse: "Second",
        examples: [],
        inputSchema: {},
      };

      enhancer.registerTool(tool1);
      enhancer.registerTool(tool2);

      const retrieved = enhancer.getTool("test_tool");
      expect(retrieved?.description).toBe("Second version");
    });
  });

  describe("getTools", () => {
    test("returns all registered tools", () => {
      const tools = enhancer.getTools();
      expect(Array.isArray(tools)).toBe(true);
      expect(tools.length).toBeGreaterThan(0);
    });

    test("includes built-in tools", () => {
      const tools = enhancer.getTools();
      const toolNames = tools.map((t) => t.name);

      expect(toolNames).toContain("speak");
      expect(toolNames).toContain("listen");
      expect(toolNames).toContain("todo_create");
      expect(toolNames).toContain("todo_update");
      expect(toolNames).toContain("todo_list");
      expect(toolNames).toContain("todo_archive");
    });

    test("includes custom registered tools", () => {
      const customTool: ToolMetadata = {
        name: "custom",
        description: "Custom",
        category: "development",
        whenToUse: "Custom",
        examples: [],
        inputSchema: {},
      };

      enhancer.registerTool(customTool);

      const tools = enhancer.getTools();
      const toolNames = tools.map((t) => t.name);
      expect(toolNames).toContain("custom");
    });
  });

  describe("getTool", () => {
    test("retrieves tool by name", () => {
      const tool = enhancer.getTool("speak");
      expect(tool).toBeDefined();
      expect(tool?.name).toBe("speak");
    });

    test("returns undefined for non-existent tool", () => {
      const tool = enhancer.getTool("non_existent_tool");
      expect(tool).toBeUndefined();
    });

    test("is case-sensitive", () => {
      const tool1 = enhancer.getTool("speak");
      const tool2 = enhancer.getTool("SPEAK");

      expect(tool1).toBeDefined();
      expect(tool2).toBeUndefined();
    });
  });

  describe("generateToolDocumentation", () => {
    test("generates markdown documentation", () => {
      const docs = enhancer.generateToolDocumentation();
      expect(docs).toContain("## speak2me-mcp Tools");
      expect(docs).toContain("### Voice Tools");
      expect(docs).toContain("### Productivity Tools");
    });

    test("includes tool names", () => {
      const docs = enhancer.generateToolDocumentation();
      expect(docs).toContain("**speak**");
      expect(docs).toContain("**listen**");
      expect(docs).toContain("**todo_create**");
    });

    test("includes tool descriptions", () => {
      const docs = enhancer.generateToolDocumentation();
      const speakTool = enhancer.getTool("speak");
      expect(docs).toContain(speakTool!.description);
    });

    test("includes 'when to use' sections", () => {
      const docs = enhancer.generateToolDocumentation();
      expect(docs).toContain("**When to use:**");
    });

    test("includes parameters", () => {
      const docs = enhancer.generateToolDocumentation();
      expect(docs).toContain("**Parameters:**");
      expect(docs).toContain("`text`");
      expect(docs).toContain("`mode`");
    });

    test("includes examples", () => {
      const docs = enhancer.generateToolDocumentation();
      expect(docs).toContain("**Examples:**");
      expect(docs).toContain("```typescript");
    });

    test("groups tools by category", () => {
      const docs = enhancer.generateToolDocumentation();

      // Voice tools section should appear before Productivity
      const voiceIndex = docs.indexOf("### Voice Tools");
      const productivityIndex = docs.indexOf("### Productivity Tools");

      expect(voiceIndex).toBeGreaterThan(-1);
      expect(productivityIndex).toBeGreaterThan(-1);
    });
  });

  describe("enhanceProjectClaudeMd", () => {
    test("creates new CLAUDE.md when none exists", async () => {
      mockProjectContextService.readClaudeMd = mock(async () => null);
      mockProjectContextService.writeClaudeMd = mock(async () => {});

      await enhancer.enhanceProjectClaudeMd("test-conv");

      expect(mockProjectContextService.writeClaudeMd).toHaveBeenCalled();
      const callArgs = (mockProjectContextService.writeClaudeMd as any).mock.calls[0];
      expect(callArgs[0]).toBe("test-conv");
      expect(callArgs[1]).toContain("# CLAUDE.md");
      expect(callArgs[1]).toContain("## speak2me-mcp Tools");
    });

    test("appends to existing CLAUDE.md without speak2me section", async () => {
      const existingContent = "# My Project\n\nSome content here.";
      mockProjectContextService.readClaudeMd = mock(async () => existingContent);
      mockProjectContextService.appendToClaudeMd = mock(async () => {});

      await enhancer.enhanceProjectClaudeMd("test-conv");

      expect(mockProjectContextService.appendToClaudeMd).toHaveBeenCalled();
      const callArgs = (mockProjectContextService.appendToClaudeMd as any).mock.calls[0];
      expect(callArgs[0]).toBe("test-conv");
      expect(callArgs[1]).toContain("## speak2me-mcp Tools");
    });

    test("replaces existing speak2me section", async () => {
      const existingContent = `# My Project

## speak2me-mcp Tools

Old tool documentation here

## Other Section

Other content
`;
      mockProjectContextService.readClaudeMd = mock(async () => existingContent);
      mockProjectContextService.writeClaudeMd = mock(async () => {});

      await enhancer.enhanceProjectClaudeMd("test-conv");

      expect(mockProjectContextService.writeClaudeMd).toHaveBeenCalled();
      const callArgs = (mockProjectContextService.writeClaudeMd as any).mock.calls[0];
      expect(callArgs[1]).toContain("## speak2me-mcp Tools");
      expect(callArgs[1]).toContain("## Other Section");
      expect(callArgs[1]).not.toContain("Old tool documentation");
    });

    test("preserves content before and after speak2me section", async () => {
      const existingContent = `# Project

Before content

## speak2me-mcp Tools

Old docs

## After Section

After content
`;
      mockProjectContextService.readClaudeMd = mock(async () => existingContent);
      mockProjectContextService.writeClaudeMd = mock(async () => {});

      await enhancer.enhanceProjectClaudeMd("test-conv");

      expect(mockProjectContextService.writeClaudeMd).toHaveBeenCalled();
      const callArgs = (mockProjectContextService.writeClaudeMd as any).mock.calls[0];
      expect(callArgs[1]).toContain("Before content");
      expect(callArgs[1]).toContain("## After Section");
      expect(callArgs[1]).toContain("After content");
    });
  });

  describe("tool metadata validation", () => {
    test("speak tool has complete metadata", () => {
      const speak = enhancer.getTool("speak");
      expect(speak?.name).toBe("speak");
      expect(speak?.description).toBeTruthy();
      expect(speak?.category).toBe("voice");
      expect(speak?.whenToUse).toBeTruthy();
      expect(speak?.examples.length).toBeGreaterThan(0);
      expect(Object.keys(speak?.inputSchema || {}).length).toBeGreaterThan(0);
    });

    test("listen tool has complete metadata", () => {
      const listen = enhancer.getTool("listen");
      expect(listen?.name).toBe("listen");
      expect(listen?.description).toBeTruthy();
      expect(listen?.category).toBe("voice");
      expect(listen?.whenToUse).toBeTruthy();
      expect(listen?.examples.length).toBeGreaterThan(0);
      expect(Object.keys(listen?.inputSchema || {}).length).toBeGreaterThan(0);
    });

    test("all tools have at least one example", () => {
      const tools = enhancer.getTools();
      tools.forEach((tool) => {
        expect(tool.examples.length).toBeGreaterThan(0);
        tool.examples.forEach((example) => {
          expect(example.description).toBeTruthy();
          expect(example.code).toBeTruthy();
        });
      });
    });

    test("all examples have valid structure", () => {
      const tools = enhancer.getTools();
      tools.forEach((tool) => {
        tool.examples.forEach((example) => {
          expect(typeof example.description).toBe("string");
          expect(typeof example.code).toBe("string");
          expect(example.description.length).toBeGreaterThan(0);
          expect(example.code.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe("category grouping", () => {
    test("voice category contains speak and listen", () => {
      const tools = enhancer.getTools();
      const voiceTools = tools.filter((t) => t.category === "voice");

      const voiceToolNames = voiceTools.map((t) => t.name);
      expect(voiceToolNames).toContain("speak");
      expect(voiceToolNames).toContain("listen");
    });

    test("productivity category contains todo tools", () => {
      const tools = enhancer.getTools();
      const productivityTools = tools.filter((t) => t.category === "productivity");

      const toolNames = productivityTools.map((t) => t.name);
      expect(toolNames).toContain("todo_create");
      expect(toolNames).toContain("todo_update");
      expect(toolNames).toContain("todo_list");
      expect(toolNames).toContain("todo_archive");
    });

    test("all tools have valid category", () => {
      const validCategories = ["voice", "project", "productivity", "development"];
      const tools = enhancer.getTools();

      tools.forEach((tool) => {
        expect(validCategories).toContain(tool.category);
      });
    });
  });
});
