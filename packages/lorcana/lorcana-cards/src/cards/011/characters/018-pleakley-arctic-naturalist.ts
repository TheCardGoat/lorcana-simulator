import type { CharacterCard } from "@tcg/lorcana-types";

export const pleakleyArcticNaturalist: CharacterCard = {
  id: "rDI",
  canonicalId: "ci_rDI",
  reprints: ["set11-018"],
  cardType: "character",
  name: "Pleakley",
  version: "Arctic Naturalist",
  i18n: {
    en: {
      name: "Pleakley",
      version: "Arctic Naturalist",
      text: [
        {
          title: "SIGNS OF LIFE",
          description:
            "When you play this character, if you have another Alien character in play, draw a card.",
        },
      ],
    },
    de: {
      name: "Pliiklii",
      version: "Arktischer Naturforscher",
      text: [
        {
          title: "LEBENSZEICHEN",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen weiteren Alien im Spiel hast, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Pikly",
      version: "Naturaliste arctique",
      text: [
        {
          title: "SIGNES DE VIE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un autre personnage Alien en jeu, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Pleakley",
      version: "Naturalista Artico",
      text: [
        {
          title: "SEGNI DI VITA",
          description:
            "Quando giochi questo personaggio, se hai in gioco un altro personaggio Alieno, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 18,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d2e66bee41214f2f9b1e38f4e1ccdbc3",
    tcgPlayer: 673069,
  },
  text: [
    {
      title: "SIGNS OF LIFE",
      description:
        "When you play this character, if you have another Alien character in play, draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Alien"],
  abilities: [
    {
      id: "6qd-1",
      effect: {
        condition: {
          expression: "you have another Alien character in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "SIGNS OF LIFE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SIGNS OF LIFE When you play this character, if you have another Alien character in play, draw a card.",
    },
  ],
};
