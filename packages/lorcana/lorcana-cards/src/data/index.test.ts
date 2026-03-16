import { describe, expect, it } from "bun:test";
import { cardsAuxKv, canonicalCards, getLocalizedCardSync } from "./index";

describe("getLocalizedCardSync", () => {
  it("returns locale-specific fields from embedded i18n without external localization data", () => {
    const italianCard = getLocalizedCardSync("156", "it", {});

    expect(italianCard).toBeDefined();
    expect(italianCard?.name).toBe("Re Stefano");
    expect(italianCard?.version).toBe("Padre Novello");
    expect(italianCard?.rulesText).toBe("");
  });

  it("keeps english identical to canonical top-level fields", () => {
    const englishCard = getLocalizedCardSync("156", "en", {});
    const canonicalCard = canonicalCards["156"];

    expect(englishCard).toEqual(canonicalCard);
    expect(englishCard?.i18n.en.name).toBe(canonicalCard?.name);
  });

  it("returns the same localized values for different printings of the same canonical card", () => {
    const reprintEntry = Object.entries(cardsAuxKv.printingIdsByCanonicalId).find(
      ([, printingIds]) => printingIds.length > 1,
    );

    expect(reprintEntry).toBeDefined();

    const [canonicalId, printingIds] = reprintEntry!;
    const shortIds = printingIds
      .map((printingId) => cardsAuxKv.printingIdToShortId[printingId])
      .filter((shortId): shortId is string => Boolean(shortId))
      .slice(0, 2);

    expect(shortIds).toHaveLength(2);

    const first = getLocalizedCardSync(shortIds[0]!, "de", {});
    const second = getLocalizedCardSync(shortIds[1]!, "de", {});

    expect(first?.canonicalId).toBe(canonicalId);
    expect(second?.canonicalId).toBe(canonicalId);
    expect(first?.name).toBe(second?.name);
    expect(first?.version).toBe(second?.version);
    expect(first?.rulesText).toBe(second?.rulesText);
  });
});
