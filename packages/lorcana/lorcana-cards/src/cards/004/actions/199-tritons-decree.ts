import type { ActionCard } from "@tcg/lorcana-types";

export const tritonsDecree: ActionCard = {
  id: "DrR",
  canonicalId: "ci_DrR",
  reprints: ["set4-199"],
  cardType: "action",
  name: "Triton's Decree",
  i18n: {
    en: {
      name: "Triton's Decree",
      text: "Each opponent chooses one of their characters and deals 2 damage to them.",
    },
    de: {
      name: "Tritons Erlass",
      text: "Alle gegnerischen Mitspielenden wählen je einen ihrer Charaktere und fügen diesem 2 Schaden zu.",
    },
    fr: {
      name: "Décret de Triton",
      text: "Chaque adversaire choisit l'un de ses personnages et lui inflige 2 dommages.",
    },
    it: {
      name: "Decreto di Tritone",
      text: "Ogni avversario sceglie uno dei suoi personaggi e gli infligge 2 danni.",
    },
  },
  inkType: ["steel"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 199,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_b54632a900e042c39771ae748820bf43",
    tcgPlayer: 550625,
  },
  text: "Each opponent chooses one of their characters and deals 2 damage to them.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "deal-damage",
        amount: 2,
        chosenBy: "opponent",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
};
