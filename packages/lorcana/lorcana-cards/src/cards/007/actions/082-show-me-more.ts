import type { ActionCard } from "@tcg/lorcana-types";

export const showMeMore: ActionCard = {
  id: "475",
  canonicalId: "ci_Jte",
  reprints: ["set7-082"],
  cardType: "action",
  name: "Show Me More!",
  i18n: {
    en: {
      name: "Show Me More!",
      text: "Each player draws 3 cards.",
    },
    de: {
      name: "Zeig mir mehr!",
      text: [
        {
          title: "Alle Mitspielenden",
          description: "(auch du) ziehen je 3 Karten.",
        },
      ],
    },
    fr: {
      name: "Montre-m’en davantage !",
      text: "Chaque joueur pioche 3 cartes.",
    },
    it: {
      name: "Mostrami di Più!",
      text: "Ogni giocatore pesca 3 carte.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "007",
  cardNumber: 82,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_29df1d46e9f9463f9058c264f7b3bbd5",
    tcgPlayer: 619739,
  },
  text: "Each player draws 3 cards.",
  abilities: [
    {
      id: "11i-1",
      effect: {
        amount: 3,
        target: "EACH_PLAYER",
        type: "draw",
      },
      type: "action",
      text: "Each player draws 3 cards.",
    },
  ],
};
