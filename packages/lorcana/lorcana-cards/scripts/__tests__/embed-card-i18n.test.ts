import { describe, expect, it } from "bun:test";
import type { I18nProperties } from "@tcg/lorcana-types";
import {
  buildEnglishI18nProperties,
  cardTextToRulesText,
  embedI18nInCanonicalCards,
} from "../embed-card-i18n";
import type { CanonicalCard, CardsAuxKv, LocalizationData } from "../types";

function createCanonicalCard(overrides: Partial<CanonicalCard> = {}): CanonicalCard {
  return {
    id: "abc",
    canonicalId: "ci_shared",
    cardType: "action",
    name: "Test Card",
    version: "",
    inkType: ["amber"],
    cost: 2,
    inkable: true,
    i18n: {} as Record<"en" | "de" | "fr" | "it", I18nProperties>,
    vanilla: false,
    rulesText: "Draw a card.",
    ...overrides,
  };
}

function createAuxKv(overrides: Partial<CardsAuxKv> = {}): CardsAuxKv {
  return {
    canonicalIdByShortId: {},
    representativeShortIdByCanonicalId: { ci_shared: "abc" },
    printingIdToShortId: {},
    printingIdsByCanonicalId: {},
    baseReprintIdsByCanonicalId: {},
    localizationShortIdByCultureInvariantId: {},
    ...overrides,
  };
}

function createLocalizationEntry(
  overrides: Partial<LocalizationData[string]> = {},
): LocalizationData[string] {
  return {
    name: "Localized Test Card",
    version: "",
    rulesText: "Carta localizzata.",
    text: "Carta localizzata.",
    flavorText: "",
    searchableKeywords: [],
    ...overrides,
  };
}

describe("buildEnglishI18nProperties", () => {
  it("derives english i18n from canonical card fields", () => {
    expect(
      buildEnglishI18nProperties(
        createCanonicalCard({
          name: "Dragon Fire",
          version: "Alt",
          rulesText: "Banish chosen character.",
        }),
      ),
    ).toEqual({
      name: "Dragon Fire",
      version: "Alt",
      text: "Banish chosen character.",
    });
  });
});

describe("embedI18nInCanonicalCards", () => {
  it("embeds locale data by direct shortId lookup", () => {
    const cards = {
      "set1-001": createCanonicalCard(),
    };

    const result = embedI18nInCanonicalCards(cards, createAuxKv(), {
      de: { abc: createLocalizationEntry({ name: "Direkt" }) },
      fr: { abc: createLocalizationEntry({ name: "Direct" }) },
      it: { abc: createLocalizationEntry({ name: "Diretto" }) },
    });

    expect(result["set1-001"]?.i18n.en).toEqual({
      name: "Test Card",
      text: "Draw a card.",
    });
    expect(result["set1-001"]?.i18n.de.name).toBe("Direkt");
    expect(result["set1-001"]?.i18n.fr.name).toBe("Direct");
    expect(result["set1-001"]?.i18n.it.name).toBe("Diretto");
  });

  it("falls back to representative shortId when a reprint has no direct locale entry", () => {
    const cards = {
      "set1-001": createCanonicalCard({ id: "xyz", canonicalId: "ci_shared" }),
    };

    const result = embedI18nInCanonicalCards(cards, createAuxKv(), {
      de: { abc: createLocalizationEntry({ name: "Vertreter" }) },
      fr: { abc: createLocalizationEntry({ name: "Representant" }) },
      it: { abc: createLocalizationEntry({ name: "Rappresentante" }) },
    });

    expect(result["set1-001"]?.i18n.de.name).toBe("Vertreter");
    expect(result["set1-001"]?.i18n.fr.name).toBe("Representant");
    expect(result["set1-001"]?.i18n.it.name).toBe("Rappresentante");
  });

  it("throws when a required locale cannot be resolved", () => {
    const cards = {
      "set1-001": createCanonicalCard({ id: "missing" }),
    };

    expect(() =>
      embedI18nInCanonicalCards(cards, createAuxKv(), {
        de: {},
        fr: {},
        it: {},
      }),
    ).toThrow("Missing de localization");
  });
});

describe("cardTextToRulesText", () => {
  it("serializes structured card text into rules text", () => {
    expect(
      cardTextToRulesText([
        {
          title: "SHIFT 5",
          description: "(You may pay 5 to play this on top of your characters.)",
        },
        { title: "TRIGGER", description: "Draw a card." },
      ]),
    ).toBe("SHIFT 5 (You may pay 5 to play this on top of your characters.) TRIGGER Draw a card.");
  });
});
