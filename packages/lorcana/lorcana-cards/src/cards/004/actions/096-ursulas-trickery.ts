import type { ActionCard } from "@tcg/lorcana-types";

export const ursulasTrickery: ActionCard = {
  id: "zNr",
  canonicalId: "ci_zNr",
  reprints: ["set4-096"],
  cardType: "action",
  name: "Ursula’s Trickery",
  i18n: {
    en: {
      name: "Ursula’s Trickery",
      text: "Each opponent may choose and discard a card. For each opponent who doesn't, you draw a card.",
    },
    de: {
      name: "Ursulas List",
      text: "Alle gegnerischen Mitspielenden dürfen je 1 Karte aus ihrer Hand wählen und abwerfen. Pro gegnerischer Person die keine Karte abwirft, ziehst du eine Karte.",
    },
    fr: {
      name: "Ruse d'Ursula",
      text: "Chaque adversaire peut défausser une carte de sa main. Vous piochez une carte pour chaque adversaire qui ne le fait pas.",
    },
    it: {
      name: "L'Inganno di Ursula",
      text: "Ogni avversario può scegliere e scartare una carta. Per ogni avversario che non lo fa, tu peschi una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 96,
  rarity: "uncommon",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ab7661f7212743ee9509dc6f2546baa6",
    tcgPlayer: 550586,
  },
  text: "Each opponent may choose and discard a card. For each opponent who doesn't, you draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            type: "optional",
            chooser: "OPPONENT",
            effect: {
              amount: 1,
              chosen: true,
              target: "OPPONENT",
              type: "discard",
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            else: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
          },
        ],
        type: "sequence",
      },
      id: "1sb-1",
      text: "Each opponent may choose and discard a card. For each opponent who doesn't, you draw a card.",
      type: "action",
    },
  ],
};
