import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckNotAgain: CharacterCard = {
  id: "2q9",
  canonicalId: "ci_2q9",
  reprints: ["set2-106"],
  cardType: "character",
  name: "Donald Duck",
  version: "Not Again!",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Not Again!",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "PHOOEY!",
          description: "This character gets +1 {L} for each 1 damage on him.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Nicht schon wieder!",
      text: "Wendig ES REICHT! Dieser Charakter erhält für jeden Schaden auf ihm +1.",
    },
    fr: {
      name: "Donald",
      version: "Pas encore !",
      text: "Insaisissable J'EN AI ASSEZ! Ce personnage gagne +1 pour chaque jeton Dommage sur lui.",
    },
    it: {
      name: "Donald Duck",
      version: "Not Again!",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) PHOOEY! This character gets +1 for each 1 damage on him.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "002",
  cardNumber: 106,
  rarity: "legendary",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9599f783023446468e24ada470972aa4",
    tcgPlayer: 527754,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "PHOOEY!",
      description: "This character gets +1 {L} for each 1 damage on him.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1mm-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: {
          type: "damage-on-self",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1mm-2",
      text: "PHOOEY! This character gets +1 {L} for each 1 damage on him.",
      type: "static",
    },
  ],
};
