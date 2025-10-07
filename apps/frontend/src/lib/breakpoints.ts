/**
 * Responsive breakpoints optimized for compact windows
 *
 * xs: 256px+ (tiny always-on-top window)
 * sm: 384px+ (small floating window)
 * md: 512px+ (medium window)
 * lg: 768px+ (large window)
 * xl: 1024px+ (full screen)
 */

export const BREAKPOINTS = {
  xs: 256,
  sm: 384,
  md: 512,
  lg: 768,
  xl: 1024,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook to detect current breakpoint
 */
export function useBreakpoint(): Breakpoint {
  // TODO: Implement with matchMedia
  return "md";
}
