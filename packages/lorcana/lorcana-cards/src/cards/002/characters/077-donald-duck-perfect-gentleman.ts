import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckPerfectGentleman: CharacterCard = {
  id: "fS0",
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
          title: "Shift 3",
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
  set: "002",
  cardNumber: 77,
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
      title: "Shift 3",
    },
    {
      title: "ALLOW ME",
      description: "At the start of your turn, each player may draw a card.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
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
      name: "ALLOW ME",
      text: "ALLOW ME At the start of your turn, each player may draw a card.",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "optional",
            chooser: "CONTROLLER",
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
          },
          {
            type: "optional",
            chooser: "OPPONENT",
            effect: {
              amount: 1,
              target: "OPPONENT",
              type: "draw",
            },
          },
        ],
      },
    },
  ],
};
