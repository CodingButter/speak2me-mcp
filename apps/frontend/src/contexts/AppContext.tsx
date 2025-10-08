import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationsApi, messagesApi, keysApi } from "../lib/api-client";
import type { Conversation, Message, ApiKeys } from "@s2m-pac/shared";
import type { AudioMode } from "@s2m-pac/ui";

interface AppState {
  // Projects
  projectId?: string;

  // Conversations
  conversations: Conversation[];
  activeConversationId?: string;
  isLoadingConversations: boolean;

  // Messages
  messages: Message[];
  isLoadingMessages: boolean;

  // Audio
  mode: AudioMode;
  isRecording: boolean;
  isSpeaking: boolean;
  volumeLevel: number;
  currentTranscript: string;
  hasTranscript: boolean;
  vadThreshold: number;

  // API Keys
  apiKeys: ApiKeys;

  // UI State
  settingsOpen: boolean;
}

interface AppActions {
  // Projects
  setProjectId: (id: string | undefined) => void;

  // Conversations
  setActiveConversationId: (id: string | undefined) => void;
  createConversation: (name: string, projectId?: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;

  // Messages
  sendMessage: (content: string) => Promise<void>;

  // Audio
  setMode: (mode: AudioMode) => void;
  setIsRecording: (isRecording: boolean) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
  setVolumeLevel: (level: number) => void;
  setCurrentTranscript: (transcript: string) => void;
  setHasTranscript: (has: boolean) => void;
  setVadThreshold: (threshold: number) => void;

  // API Keys
  setApiKeys: (keys: ApiKeys) => void;
  saveApiKeys: () => Promise<void>;

  // UI
  setSettingsOpen: (open: boolean) => void;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // State
  const [projectId, setProjectId] = useState<string>();
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const [mode, setMode] = useState<AudioMode>("manual");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [hasTranscript, setHasTranscript] = useState(false);
  const [vadThreshold, setVadThreshold] = useState(0.5);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Queries
  const { data: conversations = [], isLoading: isLoadingConversations } = useQuery({
    queryKey: ["conversations", projectId],
    queryFn: () => projectId ? conversationsApi.getByProject(projectId) : conversationsApi.getAll(),
    enabled: !!projectId || true,
  });

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: () =>
      activeConversationId
        ? messagesApi.getByConversationId(activeConversationId)
        : Promise.resolve([]),
    enabled: !!activeConversationId,
  });

  // Load API keys for active conversation
  const { data: loadedKeys } = useQuery({
    queryKey: ["apiKeys", activeConversationId],
    queryFn: () =>
      activeConversationId
        ? keysApi.get(activeConversationId)
        : Promise.resolve({}),
    enabled: !!activeConversationId,
  });

  // Sync loaded keys to local state
  useEffect(() => {
    if (loadedKeys) {
      setApiKeys(loadedKeys);
    }
  }, [loadedKeys]);

  // Mutations
  const createConversationMutation = useMutation({
    mutationFn: ({ name, projectId }: { name: string; projectId?: string }) =>
      conversationsApi.create(name, projectId),
    onSuccess: (newConv) => {
      queryClient.invalidateQueries({ queryKey: ["conversations", projectId] });
      setActiveConversationId(newConv.id);
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: conversationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", projectId] });
      if (conversations.length > 0) {
        setActiveConversationId(conversations[0]?.id);
      } else {
        setActiveConversationId(undefined);
      }
    },
  });

  const createMessageMutation = useMutation({
    mutationFn: messagesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", activeConversationId] });
      setCurrentTranscript("");
      setHasTranscript(false);
    },
  });

  const saveKeysMutation = useMutation({
    mutationFn: (keysToSave: ApiKeys) => {
      if (!activeConversationId) {
        throw new Error("No active conversation");
      }
      return keysApi.update(activeConversationId, keysToSave);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys", activeConversationId] });
    },
  });

  // Actions
  const createConversation = async (name: string, projectIdParam?: string) => {
    const targetProjectId = projectIdParam || projectId;
    await createConversationMutation.mutateAsync({ name, projectId: targetProjectId });
  };

  const deleteConversation = async (id: string) => {
    await deleteConversationMutation.mutateAsync(id);
  };

  const sendMessage = async (content: string) => {
    if (!activeConversationId || !content.trim()) {
      return;
    }

    await createMessageMutation.mutateAsync({
      conversationId: activeConversationId,
      role: "user",
      content: content.trim(),
    });
  };

  const saveApiKeys = async (keysToSave?: ApiKeys) => {
    await saveKeysMutation.mutateAsync(keysToSave || apiKeys);
  };

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  const value: AppContextType = {
    // State
    projectId,
    conversations,
    activeConversationId,
    isLoadingConversations,
    messages,
    isLoadingMessages,
    mode,
    isRecording,
    isSpeaking,
    volumeLevel,
    currentTranscript,
    hasTranscript,
    vadThreshold,
    apiKeys,
    settingsOpen,

    // Actions
    setProjectId,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
    setMode,
    setIsRecording,
    setIsSpeaking,
    setVolumeLevel,
    setCurrentTranscript,
    setHasTranscript,
    setVadThreshold,
    setApiKeys,
    saveApiKeys,
    setSettingsOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
