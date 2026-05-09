/**
 * Catalog integrity: verifies that every TypeScript card file's `id` field
 * matches what canonical-cards.json declares for the same printing.
 *
 * Why this test exists: the generation pipeline validates uniqueness inside
 * canonical-cards.json, but it does not cross-check the committed TypeScript
 * source files. If canonical-cards.json is updated (or a card file is edited
 * manually) without regenerating the TypeScript files, stale IDs silently
 * diverge from the canonical source, causing deck-import substitution bugs.
 */

import { describe, expect, it } from "bun:test";
import canonicalRaw from "../data/canonical-cards.json";
import { getAllCards } from "./index";

type CanonicalEntry = { id: string; name: string };
const canonical = canonicalRaw as Record<string, CanonicalEntry>;

/** Derive the canonical-cards.json key from a runtime card's metadata. */
function canonicalKey(card: { set: string; cardNumber: number; specialRarity?: string }): string {
  const setNum = parseInt(card.set, 10);
  const cardNum = String(card.cardNumber).padStart(3, "0");
  const base = `set${setNum}-${cardNum}`;
  return card.specialRarity ? `${base}-${card.specialRarity}` : base;
}

describe("catalog integrity", () => {
  it("every card id matches canonical-cards.json", async () => {
    const allCards = await getAllCards();
    const mismatches: string[] = [];

    for (const card of allCards) {
      const key = canonicalKey(card as { set: string; cardNumber: number; specialRarity?: string });
      const entry = canonical[key];
      // Cards not yet in canonical-cards.json are skipped (new cards in progress)
      if (!entry) continue;

      if (entry.id !== card.id) {
        mismatches.push(
          `${key} "${card.name}": TypeScript id="${card.id}", canonical-cards.json says "${entry.id}"`,
        );
      }
    }

    expect(mismatches).toEqual([]);
  });

  it("no two cards share the same id", async () => {
    const allCards = await getAllCards();
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const card of allCards) {
      const prev = seen.get(card.id);
      if (prev !== undefined) {
        duplicates.push(`id "${card.id}" used by "${prev}" and "${card.name}"`);
      } else {
        seen.set(card.id, card.name);
      }
    }

    expect(duplicates).toEqual([]);
  });

  // Catches the regression where a P3-promo printing inherits set "012" from its
  // base card and then overrides only cardNumber, producing the same (set, cardNumber)
  // tuple as another card in set 012. Several frontend lookups (catalog views, image
  // path builders) key off (set, cardNumber); a collision shows the wrong card in the
  // popup. Promo printings should declare their own promo-set code (e.g. "P03").
  it("no two cards share the same (set, cardNumber)", async () => {
    const allCards = await getAllCards();
    const seen = new Map<string, { id: string; name: string }>();
    const duplicates: string[] = [];

    for (const card of allCards) {
      const key = `${card.set}-${card.cardNumber}`;
      const prev = seen.get(key);
      if (prev !== undefined) {
        duplicates.push(
          `(set=${card.set}, cardNumber=${card.cardNumber}) shared by "${prev.name}" [${prev.id}] and "${card.name}" [${card.id}]`,
        );
      } else {
        seen.set(key, { id: card.id, name: card.name });
      }
    }

    expect(duplicates).toEqual([]);
  });
});
