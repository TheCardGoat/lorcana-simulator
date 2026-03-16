import type { CharacterCard } from "@tcg/lorcana-types";

export const theWhiteRoseJewelOfTheGarden: CharacterCard = {
  id: "ZnW",
  canonicalId: "ci_ZnW",
  reprints: ["set6-040"],
  cardType: "character",
  name: "The White Rose",
  version: "Jewel of the Garden",
  i18n: {
    en: {
      name: "The White Rose",
      version: "Jewel of the Garden",
      text: [
        {
          title: "THE BEAUTY OF THE WORLD",
          description: "When you play this character, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Die Weiße Rose",
      version: "Juwel des Gartens",
      text: [
        {
          title: "SO BLÜH'N WIR VOLLER GLÜCK",
          description: "Wenn du diesen Charakter ausspielst, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "La Rose Blanche",
      version: "Joyau du jardin",
      text: [
        {
          title: "LA BEAUTÉ DU MONDE",
          description: "Lorsque vous jouez ce personnage, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "La Rosa Bianca",
      version: "Gioiello del Giardino",
      text: [
        {
          title: "FELICI IN PRIMAVERA",
          description: "Quando giochi questo personaggio, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 40,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6fbd9103624b4b8d95fec133326385c7",
    tcgPlayer: 593043,
  },
  text: [
    {
      title: "THE BEAUTY OF THE WORLD",
      description: "When you play this character, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1v8-1",
      name: "THE BEAUTY OF THE WORLD",
      text: "THE BEAUTY OF THE WORLD When you play this character, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
