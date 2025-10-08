-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClaudeConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "systemPromptTemplate" TEXT DEFAULT 'You are Claude, a helpful AI assistant with voice capabilities. When responding, ALWAYS use SSML (Speech Synthesis Markup Language) tags to enhance the expressiveness and naturalness of your speech output. Use tags like <break>, <emphasis>, <prosody>, and <say-as> to make your responses more engaging and human-like. {{voiceDirectives}}',
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
INSERT INTO "new_ClaudeConfig" ("allowedTools", "conversationId", "createdAt", "customInstructions", "disallowedTools", "id", "maxTurns", "mcpServers", "model", "permissionMode", "systemPromptTemplate", "templateVars", "updatedAt", "voiceDirectives", "voiceEnabled") SELECT "allowedTools", "conversationId", "createdAt", "customInstructions", "disallowedTools", "id", "maxTurns", "mcpServers", "model", "permissionMode", "systemPromptTemplate", "templateVars", "updatedAt", "voiceDirectives", "voiceEnabled" FROM "ClaudeConfig";
DROP TABLE "ClaudeConfig";
ALTER TABLE "new_ClaudeConfig" RENAME TO "ClaudeConfig";
CREATE UNIQUE INDEX "ClaudeConfig_conversationId_key" ON "ClaudeConfig"("conversationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
