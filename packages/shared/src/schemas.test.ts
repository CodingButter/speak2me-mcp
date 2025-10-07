import { describe, test, expect } from "bun:test";
import {
  speakInputSchema,
  speakOutputSchema,
  listenInputSchema,
  listenOutputSchema,
  apiKeysSchema,
  messageSchema,
  conversationSchema,
  settingsSchema,
} from "./schemas";

describe("speakInputSchema", () => {
  test("validates valid speak input", () => {
    const valid = {
      text: "Hello world",
      ssml: "<speak>Hello world</speak>",
      voiceId: "voice-123",
      model: "eleven_flash_v2",
      stream: true,
    };
    expect(() => speakInputSchema.parse(valid)).not.toThrow();
  });

  test("validates minimal speak input", () => {
    const minimal = { text: "Hello" };
    const result = speakInputSchema.parse(minimal);
    expect(result.text).toBe("Hello");
    expect(result.stream).toBe(true); // default
  });

  test("rejects empty text", () => {
    expect(() => speakInputSchema.parse({ text: "" })).toThrow();
  });

  test("rejects missing text", () => {
    expect(() => speakInputSchema.parse({})).toThrow();
  });
});

describe("speakOutputSchema", () => {
  test("validates successful speak output", () => {
    const valid = {
      ok: true,
      ssmlUsed: "<speak>Hello</speak>",
      audioUrl: "https://example.com/audio.mp3",
      metrics: {
        ttfbMs: 100,
        totalMs: 500,
      },
    };
    expect(() => speakOutputSchema.parse(valid)).not.toThrow();
  });

  test("validates error speak output", () => {
    const error = {
      ok: false,
      metrics: { ttfbMs: 0, totalMs: 0 },
      reason: "API key not configured",
    };
    expect(() => speakOutputSchema.parse(error)).not.toThrow();
  });

  test("requires metrics", () => {
    const invalid = { ok: true };
    expect(() => speakOutputSchema.parse(invalid)).toThrow();
  });
});

describe("listenInputSchema", () => {
  test("validates valid listen input", () => {
    const valid = {
      mode: "auto" as const,
      vadThreshold: 0.5,
      minSilenceMs: 500,
      maxUtteranceMs: 15000,
      locale: "en-US",
    };
    expect(() => listenInputSchema.parse(valid)).not.toThrow();
  });

  test("validates minimal listen input", () => {
    const minimal = { mode: "manual" as const };
    expect(() => listenInputSchema.parse(minimal)).not.toThrow();
  });

  test("rejects invalid mode", () => {
    const invalid = { mode: "invalid" };
    expect(() => listenInputSchema.parse(invalid)).toThrow();
  });

  test("validates mode enum values", () => {
    expect(() => listenInputSchema.parse({ mode: "auto" })).not.toThrow();
    expect(() => listenInputSchema.parse({ mode: "manual" })).not.toThrow();
    expect(() => listenInputSchema.parse({ mode: "ptt" })).not.toThrow();
  });

  test("rejects vadThreshold out of range", () => {
    expect(() =>
      listenInputSchema.parse({ mode: "auto", vadThreshold: -0.1 })
    ).toThrow();
    expect(() =>
      listenInputSchema.parse({ mode: "auto", vadThreshold: 1.1 })
    ).toThrow();
  });

  test("rejects negative minSilenceMs", () => {
    expect(() =>
      listenInputSchema.parse({ mode: "auto", minSilenceMs: -100 })
    ).toThrow();
  });

  test("rejects maxUtteranceMs below 5000", () => {
    expect(() =>
      listenInputSchema.parse({ mode: "auto", maxUtteranceMs: 4000 })
    ).toThrow();
  });
});

describe("listenOutputSchema", () => {
  test("validates successful listen output", () => {
    const valid = {
      ok: true,
      transcript: "Hello world",
      segments: [
        { startMs: 0, endMs: 1000, sent: true },
        { startMs: 1000, endMs: 2000, sent: true },
      ],
      metrics: {
        audioSecSent: 2.0,
        chunks: 2,
        latencyMs: 150,
      },
    };
    expect(() => listenOutputSchema.parse(valid)).not.toThrow();
  });

  test("validates empty segments", () => {
    const valid = {
      ok: true,
      transcript: "",
      segments: [],
      metrics: { audioSecSent: 0, chunks: 0, latencyMs: 0 },
    };
    expect(() => listenOutputSchema.parse(valid)).not.toThrow();
  });
});

describe("apiKeysSchema", () => {
  test("validates all keys present", () => {
    const valid = {
      openai: "sk-test-123",
      elevenlabs: "el-test-456",
      gemini: "gem-test-789",
    };
    expect(() => apiKeysSchema.parse(valid)).not.toThrow();
  });

  test("validates partial keys", () => {
    expect(() => apiKeysSchema.parse({ openai: "sk-test" })).not.toThrow();
    expect(() => apiKeysSchema.parse({ elevenlabs: "el-test" })).not.toThrow();
    expect(() => apiKeysSchema.parse({})).not.toThrow();
  });
});

describe("messageSchema", () => {
  test("validates user message", () => {
    const valid = {
      id: "msg-123",
      conversationId: "conv-123",
      role: "user" as const,
      content: "Hello",
      timestamp: Date.now(),
    };
    expect(() => messageSchema.parse(valid)).not.toThrow();
  });

  test("validates assistant message with audio", () => {
    const valid = {
      id: "msg-456",
      conversationId: "conv-123",
      role: "assistant" as const,
      content: "Hi there",
      audioUrl: "https://example.com/audio.mp3",
      ssmlUsed: "<speak>Hi there</speak>",
      timestamp: Date.now(),
      metrics: {
        ttfbMs: 100,
        totalMs: 500,
      },
    };
    expect(() => messageSchema.parse(valid)).not.toThrow();
  });

  test("rejects invalid role", () => {
    const invalid = {
      id: "msg-123",
      conversationId: "conv-123",
      role: "system",
      content: "Hello",
      timestamp: Date.now(),
    };
    expect(() => messageSchema.parse(invalid)).toThrow();
  });
});

describe("conversationSchema", () => {
  test("validates conversation", () => {
    const valid = {
      id: "conv-123",
      name: "Test Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 5,
    };
    expect(() => conversationSchema.parse(valid)).not.toThrow();
  });

  test("validates conversation without name", () => {
    const valid = {
      id: "conv-123",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 0,
    };
    expect(() => conversationSchema.parse(valid)).not.toThrow();
  });

  test("defaults messageCount to 0", () => {
    const input = {
      id: "conv-123",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const result = conversationSchema.parse(input);
    expect(result.messageCount).toBe(0);
  });
});

describe("settingsSchema", () => {
  test("validates with defaults", () => {
    const result = settingsSchema.parse({});
    expect(result.vadThreshold).toBe(0.5);
    expect(result.minSilenceMs).toBe(500);
    expect(result.sttProvider).toBe("gemini");
    expect(result.ttsProvider).toBe("elevenlabs");
    expect(result.defaultMode).toBe("manual");
  });

  test("validates custom settings", () => {
    const custom = {
      vadThreshold: 0.7,
      minSilenceMs: 1000,
      sttModel: "gemini-1.5-pro",
      ttsVoiceId: "voice-123",
      defaultMode: "auto" as const,
    };
    const result = settingsSchema.parse(custom);
    expect(result.vadThreshold).toBe(0.7);
    expect(result.minSilenceMs).toBe(1000);
    expect(result.defaultMode).toBe("auto");
  });

  test("rejects invalid vadThreshold", () => {
    expect(() => settingsSchema.parse({ vadThreshold: 1.5 })).toThrow();
    expect(() => settingsSchema.parse({ vadThreshold: -0.1 })).toThrow();
  });

  test("rejects invalid mode", () => {
    expect(() => settingsSchema.parse({ defaultMode: "invalid" })).toThrow();
  });

  test("rejects invalid encoding", () => {
    expect(() => settingsSchema.parse({ sttEncoding: "mp3" })).toThrow();
  });

  test("validates encoding options", () => {
    expect(() => settingsSchema.parse({ sttEncoding: "opus" })).not.toThrow();
    expect(() => settingsSchema.parse({ sttEncoding: "webm" })).not.toThrow();
    expect(() => settingsSchema.parse({ sttEncoding: "pcm" })).not.toThrow();
  });
});
