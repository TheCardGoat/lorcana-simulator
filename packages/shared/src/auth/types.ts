/**
 * Shared authentication types
 *
 * These types are used across the API, web app, and any other packages
 * that need to work with Better Auth session data.
 */

/**
 * User role for authorization
 */
export type UserRole = "user" | "moderator" | "admin";

/**
 * Subscription tier levels
 */
export type SubscriptionTier = "tier1" | "tier2" | "tier3" | "tier4" | "tier5";

/**
 * User type from Better Auth session
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  username?: string | null;
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
  const tiers: SubscriptionTier[] = ["tier1", "tier2", "tier3", "tier4", "tier5"];
  const userTierIndex = tiers.indexOf(user?.subscriptionTier ?? "tier1");
  const minTierIndex = tiers.indexOf(minTier);
  return userTierIndex >= minTierIndex;
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
