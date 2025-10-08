import { writeFile, readFile, access, constants } from "fs/promises";
import { join, basename } from "path";

/**
 * Generate CLAUDE.md content with speak2me-mcp directives
 */
export function generateClaudeMd(serverUrl: string, conversationId: string): string {
  return `# Project AI Assistant Configuration

## Speak2Me MCP Server

This project is connected to the Speak2Me MCP server for voice-enabled AI interactions.

### Available MCP Tools

**speak(text, options)**
- Converts text to speech using ElevenLabs TTS
- Optional SSML enrichment via OpenAI for natural prosody
- Returns audio URL and performance metrics

**listen(mode, options)**
- Captures and transcribes voice using Gemini STT
- Modes: auto (auto-send), manual (user confirms), ptt (push-to-talk)
- VAD and silence trimming for cost optimization

### Usage Guidelines

- Use \`speak\` to provide audio feedback to users
- Use \`listen\` to capture user voice input
- The Speak2Me UI displays all conversations with audio replay
- Audio files are persisted and accessible through the web interface

### Connection Info

- Server URL: ${serverUrl}
- Conversation ID: ${conversationId}
- MCP SSE Endpoint: ${serverUrl}/sse/${conversationId}

---

## Project-Specific Instructions

Add your project-specific AI assistant instructions below:

`;
}

/**
 * Generate .mcp.json configuration
 */
export function generateMcpConfig(serverUrl: string, conversationId: string): string {
  const config = {
    mcpServers: {
      "speak2me": {
        url: `${serverUrl}/sse/${conversationId}`
      }
    }
  };

  return JSON.stringify(config, null, 2);
}

/**
 * Setup project files (CLAUDE.md and .mcp.json)
 */
export async function setupProjectFiles(
  projectPath: string,
  conversationId: string,
  serverUrl: string
): Promise<{ claudeMdPath: string; mcpConfigPath: string }> {
  const claudeMdPath = join(projectPath, "CLAUDE.md");
  const mcpConfigPath = join(projectPath, ".mcp.json");

  // Check if CLAUDE.md exists
  let claudeMdExists = false;
  try {
    await access(claudeMdPath, constants.F_OK);
    claudeMdExists = true;
  } catch {
    // Doesn't exist, we'll create it
  }

  if (claudeMdExists) {
    // Append speak2me section to existing CLAUDE.md
    const existingContent = await readFile(claudeMdPath, "utf-8");

    // Check if speak2me section already exists
    if (!existingContent.includes("## Speak2Me MCP Server")) {
      const speak2meSection = `

---

${generateClaudeMd(serverUrl, conversationId)}`;
      await writeFile(claudeMdPath, existingContent + speak2meSection, "utf-8");
    }
  } else {
    // Create new CLAUDE.md
    await writeFile(claudeMdPath, generateClaudeMd(serverUrl, conversationId), "utf-8");
  }

  // Handle .mcp.json
  let mcpConfigExists = false;
  try {
    await access(mcpConfigPath, constants.F_OK);
    mcpConfigExists = true;
  } catch {
    // Doesn't exist
  }

  if (mcpConfigExists) {
    // Merge with existing .mcp.json
    try {
      const existingConfig = JSON.parse(await readFile(mcpConfigPath, "utf-8"));

      if (!existingConfig.mcpServers) {
        existingConfig.mcpServers = {};
      }

      existingConfig.mcpServers.speak2me = {
        url: `${serverUrl}/sse/${conversationId}`
      };

      await writeFile(mcpConfigPath, JSON.stringify(existingConfig, null, 2), "utf-8");
    } catch (error) {
      // If existing file is invalid JSON, back it up and create new one
      console.error("Invalid .mcp.json, creating new one:", error);
      await writeFile(mcpConfigPath, generateMcpConfig(serverUrl, conversationId), "utf-8");
    }
  } else {
    // Create new .mcp.json
    await writeFile(mcpConfigPath, generateMcpConfig(serverUrl, conversationId), "utf-8");
  }

  return {
    claudeMdPath,
    mcpConfigPath,
  };
}
