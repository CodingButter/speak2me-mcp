import { Elysia, t } from "elysia";
import { query } from "@s2m-pac/claude-agent";

export const claudeTestRoutes = new Elysia()
  .post(
    "/claude-test",
    async ({ body }) => {
      const { apiKey, prompt, cwd } = body;

      try {
        const messages: any[] = [];

        // Stream messages from Claude Agent SDK
        for await (const message of query({
          prompt,
          options: {
            apiKey,
            cwd: cwd || process.cwd(),
            maxTurns: 3, // Limit for testing
            allowedTools: ['Read', 'Grep'], // Limited tools for safety
            permissionMode: 'acceptEdits'
          }
        })) {
          messages.push({
            type: message.type,
            timestamp: Date.now(),
            data: message
          });

          // Log for debugging
          console.log('Message received:', message.type);
        }

        return {
          ok: true,
          messageCount: messages.length,
          messages,
        };
      } catch (error: any) {
        console.error('Claude Agent SDK error:', error);
        return {
          ok: false,
          error: error.message,
          stack: error.stack
        };
      }
    },
    {
      body: t.Object({
        apiKey: t.String(),
        prompt: t.String(),
        cwd: t.Optional(t.String()),
      }),
    }
  );
