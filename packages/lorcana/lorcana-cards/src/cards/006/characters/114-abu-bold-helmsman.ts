import type { CharacterCard } from "@tcg/lorcana-types";

export const abuBoldHelmsman: CharacterCard = {
  id: "t59",
  canonicalId: "ci_t59",
  reprints: ["set6-114"],
  cardType: "character",
  name: "Abu",
  version: "Bold Helmsman",
  i18n: {
    en: {
      name: "Abu",
      version: "Bold Helmsman",
      text: "Rush",
    },
    de: {
      name: "Abu",
      version: "Mutiger Steuermann",
      text: "Rasant",
    },
    fr: {
      name: "Abu",
      version: "Timonier intrépide",
      text: "Charge",
    },
    it: {
      name: "Abu",
      version: "Timoniere Audace",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 114,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4b053bdcc56546798dfd962d892a3630",
    tcgPlayer: 592025,
  },
  text: "Rush",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1f2-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
