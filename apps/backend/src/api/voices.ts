import { Elysia, t } from "elysia";
import type { CoreOperations } from "@s2m-pac/core";

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
}

export const voicesRoutes = new Elysia()
  .get(
    "/conversations/:id/voices",
    async (context: any) => {
      // Get API key for this conversation
      const keys = await context.core.getApiKeys(context.params.id);

      console.log("Fetching voices for conversation:", context.params.id);
      console.log("Keys loaded:", keys ? Object.keys(keys) : "null");
      console.log("ElevenLabs key exists:", !!keys?.elevenlabs);
      console.log("ElevenLabs key length:", keys?.elevenlabs?.length || 0);
      console.log("ElevenLabs key preview:", keys?.elevenlabs?.substring(0, 10) + "...");

      if (!keys?.elevenlabs) {
        console.log("No ElevenLabs key found");
        return { error: "ElevenLabs API key not configured", voices: [] };
      }

      try {
        // Fetch voices from ElevenLabs API
        const response = await fetch("https://api.elevenlabs.io/v1/voices", {
          headers: {
            "xi-api-key": keys.elevenlabs,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("ElevenLabs API error:", response.status, errorText);
          throw new Error(`ElevenLabs API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform to simpler format
        const voices = data.voices.map((voice: ElevenLabsVoice) => ({
          id: voice.voice_id,
          name: voice.name,
          category: voice.category,
          description: voice.description,
        }));

        // Sort voices: cloned first, then premade, then generated
        voices.sort((a: any, b: any) => {
          const categoryOrder: Record<string, number> = {
            'cloned': 0,
            'premade': 1,
            'generated': 2,
          };

          const orderA = categoryOrder[a.category.toLowerCase()] ?? 3;
          const orderB = categoryOrder[b.category.toLowerCase()] ?? 3;

          if (orderA !== orderB) {
            return orderA - orderB;
          }

          // Same category, sort alphabetically by name
          return a.name.localeCompare(b.name);
        });

        console.log(`Loaded ${voices.length} voices, sorted with cloned voices first`);

        return { voices };
      } catch (error) {
        console.error("Failed to fetch ElevenLabs voices:", error);
        return {
          error: "Failed to fetch voices",
          voices: []
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
