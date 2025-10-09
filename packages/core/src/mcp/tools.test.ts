import { describe, test, expect } from "bun:test";
import { handleSpeak, handleListen } from "./tools";
import type { SpeakInput, ListenInput } from "@s2m-pac/shared";

// Skip integration tests if real API keys are not available
const hasRealApiKeys = Boolean(
  process.env.ELEVENLABS_API_KEY &&
  process.env.OPENAI_API_KEY
);

describe("handleSpeak", () => {
  const mockContext = {
    apiKeys: {
      openai: process.env.OPENAI_API_KEY || "sk-test-openai",
      elevenlabs: process.env.ELEVENLABS_API_KEY || "el-test-elevenlabs",
    },
    conversationId: "test-conv-123",
  };

  test.skipIf(!hasRealApiKeys)("returns valid output structure", async () => {
    const input: SpeakInput = {
      text: "Hello world",
      stream: true,
    };

    const result = await handleSpeak(input, mockContext);

    expect(result).toHaveProperty("ok");
    expect(result).toHaveProperty("metrics");
    expect(result.metrics).toHaveProperty("ttfbMs");
    expect(result.metrics).toHaveProperty("totalMs");
    expect(typeof result.ok).toBe("boolean");
  });

  test.skipIf(!hasRealApiKeys)("handles text input", async () => {
    const input: SpeakInput = {
      text: "Test message",
      stream: false,
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test.skipIf(!hasRealApiKeys)("handles SSML input", async () => {
    const input: SpeakInput = {
      text: "Test",
      ssml: "<speak>Test message</speak>",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
    expect(result.ssmlUsed).toBeTruthy();
  });

  test.skipIf(!hasRealApiKeys)("includes ssmlUsed in response", async () => {
    const input: SpeakInput = {
      text: "Hello",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ssmlUsed).toBeTruthy();
  });

  test.skipIf(!hasRealApiKeys)("handles custom voice ID", async () => {
    const input: SpeakInput = {
      text: "Hello",
      voiceId: "custom-voice-123",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test.skipIf(!hasRealApiKeys)("handles custom model", async () => {
    const input: SpeakInput = {
      text: "Hello",
      model: "eleven_multilingual_v2",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("throws error when ElevenLabs API key is missing", async () => {
    const contextWithoutKey = {
      apiKeys: {
        openai: "test",
      },
      conversationId: "test",
    };

    const input: SpeakInput = {
      text: "Hello",
    };

    await expect(handleSpeak(input, contextWithoutKey)).rejects.toThrow("ElevenLabs API key not configured");
  });
});

describe("handleListen", () => {
  const mockContext = {
    apiKeys: {
      gemini: "gem-test-key",
    },
    conversationId: "test-conv-123",
    audioData: new ArrayBuffer(1024),
  };

  test("returns valid output structure", async () => {
    const input: ListenInput = {
      mode: "manual",
    };

    const result = await handleListen(input, mockContext);

    expect(result).toHaveProperty("ok");
    expect(result).toHaveProperty("transcript");
    expect(result).toHaveProperty("segments");
    expect(result).toHaveProperty("metrics");
    expect(result.metrics).toHaveProperty("audioSecSent");
    expect(result.metrics).toHaveProperty("chunks");
    expect(result.metrics).toHaveProperty("latencyMs");
  });

  test("handles auto mode", async () => {
    const input: ListenInput = {
      mode: "auto",
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles manual mode", async () => {
    const input: ListenInput = {
      mode: "manual",
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles PTT mode", async () => {
    const input: ListenInput = {
      mode: "ptt",
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles VAD threshold", async () => {
    const input: ListenInput = {
      mode: "auto",
      vadThreshold: 0.7,
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles min silence duration", async () => {
    const input: ListenInput = {
      mode: "auto",
      minSilenceMs: 1000,
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles max utterance length", async () => {
    const input: ListenInput = {
      mode: "manual",
      maxUtteranceMs: 20000,
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles locale", async () => {
    const input: ListenInput = {
      mode: "auto",
      locale: "es-ES",
    };

    const result = await handleListen(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("returns segments array", async () => {
    const input: ListenInput = {
      mode: "auto",
    };

    const result = await handleListen(input, mockContext);
    expect(Array.isArray(result.segments)).toBe(true);
  });

  test("returns transcript string", async () => {
    const input: ListenInput = {
      mode: "manual",
    };

    const result = await handleListen(input, mockContext);
    expect(typeof result.transcript).toBe("string");
  });
});
