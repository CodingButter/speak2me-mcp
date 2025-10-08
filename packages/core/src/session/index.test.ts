import { describe, test, expect, beforeEach } from "bun:test";
import { SessionManager } from "./index";
import type { ApiKeys } from "@s2m-pac/shared";

describe("SessionManager", () => {
  let sessionManager: SessionManager;

  beforeEach(() => {
    sessionManager = new SessionManager();
  });

  describe("createSession", () => {
    test("creates session with conversation ID", () => {
      const session = sessionManager.createSession("conv-123");
      expect(session.id).toBeTruthy();
      expect(session.conversationId).toBe("conv-123");
      expect(session.connectedAt).toBeGreaterThan(0);
      expect(session.lastActivityAt).toBeGreaterThan(0);
    });

    test("creates session with API keys", () => {
      const apiKeys: ApiKeys = {
        openai: "sk-test",
        elevenlabs: "el-test",
        gemini: "gem-test",
      };
      const session = sessionManager.createSession("conv-123", apiKeys);
      expect(session.apiKeys).toEqual(apiKeys);
    });

    test("generates unique session IDs", () => {
      const session1 = sessionManager.createSession("conv-123");
      const session2 = sessionManager.createSession("conv-123");
      expect(session1.id).not.toBe(session2.id);
    });
  });

  describe("getSession", () => {
    test("retrieves existing session", () => {
      const created = sessionManager.createSession("conv-123");
      const retrieved = sessionManager.getSession(created.id);
      expect(retrieved).toEqual(created);
    });

    test("returns undefined for non-existent session", () => {
      const retrieved = sessionManager.getSession("non-existent");
      expect(retrieved).toBeUndefined();
    });
  });

  describe("getSessionByConversationId", () => {
    test("retrieves session by conversation ID", () => {
      const session = sessionManager.createSession("conv-123");
      const retrieved = sessionManager.getSessionByConversationId("conv-123");
      expect(retrieved).toEqual(session);
    });

    test("returns undefined for non-existent conversation", () => {
      const retrieved = sessionManager.getSessionByConversationId("non-existent");
      expect(retrieved).toBeUndefined();
    });

    test("returns first session for conversation with multiple sessions", () => {
      const session1 = sessionManager.createSession("conv-123");
      sessionManager.createSession("conv-123");
      const retrieved = sessionManager.getSessionByConversationId("conv-123");
      expect(retrieved?.id).toBe(session1.id);
    });
  });

  describe("updateSessionApiKeys", () => {
    test("updates API keys for existing session", () => {
      const session = sessionManager.createSession("conv-123");
      const initialActivity = session.lastActivityAt;

      // Wait a bit to ensure timestamp changes
      const newKeys: ApiKeys = { openai: "sk-new" };
      sessionManager.updateSessionApiKeys(session.id, newKeys);

      const updated = sessionManager.getSession(session.id);
      expect(updated?.apiKeys).toEqual(newKeys);
      expect(updated?.lastActivityAt).toBeGreaterThanOrEqual(initialActivity);
    });

    test("does nothing for non-existent session", () => {
      expect(() =>
        sessionManager.updateSessionApiKeys("non-existent", { openai: "sk-test" })
      ).not.toThrow();
    });
  });

  describe("updateSessionActivity", () => {
    test("updates lastActivityAt timestamp", () => {
      const session = sessionManager.createSession("conv-123");
      const initialActivity = session.lastActivityAt;

      // Wait a tiny bit
      setTimeout(() => {}, 1);
      sessionManager.updateSessionActivity(session.id);

      const updated = sessionManager.getSession(session.id);
      expect(updated?.lastActivityAt).toBeGreaterThanOrEqual(initialActivity);
    });

    test("does nothing for non-existent session", () => {
      expect(() => sessionManager.updateSessionActivity("non-existent")).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    test("deletes existing session", () => {
      const session = sessionManager.createSession("conv-123");
      sessionManager.deleteSession(session.id);
      const retrieved = sessionManager.getSession(session.id);
      expect(retrieved).toBeUndefined();
    });

    test("does nothing for non-existent session", () => {
      expect(() => sessionManager.deleteSession("non-existent")).not.toThrow();
    });
  });

  describe("getAllSessions", () => {
    test("returns empty array when no sessions", () => {
      const sessions = sessionManager.getAllSessions();
      expect(sessions).toEqual([]);
    });

    test("returns all sessions", () => {
      const session1 = sessionManager.createSession("conv-1");
      const session2 = sessionManager.createSession("conv-2");
      const session3 = sessionManager.createSession("conv-3");

      const sessions = sessionManager.getAllSessions();
      expect(sessions).toHaveLength(3);
      expect(sessions).toContainEqual(session1);
      expect(sessions).toContainEqual(session2);
      expect(sessions).toContainEqual(session3);
    });

    test("returns sessions from multiple conversations", () => {
      sessionManager.createSession("conv-1");
      sessionManager.createSession("conv-1");
      sessionManager.createSession("conv-2");

      const sessions = sessionManager.getAllSessions();
      expect(sessions).toHaveLength(3);
    });
  });
});
