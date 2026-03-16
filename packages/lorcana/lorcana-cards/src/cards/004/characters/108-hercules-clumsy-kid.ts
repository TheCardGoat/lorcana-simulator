import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesClumsyKid: CharacterCard = {
  id: "6ct",
  canonicalId: "ci_6ct",
  reprints: ["set4-108"],
  cardType: "character",
  name: "Hercules",
  version: "Clumsy Kid",
  i18n: {
    en: {
      name: "Hercules",
      version: "Clumsy Kid",
      text: "Rush",
    },
    de: {
      name: "Hercules",
      version: "Tollpatschiges Kind",
      text: "Rasant",
    },
    fr: {
      name: "Hercule",
      version: "Gamin maladroit",
      text: "Charge",
    },
    it: {
      name: "Ercole",
      version: "Ragazzino Impacciato",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 108,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_606b261078744cc8819ce42293651b88",
    tcgPlayer: 547702,
  },
  text: "Rush",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1l5-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
