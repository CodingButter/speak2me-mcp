import { describe, test, expect } from "bun:test";
import { speechToText, type STTConfig } from "./stt";

describe("speechToText", () => {
  const mockApiKey = "gem-test-key-123";
  const mockAudioData = new ArrayBuffer(1024);

  describe("basic functionality", () => {
    test("returns valid response structure", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      expect(result).toHaveProperty("transcript");
      expect(result).toHaveProperty("segments");
      expect(result).toHaveProperty("metrics");
      expect(typeof result.transcript).toBe("string");
      expect(Array.isArray(result.segments)).toBe(true);
    });

    test("metrics have correct structure", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      expect(result.metrics).toHaveProperty("audioSecSent");
      expect(result.metrics).toHaveProperty("chunks");
      expect(result.metrics).toHaveProperty("latencyMs");
      expect(typeof result.metrics.audioSecSent).toBe("number");
      expect(typeof result.metrics.chunks).toBe("number");
      expect(typeof result.metrics.latencyMs).toBe("number");
    });

    test("segments have correct structure", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      result.segments.forEach((segment) => {
        expect(segment).toHaveProperty("startMs");
        expect(segment).toHaveProperty("endMs");
        expect(segment).toHaveProperty("sent");
        expect(typeof segment.startMs).toBe("number");
        expect(typeof segment.endMs).toBe("number");
        expect(typeof segment.sent).toBe("boolean");
      });
    });
  });

  describe("audio encoding support", () => {
    test("handles opus encoding", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles webm encoding", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "webm",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles pcm encoding", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "pcm",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("locale support", () => {
    test("handles English locale", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles Spanish locale", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "es-ES",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles French locale", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "fr-FR",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles Japanese locale", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "ja-JP",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("model configuration", () => {
    test("handles Gemini Flash model", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles Gemini Pro model", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-pro",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("audio data handling", () => {
    test("handles empty audio buffer", async () => {
      const emptyBuffer = new ArrayBuffer(0);
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(emptyBuffer, mockApiKey, config);
      expect(result).toBeTruthy();
      expect(result.transcript).toBe("");
      expect(result.segments).toEqual([]);
    });

    test("handles small audio buffer", async () => {
      const smallBuffer = new ArrayBuffer(512);
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(smallBuffer, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles large audio buffer", async () => {
      const largeBuffer = new ArrayBuffer(1024 * 1024); // 1MB
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(largeBuffer, mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("metrics validation", () => {
    test("metrics are non-negative", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      expect(result.metrics.audioSecSent).toBeGreaterThanOrEqual(0);
      expect(result.metrics.chunks).toBeGreaterThanOrEqual(0);
      expect(result.metrics.latencyMs).toBeGreaterThanOrEqual(0);
    });

    test("chunks count is integer", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      expect(Number.isInteger(result.metrics.chunks)).toBe(true);
    });
  });

  describe("segment validation", () => {
    test("segment timestamps are in correct order", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      result.segments.forEach((segment) => {
        expect(segment.endMs).toBeGreaterThanOrEqual(segment.startMs);
      });
    });

    test("segments are non-overlapping and sequential", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      const result = await speechToText(mockAudioData, mockApiKey, config);

      for (let i = 1; i < result.segments.length; i++) {
        expect(result.segments[i].startMs).toBeGreaterThanOrEqual(
          result.segments[i - 1].endMs
        );
      }
    });
  });

  describe("error handling scenarios", () => {
    test("handles invalid API key gracefully", async () => {
      const config: STTConfig = {
        model: "gemini-1.5-flash",
        locale: "en-US",
        encoding: "opus",
      };

      // Should not throw, but return empty result
      const result = await speechToText(mockAudioData, "", config);
      expect(result).toBeTruthy();
    });
  });
});
