import type { CharacterCard } from "@tcg/lorcana-types";

export const teKLavaMonster: CharacterCard = {
  id: "e8J",
  canonicalId: "ci_e8J",
  reprints: ["set7-058"],
  cardType: "character",
  name: "Te Kā",
  version: "Lava Monster",
  i18n: {
    en: {
      name: "Te Kā",
      version: "Lava Monster",
      text: "Challenger +2",
    },
    de: {
      name: "Te Kā",
      version: "Lava-Monster",
      text: "Herausfordern +2",
    },
    fr: {
      name: "TE KĀ",
      version: "Monstre de lave",
      text: "Offensif +2",
    },
    it: {
      name: "Te Kā",
      version: "Mostro di Lava",
      text: "Sfidante +2",
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "007",
  cardNumber: 58,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ef4c7e8b987648b1ad759f754aaafc9e",
    tcgPlayer: 619436,
  },
  text: "Challenger +2",
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      id: "84p-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
