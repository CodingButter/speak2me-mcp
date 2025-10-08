import { describe, test, expect } from "bun:test";
import { textToSpeech, type TTSConfig } from "./tts";

// Skip these tests in CI/CD - they require valid ElevenLabs API key
const describeOrSkip = process.env.ELEVENLABS_API_KEY ? describe : describe.skip;

describeOrSkip("textToSpeech", () => {
  const mockApiKey = process.env.ELEVENLABS_API_KEY || "el-test-key-123";

  describe("basic functionality", () => {
    test("returns valid response structure", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello world", mockApiKey, config);

      expect(result).toHaveProperty("audioData");
      expect(result).toHaveProperty("metrics");
      expect(result.metrics).toHaveProperty("ttfbMs");
      expect(result.metrics).toHaveProperty("totalMs");
      expect(result.audioData).toBeInstanceOf(ArrayBuffer);
    });

    test("handles simple text input", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: true,
      };

      const result = await textToSpeech("Test message", mockApiKey, config);
      expect(result).toBeTruthy();
      expect(typeof result.metrics.ttfbMs).toBe("number");
      expect(typeof result.metrics.totalMs).toBe("number");
    });

    test("handles empty text", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles long text", async () => {
      const longText = "This is a test message. ".repeat(100);
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech(longText, mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("voice configuration", () => {
    test("handles custom voice ID", async () => {
      const config: TTSConfig = {
        voiceId: "custom-voice-id",
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("works without voice ID (uses default)", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("model configuration", () => {
    test("handles different TTS models", async () => {
      const models = [
        "eleven_flash_v2",
        "eleven_multilingual_v2",
        "eleven_turbo_v2",
      ];

      for (const model of models) {
        const config: TTSConfig = {
          model,
          stream: false,
        };

        const result = await textToSpeech("Test", mockApiKey, config);
        expect(result).toBeTruthy();
      }
    });
  });

  describe("streaming mode", () => {
    test("handles streaming enabled", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: true,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles streaming disabled", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("metrics tracking", () => {
    test("metrics are non-negative numbers", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result.metrics.ttfbMs).toBeGreaterThanOrEqual(0);
      expect(result.metrics.totalMs).toBeGreaterThanOrEqual(0);
    });

    test("totalMs is greater than or equal to ttfbMs", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello", mockApiKey, config);
      expect(result.metrics.totalMs).toBeGreaterThanOrEqual(result.metrics.ttfbMs);
    });
  });

  describe("special characters handling", () => {
    test("handles text with quotes", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech('He said "Hello there"', mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles text with newlines", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Line 1\nLine 2\nLine 3", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles text with emojis", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Hello 👋 World 🌍", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles text with special symbols", async () => {
      const config: TTSConfig = {
        model: "eleven_flash_v2",
        stream: false,
      };

      const result = await textToSpeech("Cost: $100 & €50", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });
});
