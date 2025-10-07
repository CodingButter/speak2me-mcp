import { Elysia, t } from "elysia";
import type { CoreOperations } from "@stt-mcp/core";

export const conversationsRoutes = new Elysia()
  .get(
    "/conversations",
    async (context: any) => {
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
  );
