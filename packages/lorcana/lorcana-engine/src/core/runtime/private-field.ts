/**
 * Field-level privacy for MoveLog entries.
 *
 * Instead of entry-level visibility (PUBLIC / PRIVATE / PUBLIC_WITH_OVERRIDES),
 * individual fields can be marked as private. The full log is stored in Redis;
 * private fields are stripped at delivery time based on the viewer's identity.
 */

/**
 * Wraps a value that should only be visible to specific players.
 * When stripped, the field is replaced with `undefined`.
 */
export interface PrivateField<T> {
  readonly __private: true;
  readonly value: T;
  readonly visibleTo: string[];
}

export function privateField<T>(value: T, visibleTo: string[]): PrivateField<T> {
  return { __private: true, value, visibleTo };
}

function isPrivateField(obj: unknown): obj is PrivateField<unknown> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "__private" in obj &&
    (obj as PrivateField<unknown>).__private === true &&
    "value" in obj &&
    "visibleTo" in obj
  );
}

/**
 * Recursively strip private fields from an object based on viewer identity.
 *
 * - If the viewer is in `visibleTo`, the PrivateField is replaced with its value.
 * - Otherwise, the PrivateField is replaced with `undefined`.
 * - `viewerId: null` means spectator — all private fields are stripped.
 */
export function stripPrivateFields<T>(obj: T, viewerId: string | null): T {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj;
  }

  if (isPrivateField(obj)) {
    if (viewerId !== null && obj.visibleTo.includes(viewerId)) {
      return obj.value as T;
    }
    return undefined as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => stripPrivateFields(item, viewerId)) as T;
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    result[key] = stripPrivateFields((obj as Record<string, unknown>)[key], viewerId);
  }
  return result as T;
}
