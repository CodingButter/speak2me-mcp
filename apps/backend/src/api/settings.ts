import { Elysia, t } from "elysia";
import type { CoreOperations } from "@s2m-pac/core";

export const settingsRoutes = new Elysia()
  // Global settings
  .get("/settings", async (context: any) => {
    return await context.core.getSettings();
  })
  .patch(
    "/settings",
    async (context: any) => {
      await context.core.updateSettings(context.body);
      return { ok: true };
    },
    {
      body: t.Any(), // TODO: Add proper validation with Zod schema
    }
  )
  // Per-conversation settings (overrides global)
  .get(
    "/conversations/:id/settings",
    async (context: any) => {
      // Get global settings first
      const globalSettings = await context.core.getSettings();

      // Get conversation-specific settings
      const conversationSettings = await context.core.getVoiceConfig(context.params.id);

      // Merge: conversation settings override global
      return {
        ...globalSettings,
        ...conversationSettings,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .patch(
    "/conversations/:id/settings",
    async (context: any) => {
      // Save to conversation-specific settings
      await context.core.setVoiceConfig(context.params.id, context.body);
      return { ok: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Any(),
    }
  );
