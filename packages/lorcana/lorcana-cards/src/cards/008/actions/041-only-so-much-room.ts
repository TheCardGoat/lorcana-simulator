import type { ActionCard } from "@tcg/lorcana-types";

export const onlySoMuchRoom: ActionCard = {
  id: "fR9",
  canonicalId: "ci_fR9",
  reprints: ["set8-041"],
  cardType: "action",
  name: "Only So Much Room",
  i18n: {
    en: {
      name: "Only So Much Room",
      text: "Return chosen character with 2 {S} or less to their player's hand. Return a character card from your discard to your hand.",
    },
    de: {
      name: "Nicht viel Platz",
      text: "Schicke einen Charakter deiner Wahl mit 2 oder weniger zurück auf die zugehörige Hand. Nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "Qu’une toute petite place",
      text: "Choisissez un personnage avec une de 2 ou moins et renvoyez-le dans la main de son propriétaire. Renvoyez dans votre main une carte Personnage de votre défausse.",
    },
    it: {
      name: "Una Data Quantità",
      text: "Fai riprendere in mano al suo giocatore un personaggio a tua scelta con 2 o inferiore. Riprendi in mano una carta personaggio dai tuoi scarti.",
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 41,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_2085340ba83e4380a30c2451823aa80e",
    tcgPlayer: 631379,
  },
  text: "Return chosen character with 2 {S} or less to their player's hand. Return a character card from your discard to your hand.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "strength-comparison",
                  comparison: "less-or-equal",
                  value: 2,
                },
              ],
            },
            type: "return-to-hand",
          },
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["discard"],
              cardTypes: ["character"],
            },
            type: "return-to-hand",
          },
        ],
        type: "sequence",
      },
      id: "12f-1",
      text: "Return chosen character with 2 {S} or less to their player's hand. Return a character card from your discard to your hand.",
      type: "action",
    },
  ],
};
