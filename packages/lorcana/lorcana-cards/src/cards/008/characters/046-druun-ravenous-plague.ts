import type { CharacterCard } from "@tcg/lorcana-types";

export const druunRavenousPlague: CharacterCard = {
  id: "puQ",
  canonicalId: "ci_puQ",
  reprints: ["set8-046"],
  cardType: "character",
  name: "Druun",
  version: "Ravenous Plague",
  i18n: {
    en: {
      name: "Druun",
      version: "Ravenous Plague",
      text: "Challenger +4",
    },
    de: {
      name: "Druun",
      version: "Gefräßige Plage",
      text: "Herausfordern +4",
    },
    fr: {
      name: "Druun",
      version: "Fléau vorace",
      text: "Offensif +4",
    },
    it: {
      name: "Druun",
      version: "Flagello Famelico",
      text: "Sfidante +4",
    },
  },
  inkType: ["amethyst"],
  franchise: "Raya and the Last Dragon",
  set: "008",
  cardNumber: 46,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e147780b566e405e84ffe7dab98ab97f",
    tcgPlayer: 632708,
  },
  text: "Challenger +4",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "c4i-1",
      keyword: "Challenger",
      type: "keyword",
      value: 4,
      text: "Challenger +4",
    },
  ],
};
