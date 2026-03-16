import { nanoid } from "nanoid";
import type { CardInstanceId, GameId, PlayerId, ZoneId } from "@tcg/lorcana-types";

/**
 * Creates a CardId from a string or generates a new unique ID
 * @param id - Optional ID string. If not provided, generates a new unique ID
 * @returns A branded CardId
 */
export function createCardId(): CardInstanceId;
export function createCardId(id: string): CardInstanceId;
export function createCardId(id?: string): CardInstanceId {
  // Type assertion is acceptable here as this is the only way to create branded types
  // Biome-ignore lint/suspicious/noExplicitAny: Required for branded type creation
  return (id ?? nanoid()) as any;
}

/**
 * Creates a PlayerId from a string or generates a new unique ID
 * @param id - Optional ID string. If not provided, generates a new unique ID
 * @returns A branded PlayerId
 */
export function createPlayerId(): PlayerId;
export function createPlayerId(id: string): PlayerId;
export function createPlayerId(id?: string): PlayerId {
  // Type assertion is acceptable here as this is the only way to create branded types
  // Biome-ignore lint/suspicious/noExplicitAny: Required for branded type creation
  return (id ?? nanoid()) as any;
}

/**
 * Creates a GameId from a string or generates a new unique ID
 * @param id - Optional ID string. If not provided, generates a new unique ID
 * @returns A branded GameId
 */
export function createGameId(): GameId;
export function createGameId(id: string): GameId;
export function createGameId(id?: string): GameId {
  // Type assertion is acceptable here as this is the only way to create branded types
  // Biome-ignore lint/suspicious/noExplicitAny: Required for branded type creation
  return (id ?? nanoid()) as any;
}

/**
 * Creates a ZoneId from a string or generates a new unique ID
 * @param id - Optional ID string. If not provided, generates a new unique ID
 * @returns A branded ZoneId
 */
export function createZoneId(): ZoneId;
export function createZoneId(id: string): ZoneId;
export function createZoneId(id?: string): ZoneId {
  // Type assertion is acceptable here as this is the only way to create branded types
  // Biome-ignore lint/suspicious/noExplicitAny: Required for branded type creation
  return (id ?? nanoid()) as any;
}

// =============================================================================
// Safe Casting Helpers
// =============================================================================

/**
 * Safely cast a string to CardInstanceId.
 * Use when you have a known-valid card ID from trusted sources (e.g., server data).
 */
export function asCardInstanceId(id: string): CardInstanceId {
  return id as CardInstanceId;
}

/**
 * Safely cast a string to PlayerId.
 * Use when you have a known-valid player ID from trusted sources.
 */
export function asPlayerId(id: string): PlayerId {
  return id as PlayerId;
}

/**
 * Safely cast a string to ZoneId.
 * Use when you have a known-valid zone ID from trusted sources.
 */
export function asZoneId(id: string): ZoneId {
  return id as ZoneId;
}

/**
 * Safely cast a string to GameId.
 * Use when you have a known-valid game ID from trusted sources.
 */
export function asGameId(id: string): GameId {
  return id as GameId;
}

// =============================================================================
// Optional Casting Helpers (return undefined for empty/null input)
// =============================================================================

/**
 * Safely cast a string to CardInstanceId, returning undefined for empty/null input.
 */
export function asCardInstanceIdOptional(
  id: string | undefined | null,
): CardInstanceId | undefined {
  return id ? (id as CardInstanceId) : undefined;
}

/**
 * Safely cast a string to PlayerId, returning undefined for empty/null input.
 */
export function asPlayerIdOptional(id: string | undefined | null): PlayerId | undefined {
  return id ? (id as PlayerId) : undefined;
}

/**
 * Safely cast a string to ZoneId, returning undefined for empty/null input.
 */
export function asZoneIdOptional(id: string | undefined | null): ZoneId | undefined {
  return id ? (id as ZoneId) : undefined;
}

/**
 * Safely cast an array of strings to CardInstanceId[].
 */
export function asCardInstanceIds(ids: string[]): CardInstanceId[] {
  return ids as CardInstanceId[];
}
