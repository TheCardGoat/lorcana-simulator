import type { ActionCard } from "@tcg/lorcana-types";

export const signTheScroll: ActionCard = {
  id: "zkw",
  canonicalId: "ci_zkw",
  reprints: ["set4-030"],
  cardType: "action",
  name: "Sign the Scroll",
  i18n: {
    en: {
      name: "Sign the Scroll",
      text: "Each opponent may choose and discard a card. For each opponent who doesn't, you gain 2 lore.",
    },
    de: {
      name: "Unterschreib die Rolle",
      text: "Alle gegnerischen Mitspielenden dürfen je 1 Karte aus ihrer Hand wählen und abwerfen. Pro gegnerischer Person, die keine Karte abwirft, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Signe le contrat",
      text: "Chaque adversaire peut choisir et défausser une carte. Vous gagnez 2 éclats de Lore pour chaque adversaire qui ne le fait pas.",
    },
    it: {
      name: "Firma Questa Pergamena",
      text: "Ogni avversario può scegliere e scartare una carta. Per ogni avversario che non lo fa, ottieni 2 leggenda.",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 30,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_9f0c12874b204c0f99d48aa7ddb68c51",
    tcgPlayer: 547681,
  },
  text: "Each opponent may choose and discard a card. For each opponent who doesn't, you gain 2 lore.",
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
              amount: 2,
              target: "CONTROLLER",
              type: "gain-lore",
            },
          },
        ],
        type: "sequence",
      },
      id: "ggh-1",
      text: "Each opponent may choose and discard a card. For each opponent who doesn't, you gain 2 lore.",
      type: "action",
    },
  ],
};
