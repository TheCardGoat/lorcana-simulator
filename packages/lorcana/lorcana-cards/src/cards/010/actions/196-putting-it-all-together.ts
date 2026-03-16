import type { ActionCard } from "@tcg/lorcana-types";

export const puttingItAllTogether: ActionCard = {
  id: "GAi",
  canonicalId: "ci_GAi",
  reprints: ["set10-196"],
  cardType: "action",
  name: "Putting It All Together",
  i18n: {
    en: {
      name: "Putting It All Together",
      text: "Chosen opposing character can't challenge during their next turn. Draw a card.",
    },
    de: {
      name: "Alles zusammenfügen",
      text: "Wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht herausfordern. Ziehe 1 Karte.",
    },
    fr: {
      name: "Rassembler les indices",
      text: "Choisissez un personnage adverse qui ne peut pas défier lors de son prochain tour. Piochez une carte.",
    },
    it: {
      name: "Unire gli Indizi",
      text: "Un personaggio avversario a tua scelta non può sfidare durante il suo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 196,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5c1f05cc2e5c4dae84e51404de23df74",
    tcgPlayer: 653912,
  },
  text: "Chosen opposing character can't challenge during their next turn. Draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "their-next-turn",
            restriction: "cant-challenge",
            target: "CHOSEN_OPPOSING_CHARACTER",
            type: "restriction",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
