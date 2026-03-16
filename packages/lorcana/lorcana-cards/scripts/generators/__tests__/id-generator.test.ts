import { describe, expect, it } from "bun:test";
import { assignPrintingIds } from "../id-generator";
import type { CanonicalCard } from "../../types";

function getFullNameFromCard(card: { name?: string; subtitle?: string }): string {
  return card.subtitle ? `${card.name ?? ""} - ${card.subtitle}` : (card.name ?? "");
}

function minimalItems(
  entries: Array<{ name: string; subtitle?: string }>,
): Array<{ card: { name?: string; subtitle?: string } }> {
  return entries.map((e) => ({ card: { name: e.name, subtitle: e.subtitle } }));
}

describe("assignPrintingIds", () => {
  it("reuses existing 3-char ids from existingCanonicalCards when valid and unique", () => {
    const items = minimalItems([{ name: "Dragon Fire" }, { name: "Alice", subtitle: "Wonder" }]);
    const printingIdsInOrder = ["set1-001", "set1-002"];
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-001": { id: "abc", name: "Dragon", version: "Fire" } as CanonicalCard,
      "set1-002": { id: "def", name: "Alice", version: "Wonder" } as CanonicalCard,
    };
    const result = assignPrintingIds(
      items,
      printingIdsInOrder,
      getFullNameFromCard,
      existingCanonicalCards,
    );
    expect(result.byPrintingId["set1-001"]).toBe("abc");
    expect(result.byPrintingId["set1-002"]).toBe("def");
    expect(result.byCanonicalKey["dragon fire"]).toBe("abc");
    expect(result.byCanonicalKey["alice - wonder"]).toBe("def");
    expect(result.byShortId["abc"]).toBe("dragon fire");
    expect(result.byShortId["def"]).toBe("alice - wonder");
  });

  it("regenerates when existing id length !== 3", () => {
    const items = minimalItems([{ name: "Dragon Fire" }]);
    const printingIdsInOrder = ["set1-001"];
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-001": { id: "ab", name: "Dragon", version: "Fire" } as CanonicalCard,
    };
    const result = assignPrintingIds(
      items,
      printingIdsInOrder,
      getFullNameFromCard,
      existingCanonicalCards,
    );
    expect(result.byPrintingId["set1-001"]).toBeDefined();
    expect(result.byPrintingId["set1-001"]!.length).toBe(3);
    expect(result.byPrintingId["set1-001"]).not.toBe("ab");
  });

  it("reuses first occurrence when existing id is duplicate; regenerates second", () => {
    const items = minimalItems([{ name: "Card A" }, { name: "Card B" }]);
    const printingIdsInOrder = ["set1-001", "set1-002"];
    const existingCanonicalCards: Record<string, CanonicalCard> = {
      "set1-001": { id: "xyz", name: "Card", version: "A" } as CanonicalCard,
      "set1-002": { id: "xyz", name: "Card", version: "B" } as CanonicalCard,
    };
    const result = assignPrintingIds(
      items,
      printingIdsInOrder,
      getFullNameFromCard,
      existingCanonicalCards,
    );
    const id1 = result.byPrintingId["set1-001"];
    const id2 = result.byPrintingId["set1-002"];
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1!.length).toBe(3);
    expect(id2!.length).toBe(3);
    expect(id1).toBe("xyz"); // first occurrence keeps existing id
    expect(id2).not.toBe("xyz"); // duplicate gets new id
    expect(id1).not.toBe(id2);
  });

  it("generates new 3-char ids when no existing cards", () => {
    const items = minimalItems([{ name: "Dragon Fire" }, { name: "Alice" }, { name: "Bob" }]);
    const printingIdsInOrder = ["set1-001", "set1-002", "set1-003"];
    const result = assignPrintingIds(items, printingIdsInOrder, getFullNameFromCard);
    expect(result.byPrintingId["set1-001"]!.length).toBe(3);
    expect(result.byPrintingId["set1-002"]!.length).toBe(3);
    expect(result.byPrintingId["set1-003"]!.length).toBe(3);
    expect(result.byPrintingId["set1-001"]).not.toBe(result.byPrintingId["set1-002"]);
    expect(result.byPrintingId["set1-002"]).not.toBe(result.byPrintingId["set1-003"]);
    expect(result.byCanonicalKey["dragon fire"]).toBe(result.byPrintingId["set1-001"]);
    expect(result.byCanonicalKey["alice"]).toBe(result.byPrintingId["set1-002"]);
    expect(result.byCanonicalKey["bob"]).toBe(result.byPrintingId["set1-003"]);
  });
});
