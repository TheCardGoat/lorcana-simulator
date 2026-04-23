/**
 * Shared authentication types
 *
 * These types are used across the API, web app, and any other packages
 * that need to work with Better Auth session data.
 */

/**
 * User role for authorization
 */
export type UserRole = "user" | "donor" | "moderator" | "admin";

/**
 * Subscription tier levels
 */
export type SubscriptionTier = "tier1" | "tier2" | "tier3" | "tier4" | "tier5" | "tier6";

/**
 * Minimum tier required to use alternate art in matches.
 * Players below this tier have their art selections silently ignored at match creation.
 */
export const ENCHANTED_TIER: SubscriptionTier = "tier4";

/**
 * User type from Better Auth session
 *
 * SYNC NOTE: Better Auth's /api/auth/get-session only returns the fields it manages
 * natively. Custom fields like `displayUsername` are NOT included in that response.
 * They are merged in by `enrichUserFromApi()` in session.svelte.ts, which calls
 * GET /v1/users/me after every session fetch. Keep this in mind when adding new
 * custom fields — they must be added to both this type AND the enrichment function.
 */
export interface AuthUser {
  id: string;
  email: string;
  /** Primary identifier from the OAuth provider (e.g. Discord username). Read-only. */
  name: string;
  image?: string | null;
  /** OAuth provider handle. Read-only. */
  username?: string | null;
  /**
   * User-chosen display name, editable via Account Settings.
   * Stored in our DB (users.displayUsername), NOT in Better Auth's session.
   * Populated by enrichUserFromApi() on session fetch, and patched optimistically on save.
   */
  displayUsername?: string | null;
  emailVerified: boolean;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === "admin";
}

/**
 * Check if user has moderator or admin role
 */
export function isModerator(user: AuthUser | null): boolean {
  return user?.role === "moderator" || user?.role === "admin";
}

/**
 * Check if user has required subscription tier or higher
 */
export function hasSubscriptionTier(user: AuthUser | null, minTier: SubscriptionTier): boolean {
  const tiers: SubscriptionTier[] = ["tier1", "tier2", "tier3", "tier4", "tier5", "tier6"];
  const userTierIndex = tiers.indexOf(user?.subscriptionTier ?? "tier1");
  const minTierIndex = tiers.indexOf(minTier);
  return userTierIndex >= minTierIndex;
}

/**
 * Check if user has donor role (past supporters migrated from lorcanito)
 */
export function isDonor(user: AuthUser | null): boolean {
  return user?.role === "donor";
}

/**
 * Lorcanito user settings (migrated as-is into users.settings jsonb).
 *
 * These settings originate from lorcanito and are preserved for continuity.
 * TCG-specific settings should be added as new top-level keys.
 */
export interface LorcanitoUserSettings {
  language?: "EN" | "DE" | "FR" | "ZH" | "JA";
  remoteCursor?: boolean;
  tablePerspective?: boolean;
  sound?: boolean;
  disableLogs?: boolean;
  disablePreview?: boolean;
  cardsSize?: "small" | "normal" | "big";
  sleeve?: "default" | "white" | "yellow" | "cosmos" | "custom";
  playmat?: {
    opacity: "none" | "low" | "medium" | "high" | "full" | "";
    position: "top" | "bottom" | "center" | "";
    size: "cover" | "contain" | "auto" | "";
    mirror: "none" | "vertically" | "horizontally" | "";
    hideOverlays?: boolean;
    image: string;
  };
  chat?: {
    logsEnabled: boolean;
    chatEnabled: boolean;
    extendedLogsEnabled: boolean;
  };
}

/**
 * Session type from Better Auth
 */
export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Session result type for server responses
 * This matches the structure returned by auth.api.getSession()
 */
export interface SessionResult {
  user: AuthUser | null;
  session: AuthSession | null;
}
