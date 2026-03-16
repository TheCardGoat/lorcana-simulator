import type { ItemCard } from "@tcg/lorcana-types";

export const theLamp: ItemCard = {
  id: "gxn",
  canonicalId: "ci_gxn",
  reprints: ["set3-064"],
  cardType: "item",
  name: "The Lamp",
  i18n: {
    en: {
      name: "The Lamp",
      text: [
        {
          title: "GOOD OR EVIL",
          description:
            "Banish this item — If you have a character named Jafar in play, draw 2 cards. If you have a character named Genie in play, return chosen character with cost 4 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Die Lampe",
      text: [
        {
          title: "GUT ODER",
          description:
            "BÖSE Verbanne diesen Gegenstand — Wenn du einen Dschafar-Charakter im Spiel hast, ziehe 2 Karten. Wenn du einen Dschinni-Charakter im Spiel hast, schicke einen Charakter deiner Wahl, der 4 oder weniger kostet, auf die zugehörige Hand zurück.",
        },
      ],
    },
    fr: {
      name: "La lampe",
      text: [
        {
          title: "BIEN OU MAL",
          description:
            "Bannissez cet objet — Si vous avez un personnage Jafar en jeu, piochez 2 cartes. Si vous avez un personnage Génie en jeu, choisissez un personnage coûtant 4 ou moins et renvoyez-le dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "La Lampada",
      text: [
        {
          title: "BENE O MALE",
          description:
            "Esilia questo oggetto — Se hai un personaggio chiamato Jafar in gioco, pesca 2 carte. Se hai un personaggio chiamato Genio in gioco, fai riprendere un personaggio a tua scelta con costo 4 o inferiore in mano al suo giocatore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 64,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5008b128a011481396f80e0c9c5424bc",
    tcgPlayer: 539079,
  },
  text: [
    {
      title: "GOOD OR EVIL",
      description:
        "Banish this item — If you have a character named Jafar in play, draw 2 cards. If you have a character named Genie in play, return chosen character with cost 4 or less to their player's hand.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            condition: {
              type: "has-named-character",
              controller: "you",
              name: "Jafar",
            },
            then: {
              amount: 2,
              target: "CONTROLLER",
              type: "draw",
            },
            type: "conditional",
          },
          {
            condition: {
              type: "has-named-character",
              controller: "you",
              name: "Genie",
            },
            then: {
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
                filter: [
                  {
                    type: "cost-comparison",
                    comparison: "less-or-equal",
                    value: 4,
                  },
                ],
              },
              type: "return-to-hand",
            },
            type: "conditional",
          },
        ],
      },
      id: "1ik-1",
      name: "GOOD OR EVIL",
      text: "GOOD OR EVIL Banish this item — If you have a character named Jafar in play, draw 2 cards. If you have a character named Genie in play, return chosen character with cost 4 or less to their player's hand.",
      type: "activated",
    },
  ],
};
