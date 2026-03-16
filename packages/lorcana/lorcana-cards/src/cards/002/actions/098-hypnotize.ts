import type { ActionCard } from "@tcg/lorcana-types";

export const hypnotize: ActionCard = {
  id: "Sez",
  canonicalId: "ci_Sez",
  reprints: ["set2-098"],
  cardType: "action",
  name: "Hypnotize",
  i18n: {
    en: {
      name: "Hypnotize",
      text: "Each opponent chooses and discards a card. Draw a card.",
    },
    de: {
      name: "Hypnose",
      text: "Alle gegnerischen Mitspielenden wählen je 1 Karte aus ihrer Hand und werfen diese ab. Ziehe 1 Karte.",
    },
    fr: {
      name: "Hypnotiser",
      text: "Chaque adversaire choisit une carte et la défausse. Piochez une carte.",
    },
    it: {
      name: "Ipnotizzare",
      text: "Ogni avversario sceglie e scarta una carta. Pesca una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "002",
  cardNumber: 98,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_1391eb60b4054ac9a02e6b1f0e150c0f",
    tcgPlayer: 518790,
  },
  text: "Each opponent chooses and discards a card. Draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 1,
            chosen: true,
            target: "EACH_OPPONENT",
            type: "discard",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
      },
    },
  ],
};
