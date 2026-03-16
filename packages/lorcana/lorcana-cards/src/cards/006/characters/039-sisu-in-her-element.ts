import type { CharacterCard } from "@tcg/lorcana-types";

export const sisuInHerElement: CharacterCard = {
  id: "qi6",
  canonicalId: "ci_qi6",
  reprints: ["set6-039"],
  cardType: "character",
  name: "Sisu",
  version: "In Her Element",
  i18n: {
    en: {
      name: "Sisu",
      version: "In Her Element",
      text: "Challenger +2 (While challenging, this character gets +2 {S}).",
    },
    de: {
      name: "Sisu",
      version: "In ihrem Element",
      text: "Herausfordern +2",
    },
    fr: {
      name: "Sisu",
      version: "Dans son élément",
      text: "Offensif +2",
    },
    it: {
      name: "Sisu",
      version: "Nel Suo Elemento",
      text: "Sfidante +2",
    },
  },
  inkType: ["amethyst"],
  franchise: "Raya and the Last Dragon",
  set: "006",
  cardNumber: 39,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c695077508c44d728ac42c65ac8c97ab",
    tcgPlayer: 578173,
  },
  text: "Challenger +2 (While challenging, this character gets +2 {S}).",
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      id: "39b-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2.",
    },
  ],
};
