/**
 * Minimal static card shape required by the core runtime.
 *
 * Game-specific definitions can extend this with any additional fields.
 */
export interface BaseCardDefinition {
  id: string;
  canonicalId: string;
  reprints?: string[];
  name: string;
}

/**
 * Minimal runtime metadata shape attached to card instances.
 */
export type BaseCardMeta = Record<string, unknown>;
