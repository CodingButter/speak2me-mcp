import { Elysia, t } from "elysia";
import type { CoreOperations } from "@s2m-pac/core";
import { setupProjectFiles } from "../utils/project-setup";
import { basename } from "path";

export const conversationsRoutes = new Elysia()
  .get(
    "/conversations",
    async (context: any) => {
      const projectId = context.query.projectId;
      if (projectId) {
        return await context.core.getConversationsByProject(projectId);
      }
      return await context.core.getConversations();
    }
  )
  .get(
    "/conversations/:id",
    async (context: any) => {
      const conversation = await context.core.getConversation(context.params.id);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      return conversation;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/conversations",
    async (context: any) => {
      return await context.core.createConversation(context.body);
    },
    {
      body: t.Object({
        id: t.Optional(t.String()),
        name: t.Optional(t.String()),
        projectId: t.Optional(t.String()),
      }),
    }
  )
  .delete(
    "/conversations/:id",
    async (context: any) => {
      await context.core.deleteConversation(context.params.id);
      return { ok: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  // Create conversation with project setup
  .post(
    "/conversations/with-project",
    async (context: any) => {
      const { name, projectPath, devCommand, buildCommand, testCommand } = context.body;

      // Create conversation
      const conversation = await context.core.createConversation({ name });

      // Setup project files (CLAUDE.md and .mcp.json)
      const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
      const { claudeMdPath } = await setupProjectFiles(
        projectPath,
        conversation.id,
        serverUrl
      );

      // Create project context
      const projectName = name || basename(projectPath);
      await context.core.createProjectContext({
        conversationId: conversation.id,
        projectPath,
        projectName,
        claudeMdPath,
        devCommand,
        buildCommand,
        testCommand,
      });

      return conversation;
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        projectPath: t.String(),
        devCommand: t.Optional(t.String()),
        buildCommand: t.Optional(t.String()),
        testCommand: t.Optional(t.String()),
      }),
    }
  )
  // Get project context for a conversation
  .get(
    "/conversations/:id/project",
    async (context: any) => {
      const projectContext = await context.core.getProjectContext(context.params.id);
      if (!projectContext) {
        throw new Error("Project context not found for this conversation");
      }
      return projectContext;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
