import { betterFetch } from "@better-fetch/fetch";
import type { Conversation, Message, ApiKeys } from "@s2m-pac/shared";

// Backend API URL
// Bun inlines BUN_PUBLIC_* env vars when bundling (configured in bunfig.toml)
// In dev mode, process.env doesn't exist in browser, so we fall back to localhost
const API_BASE_URL = (typeof process !== "undefined" && process.env?.BUN_PUBLIC_BACKEND_URL) || "http://localhost:3001";

// Projects API
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await betterFetch<Project[]>(
      `${API_BASE_URL}/api/projects`
    );
    if (error) throw new Error("Failed to fetch projects");
    return data || [];
  },

  async getById(id: string): Promise<Project> {
    const { data, error } = await betterFetch<Project>(
      `${API_BASE_URL}/api/projects/${id}`
    );
    if (error) throw new Error("Failed to fetch project");
    return data!;
  },

  async create(name: string, description?: string): Promise<Project> {
    const { data, error } = await betterFetch<Project>(
      `${API_BASE_URL}/api/projects`,
      {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) {
      console.error("Failed to create project:", error);
      throw new Error("Failed to create project");
    }
    return data!;
  },

  async update(id: string, updates: { name?: string; description?: string }): Promise<Project> {
    const { data, error } = await betterFetch<Project>(
      `${API_BASE_URL}/api/projects/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updates),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) {
      console.error("Failed to update project:", error);
      throw new Error("Failed to update project");
    }
    return data!;
  },

  async delete(id: string): Promise<void> {
    const { error } = await betterFetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
    });
    if (error) throw new Error("Failed to delete project");
  },
};

// Conversations API
export const conversationsApi = {
  async getAll(): Promise<Conversation[]> {
    const { data, error } = await betterFetch<Conversation[]>(
      `${API_BASE_URL}/api/conversations`
    );
    if (error) throw new Error("Failed to fetch conversations");
    return data || [];
  },

  async getByProject(projectId: string): Promise<Conversation[]> {
    const { data, error } = await betterFetch<Conversation[]>(
      `${API_BASE_URL}/api/conversations?projectId=${projectId}`
    );
    if (error) throw new Error("Failed to fetch conversations");
    return data || [];
  },

  async getById(id: string): Promise<Conversation> {
    const { data, error } = await betterFetch<Conversation>(
      `${API_BASE_URL}/api/conversations/${id}`
    );
    if (error) throw new Error("Failed to fetch conversation");
    return data!;
  },

  async create(name: string, projectId?: string): Promise<Conversation> {
    const { data, error } = await betterFetch<Conversation>(
      `${API_BASE_URL}/api/conversations`,
      {
        method: "POST",
        body: JSON.stringify({ name, projectId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) {
      console.error("Failed to create conversation:", error);
      throw new Error("Failed to create conversation");
    }
    return data!;
  },

  async delete(id: string): Promise<void> {
    const { error } = await betterFetch(`${API_BASE_URL}/api/conversations/${id}`, {
      method: "DELETE",
    });
    if (error) throw new Error("Failed to delete conversation");
  },
};

// Messages API
export const messagesApi = {
  async getByConversationId(conversationId: string): Promise<Message[]> {
    const { data, error } = await betterFetch<Message[]>(
      `${API_BASE_URL}/api/conversations/${conversationId}/messages`
    );
    if (error) throw new Error("Failed to fetch messages");
    return data || [];
  },

  async create(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    const { data, error } = await betterFetch<Message>(
      `${API_BASE_URL}/api/messages`,
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) throw new Error("Failed to create message");
    return data!;
  },
};

// API Keys API
export const keysApi = {
  async get(conversationId: string): Promise<ApiKeys> {
    const { data, error } = await betterFetch<ApiKeys>(
      `${API_BASE_URL}/api/conversations/${conversationId}/keys`
    );
    if (error) throw new Error("Failed to fetch API keys");
    return data || {};
  },

  async update(conversationId: string, keys: ApiKeys): Promise<void> {
    const { error } = await betterFetch(
      `${API_BASE_URL}/api/conversations/${conversationId}/keys`,
      {
        method: "POST",
        body: JSON.stringify(keys),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) throw new Error("Failed to update API keys");
  },
};

// Settings API
export const settingsApi = {
  // Get global settings (used when no conversation selected)
  async getGlobal(): Promise<any> {
    const { data, error } = await betterFetch<any>(
      `${API_BASE_URL}/api/settings`
    );
    if (error) throw new Error("Failed to fetch settings");
    return data || {};
  },

  // Get conversation-specific settings (merged with global)
  async get(conversationId: string): Promise<any> {
    const { data, error } = await betterFetch<any>(
      `${API_BASE_URL}/api/conversations/${conversationId}/settings`
    );
    if (error) throw new Error("Failed to fetch settings");
    return data || {};
  },

  // Update global settings
  async updateGlobal(settings: any): Promise<void> {
    const { error } = await betterFetch(`${API_BASE_URL}/api/settings`, {
      method: "PATCH",
      body: JSON.stringify(settings),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (error) throw new Error("Failed to update settings");
  },

  // Update conversation-specific settings
  async update(conversationId: string, settings: any): Promise<void> {
    const { error } = await betterFetch(
      `${API_BASE_URL}/api/conversations/${conversationId}/settings`,
      {
        method: "PATCH",
        body: JSON.stringify(settings),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) throw new Error("Failed to update settings");
  },
};

// Health check
export const healthApi = {
  async check(): Promise<{ status: string; timestamp: number }> {
    const { data, error } = await betterFetch<{ status: string; timestamp: number }>(
      `${API_BASE_URL}/health`
    );
    if (error) throw new Error("Health check failed");
    return data!;
  },
};

// Voices API
export interface Voice {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export const voicesApi = {
  async getVoices(conversationId: string): Promise<Voice[]> {
    const { data, error } = await betterFetch<{ voices: Voice[]; error?: string }>(
      `${API_BASE_URL}/api/conversations/${conversationId}/voices`
    );
    if (error || data?.error) {
      console.error("Failed to fetch voices:", error || data?.error);
      return [];
    }
    return data?.voices || [];
  },
};

// System Metrics API
export interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    speed: number;
    temperature?: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usagePercent: number;
    swap?: {
      total: number;
      used: number;
      free: number;
    };
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usagePercent: number;
  };
  network: {
    upload: number;
    download: number;
  };
  gpu?: {
    name: string;
    usage: number;
    temperature: number;
    memory: {
      total: number;
      used: number;
      usagePercent: number;
    };
  };
}

export const systemMetricsApi = {
  async get(): Promise<SystemMetrics> {
    const { data, error } = await betterFetch<SystemMetrics>(
      `${API_BASE_URL}/api/system-metrics`
    );
    if (error) throw new Error("Failed to fetch system metrics");
    return data!;
  },
};

// Claude Config API
export const claudeConfigApi = {
  async get(conversationId: string): Promise<any> {
    const { data, error } = await betterFetch<any>(
      `${API_BASE_URL}/api/conversations/${conversationId}/claude-config`
    );
    if (error) throw new Error("Failed to fetch Claude config");
    return data;
  },

  async update(conversationId: string, config: any): Promise<void> {
    const { error } = await betterFetch(
      `${API_BASE_URL}/api/conversations/${conversationId}/claude-config`,
      {
        method: "POST",
        body: JSON.stringify(config),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) throw new Error("Failed to update Claude config");
  },

  async validateTemplate(conversationId: string, template: string, variables: Record<string, string>): Promise<any> {
    const { data, error } = await betterFetch<any>(
      `${API_BASE_URL}/api/conversations/${conversationId}/claude-config/validate-template`,
      {
        method: "POST",
        body: JSON.stringify({ template, variables }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (error) throw new Error("Failed to validate template");
    return data;
  },
};
