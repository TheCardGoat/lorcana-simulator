import type { CharacterCard } from "@tcg/lorcana-types";

export const cogsworthClimbingClock: CharacterCard = {
  id: "ATx",
  canonicalId: "ci_ATx",
  reprints: ["set7-130"],
  cardType: "character",
  name: "Cogsworth",
  version: "Climbing Clock",
  i18n: {
    en: {
      name: "Cogsworth",
      version: "Climbing Clock",
      text: [
        {
          title: "STILL USEFUL",
          description: "While you have an item card in your discard, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Von Unruh",
      version: "Kletternde Uhr",
      text: [
        {
          title: "NOCH IMMER NÜTZLICH",
          description:
            "Solange du mindestens eine Gegenstandskarte in deinem Ablagestapel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Big Ben",
      version: "Horloge grimpeuse",
      text: [
        {
          title: "ENCORE UTILE",
          description:
            "Tant que vous avez une carte Objet dans votre défausse, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Tockins",
      version: "Orologio Scalatore",
      text: [
        {
          title: "ANCORA UTILE",
          description:
            "Mentre hai una carta oggetto nei tuoi scarti, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 130,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e99e5b9bd2747d29e6393aff2685158",
    tcgPlayer: 619477,
  },
  text: [
    {
      title: "STILL USEFUL",
      description: "While you have an item card in your discard, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1th-1",
      text: "STILL USEFUL While you have an item card in your discard, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
