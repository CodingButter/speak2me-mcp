import { describe, test, expect } from "bun:test";
import { handleSpeak, handleListen } from "./tools";
import type { SpeakInput, ListenInput } from "@stt-mcp/shared";

describe("handleSpeak", () => {
  const mockContext = {
    apiKeys: {
      openai: "sk-test-openai",
      elevenlabs: "el-test-elevenlabs",
    },
    conversationId: "test-conv-123",
  };

  test("returns valid output structure", async () => {
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

  test("handles text input", async () => {
    const input: SpeakInput = {
      text: "Test message",
      stream: false,
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles SSML input", async () => {
    const input: SpeakInput = {
      text: "Test",
      ssml: "<speak>Test message</speak>",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
    expect(result.ssmlUsed).toBeTruthy();
  });

  test("includes ssmlUsed in response", async () => {
    const input: SpeakInput = {
      text: "Hello",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ssmlUsed).toBeTruthy();
  });

  test("handles custom voice ID", async () => {
    const input: SpeakInput = {
      text: "Hello",
      voiceId: "custom-voice-123",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
  });

  test("handles custom model", async () => {
    const input: SpeakInput = {
      text: "Hello",
      model: "eleven_multilingual_v2",
    };

    const result = await handleSpeak(input, mockContext);
    expect(result.ok).toBe(true);
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
