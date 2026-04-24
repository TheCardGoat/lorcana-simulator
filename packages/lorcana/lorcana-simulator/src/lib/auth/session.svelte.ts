/**
 * Reactive auth session state for the Lorcana Simulator.
 *
 * Uses Svelte 5 runes for reactive state management.
 * Call `fetchSession()` on mount to check for an existing session cookie.
 *
 * TWO-SOURCE SYNC PROBLEM
 * -----------------------
 * We have two sources of user data that must stay in sync:
 *
 *   1. Better Auth session  (/api/auth/get-session)
 *      - Managed by Better Auth; does NOT include custom DB fields like `displayUsername`.
 *      - Used by: authSession.user (this module), nav bar, presence, etc.
 *
 *   2. Our API             (GET /v1/users/me)
 *      - Full user record from our DB, including `displayUsername`.
 *      - Used by: AccountSettingsDialog form.
 *
 * Sync strategy:
 *   - On ready:  fetchSession() calls enrichUserFromApi() to merge custom fields into
 *                the Better Auth user object after every session fetch.
 *   - On save:   AccountSettingsDialog calls authSession.patchUser() immediately after
 *                a successful save for an optimistic update, so the nav bar reflects the
 *                change without waiting for the next fetchSession() round-trip.
 */

import type { AuthUser, AuthSession } from "@tcg/shared/auth";
import { authClient } from "./client.js";
import { trackEvent, setUserProperties } from "$lib/analytics/analytics.js";
import { fetchAccountProfile } from "$lib/features/matchmaking/api/account-settings-api.js";

let user = $state<AuthUser | null>(null);
let session = $state<AuthSession | null>(null);
let isLoading = $state(true);

/**
 * Merge custom DB fields (e.g. displayUsername) from GET /v1/users/me into the
 * Better Auth user object. Better Auth does not return these fields natively.
 * If the request fails we fall back to the base user rather than breaking the session.
 */
async function enrichUserFromApi(baseUser: AuthUser): Promise<AuthUser> {
  try {
    const data = await fetchAccountProfile();
    return { ...baseUser, displayUsername: data.displayUsername ?? baseUser.displayUsername };
  } catch {
    return baseUser;
  }
}

async function fetchSession(): Promise<void> {
  const wasAuthenticated = user !== null;
  isLoading = true;
  try {
    const result = await authClient.getSession();
    if (result.data?.user && result.data?.session) {
      user = await enrichUserFromApi(result.data.user as AuthUser);
      session = result.data.session as AuthSession;

      if (!wasAuthenticated) {
        trackEvent("auth_sign_in_complete", { method: "discord" });
      }
      setUserProperties({ auth_state: "authenticated" });
    } else {
      user = null;
      session = null;
      setUserProperties({ auth_state: "anonymous" });
    }
  } catch (error) {
    console.error("Failed to fetch session:", error);
    user = null;
    session = null;
  } finally {
    isLoading = false;
  }
}

/**
 * Optimistically patch specific fields on the current user without a full session refresh.
 * Call this immediately after a successful profile save so the UI reflects the change
 * right away, without waiting for the next fetchSession() + enrichUserFromApi() round-trip.
 * See the sync strategy note at the top of this file.
 */
function patchUser(updates: Partial<AuthUser>): void {
  if (user) {
    user = { ...user, ...updates };
  }
}

/**
 * Sign in with Discord OAuth.
 * Redirects the user to Discord for authentication.
 *
 * callbackPath must be an app path (e.g. `/matchmaking`). Better Auth stores this in OAuth
 * state and redirects the browser there after the callback — it must be an absolute URL on
 * the simulator origin, not a bare path (which would resolve on the API host).
 */
interface DiscordSignInOptions {
  callbackPath?: string;
  joinGuild?: boolean;
}

async function signInWithDiscord(options: DiscordSignInOptions = {}): Promise<void> {
  trackEvent("auth_sign_in_start", { method: "discord" });
  const { callbackPath = "/matchmaking", joinGuild = false } = options;
  const path = callbackPath.startsWith("/") ? callbackPath : `/${callbackPath}`;

  if (typeof window === "undefined") {
    throw new Error("signInWithDiscord must be called in the browser");
  }

  const callbackURL = new URL(path, window.location.origin);
  const errorCallbackURL = new URL("/sign-in", window.location.origin).toString();

  if (joinGuild) {
    const joinGuildNonce = window.crypto.randomUUID();
    window.sessionStorage.setItem("discord-join-guild-nonce", joinGuildNonce);
    callbackURL.searchParams.set("join_guild", "true");
    callbackURL.searchParams.set("join_guild_nonce", joinGuildNonce);
  }

  await authClient.signIn.social({
    provider: "discord",
    callbackURL: callbackURL.toString(),
    errorCallbackURL,
    scopes: joinGuild ? ["identify", "email", "guilds.join"] : ["identify", "email"],
  });
}

/**
 * Sign in with Metafy OAuth (generic OAuth2 provider configured on the API).
 * Redirects the user to Metafy for authentication.
 *
 * The `signIn.oauth2` method is injected at runtime by the genericOAuthClient
 * plugin but the simulator's `authClient` is declared with the default
 * `ReturnType<typeof createAuthClient>` (kept for compatibility with existing
 * casts). A narrow local type surfaces the plugin method without `any`.
 */
type OAuth2SignInResult = {
  data: { url?: string; redirect?: boolean } | null;
  error: { message?: string; status?: number; statusText?: string } | null;
};
type OAuth2SignIn = (opts: {
  providerId: string;
  callbackURL: string;
  errorCallbackURL?: string;
}) => Promise<OAuth2SignInResult>;
type SignInWithOAuth2 = typeof authClient.signIn & { oauth2: OAuth2SignIn };

async function signInWithMetafy(callbackPath = "/matchmaking"): Promise<void> {
  trackEvent("auth_sign_in_start", { method: "metafy" });
  const path = callbackPath.startsWith("/") ? callbackPath : `/${callbackPath}`;

  if (typeof window === "undefined") {
    throw new Error("signInWithMetafy must be called in the browser");
  }

  const callbackURL = new URL(path, window.location.origin).toString();
  const errorCallbackURL = new URL("/sign-in", window.location.origin).toString();

  const result = await (authClient.signIn as SignInWithOAuth2).oauth2({
    providerId: "metafy",
    callbackURL,
    errorCallbackURL,
  });

  // The Better Auth fetch hook performs the redirect automatically when the
  // server response includes { url, redirect: true }. If we reach this point
  // the server did not return a redirect — usually because the Metafy provider
  // is not registered server-side (missing AUTH_METAFY_CLIENT_ID /
  // AUTH_METAFY_CLIENT_SECRET). Surface the error so the user sees something.
  if (result.error) {
    throw new Error(
      result.error.message ||
        `Metafy sign-in failed (${result.error.status ?? "unknown"} ${result.error.statusText ?? ""}).`,
    );
  }
}

/**
 * Sign out and clear session state.
 */
async function signOut(): Promise<void> {
  trackEvent("auth_sign_out");
  setUserProperties({ auth_state: "anonymous" });
  try {
    await authClient.signOut();
  } finally {
    user = null;
    session = null;
  }
}

/**
 * Hydrate session state from server-provided data (via +layout.server.ts).
 * Avoids the client-side HTTP round-trip to /api/auth/get-session.
 */
function hydrateFromServer(serverUser: AuthUser | null, serverSession: AuthSession | null): void {
  if (serverUser && serverSession) {
    user = serverUser;
    session = serverSession;
  } else {
    user = null;
    session = null;
  }
  isLoading = false;
}

export const authSession = {
  get user() {
    return user;
  },
  get session() {
    return session;
  },
  get isLoading() {
    return isLoading;
  },
  get isAuthenticated() {
    return user !== null;
  },
  fetchSession,
  patchUser,
  hydrateFromServer,
  signInWithDiscord,
  signInWithMetafy,
  signOut,
};
