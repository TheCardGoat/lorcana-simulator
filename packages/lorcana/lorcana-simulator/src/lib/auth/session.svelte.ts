/**
 * Reactive auth session state for the Lorcana Simulator.
 *
 * Uses Svelte 5 runes for reactive state management.
 * Call `fetchSession()` on mount to check for an existing session cookie.
 */

import type { AuthUser, AuthSession } from "@tcg/shared/auth";
import { authClient } from "./client.js";

let user = $state<AuthUser | null>(null);
let session = $state<AuthSession | null>(null);
let isLoading = $state(true);

const isAuthenticated = $derived(user !== null);

/**
 * Fetch current session from the API.
 * Call this on component mount to restore session from cookie.
 */
async function fetchSession(): Promise<void> {
  isLoading = true;
  try {
    const result = await authClient.getSession();
    if (result.data?.user && result.data?.session) {
      user = result.data.user as AuthUser;
      session = result.data.session as AuthSession;
    } else {
      user = null;
      session = null;
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
 * Sign in with Discord OAuth.
 * Redirects the user to Discord for authentication.
 *
 * callbackPath must be an app path (e.g. `/matchmaking`). Better Auth stores this in OAuth
 * state and redirects the browser there after the callback — it must be an absolute URL on
 * the simulator origin, not a bare path (which would resolve on the API host).
 */
async function signInWithDiscord(callbackPath = "/matchmaking"): Promise<void> {
  const path = callbackPath.startsWith("/") ? callbackPath : `/${callbackPath}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const callbackURL = origin ? `${origin}${path}` : path;

  await authClient.signIn.social({
    provider: "discord",
    callbackURL,
    scopes: ["identify", "email"],
  });
}

/**
 * Sign out and clear session state.
 */
async function signOut(): Promise<void> {
  try {
    await authClient.signOut();
  } finally {
    user = null;
    session = null;
  }
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
    return isAuthenticated;
  },
  fetchSession,
  signInWithDiscord,
  signOut,
};
