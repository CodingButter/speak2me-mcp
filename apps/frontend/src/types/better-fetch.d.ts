declare module "better-fetch" {
  export interface FetchOptions extends RequestInit {
    baseURL?: string;
    headers?: Record<string, string>;
    body?: any;
  }

  export interface FetchInstance {
    <T = any>(url: string, options?: FetchOptions): Promise<{
      data: T;
      status: number;
      statusText: string;
      headers: Headers;
    }>;
  }

  export function createFetch(options?: FetchOptions): FetchInstance;
}
