import type { ItemCard } from "@tcg/lorcana-types";

export const theNephewsPiggyBank: ItemCard = {
  id: "N2m",
  canonicalId: "ci_N2m",
  reprints: ["set8-044"],
  cardType: "item",
  name: "The Nephews' Piggy Bank",
  i18n: {
    en: {
      name: "The Nephews' Piggy Bank",
      text: [
        {
          title: "INSIDE JOB",
          description:
            "If you have a character named Donald Duck in play, you pay 1 {I} less to play this item.",
        },
        {
          title: "PAYOFF",
          description: "{E} — Chosen character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Das Sparschwein der Neffen",
      text: [
        {
          title: "INSIDER-JOB",
          description:
            "Wenn du einen Donald-Duck-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Gegenstand auszuspielen. RÜCKZAHLUNG — Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "La tirelire des neveux",
      text: [
        {
          title: "COMBINE",
          description:
            "Jouer cet objet vous coûte 1 de moins si vous avez un personnage Donald en jeu. RÉCOMPENSE — Choisissez un personnage qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Salvadanaio dei Nipoti",
      text: [
        {
          title: "INFILTRATO",
          description:
            "Se hai in gioco un personaggio chiamato Paperino, paga 1 in meno per giocare questo oggetto. RICOMPENSA — Un personaggio a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "008",
  cardNumber: 44,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_69db4cb0362b4673aeee6d9dea53f23f",
    tcgPlayer: 631335,
  },
  text: [
    {
      title: "INSIDE JOB",
      description:
        "If you have a character named Donald Duck in play, you pay 1 {I} less to play this item.",
    },
    {
      title: "PAYOFF",
      description: "{E} — Chosen character gets -1 {S} until the start of your next turn.",
    },
  ],
  abilities: [
    {
      id: "12r-1",
      name: "INSIDE JOB",
      text: "INSIDE JOB If you have a character named Donald Duck in play, you pay 1 {I} less to play this item.",
      type: "static",
      condition: {
        type: "has-named-character",
        name: "Donald Duck",
        controller: "you",
      },
      effect: {
        type: "cost-reduction",
        amount: 1,
        cardType: "item",
      },
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        modifier: -1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "12r-2",
      name: "PAYOFF",
      text: "PAYOFF {E} – Chosen character gets -1 {S} until the start of your next turn.",
      type: "activated",
    },
  ],
};
