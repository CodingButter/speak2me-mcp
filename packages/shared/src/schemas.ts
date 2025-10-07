import { z } from "zod";

// MCP Tool Input/Output Schemas

export const speakInputSchema = z.object({
  text: z.string().min(1),
  ssml: z.string().optional(),
  voiceId: z.string().optional(),
  model: z.string().optional(),
  stream: z.boolean().default(true),
});

export const speakOutputSchema = z.object({
  ok: z.boolean(),
  ssmlUsed: z.string().optional(),
  audioUrl: z.string().optional(),
  metrics: z.object({
    ttfbMs: z.number(),
    totalMs: z.number(),
  }),
  reason: z.string().optional(),
});

export const listenInputSchema = z.object({
  mode: z.enum(["auto", "manual", "ptt"]),
  vadThreshold: z.number().min(0).max(1).optional(),
  minSilenceMs: z.number().min(0).optional(),
  maxUtteranceMs: z.number().min(5000).optional(),
  locale: z.string().optional(),
});

export const listenOutputSchema = z.object({
  ok: z.boolean(),
  transcript: z.string(),
  segments: z.array(
    z.object({
      startMs: z.number(),
      endMs: z.number(),
      sent: z.boolean(),
    })
  ),
  metrics: z.object({
    audioSecSent: z.number(),
    chunks: z.number(),
    latencyMs: z.number(),
  }),
  reason: z.string().optional(),
});

// API Schemas

export const apiKeysSchema = z.object({
  openai: z.string().optional(),
  elevenlabs: z.string().optional(),
  gemini: z.string().optional(),
});

export const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  audioUrl: z.string().optional(),
  ssmlUsed: z.string().optional(),
  timestamp: z.number(),
  metrics: z
    .object({
      ttfbMs: z.number().optional(),
      totalMs: z.number().optional(),
      audioSecSent: z.number().optional(),
      chunks: z.number().optional(),
      latencyMs: z.number().optional(),
    })
    .optional(),
});

export const conversationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  messageCount: z.number().default(0),
});

export const settingsSchema = z.object({
  // Audio Capture
  inputDeviceId: z.string().nullish(),
  sampleRate: z.number().default(48000),
  noiseSuppressionEnabled: z.boolean().default(true),

  // VAD & Chunking
  vadThreshold: z.number().min(0).max(1).default(0.5),
  minSilenceMs: z.number().default(500),
  maxUtteranceMs: z.number().default(15000),
  minSpeechMs: z.number().default(200),
  trimLongSilences: z.boolean().default(true),
  maxChunkLengthMs: z.number().default(20000),

  // STT
  sttProvider: z.literal("gemini").default("gemini"),
  sttModel: z.string().default("gemini-1.5-flash"),
  sttLocale: z.string().default("en-US"),
  sttEncoding: z.enum(["opus", "webm", "pcm"]).default("webm"),
  sendPartials: z.boolean().default(false),

  // TTS
  ttsProvider: z.literal("elevenlabs").default("elevenlabs"),
  ttsVoiceId: z.string().nullish(),
  ttsModel: z.string().default("eleven_flash_v2"),
  ttsStreamPlayback: z.boolean().default(true),
  ttsAutoplay: z.boolean().default(true),

  // SSML Enhancer
  ssmlEnabled: z.boolean().default(true),
  ssmlModel: z.string().default("gpt-4o-mini"),
  ssmlEnableProsody: z.boolean().default(true),
  ssmlEnableEmphasis: z.boolean().default(true),
  ssmlEnablePhonemes: z.boolean().default(false),
  ssmlFormality: z.enum(["casual", "neutral", "formal"]).default("neutral"),
  ssmlMaxBreaksPer100Words: z.number().default(3),

  // Interaction
  defaultMode: z.enum(["auto", "manual", "ptt"]).default("manual"),
  autoSendInAutoMode: z.boolean().default(true),
  pttKeybinding: z.string().default("Space"),

  // Privacy & Storage
  keepConversationHistory: z.boolean().default(true),
  retentionDays: z.number().default(30),

  // Advanced
  loggingLevel: z.enum(["debug", "info", "warn", "error"]).default("info"),
  metricsEnabled: z.boolean().default(true),
  backendUrl: z.string().default("http://localhost:3000"),
});

// TODO Tool Schemas

export const todoStatusSchema = z.enum(["BACKLOG", "IN_PROGRESS", "BLOCKED", "COMPLETED", "ARCHIVED"]);
export const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const todoCreateInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: prioritySchema.optional(),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional(),
  projectPath: z.string().optional(),
});

export const todoUpdateInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: todoStatusSchema.optional(),
  priority: prioritySchema.optional(),
  tags: z.array(z.string()).optional(),
  blockedReason: z.string().optional(),
  assignee: z.string().optional(),
});

export const todoListInputSchema = z.object({
  status: todoStatusSchema.optional(),
  projectPath: z.string().optional(),
  priority: prioritySchema.optional(),
  tags: z.array(z.string()).optional(),
});

export const todoArchiveInputSchema = z.object({
  id: z.string(),
});

export const todoDeleteInputSchema = z.object({
  id: z.string(),
});

export const todoSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  projectPath: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  status: todoStatusSchema,
  priority: prioritySchema.nullable(),
  tags: z.array(z.string()),
  createdAt: z.number(),
  updatedAt: z.number(),
  completedAt: z.number().nullable(),
  archivedAt: z.number().nullable(),
  blockedReason: z.string().nullable(),
  assignee: z.string().nullable(),
  metadata: z.record(z.any()).nullable(),
});

export const todoOutputSchema = z.object({
  ok: z.boolean(),
  todo: todoSchema.optional(),
  todos: z.array(todoSchema).optional(),
  reason: z.string().optional(),
});

// Project Link Tool Schemas

export const projectLinkInputSchema = z.object({
  projectPath: z.string().min(1),
  projectName: z.string().optional(),
  devCommand: z.string().optional(),
  buildCommand: z.string().optional(),
  testCommand: z.string().optional(),
  stopCommand: z.string().optional(),
  settings: z.record(z.any()).optional(),
});

export const projectContextSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  projectPath: z.string(),
  projectName: z.string(),
  claudeMdPath: z.string().nullable(),
  devCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  testCommand: z.string().nullable(),
  stopCommand: z.string().nullable(),
  settings: z.record(z.any()).nullable(),
  createdAt: z.number(),
  lastAccessedAt: z.number(),
});

export const projectLinkOutputSchema = z.object({
  ok: z.boolean(),
  projectContext: projectContextSchema.optional(),
  reason: z.string().optional(),
});
