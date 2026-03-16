import type { ActionCard } from "@tcg/lorcana-types";

export const paintingTheRosesRed: ActionCard = {
  id: "jP1",
  canonicalId: "ci_jP1",
  reprints: ["set2-030"],
  cardType: "action",
  name: "Painting the Roses Red",
  i18n: {
    en: {
      name: "Painting the Roses Red",
      text: "Up to 2 chosen characters get -1 {S} this turn. Draw a card.",
    },
    de: {
      name: "Wir malen die Rosen rot",
      text: "Gib bis zu 2 Charakteren deiner Wahl in diesem Zug jeweils -1. Ziehe 1 Karte.",
    },
    fr: {
      name: "Peignons les roses en rouge",
      text: "Choisissez jusqu'à 2 personnages, ils subissent -1 pour le reste de ce tour. Piochez 1 carte.",
    },
    it: {
      name: "Painting the Roses Red",
      text: "Up to 2 chosen characters get -1 this turn. Draw a card.",
    },
  },
  inkType: ["amber"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 30,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5ed0be30062e4fa9a32f4edb4e53c47c",
    tcgPlayer: 527240,
  },
  text: "Up to 2 chosen characters get -1 {S} this turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            duration: "this-turn",
            stat: "strength",
            modifier: -1,
            target: {
              selector: "chosen",
              count: {
                upTo: 2,
              },
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
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
