import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { useAudioCapture } from "../hooks/useAudioCapture";
import { MainLayout, TopBar, Sidebar, BottomBar, UploadedFile } from "@s2m-pac/ui";
import { systemMetricsApi } from "../lib/api-client";

interface RootLayoutProps {
  projectId?: string;
  projectName?: string;
  children?: React.ReactNode;
}

export function RootLayout({ projectId, projectName, children }: RootLayoutProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const {
    // State
    conversations,
    activeConversationId,
    mode,
    isRecording,
    isSpeaking,
    volumeLevel,
    currentTranscript,
    hasTranscript,
    vadThreshold,

    // Actions
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
  } = useApp();

  // Audio capture hook
  // Fetch system metrics with auto-refresh every 2 seconds
  const { data: metrics } = useQuery({
    queryKey: ["system-metrics"],
    queryFn: () => systemMetricsApi.get(),
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const { start, stop } = useAudioCapture({
    mode,
    vadThreshold,
    onTranscript: (transcript, _processedAudio) => {
      setCurrentTranscript(transcript);
      setHasTranscript(true);

      // Auto-send in auto mode
      if (mode === "auto" && transcript.trim()) {
        sendMessage(transcript);
      }
    },
    onSpeechStart: () => {
      setCurrentTranscript("");
      setIsSpeaking(true);
    },
    onSpeechEnd: () => {
      setIsSpeaking(false);
    },
    onVolumeChange: (level) => {
      setVolumeLevel(level);
    },
  });

  // Handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stop();
  };

  const handleSend = () => {
    // Send either text message or transcript
    const messageToSend = textMessage.trim() || currentTranscript.trim();
    if (messageToSend) {
      sendMessage(messageToSend);
      setTextMessage("");
      setCurrentTranscript("");
      setHasTranscript(false);
      setFiles([]);
    }
  };

  const handleCancel = () => {
    setCurrentTranscript("");
    setHasTranscript(false);
    setTextMessage("");
  };

  const handleFilesAdded = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleFileRemoved = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleNewConversation = () => {
    const name = `Conversation ${conversations.length + 1}`;
    createConversation(name);
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleConversationClick = (conversationId: string) => {
    setActiveConversationId(conversationId);
    const chatPath = projectId
      ? `/project/${projectId}/chat/${conversationId}`
      : `/chat/${conversationId}`;
    navigate(chatPath);
  };

  return (
    <MainLayout
      topBar={
        <TopBar
          projectName={projectName || "Speak2Me"}
          status={isRecording ? "listening" : isSpeaking ? "speaking" : "idle"}
          cpuUsage={metrics?.cpu.usage || 0}
          memoryUsage={metrics?.memory.usagePercent || 0}
          diskUsage={metrics?.disk.usagePercent || 0}
          gpuUsage={metrics?.gpu?.usage}
          onSettingsClick={() => navigate(projectId ? `/project/${projectId}/settings` : "/settings")}
        />
      }
      sidebar={
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationClick={handleConversationClick}
          onNewConversation={handleNewConversation}
          onDeleteConversation={deleteConversation}
          onConversationSettings={(id) =>
            navigate(
              projectId
                ? `/project/${projectId}/settings/conversation/${id}`
                : `/settings/conversation/${id}`
            )
          }
          mobileOpen={mobileMenuOpen}
          onMobileToggle={handleMenuToggle}
          projectId={projectId}
        />
      }
      bottomBar={
        <BottomBar
          mode={mode}
          isRecording={isRecording}
          isSpeaking={isSpeaking}
          volumeLevel={volumeLevel}
          hasTranscript={hasTranscript}
          currentTranscript={currentTranscript}
          textMessage={textMessage}
          files={files}
          onModeChange={setMode}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onTextMessageChange={setTextMessage}
          onFilesAdded={handleFilesAdded}
          onFileRemoved={handleFileRemoved}
          onSend={handleSend}
          onCancel={handleCancel}
        />
      }
    >
      {children || <Outlet />}
    </MainLayout>
  );
}
