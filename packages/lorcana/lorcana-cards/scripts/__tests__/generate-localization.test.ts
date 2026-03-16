import { describe, expect, it } from "bun:test";
import type { InputCard } from "../types";
import { buildLocalizedCardData } from "../generate-localization";

function createInputCard(overrides: Partial<InputCard> = {}): InputCard {
  return {
    name: "Test Card",
    subtitle: "Test Subtitle",
    rarity: "common",
    ink_cost: 3,
    sort_number: 1,
    additional_info: [],
    ink_convertible: true,
    abilities: [],
    subtypes: [],
    flavor_text: "Flavor",
    rules_text: "Ward",
    card_identifier: "1/204 EN 1",
    thumbnail_url: "https://example.com/thumb.jpg",
    variants: [],
    card_sets: ["set1"],
    magic_ink_colors: ["amber"],
    searchable_keywords: ["Little Mermaid"],
    ...overrides,
  };
}

describe("buildLocalizedCardData", () => {
  it("builds normalized string rulesText and structured text for named abilities", () => {
    const card = createInputCard({
      name: "Nursemaid",
      rules_text:
        "NURSEMAID Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      searchable_keywords: ["Little Mermaid", "La Petite Sirene"],
    });

    const localized = buildLocalizedCardData(card, "de");

    expect(localized.rulesText).toBe(
      "NURSEMAID Whenever you play a Floodborn character, you may remove all damage from chosen character.",
    );
    expect(localized.text).toEqual([
      {
        title: "NURSEMAID",
        description:
          "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      },
    ]);
    expect(localized.searchableKeywords).toEqual(["Little Mermaid", "La Petite Sirene"]);
  });

  it("returns empty string values for empty rules text", () => {
    const card = createInputCard({ rules_text: " \n " });

    const localized = buildLocalizedCardData(card, "de");

    expect(localized.rulesText).toBe("");
    expect(localized.text).toBe("");
  });

  it("strips known reminder text before structuring localized rules text", () => {
    const localized = buildLocalizedCardData(
      createInputCard({
        rules_text:
          "Insaisissable (Seuls les personnages avec Insaisissable peuvent défier ce personnage.)\nPRÊT À RÉAGIR Chaque fois que vous jouez une action, piochez une carte.",
      }),
      "fr",
    );

    expect(localized.rulesText).toBe(
      "Insaisissable\nPRÊT À RÉAGIR Chaque fois que vous jouez une action, piochez une carte.",
    );
    expect(localized.text).toEqual([
      { title: "Insaisissable" },
      { title: "PRÊT À RÉAGIR Chaque fois que vous jouez une action, piochez une carte." },
    ]);
  });
});
