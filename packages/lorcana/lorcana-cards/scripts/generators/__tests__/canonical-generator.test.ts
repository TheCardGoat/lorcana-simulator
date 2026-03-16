import { describe, expect, it } from "bun:test";
import type { CanonicalCard, InputCard, PipelineIdMapping } from "../../types";
import type { CardType } from "../../types";
import { getFullNameFromCard, type PrintingItem } from "../../parsers/input-parser";
import { generateCanonicalCardsFromPrintings } from "../canonical-generator";

function minimalInputCard(overrides: Partial<InputCard> & { cardType: CardType }): InputCard & {
  cardType: CardType;
} {
  const { cardType, ...rest } = overrides;
  return {
    name: "Test Card",
    subtitle: undefined,
    rarity: "common",
    ink_cost: 2,
    sort_number: 1,
    additional_info: [],
    ink_convertible: true,
    abilities: [],
    subtypes: [],
    flavor_text: "",
    rules_text: "",
    card_identifier: "set1-001",
    thumbnail_url: "",
    variants: [],
    card_sets: ["set1"],
    magic_ink_colors: ["AMBER"],
    searchable_keywords: [],
    ...rest,
    cardType,
  };
}

function minimalPrintingItem(
  cardOverrides: Partial<InputCard> & { cardType: CardType },
  setId = "set1",
): PrintingItem {
  return {
    card: minimalInputCard(cardOverrides),
    setId,
  };
}

/** Build full PipelineIdMapping; pass items and printingIdsInOrder so byPrintingId is filled (one 3-char id per printing). */
function pipelineIdMapping(
  entries: Array<[string, string]>,
  items?: PrintingItem[],
  printingIdsInOrder?: string[],
): PipelineIdMapping {
  const byCanonicalKey: Record<string, string> = {};
  const byShortId: Record<string, string> = {};
  for (const [canonicalKey, shortId] of entries) {
    byCanonicalKey[canonicalKey] = shortId;
    byShortId[shortId] = canonicalKey;
  }
  const byPrintingId: Record<string, string> = {};
  if (items && printingIdsInOrder) {
    for (let i = 0; i < items.length && i < printingIdsInOrder.length; i++) {
      const printingId = printingIdsInOrder[i];
      if (!printingId) continue;
      const canonicalKey = getFullNameFromCard(items[i]!.card).toLowerCase();
      const shortId = byCanonicalKey[canonicalKey];
      if (shortId) byPrintingId[printingId] = shortId;
    }
  }
  return { byShortId, byCanonicalKey, byPrintingId };
}

describe("generateCanonicalCardsFromPrintings", () => {
  it("uses existing canonicalId when it starts with ci_", () => {
    const items: PrintingItem[] = [minimalPrintingItem({ name: "Alice", cardType: "character" })];
    const printingIdsInOrder = ["set1-001"];
    const idMapping = pipelineIdMapping([["alice", "abc"]], items, printingIdsInOrder);
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-001": {
        id: "set1-001",
        canonicalId: "ci_legacy_123",
        name: "Alice",
        cardType: "character",
        inkType: ["amber"],
        cost: 2,
        inkable: true,
        vanilla: true,
        strength: 1,
        willpower: 1,
        lore: 0,
      } as CanonicalCard,
    };
    const result = generateCanonicalCardsFromPrintings(
      items,
      printingIdsInOrder,
      idMapping,
      undefined,
      undefined,
      existingCanonicalCards,
    );
    expect(result["set1-001"].canonicalId).toBe("ci_legacy_123");
  });

  it("uses ci_${shortId} when existing canonicalId does not start with ci_", () => {
    const items: PrintingItem[] = [minimalPrintingItem({ name: "Bob", cardType: "character" })];
    const printingIdsInOrder = ["set1-002"];
    const idMapping = pipelineIdMapping([["bob", "xyz"]], items, printingIdsInOrder);
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-002": {
        id: "set1-002",
        canonicalId: "legacy_no_ci",
        name: "Bob",
        cardType: "character",
        inkType: ["amber"],
        cost: 2,
        inkable: true,
        vanilla: true,
        strength: 1,
        willpower: 1,
        lore: 0,
      } as CanonicalCard,
    };
    const result = generateCanonicalCardsFromPrintings(
      items,
      printingIdsInOrder,
      idMapping,
      undefined,
      undefined,
      existingCanonicalCards,
    );
    expect(result["set1-002"].canonicalId).toBe("ci_xyz");
  });

  it("reassigns canonicalId to ci_${shortId} when same canonicalId is shared across different full names", () => {
    const items: PrintingItem[] = [
      minimalPrintingItem({
        name: "Card A",
        subtitle: "Version 1",
        cardType: "character",
      }),
      minimalPrintingItem({
        name: "Card B",
        subtitle: "Other",
        cardType: "character",
      }),
    ];
    const printingIdsInOrder = ["set1-001", "set1-002"];
    const idMapping = pipelineIdMapping(
      [
        ["card a - version 1", "aaa"],
        ["card b - other", "bbb"],
      ],
      items,
      printingIdsInOrder,
    );
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-001": {
        id: "set1-001",
        canonicalId: "ci_shared",
        name: "Card A",
        version: "Version 1",
        cardType: "character",
        inkType: ["amber"],
        cost: 2,
        inkable: true,
        vanilla: true,
        strength: 1,
        willpower: 1,
        lore: 0,
      } as CanonicalCard,
      "set1-002": {
        id: "set1-002",
        canonicalId: "ci_shared",
        name: "Card B",
        version: "Other",
        cardType: "character",
        inkType: ["amber"],
        cost: 2,
        inkable: true,
        vanilla: true,
        strength: 1,
        willpower: 1,
        lore: 0,
      } as CanonicalCard,
    };
    const result = generateCanonicalCardsFromPrintings(
      items,
      printingIdsInOrder,
      idMapping,
      undefined,
      undefined,
      existingCanonicalCards,
    );
    expect(result["set1-001"].canonicalId).toBe("ci_aaa");
    expect(result["set1-002"].canonicalId).toBe("ci_bbb");
  });

  it("uses ci_${shortId} when no existing canonical-cards provided", () => {
    const items: PrintingItem[] = [
      minimalPrintingItem({ name: "New Card", cardType: "character" }),
    ];
    const printingIdsInOrder = ["set1-001"];
    const idMapping = pipelineIdMapping([["new card", "qwe"]], items, printingIdsInOrder);
    const result = generateCanonicalCardsFromPrintings(items, printingIdsInOrder, idMapping);
    expect(result["set1-001"].canonicalId).toBe("ci_qwe");
    expect(result["set1-001"].id).toBe("qwe");
  });

  it("uses quest_value for location lore when Ravensburger omits lore", () => {
    const items: PrintingItem[] = [
      minimalPrintingItem({
        name: "Zootopia",
        subtitle: "Tundratown",
        cardType: "location",
        move_cost: 1,
        quest_value: 2,
        lore: undefined,
      }),
    ];
    const printingIdsInOrder = ["set11-034"];
    const idMapping = pipelineIdMapping(
      [["zootopia - tundratown", "loc"]],
      items,
      printingIdsInOrder,
    );

    const result = generateCanonicalCardsFromPrintings(items, printingIdsInOrder, idMapping);

    expect(result["set11-034"]).toMatchObject({
      id: "loc",
      canonicalId: "ci_loc",
      cardType: "location",
      moveCost: 1,
      lore: 2,
    });
  });
});
