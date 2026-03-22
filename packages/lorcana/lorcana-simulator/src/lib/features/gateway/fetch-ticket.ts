import { getApiOrigin } from "$lib/config/public-url-config.js";

/**
 * Fetch a short-lived WebSocket ticket from the general API.
 *
 * Requires an active session cookie (Better Auth).
 * Returns the ticket string, or null if the request fails.
 */
export async function fetchGatewayTicket(): Promise<string | null> {
  try {
    const res = await fetch(`${getApiOrigin()}/v1/gateway/ticket`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { ticket: string };
    return data.ticket;
  } catch {
    return null;
  }
}
