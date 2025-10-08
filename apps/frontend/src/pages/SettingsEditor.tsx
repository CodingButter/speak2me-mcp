import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Label,
  Button,
  Badge,
  Slider,
  Switch,
  Select,
} from "@s2m-pac/ui";
import { AlertCircle, Key, Bot, Volume2, Shield, Save, Eye, EyeOff } from "lucide-react";
import { ClaudeConfig } from "../components/ClaudeConfig";
import { useApp } from "../contexts/AppContext";
import { settingsApi, voicesApi, type Voice } from "../lib/api-client";
import type { Settings } from "@s2m-pac/shared";

interface SettingsEditorProps {
  level: "global" | "project" | "conversation";
}

export function SettingsEditor({ level }: SettingsEditorProps) {
  const { activeConversationId, apiKeys, setApiKeys, saveApiKeys, conversations } = useApp();
  const { projectId, conversationId } = useParams<{ projectId?: string; conversationId?: string }>();
  const navigate = useNavigate();
  const [showKeys, setShowKeys] = useState({
    openai: false,
    elevenlabs: false,
    gemini: false,
    anthropic: false,
  });

  // Track which keys have been modified (not masked from backend)
  const [modifiedKeys, setModifiedKeys] = useState({
    openai: false,
    elevenlabs: false,
    gemini: false,
    anthropic: false,
  });

  // Check if a key is masked (from backend)
  const isMaskedKey = (key: string | undefined): boolean => {
    return !!key && key.includes('***');
  };

  // Track new key values separately from displayed masked values
  const [newKeys, setNewKeys] = useState<Partial<ApiKeys>>({});

  // When user types in a field, store the new value
  const handleKeyChange = (keyName: 'openai' | 'elevenlabs' | 'gemini' | 'anthropic', value: string) => {
    setNewKeys({ ...newKeys, [keyName]: value || undefined });
    setModifiedKeys({ ...modifiedKeys, [keyName]: true });
  };

  // Reset modified flags and new keys when API keys change from backend
  useEffect(() => {
    setModifiedKeys({
      openai: false,
      elevenlabs: false,
      gemini: false,
      anthropic: false,
    });
    setNewKeys({});
  }, [activeConversationId, apiKeys.openai, apiKeys.elevenlabs, apiKeys.gemini, apiKeys.anthropic]);

  // Voice settings state
  const [voiceSettings, setVoiceSettings] = useState({
    // TTS
    ttsVoiceId: "",
    ttsModel: "eleven_flash_v2",
    ttsStability: 0.5,
    ttsSimilarity: 0.75,
    ttsStyleExaggeration: 0,
    ttsSpeakerBoost: true,
    // STT
    vadThreshold: 0.5,
    minSilenceMs: 500,
    maxUtteranceMs: 15000,
    // SSML
    ssmlEnabled: true,
    ssmlEnableProsody: true,
    ssmlEnableEmphasis: true,
  });

  // Load settings from backend (per-conversation if available, otherwise global)
  const { data: loadedSettings } = useQuery<Partial<Settings>>({
    queryKey: ["settings", activeConversationId],
    queryFn: () =>
      activeConversationId
        ? settingsApi.get(activeConversationId)
        : settingsApi.getGlobal(),
  });

  // Load available voices from ElevenLabs
  const { data: voices = [] } = useQuery<Voice[]>({
    queryKey: ["voices", activeConversationId],
    queryFn: () => activeConversationId ? voicesApi.getVoices(activeConversationId) : Promise.resolve([]),
    enabled: !!activeConversationId,
  });

  // Update local state when settings are loaded
  useEffect(() => {
    if (loadedSettings) {
      setVoiceSettings((prev) => ({
        ...prev,
        ttsVoiceId: loadedSettings.ttsVoiceId || "",
        ttsModel: loadedSettings.ttsModel || "eleven_flash_v2",
        ttsStability: loadedSettings.ttsStability ?? 0.5,
        ttsSimilarity: loadedSettings.ttsSimilarity ?? 0.75,
        ttsStyleExaggeration: loadedSettings.ttsStyleExaggeration ?? 0,
        ttsSpeakerBoost: loadedSettings.ttsSpeakerBoost ?? true,
        vadThreshold: loadedSettings.vadThreshold ?? 0.5,
        minSilenceMs: loadedSettings.minSilenceMs ?? 500,
        maxUtteranceMs: loadedSettings.maxUtteranceMs ?? 15000,
        ssmlEnabled: loadedSettings.ssmlEnabled ?? true,
        ssmlEnableProsody: loadedSettings.ssmlEnableProsody ?? true,
        ssmlEnableEmphasis: loadedSettings.ssmlEnableEmphasis ?? true,
      }));
    }
  }, [loadedSettings]);

  // Save settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: () => {
      // Save to conversation-specific settings if conversation is active, otherwise global
      return activeConversationId
        ? settingsApi.update(activeConversationId, voiceSettings)
        : settingsApi.updateGlobal(voiceSettings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", activeConversationId] });
    },
  });

  const handleSaveSettings = async () => {
    await saveSettingsMutation.mutateAsync();
  };

  if (!activeConversationId) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Conversation Selected</CardTitle>
            <CardDescription>
              Please select a conversation to configure settings
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure API keys, Claude behavior, and system preferences
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="claude" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Claude
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Configure API keys for various services. Keys are stored per conversation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium mb-1">Security Notice</p>
                    <p>Your API keys are encrypted and stored securely. They are never shared with other conversations.</p>
                  </div>
                </div>
              </div>

              {/* OpenAI Key */}
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="relative">
                  <Input
                    id="openai-key"
                    type={isMaskedKey(apiKeys.openai) && !modifiedKeys.openai ? "text" : (showKeys.openai ? "text" : "password")}
                    placeholder="sk-..."
                    value={modifiedKeys.openai ? (newKeys.openai || "") : (apiKeys.openai || "")}
                    onChange={(e) => handleKeyChange('openai', e.target.value)}
                  />
                  {modifiedKeys.openai && !isMaskedKey(apiKeys.openai) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => setShowKeys({ ...showKeys, openai: !showKeys.openai })}
                    >
                      {showKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Used for SSML enhancement</p>
              </div>

              {/* ElevenLabs Key */}
              <div className="space-y-2">
                <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                <div className="relative">
                  <Input
                    id="elevenlabs-key"
                    type={isMaskedKey(apiKeys.elevenlabs) && !modifiedKeys.elevenlabs ? "text" : (showKeys.elevenlabs ? "text" : "password")}
                    placeholder="..."
                    value={modifiedKeys.elevenlabs ? (newKeys.elevenlabs || "") : (apiKeys.elevenlabs || "")}
                    onChange={(e) => handleKeyChange('elevenlabs', e.target.value)}
                  />
                  {modifiedKeys.elevenlabs && !isMaskedKey(apiKeys.elevenlabs) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => setShowKeys({ ...showKeys, elevenlabs: !showKeys.elevenlabs })}
                    >
                      {showKeys.elevenlabs ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Used for text-to-speech</p>
              </div>

              {/* Gemini Key */}
              <div className="space-y-2">
                <Label htmlFor="gemini-key">Gemini API Key</Label>
                <div className="relative">
                  <Input
                    id="gemini-key"
                    type={isMaskedKey(apiKeys.gemini) && !modifiedKeys.gemini ? "text" : (showKeys.gemini ? "text" : "password")}
                    placeholder="..."
                    value={modifiedKeys.gemini ? (newKeys.gemini || "") : (apiKeys.gemini || "")}
                    onChange={(e) => handleKeyChange('gemini', e.target.value)}
                  />
                  {modifiedKeys.gemini && !isMaskedKey(apiKeys.gemini) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => setShowKeys({ ...showKeys, gemini: !showKeys.gemini })}
                    >
                      {showKeys.gemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Used for speech-to-text</p>
              </div>

              {/* Anthropic Key */}
              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <div className="relative">
                  <Input
                    id="anthropic-key"
                    type={isMaskedKey(apiKeys.anthropic) && !modifiedKeys.anthropic ? "text" : (showKeys.anthropic ? "text" : "password")}
                    placeholder="sk-ant-..."
                    value={modifiedKeys.anthropic ? (newKeys.anthropic || "") : (apiKeys.anthropic || "")}
                    onChange={(e) => handleKeyChange('anthropic', e.target.value)}
                  />
                  {modifiedKeys.anthropic && !isMaskedKey(apiKeys.anthropic) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => setShowKeys({ ...showKeys, anthropic: !showKeys.anthropic })}
                    >
                      {showKeys.anthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Used for Claude Agent queries</p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => {
                  // Merge: keep existing masked keys, only send new keys that were modified
                  const keysToSave = {
                    ...apiKeys,
                    ...newKeys
                  };
                  saveApiKeys(keysToSave);
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claude Configuration Tab */}
        <TabsContent value="claude" className="space-y-4">
          <ClaudeConfig conversationId={activeConversationId} />
        </TabsContent>

        {/* Voice Settings Tab */}
        <TabsContent value="voice" className="space-y-4">
          {/* TTS Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Text-to-Speech (TTS)</CardTitle>
              <CardDescription>
                Configure how Claude's responses are spoken
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tts-voice">Voice</Label>
                  <select
                    id="tts-voice"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    value={voiceSettings.ttsVoiceId}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, ttsVoiceId: e.target.value })}
                  >
                    <option value="">Default Voice</option>
                    {voices.length === 0 ? (
                      <option disabled>Configure ElevenLabs API key to load voices</option>
                    ) : (
                      voices.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name} ({voice.category})
                        </option>
                      ))
                    )}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Select a voice for text-to-speech
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tts-model">TTS Model</Label>
                  <select
                    id="tts-model"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    value={voiceSettings.ttsModel}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, ttsModel: e.target.value })}
                  >
                    <option value="eleven_flash_v2">Flash V2 (Fast)</option>
                    <option value="eleven_turbo_v2">Turbo V2 (Fastest)</option>
                    <option value="eleven_multilingual_v2">Multilingual V2</option>
                  </select>
                </div>
              </div>

              {/* Voice Settings Sliders */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Stability</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.ttsStability.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[voiceSettings.ttsStability * 100]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setVoiceSettings({ ...voiceSettings, ttsStability: val[0] / 100 })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values make output more consistent
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Similarity</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.ttsSimilarity.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[voiceSettings.ttsSimilarity * 100]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setVoiceSettings({ ...voiceSettings, ttsSimilarity: val[0] / 100 })}
                  />
                  <p className="text-xs text-muted-foreground">
                    How closely to match the original voice
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Style Exaggeration</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.ttsStyleExaggeration.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[voiceSettings.ttsStyleExaggeration * 100]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setVoiceSettings({ ...voiceSettings, ttsStyleExaggeration: val[0] / 100 })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Amplifies the style of the voice (0 recommended for most cases)
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Speaker Boost</Label>
                    <p className="text-xs text-muted-foreground">
                      Enhance voice clarity and reduce background noise
                    </p>
                  </div>
                  <Switch
                    checked={voiceSettings.ttsSpeakerBoost}
                    onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, ttsSpeakerBoost: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* STT Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Speech-to-Text (STT)</CardTitle>
              <CardDescription>
                Configure voice input recognition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>VAD Threshold</Label>
                  <span className="text-sm text-muted-foreground">{voiceSettings.vadThreshold.toFixed(2)}</span>
                </div>
                <Slider
                  value={[voiceSettings.vadThreshold * 100]}
                  max={100}
                  step={5}
                  onValueChange={(val) => setVoiceSettings({ ...voiceSettings, vadThreshold: val[0] / 100 })}
                />
                <p className="text-xs text-muted-foreground">
                  Voice activity detection sensitivity (higher = more sensitive)
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Min Silence Duration</Label>
                  <span className="text-sm text-muted-foreground">{voiceSettings.minSilenceMs}ms</span>
                </div>
                <Slider
                  value={[voiceSettings.minSilenceMs]}
                  min={100}
                  max={2000}
                  step={100}
                  onValueChange={(val) => setVoiceSettings({ ...voiceSettings, minSilenceMs: val[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Silence duration before speech ends
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Max Utterance Length</Label>
                  <span className="text-sm text-muted-foreground">{(voiceSettings.maxUtteranceMs / 1000).toFixed(0)}s</span>
                </div>
                <Slider
                  value={[voiceSettings.maxUtteranceMs]}
                  min={5000}
                  max={30000}
                  step={1000}
                  onValueChange={(val) => setVoiceSettings({ ...voiceSettings, maxUtteranceMs: val[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum length of a single speech segment
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SSML Enhancement */}
          <Card>
            <CardHeader>
              <CardTitle>SSML Enhancement</CardTitle>
              <CardDescription>
                Enhance speech with prosody and emphasis using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable SSML Enhancement</Label>
                  <p className="text-xs text-muted-foreground">
                    Uses OpenAI to add natural speech patterns
                  </p>
                </div>
                <Switch
                  checked={voiceSettings.ssmlEnabled}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, ssmlEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Prosody Control</Label>
                  <p className="text-xs text-muted-foreground">
                    Adjust pitch, rate, and volume dynamically
                  </p>
                </div>
                <Switch
                  checked={voiceSettings.ssmlEnableProsody}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, ssmlEnableProsody: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Emphasis</Label>
                  <p className="text-xs text-muted-foreground">
                    Add stress to important words
                  </p>
                </div>
                <Switch
                  checked={voiceSettings.ssmlEnableEmphasis}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, ssmlEnableEmphasis: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              disabled={saveSettingsMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {saveSettingsMutation.isPending ? "Saving..." : "Save Voice Settings"}
            </Button>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>
                Manage your data retention and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data Storage</Label>
                <p className="text-sm text-muted-foreground">
                  All conversation data is stored locally on your device.
                  API keys are encrypted and never transmitted to third parties.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Conversation History</Label>
                <p className="text-sm text-muted-foreground">
                  Messages and audio files are retained for 30 days by default.
                  You can delete conversations at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}