import type { CharacterCard } from "@tcg/lorcana-types";

export const gantuHamstervielsAccomplice: CharacterCard = {
  id: "qvC",
  canonicalId: "ci_qvC",
  reprints: ["set11-176"],
  cardType: "character",
  name: "Gantu",
  version: "Hamsterviel's Accomplice",
  i18n: {
    en: {
      name: "Gantu",
      version: "Hamsterviel's Accomplice",
      text: [
        {
          title: "EASY TARGET",
          description: "When you play this character, choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Gantu",
      version: "Van Hamsterdams Komplize",
      text: [
        {
          title: "LEICHTES ZIEL",
          description:
            "Wenn du diesen Charakter ausspielst, wähle 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Gantu",
      version: "Complice de Hämsterviel",
      text: [
        {
          title: "CIBLE FACILE",
          description: "Lorsque vous jouez ce personnage, défaussez une carte.",
        },
      ],
    },
    it: {
      name: "Gantu",
      version: "Complice di Hamsterviel",
      text: [
        {
          title: "BERSAGLIO FACILE",
          description: "Quando giochi questo personaggio, scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 176,
  rarity: "uncommon",
  cost: 1,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e58426a12e4840d1a58c49c2a147f6b4",
    tcgPlayer: 673305,
  },
  text: [
    {
      title: "EASY TARGET",
      description: "When you play this character, choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Alien", "Captain"],
  abilities: [
    {
      id: "3ds-1",
      effect: {
        amount: 1,
        chosen: true,
        target: "CONTROLLER",
        type: "discard",
      },
      name: "EASY TARGET",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "EASY TARGET When you play this character, choose and discard a card.",
    },
  ],
};
