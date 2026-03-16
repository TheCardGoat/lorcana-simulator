import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinStreetRat: CharacterCard = {
  id: "ZTM",
  canonicalId: "ci_ZTM",
  reprints: ["set1-105"],
  cardType: "character",
  name: "Aladdin",
  version: "Street Rat",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Street Rat",
      text: [
        {
          title: "IMPROVISE",
          description: "When you play this character, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Straßenjunge",
      text: [
        {
          title: "MIR WIRD SCHON WAS EINFALLEN",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "ALADDIN",
      version: "Vaurien",
      text: [
        {
          title: "IMPROVISE\\",
          description: "Lorsque vous jouez ce personnage, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Aladdin",
      version: "Street Rat",
      text: [
        {
          title: "IMPROVISE",
          description: "When you play this character, each opponent loses 1 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 105,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a2d28e5e695747fb95ebe50f891eb0b4",
    tcgPlayer: 505947,
  },
  text: [
    {
      title: "IMPROVISE",
      description: "When you play this character, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "ec0-1",
      name: "IMPROVISE",
      text: "IMPROVISE When you play this character, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
