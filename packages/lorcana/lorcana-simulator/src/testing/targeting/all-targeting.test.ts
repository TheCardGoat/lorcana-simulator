import { describe, it } from "bun:test";

describe("Targeting: 'All' Target Selection", () => {
  // "All" targeting selects every card matching the criteria.
  //
  // Test cases to cover:
  // 1. "All characters" targets every character in play for both players
  // 2. "All your characters" targets only friendly characters
  // 3. "All opponent's characters" targets only enemy characters
  // 4. "All except this character" excludes the source card
  // 5. Zone-specific "all" targeting (e.g., all cards in hand)

  it.todo("should target all characters in play for both players", () => {});

  it.todo("should target only friendly characters with 'all your characters'", () => {});

  it.todo("should target only enemy characters with 'all opponent's characters'", () => {});

  it.todo("should exclude the source card with 'all except this character'", () => {});

  it.todo("should support zone-specific 'all' targeting", () => {});
});
