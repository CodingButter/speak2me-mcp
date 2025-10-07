import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { VolumeMeter } from "./VolumeMeter";
import type { ApiKeys } from "@stt-mcp/shared";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeys: ApiKeys;
  onSaveApiKeys: (keys: ApiKeys) => void;
  vadThreshold: number;
  onSaveVadThreshold: (threshold: number) => void;
}

/**
 * Settings Modal Component
 * Responsive: Full screen on xs/sm, modal on md+
 */
export function Settings({ isOpen, onClose, apiKeys, onSaveApiKeys, vadThreshold, onSaveVadThreshold }: SettingsProps) {
  const [keys, setKeys] = useState<ApiKeys>(apiKeys);
  const [showKeys, setShowKeys] = useState({
    openai: false,
    elevenlabs: false,
    gemini: false,
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKeys(keys);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-card rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold mb-3">API Keys</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Your keys are stored securely and sent to the server for this conversation only.
            </p>

            {/* OpenAI Key */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">OpenAI API Key</label>
              <div className="relative">
                <input
                  type={showKeys.openai ? "text" : "password"}
                  value={keys.openai || ""}
                  onChange={(e) => setKeys({ ...keys, openai: e.target.value || undefined })}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 pr-10 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowKeys({ ...showKeys, openai: !showKeys.openai })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
                >
                  {showKeys.openai ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Used for SSML enhancement</p>
            </div>

            {/* ElevenLabs Key */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">ElevenLabs API Key</label>
              <div className="relative">
                <input
                  type={showKeys.elevenlabs ? "text" : "password"}
                  value={keys.elevenlabs || ""}
                  onChange={(e) => setKeys({ ...keys, elevenlabs: e.target.value || undefined })}
                  placeholder="..."
                  className="w-full px-3 py-2 pr-10 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowKeys({ ...showKeys, elevenlabs: !showKeys.elevenlabs })
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
                >
                  {showKeys.elevenlabs ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Used for text-to-speech</p>
            </div>

            {/* Gemini Key */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Google Gemini API Key</label>
              <div className="relative">
                <input
                  type={showKeys.gemini ? "text" : "password"}
                  value={keys.gemini || ""}
                  onChange={(e) => setKeys({ ...keys, gemini: e.target.value || undefined })}
                  placeholder="..."
                  className="w-full px-3 py-2 pr-10 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowKeys({ ...showKeys, gemini: !showKeys.gemini })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
                >
                  {showKeys.gemini ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Used for speech-to-text</p>
            </div>

            {/* Voice Activity Detection */}
            <div className="mt-6 pt-6 border-t border-border space-y-2">
              <h3 className="text-sm font-semibold">Voice Activity Detection</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust your microphone sensitivity to reduce background noise.
              </p>
              <VolumeMeter
                threshold={vadThreshold}
                onThresholdChange={onSaveVadThreshold}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
