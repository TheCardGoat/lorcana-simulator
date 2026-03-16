import type { ActionCard } from "@tcg/lorcana-types";

export const hypnoticDeduction: ActionCard = {
  id: "LLg",
  canonicalId: "ci_LLg",
  reprints: ["set5-094"],
  cardType: "action",
  name: "Hypnotic Deduction",
  i18n: {
    en: {
      name: "Hypnotic Deduction",
      text: "Draw 3 cards, then put 2 cards from your hand on the top of your deck in any order.",
    },
    de: {
      name: "Hypnotischer Zusammenhang",
      text: "Ziehe 3 Karten. Wähle danach 2 Karten aus deiner Hand und lege sie in beliebiger Reihenfolge auf dein Deck.",
    },
    fr: {
      name: "Déduction sous hypnose",
      text: "Piochez 3 cartes, puis choisissez 2 cartes de votre main et placez-les sur votre pioche dans l'ordre de votre choix.",
    },
    it: {
      name: "Deduzione Ipnotica",
      text: "Pesca 3 carte, poi metti 2 carte dalla tua mano in cima al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 94,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b467180bb50b4da59a6b99725ad7fa84",
    tcgPlayer: 561346,
  },
  text: "Draw 3 cards, then put 2 cards from your hand on the top of your deck in any order.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 3,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            type: "put-on-top",
            source: {
              selector: "chosen",
              count: {
                exactly: 2,
              },
              owner: "you",
              zones: ["hand"],
            },
          },
        ],
      },
      id: "5ug-1",
      text: "Draw 3 cards, then put 2 cards from your hand on the top of your deck in any order.",
      type: "action",
    },
  ],
};
