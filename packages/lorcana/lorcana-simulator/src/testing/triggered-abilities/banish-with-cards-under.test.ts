import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";

/**
 * BANISH INTERACTIONS WITH CARDS-UNDER
 * Tests for abilities that trigger on banish and use cards-under information
 */
describe("Banish Interactions with Cards-Under", () => {
  describe("GOOFY-001 to GOOFY-004: Goofy - GRAVE OUTCOME", () => {
    it.todo("GOOFY-001: On banish: each opponent discards 1 per card that was under him", () => {});

    it.todo("GOOFY-002: Uses cards-under-count-before-banish (snapshot)", () => {});

    it.todo("GOOFY-003: 0 cards under = no discard", () => {});

    it.todo("GOOFY-004: Works regardless of how banished", () => {});
  });

  describe("RALPH-001 to RALPH-003: Wreck-it Ralph - WHO'S COMIN' WITH ME?", () => {
    it.todo("RALPH-001: On banish: banish all chars with S <= Ralph's in-play strength", () => {});

    it.todo("RALPH-002: Ralph's strength includes cards-under bonus", () => {});

    it.todo("RALPH-003: Uses snapshot at time of banish", () => {});
  });

  describe("MICKEY-001 to MICKEY-005: Mickey - A GIVING HEART", () => {
    it.todo("MICKEY-001: On banish in challenge: may put cards under to another char/loc", () => {});

    it.todo("MICKEY-002: Effect is optional", () => {});

    it.todo("MICKEY-003: Requires in-challenge restriction", () => {});

    it.todo("MICKEY-004: Requires had-card-under condition", () => {});

    it.todo("MICKEY-005: Cards move (not lost) to new target", () => {});
  });

  describe("Banish & Cards-Under Mechanics", () => {
    it.todo("Cards under are lost when character is banished", () => {});

    it.todo("Character banish triggers snapshot cards-under count at moment of banish", () => {});

    it.todo("Multiple banish-triggered abilities fire in correct order", () => {});

    it.todo("Banish via challenge uses correct cards-under snapshot", () => {});
  });
});
