import type { ItemCard } from "@tcg/lorcana-types";

export const halfHexwellCrown: ItemCard = {
  id: "UGD",
  canonicalId: "ci_o4o",
  reprints: ["set5-065"],
  cardType: "item",
  name: "Half Hexwell Crown",
  i18n: {
    en: {
      name: "Half Hexwell Crown",
      text: [
        {
          title: "AN UNEXPECTED FIND",
          description: "{E}, 2 {I} — Draw a card.",
        },
        {
          title: "A PERILOUS POWER",
          description: "{E}, 2 {I}, Discard a card — Exert chosen character.",
        },
      ],
    },
    de: {
      name: "Hälfte der Hexwell-Krone",
      text: [
        {
          title: "UNERWARTETER FUND, 2",
          description:
            "— Ziehe 1 Karte. GEFÄHRLICHE MACHT, 2, Wirf 1 Karte ab — Erschöpfe einen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Moitié de la Couronne d'Hexasort",
      text: [
        {
          title: "TROUVAILLE INATTENDUE, 2",
          description:
            "— Piochez une carte. UN POUVOIR PÉRILLEUX, 2, Défaussez une carte — Choisissez un personnage et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Mezza Corona Esamantica",
      text: [
        {
          title: "UN RITROVAMENTO INASPETTATO, 2",
          description:
            "— Pesca una carta. UN POTERE RISCHIOSO, 2, scarta una carta — Impegna un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 65,
  rarity: "rare",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_cbd6fc9596f14329af2f0c237a7be6a2",
    tcgPlayer: 557538,
  },
  text: [
    {
      title: "AN UNEXPECTED FIND",
      description: "{E}, 2 {I} — Draw a card.",
    },
    {
      title: "A PERILOUS POWER",
      description: "{E}, 2 {I}, Discard a card — Exert chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "vzu-1",
      name: "AN UNEXPECTED FIND",
      text: "AN UNEXPECTED FIND {E}, 2 {I} — Draw a card.",
      type: "activated",
    },
    {
      cost: {
        exert: true,
        ink: 2,
        discardCards: 1,
        discardChosen: true,
      },
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "exert",
      },
      id: "vzu-2",
      name: "A PERILOUS POWER",
      text: "A PERILOUS POWER {E}, 2 {I}, Discard a card — Exert chosen character.",
      type: "activated",
    },
  ],
};
