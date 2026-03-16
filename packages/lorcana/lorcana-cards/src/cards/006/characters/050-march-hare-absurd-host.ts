import type { CharacterCard } from "@tcg/lorcana-types";

export const marchHareAbsurdHost: CharacterCard = {
  id: "don",
  canonicalId: "ci_don",
  reprints: ["set6-050"],
  cardType: "character",
  name: "March Hare",
  version: "Absurd Host",
  i18n: {
    en: {
      name: "March Hare",
      version: "Absurd Host",
      text: "Rush",
    },
    de: {
      name: "Der Märzhase",
      version: "Alberner Gastgeber",
      text: "Rasant",
    },
    fr: {
      name: "Le Lièvre de Mars",
      version: "Hôte absurde",
      text: "Charge",
    },
    it: {
      name: "Leprotto Bisestile",
      version: "Ospite Assurdo",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 50,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dc31d36d626f403b871338da45d0a685",
    tcgPlayer: 588100,
  },
  text: "Rush",
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "110-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
