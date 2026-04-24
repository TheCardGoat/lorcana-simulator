import { describe, expect, it } from "bun:test";
import {
  validateDeckForFormat,
  LORCANA_FORMATS,
  type CardFormatData,
  type DeckCard,
  type LorcanaFormat,
  type LorcanaSetCode,
} from "./validate-deck";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal format for testing: 60-card minimum, 2-ink max. */
function coreFormat(overrides?: Partial<LorcanaFormat>): LorcanaFormat {
  return {
    id: "core-constructed",
    label: "Core Constructed",
    allowedSets: ["SSK", "AZS", "ARC", "ROJ", "FAB", "WIW"] as LorcanaSetCode[],
    requiredRotationState: "CoreConstructed",
    ...overrides,
  };
}

function historyFormat(overrides?: Partial<LorcanaFormat>): LorcanaFormat {
  return {
    id: "shimmering-skies",
    label: "Shimmering Skies",
    allowedSets: ["TFC", "ROF", "ITI", "URR", "SSK"] as LorcanaSetCode[],
    // No requiredRotationState — historical snapshot format
    ...overrides,
  };
}

function card(id: string, overrides?: Partial<CardFormatData>): CardFormatData {
  return {
    canonicalId: `ci_${id}`,
    fullName: `Test Card ${id}`,
    sets: ["SSK"] as LorcanaSetCode[],
    inkTypes: ["amber"],
    ...overrides,
  };
}

function deck(entries: Array<{ id: string; qty?: number }>): DeckCard[] {
  return entries.map((e) => ({ cardId: e.id, quantity: e.qty ?? 4 }));
}

function buildLookup(
  cards: Record<string, CardFormatData>,
): (id: string) => CardFormatData | undefined {
  return (id: string) => cards[id];
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("validateDeckForFormat", () => {
  describe("CARD_SET rule", () => {
    it("passes when card has printing in an allowed set", () => {
      const lookup = buildLookup({
        a: card("a", { sets: ["SSK"] as LorcanaSetCode[] }),
      });
      const result = validateDeckForFormat(deck([{ id: "a", qty: 60 }]), lookup, coreFormat());
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(true);
    });

    it("fails when card has no printing in an allowed set", () => {
      const lookup = buildLookup({
        a: card("a", { sets: ["TFC"] as LorcanaSetCode[] }),
      });
      const result = validateDeckForFormat(deck([{ id: "a", qty: 60 }]), lookup, coreFormat());
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(false);
      expect(setRule?.message).toContain("Test Card a");
    });

    it("passes via rotationState when card set is not in allowedSets", () => {
      const lookup = buildLookup({
        a: card("a", {
          sets: ["TFC"] as LorcanaSetCode[], // old set, not in allowedSets
          rotationStates: ["CoreConstructed"], // but rotation matches
        }),
      });
      const result = validateDeckForFormat(deck([{ id: "a", qty: 60 }]), lookup, coreFormat());
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(true);
    });

    it("falls back to set-only when rotationStates is undefined (backward compat)", () => {
      const lookup = buildLookup({
        a: card("a", {
          sets: ["TFC"] as LorcanaSetCode[], // not in core
          rotationStates: undefined, // no rotation data
        }),
      });
      const result = validateDeckForFormat(deck([{ id: "a", qty: 60 }]), lookup, coreFormat());
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(false);
    });

    it("ignores rotationState for historical formats (no requiredRotationState)", () => {
      const lookup = buildLookup({
        a: card("a", {
          sets: ["AZS"] as LorcanaSetCode[], // NOT in shimmering-skies allowed sets
          rotationStates: ["CoreConstructed"],
        }),
      });
      const result = validateDeckForFormat(deck([{ id: "a", qty: 60 }]), lookup, historyFormat());
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(false);
    });

    it("specialAllowedCardIds bypass both set and rotation checks", () => {
      const lookup = buildLookup({
        promo: card("promo", {
          sets: ["TFC"] as LorcanaSetCode[], // not in core
          rotationStates: ["InfinityConstructed"], // doesn't match
        }),
      });
      const result = validateDeckForFormat(
        deck([{ id: "promo", qty: 60 }]),
        lookup,
        coreFormat({ specialAllowedCardIds: ["promo"] }),
      );
      const setRule = result.rules.find((r) => r.kind === "CARD_SET");
      expect(setRule?.passed).toBe(true);
    });
  });

  describe("CARD_QUANTITY rule (copy limits across reprints)", () => {
    it("enforces copy limit across different shortIds sharing same canonicalId", () => {
      // Two different shortIds, same canonical card
      const lookup = buildLookup({
        v1: card("shared", { sets: ["SSK"] as LorcanaSetCode[] }),
        v2: card("shared", { sets: ["SSK", "FAB"] as LorcanaSetCode[] }),
      });
      const result = validateDeckForFormat(
        [
          { cardId: "v1", quantity: 3 },
          { cardId: "v2", quantity: 3 },
        ],
        lookup,
        coreFormat({ minDeckSize: 6 }),
      );
      const qtyRule = result.rules.find((r) => r.kind === "CARD_QUANTITY");
      expect(qtyRule?.passed).toBe(false);
      expect(qtyRule?.message).toContain("6 copies");
    });

    it("passes when combined copies are within limit", () => {
      const lookup = buildLookup({
        v1: card("shared", { sets: ["SSK"] as LorcanaSetCode[] }),
        v2: card("shared", { sets: ["SSK"] as LorcanaSetCode[] }),
      });
      const result = validateDeckForFormat(
        [
          { cardId: "v1", quantity: 2 },
          { cardId: "v2", quantity: 2 },
        ],
        lookup,
        coreFormat({ minDeckSize: 4 }),
      );
      const qtyRule = result.rules.find((r) => r.kind === "CARD_QUANTITY");
      expect(qtyRule?.passed).toBe(true);
    });
  });

  describe("format definitions", () => {
    it("core-constructed has requiredRotationState", () => {
      expect(LORCANA_FORMATS["core-constructed"].requiredRotationState).toBe("CoreConstructed");
    });

    it("early-access has requiredRotationState", () => {
      expect(LORCANA_FORMATS["early-access"].requiredRotationState).toBe("CoreConstructed");
    });

    it("infinity has no requiredRotationState", () => {
      expect(LORCANA_FORMATS.infinity.requiredRotationState).toBeUndefined();
    });

    it("historical formats have no requiredRotationState", () => {
      expect(LORCANA_FORMATS["shimmering-skies"].requiredRotationState).toBeUndefined();
      expect(LORCANA_FORMATS["azurite-sea"].requiredRotationState).toBeUndefined();
      expect(LORCANA_FORMATS["archazias-island"].requiredRotationState).toBeUndefined();
    });
  });
});
