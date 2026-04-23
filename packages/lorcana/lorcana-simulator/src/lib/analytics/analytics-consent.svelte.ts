/**
 * Reactive analytics consent state using Svelte 5 runes.
 *
 * Persists user choice to localStorage and exposes a singleton
 * for use across the app.
 */

const STORAGE_KEY = "analytics_consent";

/**
 * null = not yet decided, true = granted, false = denied.
 *
 * All users accept our Terms of Service and Privacy Policy (which includes
 * consent to analytics for platform improvement) during onboarding, so
 * we default to `true` when no explicit preference is stored.
 */
export const analyticsConsent = $state({
  consentGranted: null as boolean | null,
  initialize,
  grant,
  deny,
  reset,
});

function loadFromStorage(): boolean | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;
  // Users consent to analytics via Terms of Service acceptance during onboarding.
  // Default to granted when no explicit preference is stored.
  return true;
}

function saveToStorage(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(value));
}

/** Initialize consent state from localStorage. Call once on mount. */
function initialize(): void {
  analyticsConsent.consentGranted = loadFromStorage();
}

function grant(): void {
  analyticsConsent.consentGranted = true;
  saveToStorage(true);
}

function deny(): void {
  analyticsConsent.consentGranted = false;
  saveToStorage(false);
}

function reset(): void {
  analyticsConsent.consentGranted = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
