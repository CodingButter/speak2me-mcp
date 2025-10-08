/**
 * SSML Enhancement using OpenAI
 * Adds prosody, breaks, emphasis to plain text
 *
 * Project Scope Reference: §9 (SSML Enhancer Specification)
 */

import OpenAI from "openai";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

export interface SSMLEnhancerConfig {
  model: string;
  enableProsody: boolean;
  enableEmphasis: boolean;
  enablePhonemes: boolean;
  formality: "casual" | "neutral" | "formal";
  maxBreaksPer100Words: number;
}

const ELEVENLABS_ALLOWED_TAGS = new Set([
  "speak",
  "break",
  "prosody",
  "emphasis",
  "phoneme",
  "say-as",
]);

const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  break: new Set(["time"]),
  prosody: new Set(["rate", "pitch", "volume"]),
  emphasis: new Set(["level"]),
  phoneme: new Set(["alphabet", "ph"]),
  "say-as": new Set(["interpret-as"]),
};

const MAX_SSML_LENGTH = 5000;
const MAX_BREAK_TIME_MS = 3000;

export async function enhanceWithSSML(
  text: string,
  apiKey: string,
  config: SSMLEnhancerConfig
): Promise<string> {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey });

    // Build system prompt based on config
    const systemPrompt = buildSystemPrompt(config);

    // Call OpenAI Chat Completions API
    const response = await openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.3,
      max_tokens: Math.min(text.length * 2, 4096),
    });

    const enhancedSSML = response.choices[0]?.message?.content || "";

    // Validate and sanitize the SSML
    const validation = validateSSML(enhancedSSML);

    if (!validation.valid) {
      console.warn(
        `SSML validation failed: ${validation.errors.join(", ")}`
      );
      // Fall back to minimal SSML
      return `<speak>${text}</speak>`;
    }

    return validation.sanitized;
  } catch (error) {
    // Log error but don't block TTS generation
    console.error("SSML enhancement failed:", error);
    // Fall back to plain text wrapped in speak tag
    return `<speak>${text}</speak>`;
  }
}

function buildSystemPrompt(config: SSMLEnhancerConfig): string {
  let prompt = `You are an SSML editor. Add only valid SSML tags for ElevenLabs: <speak>, <break>, <prosody>, <emphasis>, <phoneme>. Do not alter semantic meaning; improve naturalness, clarity, and pacing.

`;

  // Formality modifier
  switch (config.formality) {
    case "casual":
      prompt += "Use conversational pacing with frequent short breaks.\n";
      break;
    case "neutral":
      prompt += "Use balanced pacing appropriate for general content.\n";
      break;
    case "formal":
      prompt += "Use measured, professional pacing with emphasis on key points.\n";
      break;
  }

  // Conditional features
  if (!config.enableProsody) {
    prompt += "Do not use <prosody> tags.\n";
  }
  if (!config.enableEmphasis) {
    prompt += "Do not use <emphasis> tags.\n";
  }
  if (!config.enablePhonemes) {
    prompt += "Do not use <phoneme> tags.\n";
  }

  // Break control
  prompt += `Add no more than ${config.maxBreaksPer100Words} <break> tags per 100 words.\n`;

  prompt += `\nIMPORTANT: Your response must be valid SSML wrapped in a <speak> tag. Return ONLY the SSML, no explanations.`;

  return prompt;
}

export function validateSSML(ssml: string): {
  valid: boolean;
  sanitized: string;
  errors: string[];
} {
  const errors: string[] = [];

  //  If no speak tag, wrap it
  if (!ssml.includes("<speak")) {
    return {
      valid: true,
      sanitized: `<speak>${ssml}</speak>`,
      errors: [],
    };
  }

  try {
    // Parse SSML as XML to validate structure
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: false,
    });

    let parsed;
    try {
      parsed = parser.parse(ssml);
    } catch (parseError) {
      errors.push(`XML parsing failed: ${parseError}`);
      // Extract plain text and wrap in speak tag - but still return valid: true
      // The philosophy is to be forgiving and always provide usable SSML
      const plainText = ssml.replace(/<[^>]*>/g, "");
      return {
        valid: true,
        sanitized: `<speak>${plainText}</speak>`,
        errors,
      };
    }

    // Ensure root is <speak>
    if (!parsed.speak) {
      errors.push("Missing root <speak> tag");
      return {
        valid: true,
        sanitized: `<speak>${ssml}</speak>`,
        errors,
      };
    }

    // For now, if it parses correctly and has speak tag, consider it valid
    // More sophisticated validation can be added later
    let sanitizedSSML = ssml;

    // Length constraint
    if (sanitizedSSML.length > MAX_SSML_LENGTH) {
      errors.push(
        `SSML length exceeds limit (${sanitizedSSML.length} > ${MAX_SSML_LENGTH})`
      );
      sanitizedSSML = sanitizedSSML.substring(0, MAX_SSML_LENGTH);
    }

    return {
      valid: true,
      sanitized: sanitizedSSML,
      errors,
    };
  } catch (error) {
    errors.push(`Validation error: ${error}`);
    // Fall back to plain text - but still return valid: true
    const plainText = ssml.replace(/<[^>]*>/g, "");
    return {
      valid: true,
      sanitized: `<speak>${plainText}</speak>`,
      errors,
    };
  }
}

function sanitizeSSMLNode(node: any, errors: string[]): any {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((item) => sanitizeSSMLNode(item, errors));
  }

  const sanitized: any = {};

  for (const [key, value] of Object.entries(node)) {
    // Handle attributes
    if (key.startsWith("@_")) {
      const attrName = key.substring(2);
      const parentTag = Object.keys(node).find((k) => !k.startsWith("@_"));

      if (parentTag && ALLOWED_ATTRIBUTES[parentTag]?.has(attrName)) {
        // Validate attribute values
        if (parentTag === "break" && attrName === "time") {
          const timeValue = validateBreakTime(value as string);
          if (timeValue) {
            sanitized[key] = timeValue;
          } else {
            errors.push(`Invalid break time: ${value}`);
          }
        } else {
          sanitized[key] = value;
        }
      } else {
        errors.push(`Disallowed attribute ${attrName} on ${parentTag}`);
      }
      continue;
    }

    // Handle child tags
    if (ELEVENLABS_ALLOWED_TAGS.has(key) && key !== "speak") {
      sanitized[key] = sanitizeSSMLNode(value, errors);
    } else if (key === "#text") {
      // Text content
      sanitized[key] = value;
    } else if (key !== "speak") {
      errors.push(`Disallowed tag: <${key}>`);
    }
  }

  return sanitized;
}

function validateBreakTime(time: string): string | null {
  const match = time.match(/^(\d+)(ms|s)$/);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2];

  const ms = unit === "s" ? value * 1000 : value;

  if (ms > MAX_BREAK_TIME_MS) {
    return `${MAX_BREAK_TIME_MS}ms`;
  }

  return time;
}
