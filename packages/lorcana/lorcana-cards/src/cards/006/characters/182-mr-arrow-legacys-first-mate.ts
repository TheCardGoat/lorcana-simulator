import type { CharacterCard } from "@tcg/lorcana-types";

export const mrArrowLegacysFirstMate: CharacterCard = {
  id: "Sh0",
  canonicalId: "ci_Sh0",
  reprints: ["set6-182"],
  cardType: "character",
  name: "Mr. Arrow",
  version: "Legacy's First Mate",
  i18n: {
    en: {
      name: "Mr. Arrow",
      version: "Legacy's First Mate",
      text: "Resist +1",
    },
    de: {
      name: "Arrow",
      version: "Erster Maat der Legacy",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Monsieur Arrow",
      version: "Second du RLS Héritage",
      text: "Résistance +1 (Les dommages qui sont infligés à ce personnage sont réduits de 1.)",
    },
    it: {
      name: "Signor Arrow",
      version: "Primo Ufficiale della Legacy",
      text: "Resistere +1",
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 182,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7bea7155c9164c43949d5e4031b5d810",
    tcgPlayer: 587970,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      id: "1am-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
