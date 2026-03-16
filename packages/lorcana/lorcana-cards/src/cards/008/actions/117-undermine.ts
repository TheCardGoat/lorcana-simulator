import type { ActionCard } from "@tcg/lorcana-types";

export const undermine: ActionCard = {
  id: "p0c",
  canonicalId: "ci_p0c",
  reprints: ["set8-117"],
  cardType: "action",
  name: "Undermine",
  i18n: {
    en: {
      name: "Undermine",
      text: "Chosen opponent chooses and discards a card. Chosen character gets +2 {S} this turn.",
    },
    de: {
      name: "Sabotieren",
      text: "Eine gegnerische Person deiner Wahl wählt 1 Karte aus ihrer Hand und wirft sie ab. Gib einem Charakter deiner Wahl in diesem Zug +2.",
    },
    fr: {
      name: "Bousillage",
      text: "Choisissez un adversaire qui défausse une carte. Choisissez un personnage qui gagne +2 pour le reste de ce tour.",
    },
    it: {
      name: "Sabotare",
      text: "Un avversario a tua scelta sceglie e scarta una carta. Un personaggio a tua scelta riceve +2 per questo turno.",
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Atlantis",
  set: "008",
  cardNumber: 117,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_056bd71d4a064d9a890c5558a88de654",
    tcgPlayer: 631426,
  },
  text: "Chosen opponent chooses and discards a card. Chosen character gets +2 {S} this turn.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            chosen: true,
            from: "hand",
            target: "CHOSEN_PLAYER",
            type: "discard",
          },
          {
            chosenBy: "you",
            duration: "this-turn",
            modifier: 2,
            stat: "strength",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "z6k-1",
      text: "Chosen opponent chooses and discards a card. Chosen character gets +2 {S} this turn.",
      type: "action",
    },
  ],
};
