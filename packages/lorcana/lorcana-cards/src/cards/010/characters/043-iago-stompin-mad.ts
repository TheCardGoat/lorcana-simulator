import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoStompinMad: CharacterCard = {
  id: "UTt",
  canonicalId: "ci_UTt",
  reprints: ["set10-043"],
  cardType: "character",
  name: "Iago",
  version: "Stompin' Mad",
  i18n: {
    en: {
      name: "Iago",
      version: "Stompin' Mad",
      text: "Challenger +5",
    },
    de: {
      name: "Jago",
      version: "Rasend vor Wut",
      text: "Herausfordern +5",
    },
    fr: {
      name: "Iago",
      version: "Piétine de rage",
      text: "Offensif +5",
    },
    it: {
      name: "Iago",
      version: "Furioso",
      text: "Sfidante +5",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "010",
  cardNumber: 43,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_93fe86cf6bea47328896bd5ff2560694",
    tcgPlayer: 659181,
  },
  text: "Challenger +5",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "87v-1",
      keyword: "Challenger",
      type: "keyword",
      value: 5,
      text: "Challenger +5",
    },
  ],
};
