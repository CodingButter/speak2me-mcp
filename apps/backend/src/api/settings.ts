import { Elysia, t } from "elysia";
import type { CoreOperations } from "@stt-mcp/core";

export const settingsRoutes = new Elysia()
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
  );
