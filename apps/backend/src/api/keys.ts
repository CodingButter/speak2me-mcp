import { Elysia, t } from "elysia";
import type { CoreOperations } from "@s2m-pac/core";
import type { SessionManager } from "@s2m-pac/core/session";
import { apiKeysSchema } from "@s2m-pac/shared";

export const keysRoutes = new Elysia()
  .post(
    "/conversations/:id/keys",
    async (context: any) => {
      // Validate API keys
      const keys = apiKeysSchema.parse(context.body);

      // Get existing keys to preserve any that weren't changed
      const existingKeys = await context.core.getApiKeys(context.params.id);

      // Check if a key is masked (contains ***)
      const isMasked = (key: string | undefined): boolean => {
        return !!key && key.includes('***');
      };

      // Only update keys that aren't masked (preserve existing keys for masked values)
      const keysToSave = {
        openai: isMasked(keys.openai) ? existingKeys?.openai : keys.openai,
        elevenlabs: isMasked(keys.elevenlabs) ? existingKeys?.elevenlabs : keys.elevenlabs,
        gemini: isMasked(keys.gemini) ? existingKeys?.gemini : keys.gemini,
        anthropic: isMasked(keys.anthropic) ? existingKeys?.anthropic : keys.anthropic,
      };

      // Store via core
      await context.core.setApiKeys(context.params.id, keysToSave);

      // Update session if exists
      const session = context.sessionManager.getSessionByConversationId(context.params.id);
      if (session) {
        context.sessionManager.updateSessionApiKeys(session.id, keysToSave);
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
        anthropic: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/conversations/:id/keys",
    async (context: any) => {
      const keys = await context.core.getApiKeys(context.params.id);

      // Mask keys for security (show prefix and last 4 chars)
      const maskKey = (key: string | undefined): string | undefined => {
        if (!key) return undefined;
        if (key.length <= 8) return key; // Too short to mask safely
        const prefix = key.substring(0, 7); // e.g., "sk-ant-"
        const suffix = key.substring(key.length - 4);
        return `${prefix}***${suffix}`;
      };

      return {
        openai: maskKey(keys?.openai),
        elevenlabs: maskKey(keys?.elevenlabs),
        gemini: maskKey(keys?.gemini),
        anthropic: maskKey(keys?.anthropic),
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
