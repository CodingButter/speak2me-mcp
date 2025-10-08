import { Elysia, t } from "elysia";
import { claudeConfigInputSchema } from "@s2m-pac/shared";

export const claudeRoutes = new Elysia()
  .post(
    "/conversations/:id/claude-query",
    async (context: any) => {
      return await context.core.executeClaudeQuery({
        conversationId: context.params.id,
        prompt: context.body.prompt,
        cwd: context.body.cwd,
        maxTurns: context.body.maxTurns,
        allowedTools: context.body.allowedTools,
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        prompt: t.String(),
        cwd: t.Optional(t.String()),
        maxTurns: t.Optional(t.Number()),
        allowedTools: t.Optional(t.Array(t.String())),
      }),
    }
  )
  // Claude Configuration endpoints
  .get(
    "/conversations/:id/claude-config",
    async (context: any) => {
      const config = await context.core.getClaudeConfig(context.params.id);
      if (!config) {
        return { ok: false, reason: "No configuration found" };
      }
      return { ok: true, config };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/conversations/:id/claude-config",
    async (context: any) => {
      // Validate input with Zod
      const input = claudeConfigInputSchema.parse(context.body);
      await context.core.setClaudeConfig(context.params.id, input);
      return { ok: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        systemPromptTemplate: t.Optional(t.String()),
        voiceEnabled: t.Optional(t.Boolean()),
        voiceDirectives: t.Optional(t.String()),
        model: t.Optional(t.String()),
        maxTurns: t.Optional(t.Number()),
        permissionMode: t.Optional(t.Enum({
          default: 'default',
          acceptEdits: 'acceptEdits',
          bypassPermissions: 'bypassPermissions',
          plan: 'plan',
        })),
        allowedTools: t.Optional(t.Array(t.String())),
        disallowedTools: t.Optional(t.Array(t.String())),
        mcpServers: t.Optional(t.Record(t.String(), t.Any())),
        customInstructions: t.Optional(t.String()),
        templateVars: t.Optional(t.Record(t.String(), t.String())),
      }),
    }
  )
  .delete(
    "/conversations/:id/claude-config",
    async (context: any) => {
      await context.core.deleteClaudeConfig(context.params.id);
      return { ok: true };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  // Template validation endpoint
  .post(
    "/conversations/:id/claude-config/validate-template",
    async (context: any) => {
      const { template, variables } = context.body;
      const { templateRenderer } = await import("@s2m-pac/core/services");

      const validation = templateRenderer.validate(template, variables || {});
      const extracted = templateRenderer.extractVariables(template);

      return {
        ok: true,
        valid: validation.valid,
        missingVariables: validation.missing,
        extractedVariables: extracted,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        template: t.String(),
        variables: t.Optional(t.Record(t.String(), t.String())),
      }),
    }
  );