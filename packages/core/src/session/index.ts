import type { ApiKeys, SessionInfo } from "@stt-mcp/shared";

/**
 * Session Manager
 * Tracks MCP connections and their associated API keys
 */

export class SessionManager {
  private sessions = new Map<string, SessionInfo>();

  createSession(conversationId: string, apiKeys?: ApiKeys): SessionInfo {
    const session: SessionInfo = {
      id: crypto.randomUUID(),
      conversationId,
      connectedAt: Date.now(),
      lastActivityAt: Date.now(),
      apiKeys,
    };

    this.sessions.set(session.id, session);
    return session;
  }

  getSession(sessionId: string): SessionInfo | undefined {
    return this.sessions.get(sessionId);
  }

  getSessionByConversationId(conversationId: string): SessionInfo | undefined {
    return Array.from(this.sessions.values()).find(
      (s) => s.conversationId === conversationId
    );
  }

  updateSessionApiKeys(sessionId: string, apiKeys: ApiKeys): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.apiKeys = apiKeys;
      session.lastActivityAt = Date.now();
    }
  }

  updateSessionActivity(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastActivityAt = Date.now();
    }
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  getAllSessions(): SessionInfo[] {
    return Array.from(this.sessions.values());
  }
}
