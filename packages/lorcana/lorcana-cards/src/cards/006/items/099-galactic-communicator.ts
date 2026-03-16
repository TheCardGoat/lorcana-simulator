import type { ItemCard } from "@tcg/lorcana-types";

export const galacticCommunicator: ItemCard = {
  id: "SR9",
  canonicalId: "ci_SR9",
  reprints: ["set6-099"],
  cardType: "item",
  name: "Galactic Communicator",
  i18n: {
    en: {
      name: "Galactic Communicator",
      text: [
        {
          title: "RESOURCE ALLOCATION 1",
          description:
            "{I}, Banish this item — Return chosen character with 2 {S} or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Galaktischer Kommunikator",
      text: [
        {
          title: "RESSOURCENZUTEILUNG 1,",
          description:
            "Verbanne diesen Gegenstand — Schicke einen Charakter deiner Wahl mit 2 oder weniger auf die zugehörige Hand zurück.",
        },
      ],
    },
    fr: {
      name: "Communicateur galactique",
      text: [
        {
          title: "ALLOCATION DES RESSOURCES 1,",
          description:
            "bannissez cet objet — Renvoyez dans la main de son propriétaire un personnage avec une de 2 ou moins.",
        },
      ],
    },
    it: {
      name: "Comunicatore Galattico",
      text: [
        {
          title: "INVIO DI RISORSE 1,",
          description:
            "esilia questo oggetto — Fai riprendere in mano al suo giocatore un personaggio a tua scelta con 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 99,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6d0654972afb4eb581136a391d3f967b",
    tcgPlayer: 588088,
  },
  text: [
    {
      title: "RESOURCE ALLOCATION 1",
      description:
        "{I}, Banish this item — Return chosen character with 2 {S} or less to their player's hand.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
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
      id: "q1z-1",
      name: "RESOURCE ALLOCATION 1",
      text: "RESOURCE ALLOCATION 1 {I}, Banish this item — Return chosen character with 2 {S} or less to their player's hand.",
      type: "activated",
    },
  ],
};
