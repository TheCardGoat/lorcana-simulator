import { serverFetch } from "$lib/server/fetch-with-cf.js";

export async function serverJsonOrNull<T>(url: string, init?: RequestInit): Promise<T | null> {
  const response = await serverFetch(url, init);
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
}

export async function serverJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await serverFetch(url, init);
  if (!response.ok) {
    throw new Error(`Server request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}
