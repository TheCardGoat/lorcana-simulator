import type { CharacterCard } from "@tcg/lorcana-types";

export const thePhantomBlotShadowyFigure: CharacterCard = {
  id: "jqj",
  canonicalId: "ci_jqj",
  reprints: ["set7-135"],
  cardType: "character",
  name: "The Phantom Blot",
  version: "Shadowy Figure",
  i18n: {
    en: {
      name: "The Phantom Blot",
      version: "Shadowy Figure",
      text: "Rush",
    },
    de: {
      name: "Das Phantom",
      version: "Schattenhafte Gestalt",
      text: "Rasant",
    },
    fr: {
      name: "Le Fantôme Noir",
      version: "Figure de l'ombre",
      text: "Charge",
    },
    it: {
      name: "Macchia Nera",
      version: "Figura Misteriosa",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "007",
  cardNumber: 135,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_1d8717ca485141a48e480838e3667ca3",
    tcgPlayer: 619481,
  },
  text: "Rush",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1wy-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
