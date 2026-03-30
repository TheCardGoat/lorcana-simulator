import type { ServerLoadEvent } from "@sveltejs/kit";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import { getServerApiOrigin, serverFetch } from "$lib/server/fetch-with-cf.js";

export async function load({ request }: ServerLoadEvent) {
  const cookie = request.headers.get("cookie");
  const apiOrigin = getServerApiOrigin(getApiOrigin());

  // Fetch matchmaking context server-side (profiles, decks, account info).
  // Returns null for unauthenticated users or if the API is unavailable.
  let matchmakingContext = null;
  if (cookie) {
    try {
      const res = await serverFetch(`${apiOrigin}/v1/users/me/games/lorcana/matchmaking-context`, {
        headers: { cookie },
      });
      if (res.ok) {
        matchmakingContext = await res.json();
      }
    } catch {
      // Unauthenticated or API unavailable — render anonymous shell
    }
  }

  return { matchmakingContext };
}
