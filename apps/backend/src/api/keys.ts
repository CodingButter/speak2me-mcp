import { Elysia, t } from "elysia";
import type { CoreOperations } from "@stt-mcp/core";
import type { SessionManager } from "@stt-mcp/core/session";
import { apiKeysSchema } from "@stt-mcp/shared";

export const keysRoutes = new Elysia()
  .post(
    "/conversations/:id/keys",
    async (context: any) => {
      // Validate API keys
      const keys = apiKeysSchema.parse(context.body);

      // Store via core
      await context.core.setApiKeys(context.params.id, keys);

      // Update session if exists
      const session = context.sessionManager.getSessionByConversationId(context.params.id);
      if (session) {
        context.sessionManager.updateSessionApiKeys(session.id, keys);
      }

      return { ok: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        openai: t.Optional(t.String()),
        elevenlabs: t.Optional(t.String()),
        gemini: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/conversations/:id/keys",
    async (context: any) => {
      const keys = await context.core.getApiKeys(context.params.id);
      return keys || {};
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
