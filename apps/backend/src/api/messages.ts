import { Elysia, t } from "elysia";
import type { CoreOperations } from "@stt-mcp/core";

export const messagesRoutes = new Elysia()
  .get(
    "/conversations/:id/messages",
    async (context: any) => {
      return await context.core.getMessages(context.params.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/conversations/:id/audio",
    async (context: any) => {
      // Get API keys for this conversation
      const apiKeys = await context.core.getApiKeys(context.params.id);
      if (!apiKeys || !apiKeys.gemini) {
        throw new Error("Gemini API key not configured");
      }

      // Process audio via core
      return await context.core.processAudio(context.params.id, context.body, apiKeys);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      type: "arraybuffer",
    }
  );
