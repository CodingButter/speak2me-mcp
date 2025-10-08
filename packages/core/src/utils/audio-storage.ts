/**
 * Audio Asset Storage Utility
 *
 * Handles saving and managing audio files for TTS/STT
 * Project Scope Reference: §7.2.1 (Audio Storage)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

export interface AudioSaveOptions {
  conversationId: string;
  messageId: string;
  audioData: ArrayBuffer;
  format?: "mp3" | "wav" | "pcm";
}

export interface AudioSaveResult {
  filePath: string;
  publicUrl: string;
  sizeBytes: number;
}

const AUDIO_BASE_DIR = "./data/audio";
const PUBLIC_URL_BASE = "/assets/audio";

/**
 * Saves audio data to filesystem and returns file path and public URL
 */
export async function saveAudioAsset(
  options: AudioSaveOptions
): Promise<AudioSaveResult> {
  const { conversationId, messageId, audioData, format = "mp3" } = options;

  // Build file path: ./data/audio/:conversationId/:messageId.{format}
  const conversationDir = join(AUDIO_BASE_DIR, conversationId);
  const fileName = `${messageId}.${format}`;
  const filePath = join(conversationDir, fileName);

  // Ensure directory exists
  await mkdir(conversationDir, { recursive: true });

  // Convert ArrayBuffer to Buffer for Node.js
  const buffer = Buffer.from(audioData);

  // Write audio file
  await writeFile(filePath, buffer);

  // Build public URL for frontend access
  const publicUrl = `${PUBLIC_URL_BASE}/${conversationId}/${fileName}`;

  return {
    filePath,
    publicUrl,
    sizeBytes: buffer.length,
  };
}

/**
 * Gets the file path for an existing audio asset
 */
export function getAudioAssetPath(
  conversationId: string,
  messageId: string,
  format = "mp3"
): string {
  return join(AUDIO_BASE_DIR, conversationId, `${messageId}.${format}`);
}

/**
 * Gets the public URL for an audio asset
 */
export function getAudioAssetUrl(
  conversationId: string,
  messageId: string,
  format = "mp3"
): string {
  return `${PUBLIC_URL_BASE}/${conversationId}/${messageId}.${format}`;
}
