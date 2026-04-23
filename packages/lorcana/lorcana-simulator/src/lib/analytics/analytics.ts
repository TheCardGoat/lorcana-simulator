/**
 * Public analytics API for the Lorcana Simulator.
 *
 * Provides type-safe event tracking, page view tracking, and user property management.
 * All functions are SSR-safe and silently no-op when GA4 is not configured.
 */

import { loadGtag, gtagEvent, gtagSet, gtagConsent } from "./gtag.js";
import { analyticsConsent } from "./analytics-consent.svelte.js";
import type { AnalyticsEventMap, AnalyticsEventName, AnalyticsUserProperties } from "./types.js";

const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
const EXCLUDED_PATH_PREFIXES = ["/tests/", "/health"];

let initialized = false;

/**
 * Ensure analytics is initialized. Safe to call multiple times.
 * Automatically called by trackEvent/trackPageView if initAnalytics()
 * hasn't been called yet (handles lifecycle ordering edge cases).
 */
function ensureInitialized(): void {
  if (initialized || typeof window === "undefined") return;
  initAnalytics();
}

/**
 * Initialize GA4 analytics. Call once from root layout onMount.
 * Loads the gtag script and restores consent state.
 */
export function initAnalytics(): void {
  if (initialized) {
    console.log("[analytics] initAnalytics skipped: already initialized");
    return;
  }
  initialized = true;
  if (import.meta.env.DEV) {
    console.log("[analytics] initAnalytics: starting");
  }

  analyticsConsent.initialize();
  if (import.meta.env.DEV) {
    console.log("[analytics] consent state →", analyticsConsent.consentGranted);
  }
  loadGtag();

  // Apply stored consent if already decided
  if (analyticsConsent.consentGranted !== null) {
    if (import.meta.env.DEV) {
      console.log("[analytics] applying stored consent →", analyticsConsent.consentGranted);
    }
    gtagConsent(analyticsConsent.consentGranted);
  } else {
    if (import.meta.env.DEV) {
      console.log("[analytics] no stored consent decision yet");
    }
  }
  if (import.meta.env.DEV) {
    console.log("[analytics] initAnalytics: complete");
  }
}

/**
 * Track a page view with normalized path.
 * Strips locale prefixes and replaces UUIDs with [id].
 */
export function trackPageView(url: string, deLocalizeUrl?: (url: URL) => URL): void {
  if (import.meta.env.DEV) {
    console.log("[analytics] trackPageView →", url);
  }
  ensureInitialized();
  let path: string;

  if (deLocalizeUrl) {
    try {
      const fullUrl = new URL(url, "http://localhost");
      path = deLocalizeUrl(fullUrl).pathname;
    } catch {
      path = url;
    }
  } else {
    path = url;
  }

  // Replace UUID segments with [id] for cleaner GA4 grouping
  path = path.replace(UUID_PATTERN, "[id]");

  // Skip excluded routes
  if (EXCLUDED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return;
  }

  gtagEvent("page_view", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.origin + path : undefined,
  });
}

/**
 * Track a typed custom event.
 */
export function trackEvent<K extends AnalyticsEventName>(
  name: K,
  ...args: Record<string, never> extends AnalyticsEventMap[K]
    ? [params?: AnalyticsEventMap[K]]
    : [params: AnalyticsEventMap[K]]
): void {
  if (import.meta.env.DEV) {
    console.log("[analytics] trackEvent →", name, args[0] ?? {});
  }
  ensureInitialized();
  const params = args[0] ?? {};
  gtagEvent(name, params as Record<string, unknown>);
}

/**
 * Set GA4 user properties.
 */
export function setUserProperties(props: Partial<AnalyticsUserProperties>): void {
  gtagSet(props);
}

/**
 * Update analytics consent and notify gtag.
 */
export function updateConsent(granted: boolean): void {
  if (granted) {
    analyticsConsent.grant();
  } else {
    analyticsConsent.deny();
  }
  gtagConsent(granted);
}
