/**
 * Better Auth client for the Lorcana Simulator.
 * Provides Discord OAuth authentication integration.
 */

import { createAuthClient } from "better-auth/svelte";
import { getApiOrigin } from "$lib/config/public-url-config.js";

/**
 * Base URL for the API server.
 * Resolved through the shared public URL config module.
 */
const baseURL = getApiOrigin();

/**
 * Better Auth client instance configured for the General API auth endpoints.
 */
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL,
});
