-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "audioUrl" TEXT,
    "ssmlUsed" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metrics" TEXT,
    CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "openai" TEXT,
    "elevenlabs" TEXT,
    "gemini" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ApiKey_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VoiceConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "voiceId" TEXT,
    "model" TEXT NOT NULL DEFAULT 'eleven_flash_v2',
    "ssmlEnabled" BOOLEAN NOT NULL DEFAULT true,
    "ssmlModel" TEXT NOT NULL DEFAULT 'gpt-4o-mini',
    "prosodyEnabled" BOOLEAN NOT NULL DEFAULT true,
    "emphasisEnabled" BOOLEAN NOT NULL DEFAULT true,
    "phonemesEnabled" BOOLEAN NOT NULL DEFAULT false,
    "formality" TEXT NOT NULL DEFAULT 'neutral',
    "maxBreaksPer100Words" INTEGER NOT NULL DEFAULT 3,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VoiceConfig_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "inputDeviceId" TEXT,
    "sampleRate" INTEGER NOT NULL DEFAULT 48000,
    "noiseSuppressionEnabled" BOOLEAN NOT NULL DEFAULT true,
    "vadThreshold" REAL NOT NULL DEFAULT 0.5,
    "minSilenceMs" INTEGER NOT NULL DEFAULT 500,
    "maxUtteranceMs" INTEGER NOT NULL DEFAULT 15000,
    "minSpeechMs" INTEGER NOT NULL DEFAULT 200,
    "trimLongSilences" BOOLEAN NOT NULL DEFAULT true,
    "maxChunkLengthMs" INTEGER NOT NULL DEFAULT 20000,
    "sttProvider" TEXT NOT NULL DEFAULT 'gemini',
    "sttModel" TEXT NOT NULL DEFAULT 'gemini-1.5-flash',
    "sttLocale" TEXT NOT NULL DEFAULT 'en-US',
    "sttEncoding" TEXT NOT NULL DEFAULT 'webm',
    "sendPartials" BOOLEAN NOT NULL DEFAULT false,
    "ttsProvider" TEXT NOT NULL DEFAULT 'elevenlabs',
    "ttsVoiceId" TEXT,
    "ttsModel" TEXT NOT NULL DEFAULT 'eleven_flash_v2',
    "ttsStreamPlayback" BOOLEAN NOT NULL DEFAULT true,
    "ttsAutoplay" BOOLEAN NOT NULL DEFAULT true,
    "ssmlEnabled" BOOLEAN NOT NULL DEFAULT true,
    "ssmlModel" TEXT NOT NULL DEFAULT 'gpt-4o-mini',
    "ssmlEnableProsody" BOOLEAN NOT NULL DEFAULT true,
    "ssmlEnableEmphasis" BOOLEAN NOT NULL DEFAULT true,
    "ssmlEnablePhonemes" BOOLEAN NOT NULL DEFAULT false,
    "ssmlFormality" TEXT NOT NULL DEFAULT 'neutral',
    "ssmlMaxBreaksPer100Words" INTEGER NOT NULL DEFAULT 3,
    "defaultMode" TEXT NOT NULL DEFAULT 'manual',
    "autoSendInAutoMode" BOOLEAN NOT NULL DEFAULT true,
    "pttKeybinding" TEXT NOT NULL DEFAULT 'Space',
    "keepConversationHistory" BOOLEAN NOT NULL DEFAULT true,
    "retentionDays" INTEGER NOT NULL DEFAULT 30,
    "loggingLevel" TEXT NOT NULL DEFAULT 'info',
    "metricsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "backendUrl" TEXT NOT NULL DEFAULT 'http://localhost:3000',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectContext" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "projectPath" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "claudeMdPath" TEXT,
    "settings" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectContext_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "projectPath" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'BACKLOG',
    "priority" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "archivedAt" DATETIME,
    "blockedReason" TEXT,
    "assignee" TEXT,
    "metadata" TEXT
);

-- CreateIndex
CREATE INDEX "Conversation_createdAt_idx" ON "Conversation"("createdAt");

-- CreateIndex
CREATE INDEX "Message_conversationId_timestamp_idx" ON "Message"("conversationId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_conversationId_key" ON "ApiKey"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceConfig_conversationId_key" ON "VoiceConfig"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContext_conversationId_key" ON "ProjectContext"("conversationId");

-- CreateIndex
CREATE INDEX "ProjectContext_projectPath_idx" ON "ProjectContext"("projectPath");

-- CreateIndex
CREATE INDEX "Todo_conversationId_status_idx" ON "Todo"("conversationId", "status");

-- CreateIndex
CREATE INDEX "Todo_projectPath_status_idx" ON "Todo"("projectPath", "status");
