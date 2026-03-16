import type { CharacterCard } from "@tcg/lorcana-types";

export const rafikiMysteriousSage: CharacterCard = {
  id: "HXN",
  canonicalId: "ci_HXN",
  reprints: ["set1-054"],
  cardType: "character",
  name: "Rafiki",
  version: "Mysterious Sage",
  i18n: {
    en: {
      name: "Rafiki",
      version: "Mysterious Sage",
      text: "Rush",
    },
    de: {
      name: "Rafiki",
      version: "Geheimnisvoller Weiser",
      text: "Rasant",
    },
    fr: {
      name: "RAFIKI",
      version: "Mystérieux sage",
      text: "Charge",
    },
    it: {
      name: "Rafiki",
      version: "Mysterious Sage",
      text: [
        {
          title: "Rush",
          description: "(This character can challenge the turn they're played.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 54,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_3939d10a183b4eb48b843a68c74ed87b",
    tcgPlayer: 501405,
  },
  text: "Rush",
  classifications: ["Dreamborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "zqh-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
