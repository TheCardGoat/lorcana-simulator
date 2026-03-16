import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckPerfectGentleman: CharacterCard = {
  id: "op2",
  canonicalId: "ci_rpq",
  reprints: ["set2-077", "set9-085"],
  cardType: "character",
  name: "Donald Duck",
  version: "Perfect Gentleman",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Perfect Gentleman",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "ALLOW ME",
          description: "At the start of your turn, each player may draw a card.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Perfekter Gentleman",
      text: "Gestaltwandel 3 GESTATTEN? Jedes Mal zu Beginn deines Zuges dürfen alle Mitspielenden (auch du) je 1 Karte ziehen.",
    },
    fr: {
      name: "Donald",
      version: "Parfait gentleman",
      text: "Alter 3 PERMETTEZ-MOI Au début de chacun de vos tours, chaque joueur peut piocher une carte.",
    },
    it: {
      name: "Donald Duck",
      version: "Perfect Gentleman",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Donald Duck.) ALLOW ME At the start of your turn, each player may draw a card.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "009",
  cardNumber: 85,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0fbd5245e47044bc842780f9340d4ddd",
    tcgPlayer: 650025,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "ALLOW ME",
      description: "At the start of your turn, each player may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "wjj-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "wjj-2",
      effect: {
        amount: 1,
        target: "EACH_PLAYER",
        type: "draw",
      },
      type: "action",
      text: "ALLOW ME At the start of your turn, each player may draw a card.",
    },
  ],
};
