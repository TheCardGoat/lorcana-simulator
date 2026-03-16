import type { ActionCard } from "@tcg/lorcana-types";

export const seekingTheHalfCrown: ActionCard = {
  id: "Kza",
  canonicalId: "ci_xtY",
  reprints: ["set6-064"],
  cardType: "action",
  name: "Seeking the Half Crown",
  i18n: {
    en: {
      name: "Seeking the Half Crown",
      text: [
        {
          title:
            "For each Sorcerer character you have in play, you pay 1 {I} less to play this action.",
        },
        {
          title: "Draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Nach der Kronenhälfte suchen",
      text: "Für jeden Magier, den du im Spiel hast, zahlst du 1 weniger, um diese Aktion auszuspielen. Ziehe 2 Karten.",
    },
    fr: {
      name: "En quête de la moitié de Couronne",
      text: "Jouer cette action coûte 1 de moins pour chaque personnage Mage que vous avez en jeu. Piochez 2 cartes.",
    },
    it: {
      name: "Alla Ricerca della Mezza Corona",
      text: "Per ogni personaggio Incantatore che hai in gioco, paga 1 in meno per giocare questa azione. Pesca 2 carte.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 64,
  rarity: "rare",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_bb8cbf92bd50483b979bd9ad606987ae",
    tcgPlayer: 593042,
  },
  text: [
    {
      title:
        "For each Sorcerer character you have in play, you pay 1 {I} less to play this action.",
    },
    {
      title: "Draw 2 cards.",
    },
  ],
  abilities: [
    {
      type: "static",
      text: "For each Sorcerer character you have in play, you pay 1 {I} less to play this action.",
      sourceZones: ["hand"],
      effect: {
        type: "cost-reduction",
        amount: {
          type: "classification-character-count",
          classification: "Sorcerer",
          controller: "you",
        },
      },
    },
    {
      type: "action",
      text: "Draw 2 cards.",
      effect: {
        type: "draw",
        amount: 2,
        target: "CONTROLLER",
      },
    },
  ],
};
