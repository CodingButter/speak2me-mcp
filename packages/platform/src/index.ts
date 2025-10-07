export * from "./types";
export { WebPlatform } from "./web";
export { ElectronPlatform } from "./electron";

import type { IPlatform } from "./types";
import { WebPlatform } from "./web";
import { ElectronPlatform } from "./electron";

/**
 * Platform Factory
 * Detects environment and returns appropriate platform instance
 */
export function createPlatform(backendUrl?: string): IPlatform {
  // Check if running in Electron
  // @ts-ignore - electronAPI will be injected by Electron preload
  const isElectron = typeof window !== "undefined" && window.electronAPI !== undefined;

  if (isElectron) {
    return new ElectronPlatform();
  }

  return new WebPlatform(backendUrl);
}
