import { useState, useCallback, useRef } from "react";
import { Layout } from "./components/Layout";
import { ConversationList } from "./components/ConversationList";
import { ChatView } from "./components/ChatView";
import { AudioControls } from "./components/AudioControls";
import { Settings } from "./components/Settings";
import { useAudioCapture } from "./hooks/useAudioCapture";
import { AudioEncoder } from "./services/audioEncoder";
import type { Conversation, Message, ApiKeys } from "@stt-mcp/shared";

function App() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<"auto" | "manual" | "ptt">("manual");
  const [hasTranscript, setHasTranscript] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [vadThreshold, setVadThreshold] = useState(0.5);

  const [currentTranscript, setCurrentTranscript] = useState("");

  // Audio capture callbacks
  const handleTranscript = useCallback((transcript: string) => {
    console.log("Transcript received:", transcript);
    setCurrentTranscript(transcript);
    setHasTranscript(true);
  }, []);

  const handleSpeechStart = useCallback(() => {
    console.log("Speech started");
    setCurrentTranscript("");
  }, []);

  const handleSpeechEnd = useCallback(() => {
    console.log("Speech ended");
  }, []);

  // Audio capture hook
  const {
    isRecording,
    isSpeaking,
    error: audioError,
    startListening,
    stopListening,
    startRecording,
    stopRecording,
    startPTT,
    stopPTT,
  } = useAudioCapture({
    mode,
    vadThreshold,
    onTranscript: handleTranscript,
    onSpeechStart: handleSpeechStart,
    onSpeechEnd: handleSpeechEnd,
  });

  // Handlers
  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      name: `Conversation ${conversations.length + 1}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 0,
    };
    setConversations([newConv, ...conversations]);
    setActiveConversationId(newConv.id);
    setMessages([]);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    // TODO: Load messages for this conversation from backend
    setMessages([]);
  };

  const handleStartRecording = () => {
    if (mode === "auto") {
      startListening();
    } else if (mode === "manual") {
      startRecording();
    } else if (mode === "ptt") {
      startPTT();
    }
  };

  const handleStopRecording = () => {
    if (mode === "auto") {
      stopListening();
    } else if (mode === "manual") {
      stopRecording();
    } else if (mode === "ptt") {
      stopPTT();
    }
  };

  const handleSend = async () => {
    if (!currentTranscript || !activeConversationId) {
      return;
    }

    // TODO: Send message to backend via platform service
    console.log("Sending message:", currentTranscript);

    // Add user message to chat
    const userMessage: Message = {
      id: crypto.randomUUID(),
      conversationId: activeConversationId,
      role: "user",
      content: currentTranscript,
      timestamp: Date.now(),
    };

    setMessages([...messages, userMessage]);
    setCurrentTranscript("");
    setHasTranscript(false);
  };

  const handleCancel = () => {
    setCurrentTranscript("");
    setHasTranscript(false);
  };

  const handlePlayAudio = (audioUrl: string) => {
    // TODO: Play audio
    console.log("Playing audio:", audioUrl);
  };

  const handleSaveApiKeys = (keys: ApiKeys) => {
    setApiKeys(keys);
    // TODO: Send keys to backend for current conversation
  };

  const handleSaveVadThreshold = (threshold: number) => {
    setVadThreshold(threshold);
    // TODO: Save to settings
  };

  return (
    <>
      <Layout
        sidebar={
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={handleSelectConversation}
            onNew={handleNewConversation}
          />
        }
        main={<ChatView messages={messages} onPlayAudio={handlePlayAudio} />}
        controls={
          <AudioControls
            mode={mode}
            onModeChange={setMode}
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onSend={handleSend}
            onCancel={handleCancel}
            hasTranscript={hasTranscript}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        }
      />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKeys={apiKeys}
        onSaveApiKeys={handleSaveApiKeys}
        vadThreshold={vadThreshold}
        onSaveVadThreshold={handleSaveVadThreshold}
      />
    </>
  );
}

export default App;
