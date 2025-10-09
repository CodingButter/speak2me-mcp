/**
 * Audio Asset Storage Utility
 *
 * Project Scope Reference: §7.2.1 (Audio Asset Storage)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface SaveAudioOptions {
  conversationId: string;
  messageId: string;
  audioData: ArrayBuffer;
  format?: string;
}

export interface SaveAudioResult {
  filePath: string;
  publicUrl: string;
  sizeBytes: number;
}

const AUDIO_BASE_DIR = "./data/audio";

/**
 * Save audio asset to filesystem
 *
 * @param options - Audio save options
 * @returns File path and public URL for frontend access
 */
export async function saveAudioAsset(
  options: SaveAudioOptions
): Promise<SaveAudioResult> {
  const { conversationId, messageId, audioData, format = "mp3" } = options;

  // Create directory structure: ./data/audio/:conversationId/
  const conversationDir = join(AUDIO_BASE_DIR, conversationId);
  await mkdir(conversationDir, { recursive: true });

  // Generate filename
  const filename = `${messageId}.${format}`;
  const filePath = join(conversationDir, filename);

  // Write audio data to file
  const buffer = Buffer.from(audioData);
  await writeFile(filePath, buffer);

  // Generate public URL for frontend access
  const publicUrl = `/assets/audio/${conversationId}/${filename}`;

  return {
    filePath,
    publicUrl,
    sizeBytes: buffer.length,
  };
}

/**
 * Generate a unique message ID for audio files
 * Uses timestamp + random suffix
 */
export function generateMessageId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}
