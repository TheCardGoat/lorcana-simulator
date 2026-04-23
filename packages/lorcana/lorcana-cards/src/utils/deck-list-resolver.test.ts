import { describe, expect, it } from "bun:test";
import { getLorcanaDisplayName, resolveLorcanaDeckListText } from "./deck-list-resolver";

describe("deck-list-resolver", () => {
  it("resolves punctuation and case normalization variants", async () => {
    const result = await resolveLorcanaDeckListText("1 Grab your Bow\n1 Sail The Azurite Sea");

    expect(result.diagnostics.malformedLines).toHaveLength(0);
    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(result.cards).toHaveLength(2);
    expect(result.cards.map((card) => getLorcanaDisplayName(card))).toEqual([
      "Grab Your Bow",
      "Sail the Azurite Sea",
    ]);
  });

  it("resolves legacy alias display names", async () => {
    const result = await resolveLorcanaDeckListText("1 Mother Gothel - Devious Conspirator");

    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(getLorcanaDisplayName(result.cards[0] ?? result.resolvedCards[0].card)).toBe(
      "Mother Gothel - Underhanded Schemer",
    );
  });

  it("prefers latest set then lower rarity for ambiguous names", async () => {
    const result = await resolveLorcanaDeckListText("1 Under The Sea\n1 Into The Unknown");

    const underTheSea = result.resolvedCards[0];
    const intoTheUnknown = result.resolvedCards[1];

    expect(underTheSea?.card.set).toBe("009");
    expect(intoTheUnknown?.card.rarity).toBe("common");
  });

  it("reports malformed lines without throwing", async () => {
    const result = await resolveLorcanaDeckListText(
      "1 Sail The Azurite Sea\nthis line is malformed",
    );

    expect(result.diagnostics.malformedLines).toHaveLength(1);
    expect(result.cards).toHaveLength(1);
    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
  });

  it("reports unresolved names for package-only resolution", async () => {
    const result = await resolveLorcanaDeckListText("1 Definitely Not A Real Lorcana Card");

    expect(result.diagnostics.unresolvedNames).toEqual(["Definitely Not A Real Lorcana Card"]);
    expect(result.diagnostics.malformedLines).toHaveLength(0);
    expect(result.cards).toHaveLength(0);
  });

  it("resolves German localized card names", async () => {
    const result = await resolveLorcanaDeckListText("1 Sonnenschein - Gute Fee");

    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(result.cards).toHaveLength(1);
    expect(getLorcanaDisplayName(result.cards[0]!)).toBe("Merryweather - Good Fairy");
  });

  it("resolves mixed English and German deck list", async () => {
    const result = await resolveLorcanaDeckListText("1 Sonnenschein - Gute Fee\n1 Grab your Bow");

    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(result.cards).toHaveLength(2);
    expect(result.cards.map((card) => getLorcanaDisplayName(card))).toEqual([
      "Merryweather - Good Fairy",
      "Grab Your Bow",
    ]);
  });

  it("resolves French localized card names with accents", async () => {
    const result = await resolveLorcanaDeckListText("1 Pimprenelle - Bonne fée");

    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(result.cards).toHaveLength(1);
    expect(getLorcanaDisplayName(result.cards[0]!)).toBe("Merryweather - Good Fairy");
  });

  it("expands deck list quantities", async () => {
    const result = await resolveLorcanaDeckListText("2 Sail The Azurite Sea\n1 Grab your Bow");

    expect(result.diagnostics.unresolvedNames).toHaveLength(0);
    expect(result.cards).toHaveLength(3);
    expect(result.resolvedCards).toEqual([
      {
        cardName: "Sail The Azurite Sea",
        quantity: 2,
        card: result.cards[0],
        cardId: result.cards[0]!.id,
      },
      {
        cardName: "Grab your Bow",
        quantity: 1,
        card: result.cards[2],
        cardId: result.cards[2]!.id,
      },
    ]);
  });
});
