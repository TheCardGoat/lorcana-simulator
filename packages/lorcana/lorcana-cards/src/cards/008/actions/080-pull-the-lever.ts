import type { ActionCard } from "@tcg/lorcana-types";

export const pullTheLever: ActionCard = {
  id: "e3L",
  canonicalId: "ci_e3L",
  reprints: ["set8-080"],
  cardType: "action",
  name: "Pull the Lever!",
  i18n: {
    en: {
      name: "Pull the Lever!",
      text: "Choose one:\n- Draw 2 cards.\n- Each opponent chooses and discards a card.",
    },
    de: {
      name: "Zieh den Hebel!",
      text: "Wähle eine Möglichkeit aus: • Ziehe 2 Karten. • Alle gegnerischen Mitspielenden wählen je 1 Karte aus ihrer Hand und werfen sie ab.",
    },
    fr: {
      name: "Abaisse le levier !",
      text: "Choisissez entre: • Piochez 2 cartes. • Chaque adversaire défausse une carte.",
    },
    it: {
      name: "Abbassa la Leva!",
      text: "Scegli uno: • Pesca 2 carte. • Ogni avversario sceglie e scarta una carta.",
    },
  },
  inkType: ["amethyst", "emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 80,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_6cc548274208402aa28a8b1da0c983aa",
    tcgPlayer: 631402,
  },
  text: "Choose one:\n- Draw 2 cards.\n- Each opponent chooses and discards a card.",
  abilities: [
    {
      type: "action",
      text: "Choose one:\n- Draw 2 cards.\n- Each opponent chooses and discards a card.",
      effect: {
        type: "choice",
        options: [
          {
            type: "draw",
            amount: 2,
            target: "CONTROLLER",
          },
          {
            type: "discard",
            amount: 1,
            chosen: true,
            from: "hand",
            target: "EACH_OPPONENT",
          },
        ],
      },
    },
  ],
};
