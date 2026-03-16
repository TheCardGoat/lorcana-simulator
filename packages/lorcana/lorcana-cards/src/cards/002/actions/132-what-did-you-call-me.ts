import type { ActionCard } from "@tcg/lorcana-types";

export const whatDidYouCallMe: ActionCard = {
  id: "Dew",
  canonicalId: "ci_Dew",
  reprints: ["set2-132"],
  cardType: "action",
  name: "What Did You Call Me?",
  i18n: {
    en: {
      name: "What Did You Call Me?",
      text: "Chosen damaged character gets +3 {S} this turn.",
    },
    de: {
      name: "Wie hast du mich genannt?",
      text: "Gib einem beschädigten Charakter deiner Wahl in diesem Zug +3.",
    },
    fr: {
      name: "Comment m'as-tu nommé ?",
      text: "Choisissez un personnage blessé, il gagne +3 pour le reste de ce tour.",
    },
    it: {
      name: "What Did You Call Me?",
      text: "Chosen damaged character gets +3 this turn.",
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 132,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b62b44f1e2144c1e9ebec3da471579c3",
    tcgPlayer: 527760,
  },
  text: "Chosen damaged character gets +3 {S} this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        modifier: 3,
        stat: "strength",
        target: "CHOSEN_DAMAGED_CHARACTER",
        type: "modify-stat",
      },
    },
  ],
};
