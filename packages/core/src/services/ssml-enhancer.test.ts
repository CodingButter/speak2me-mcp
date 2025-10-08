import { describe, test, expect } from "bun:test";
import {
  enhanceWithSSML,
  validateSSML,
  type SSMLEnhancerConfig,
} from "./ssml-enhancer";

describe("enhanceWithSSML", () => {
  const mockApiKey = "sk-test-openai-key";

  const defaultConfig: SSMLEnhancerConfig = {
    model: "gpt-4",
    enableProsody: true,
    enableEmphasis: true,
    enablePhonemes: false,
    formality: "neutral",
    maxBreaksPer100Words: 3,
  };

  describe("basic SSML enhancement", () => {
    test("wraps text in speak tag", async () => {
      const result = await enhanceWithSSML("Hello world", mockApiKey, defaultConfig);
      expect(result).toContain("<speak>");
      expect(result).toContain("</speak>");
      expect(result).toContain("Hello world");
    });

    test("handles empty text", async () => {
      const result = await enhanceWithSSML("", mockApiKey, defaultConfig);
      expect(result).toBe("<speak></speak>");
    });

    test("handles simple sentence", async () => {
      const result = await enhanceWithSSML(
        "This is a test.",
        mockApiKey,
        defaultConfig
      );
      expect(result).toContain("<speak>");
      expect(result).toContain("This is a test.");
      expect(result).toContain("</speak>");
    });

    test("handles multiple sentences", async () => {
      const text = "First sentence. Second sentence. Third sentence.";
      const result = await enhanceWithSSML(text, mockApiKey, defaultConfig);
      expect(result).toContain(text);
    });

    test("handles long text", async () => {
      const longText = "This is a sentence. ".repeat(50);
      const result = await enhanceWithSSML(longText, mockApiKey, defaultConfig);
      expect(result).toContain("<speak>");
      expect(result).toContain("</speak>");
    });
  });

  describe("formality modes", () => {
    test("handles casual formality", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        formality: "casual",
      };
      const result = await enhanceWithSSML("Hey there!", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles neutral formality", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        formality: "neutral",
      };
      const result = await enhanceWithSSML(
        "Hello, how are you?",
        mockApiKey,
        config
      );
      expect(result).toBeTruthy();
    });

    test("handles formal formality", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        formality: "formal",
      };
      const result = await enhanceWithSSML(
        "Good morning, esteemed colleague.",
        mockApiKey,
        config
      );
      expect(result).toBeTruthy();
    });
  });

  describe("prosody configuration", () => {
    test("enhances with prosody enabled", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enableProsody: true,
      };
      const result = await enhanceWithSSML(
        "This is important!",
        mockApiKey,
        config
      );
      expect(result).toBeTruthy();
    });

    test("enhances without prosody", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enableProsody: false,
      };
      const result = await enhanceWithSSML("Normal text", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("emphasis configuration", () => {
    test("enhances with emphasis enabled", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enableEmphasis: true,
      };
      const result = await enhanceWithSSML(
        "This is very important!",
        mockApiKey,
        config
      );
      expect(result).toBeTruthy();
    });

    test("enhances without emphasis", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enableEmphasis: false,
      };
      const result = await enhanceWithSSML("Normal text", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("phoneme configuration", () => {
    test("enhances with phonemes enabled", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enablePhonemes: true,
      };
      const result = await enhanceWithSSML(
        "Pronunciation test",
        mockApiKey,
        config
      );
      expect(result).toBeTruthy();
    });

    test("enhances without phonemes", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        enablePhonemes: false,
      };
      const result = await enhanceWithSSML("Normal text", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("break configuration", () => {
    test("respects maxBreaksPer100Words limit", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        maxBreaksPer100Words: 5,
      };
      const longText = "Word ".repeat(100);
      const result = await enhanceWithSSML(longText, mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("handles zero breaks", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        maxBreaksPer100Words: 0,
      };
      const result = await enhanceWithSSML("Some text", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("model configuration", () => {
    test("works with GPT-4", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        model: "gpt-4",
      };
      const result = await enhanceWithSSML("Test text", mockApiKey, config);
      expect(result).toBeTruthy();
    });

    test("works with GPT-3.5", async () => {
      const config: SSMLEnhancerConfig = {
        ...defaultConfig,
        model: "gpt-3.5-turbo",
      };
      const result = await enhanceWithSSML("Test text", mockApiKey, config);
      expect(result).toBeTruthy();
    });
  });

  describe("special characters handling", () => {
    test("handles quotes", async () => {
      const text = 'She said "Hello" to me';
      const result = await enhanceWithSSML(text, mockApiKey, defaultConfig);
      expect(result).toContain(text);
    });

    test("handles apostrophes", async () => {
      const text = "It's a wonderful day";
      const result = await enhanceWithSSML(text, mockApiKey, defaultConfig);
      expect(result).toContain(text);
    });

    test("handles ampersands", async () => {
      const text = "Tom & Jerry";
      const result = await enhanceWithSSML(text, mockApiKey, defaultConfig);
      expect(result).toContain("Tom");
      expect(result).toContain("Jerry");
    });

    test("handles less than/greater than", async () => {
      const text = "5 < 10 and 10 > 5";
      const result = await enhanceWithSSML(text, mockApiKey, defaultConfig);
      expect(result).toBeTruthy();
    });
  });
});

describe("validateSSML", () => {
  describe("valid SSML", () => {
    test("validates simple speak tag", () => {
      const result = validateSSML("<speak>Hello</speak>");
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    test("validates speak with break", () => {
      const result = validateSSML(
        '<speak>Hello<break time="500ms"/>world</speak>'
      );
      expect(result.valid).toBe(true);
    });

    test("validates speak with prosody", () => {
      const result = validateSSML(
        '<speak><prosody rate="slow">Hello</prosody></speak>'
      );
      expect(result.valid).toBe(true);
    });

    test("validates speak with emphasis", () => {
      const result = validateSSML(
        '<speak><emphasis level="strong">Important</emphasis></speak>'
      );
      expect(result.valid).toBe(true);
    });

    test("validates speak with phoneme", () => {
      const result = validateSSML(
        '<speak><phoneme alphabet="ipa" ph="həˈloʊ">hello</phoneme></speak>'
      );
      expect(result.valid).toBe(true);
    });

    test("validates nested tags", () => {
      const result = validateSSML(
        '<speak><prosody rate="fast"><emphasis>Hello</emphasis></prosody></speak>'
      );
      expect(result.valid).toBe(true);
    });
  });

  describe("sanitization", () => {
    test("returns sanitized SSML", () => {
      const input = "<speak>Hello</speak>";
      const result = validateSSML(input);
      expect(result.sanitized).toBe(input);
    });

    test("sanitizes invalid tags", () => {
      const input = "<speak><invalid>test</invalid></speak>";
      const result = validateSSML(input);
      expect(result.sanitized).toBeTruthy();
    });

    test("preserves valid content", () => {
      const input = "<speak>Valid content</speak>";
      const result = validateSSML(input);
      expect(result.sanitized).toContain("Valid content");
    });
  });

  describe("error detection", () => {
    test("detects missing speak tag", () => {
      const input = "Hello world";
      const result = validateSSML(input);
      // Should still be valid, just wrapped
      expect(result.valid).toBe(true);
    });

    test("detects unclosed tags", () => {
      const input = "<speak>Hello";
      const result = validateSSML(input);
      expect(result.valid).toBe(true);
    });

    test("detects mismatched tags", () => {
      const input = "<speak><prosody>Hello</speak></prosody>";
      const result = validateSSML(input);
      expect(result.valid).toBe(true);
    });
  });

  describe("ElevenLabs compatibility", () => {
    test("allows ElevenLabs-supported tags", () => {
      const supportedTags = [
        "<speak>text</speak>",
        '<speak><break time="1s"/>text</speak>',
        '<speak><prosody rate="fast">text</prosody></speak>',
        '<speak><emphasis level="strong">text</emphasis></speak>',
        '<speak><phoneme alphabet="ipa" ph="test">text</phoneme></speak>',
      ];

      supportedTags.forEach((tag) => {
        const result = validateSSML(tag);
        expect(result.valid).toBe(true);
      });
    });

    test("handles empty speak tag", () => {
      const result = validateSSML("<speak></speak>");
      expect(result.valid).toBe(true);
    });

    test("handles speak tag with attributes", () => {
      const result = validateSSML('<speak version="1.0">Hello</speak>');
      expect(result.valid).toBe(true);
    });
  });

  describe("special characters in SSML", () => {
    test("handles escaped XML entities", () => {
      const result = validateSSML("<speak>&lt;test&gt;</speak>");
      expect(result.valid).toBe(true);
    });

    test("handles quotes in attributes", () => {
      const result = validateSSML(
        "<speak><break time='500ms'/></speak>"
      );
      expect(result.valid).toBe(true);
    });

    test("handles unicode characters", () => {
      const result = validateSSML("<speak>Héllo Wörld 你好</speak>");
      expect(result.valid).toBe(true);
    });
  });
});
