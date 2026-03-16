import type { ActionCard } from "@tcg/lorcana-types";

export const thisIsMyFamily: ActionCard = {
  id: "7pX",
  canonicalId: "ci_7pX",
  reprints: ["set7-081"],
  cardType: "action",
  name: "This Is My Family",
  i18n: {
    en: {
      name: "This Is My Family",
      text: "Gain 1 lore. Draw a card.",
    },
    de: {
      name: "Meine Familie",
      text: "Sammle 1 Legende. Ziehe 1 Karte.",
    },
    fr: {
      name: "C'est ma famille",
      text: "Gagnez 1 éclat de Lore. Piochez une carte.",
    },
    it: {
      name: "I Mitici Madrigal",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Ottieni 1 leggenda. Pesca una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 81,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_703029977ead4c46bf7f4991b6fd1736",
    tcgPlayer: 619448,
  },
  text: "Gain 1 lore. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            type: "gain-lore",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "1io-1",
      text: "Gain 1 lore. Draw a card.",
      type: "action",
    },
  ],
};
