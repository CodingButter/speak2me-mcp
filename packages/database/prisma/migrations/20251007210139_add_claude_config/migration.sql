-- CreateTable
CREATE TABLE "ClaudeConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "systemPromptTemplate" TEXT DEFAULT 'You are Claude, a helpful AI assistant.',
    "voiceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "voiceDirectives" TEXT,
    "model" TEXT NOT NULL DEFAULT 'claude-sonnet-4-5-20250929',
    "maxTurns" INTEGER NOT NULL DEFAULT 10,
    "permissionMode" TEXT NOT NULL DEFAULT 'acceptEdits',
    "allowedTools" TEXT,
    "disallowedTools" TEXT,
    "mcpServers" TEXT,
    "customInstructions" TEXT,
    "templateVars" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClaudeConfig_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ClaudeConfig_conversationId_key" ON "ClaudeConfig"("conversationId");
