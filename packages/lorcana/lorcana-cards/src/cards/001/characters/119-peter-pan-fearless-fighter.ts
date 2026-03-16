import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanFearlessFighter: CharacterCard = {
  id: "1O4",
  canonicalId: "ci_1O4",
  reprints: ["set1-119"],
  cardType: "character",
  name: "Peter Pan",
  version: "Fearless Fighter",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "Fearless Fighter",
      text: "Rush",
    },
    de: {
      name: "Peter Pan",
      version: "Furchtloser Kämpfer",
      text: "Rasant",
    },
    fr: {
      name: "PETER PAN",
      version: "Combattant intrépide",
      text: "Charge",
    },
    it: {
      name: "Peter Pan",
      version: "Fearless Fighter",
      text: [
        {
          title: "Rush",
          description: "(This character can challenge the turn they're played.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 119,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_7f4cc9a32a834ebabaeaea3407d06dbc",
    tcgPlayer: 508787,
  },
  text: "Rush",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "czp-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
