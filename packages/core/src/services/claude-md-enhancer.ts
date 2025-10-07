import type { ProjectContextService } from "./project-context";

/**
 * CLAUDE.md Auto-Enhancement Service
 * Automatically adds/updates tool documentation in project CLAUDE.md files
 */

export interface ToolMetadata {
  name: string;
  description: string;
  category: "voice" | "project" | "productivity" | "development";
  whenToUse: string;
  examples: ToolExample[];
  inputSchema: Record<string, any>;
}

export interface ToolExample {
  description: string;
  code: string;
}

export class ClaudeMdEnhancer {
  private tools: Map<string, ToolMetadata> = new Map();

  constructor(private projectContextService: ProjectContextService) {
    this.registerBuiltInTools();
  }

  /**
   * Register built-in tools
   */
  private registerBuiltInTools() {
    // Voice tools
    this.registerTool({
      name: "speak",
      category: "voice",
      description: "Convert text to speech using ElevenLabs TTS",
      whenToUse:
        "Use when providing responses that benefit from audio playback, explaining complex concepts, or giving step-by-step instructions",
      examples: [
        {
          description: "Basic text-to-speech",
          code: 'speak({ text: "Hello! I\'ll help you with that task." })',
        },
        {
          description: "With SSML for expressiveness",
          code:
            'speak({ text: "Important!", ssml: "<speak><emphasis>Important!</emphasis> <break time=\\"500ms\\"/> Please review this carefully.</speak>" })',
        },
      ],
      inputSchema: {
        text: "string (required) - The text to convert to speech",
        ssml: "string (optional) - Pre-formatted SSML for advanced control",
        voiceId: "string (optional) - ElevenLabs voice ID",
        model: "string (optional) - TTS model to use",
      },
    });

    this.registerTool({
      name: "listen",
      category: "voice",
      description: "Capture and transcribe voice input using Gemini STT",
      whenToUse:
        "Use when the user wants to provide input via voice, or when you need to capture audio for analysis",
      examples: [
        {
          description: "Auto mode with automatic send",
          code: 'listen({ mode: "auto" })',
        },
        {
          description: "Manual mode with user confirmation",
          code: 'listen({ mode: "manual", vadThreshold: 0.6 })',
        },
        {
          description: "Push-to-talk mode",
          code: 'listen({ mode: "ptt" })',
        },
      ],
      inputSchema: {
        mode: 'enum (required) - "auto" | "manual" | "ptt"',
        vadThreshold: "number (optional) - Voice activity detection threshold (0-1)",
        minSilenceMs: "number (optional) - Minimum silence duration to stop recording",
        maxUtteranceMs: "number (optional) - Maximum recording duration",
        locale: "string (optional) - Language/locale for STT",
      },
    });

    // TODO tools
    this.registerTool({
      name: "todo_create",
      category: "productivity",
      description: "Create a new TODO item",
      whenToUse:
        "Use when the user requests a task to be tracked, or when you identify action items during conversation. Automatically create TODOs for follow-up work.",
      examples: [
        {
          description: "Simple TODO",
          code: 'todo_create({ title: "Fix login bug" })',
        },
        {
          description: "TODO with details",
          code:
            'todo_create({ title: "Implement dark mode", description: "Add dark mode toggle to settings", priority: "HIGH", tags: ["frontend", "ui"] })',
        },
      ],
      inputSchema: {
        title: "string (required) - TODO title",
        description: "string (optional) - Detailed description",
        priority: 'enum (optional) - "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"',
        tags: "string[] (optional) - Tags for categorization",
        assignee: "string (optional) - Person assigned to this task",
        projectPath: "string (optional) - Link to specific project",
      },
    });

    this.registerTool({
      name: "todo_update",
      category: "productivity",
      description: "Update an existing TODO item",
      whenToUse:
        "Use when task progress changes, details need updating, or when marking tasks as in-progress, blocked, or completed",
      examples: [
        {
          description: "Mark as in progress",
          code: 'todo_update({ id: "todo-id", status: "IN_PROGRESS" })',
        },
        {
          description: "Mark as blocked with reason",
          code:
            'todo_update({ id: "todo-id", status: "BLOCKED", blockedReason: "Waiting for API access" })',
        },
        {
          description: "Complete a task",
          code: 'todo_update({ id: "todo-id", status: "COMPLETED" })',
        },
      ],
      inputSchema: {
        id: "string (required) - TODO ID",
        title: "string (optional) - Updated title",
        description: "string (optional) - Updated description",
        status: 'enum (optional) - "BACKLOG" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED" | "ARCHIVED"',
        priority: 'enum (optional) - "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"',
        tags: "string[] (optional) - Updated tags",
        blockedReason: "string (optional) - Reason if status is BLOCKED",
        assignee: "string (optional) - Updated assignee",
      },
    });

    this.registerTool({
      name: "todo_list",
      category: "productivity",
      description: "List TODO items with optional filters",
      whenToUse:
        "Use when the user wants to see task status, or when you need project context to understand what work is pending",
      examples: [
        {
          description: "List all TODOs",
          code: "todo_list({})",
        },
        {
          description: "List in-progress tasks",
          code: 'todo_list({ status: "IN_PROGRESS" })',
        },
        {
          description: "List high-priority tasks",
          code: 'todo_list({ priority: "HIGH" })',
        },
        {
          description: "List tasks by tag",
          code: 'todo_list({ tags: ["frontend"] })',
        },
      ],
      inputSchema: {
        status:
          'enum (optional) - Filter by "BACKLOG" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED" | "ARCHIVED"',
        projectPath: "string (optional) - Filter by project",
        priority: 'enum (optional) - Filter by "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"',
        tags: "string[] (optional) - Filter by tags (match any)",
      },
    });

    this.registerTool({
      name: "todo_archive",
      category: "productivity",
      description: "Archive a completed TODO item",
      whenToUse:
        "Use when cleaning up completed tasks, or when the user wants to archive old TODOs",
      examples: [
        {
          description: "Archive a task",
          code: 'todo_archive({ id: "todo-id" })',
        },
      ],
      inputSchema: {
        id: "string (required) - TODO ID to archive",
      },
    });
  }

  /**
   * Register a new tool
   */
  registerTool(metadata: ToolMetadata) {
    this.tools.set(metadata.name, metadata);
  }

  /**
   * Generate tool documentation section
   */
  generateToolDocumentation(): string {
    const sections: string[] = [
      "---",
      "",
      "## speak2me-mcp Tools",
      "",
      "This project is connected to speak2me-mcp, giving you access to additional tools:",
      "",
    ];

    // Group tools by category
    const categories = {
      voice: "Voice Tools",
      project: "Project Tools",
      productivity: "Productivity Tools",
      development: "Development Tools",
    };

    for (const [categoryKey, categoryName] of Object.entries(categories)) {
      const categoryTools = Array.from(this.tools.values()).filter(
        (t) => t.category === categoryKey
      );

      if (categoryTools.length === 0) continue;

      sections.push(`### ${categoryName}`, "");

      for (const tool of categoryTools) {
        sections.push(`**${tool.name}** - ${tool.description}`);
        sections.push(`- **When to use:** ${tool.whenToUse}`);
        sections.push(`- **Parameters:**`);

        for (const [param, desc] of Object.entries(tool.inputSchema)) {
          sections.push(`  - \`${param}\`: ${desc}`);
        }

        if (tool.examples.length > 0) {
          sections.push(`- **Examples:**`);
          for (const example of tool.examples) {
            sections.push(`  - ${example.description}`);
            sections.push(`    \`\`\`typescript`);
            sections.push(`    ${example.code}`);
            sections.push(`    \`\`\``);
          }
        }

        sections.push("");
      }
    }

    return sections.join("\n");
  }

  /**
   * Enhance project CLAUDE.md with tool documentation
   * Creates file if it doesn't exist, updates section if it does
   */
  async enhanceProjectClaudeMd(conversationId: string): Promise<void> {
    const existingContent = await this.projectContextService.readClaudeMd(conversationId);
    const toolDocs = this.generateToolDocumentation();

    if (!existingContent) {
      // Create new CLAUDE.md
      const newContent = [
        "# CLAUDE.md",
        "",
        "This file provides guidance to Claude Code when working with this project.",
        "",
        toolDocs,
      ].join("\n");

      await this.projectContextService.writeClaudeMd(conversationId, newContent);
      return;
    }

    // Check if speak2me-mcp section already exists
    const sectionMarker = "## speak2me-mcp Tools";
    if (existingContent.includes(sectionMarker)) {
      // Replace existing section
      const lines = existingContent.split("\n");
      const startIndex = lines.findIndex((line) => line.includes(sectionMarker));

      if (startIndex === -1) {
        // Just append if marker not found
        await this.projectContextService.appendToClaudeMd(conversationId, toolDocs);
        return;
      }

      // Find the end of the section (next ## heading or end of file)
      let endIndex = lines.length;
      for (let i = startIndex + 1; i < lines.length; i++) {
        if (lines[i].startsWith("## ") && !lines[i].includes("speak2me-mcp")) {
          endIndex = i;
          break;
        }
      }

      // Replace section
      const before = lines.slice(0, startIndex - 1).join("\n"); // -1 to remove separator
      const after = lines.slice(endIndex).join("\n");
      const newContent = [before, toolDocs, after].filter(Boolean).join("\n\n");

      await this.projectContextService.writeClaudeMd(conversationId, newContent);
    } else {
      // Append new section
      await this.projectContextService.appendToClaudeMd(conversationId, toolDocs);
    }
  }

  /**
   * Get all registered tools
   */
  getTools(): ToolMetadata[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get tool by name
   */
  getTool(name: string): ToolMetadata | undefined {
    return this.tools.get(name);
  }
}
