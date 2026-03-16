import type { CharacterCard } from "@tcg/lorcana-types";

export const tiggerOneOfAKind: CharacterCard = {
  id: "n3U",
  canonicalId: "ci_n3U",
  reprints: ["set2-127"],
  cardType: "character",
  name: "Tigger",
  version: "One of a Kind",
  i18n: {
    en: {
      name: "Tigger",
      version: "One of a Kind",
      text: [
        {
          title: "ENERGETIC",
          description: "Whenever you play an action, this character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Tigger",
      version: "Einzigartig",
      text: [
        {
          title: "VOLLER ENERGIE",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, erhält dieser Charakter in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Tigrou",
      version: "Unique en son genre",
      text: [
        {
          title: "ÉNERGIQUE",
          description:
            "Chaque fois que vous jouez une carte Action, ce personnage gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Tigger",
      version: "One of a Kind",
      text: [
        {
          title: "ENERGETIC",
          description: "Whenever you play an action, this character gets +2 this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Winnie the Pooh",
  set: "002",
  cardNumber: 127,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a3aef995690e4b4995241341af5f31e3",
    tcgPlayer: 524189,
  },
  text: [
    {
      title: "ENERGETIC",
      description: "Whenever you play an action, this character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Tigger"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1ns-1",
      name: "ENERGETIC",
      text: "ENERGETIC Whenever you play an action, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
