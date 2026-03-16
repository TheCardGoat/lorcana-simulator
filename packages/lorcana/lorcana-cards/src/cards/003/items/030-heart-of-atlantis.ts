import type { ItemCard } from "@tcg/lorcana-types";

export const heartOfAtlantis: ItemCard = {
  id: "cVL",
  canonicalId: "ci_cVL",
  reprints: ["set3-030"],
  cardType: "item",
  name: "Heart of Atlantis",
  i18n: {
    en: {
      name: "Heart of Atlantis",
      text: [
        {
          title: "LIFE GIVER",
          description: "{E} — You pay 2 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Herz von Atlantis",
      text: [
        {
          title: "LEBENSSPENDER",
          description:
            "— Du zahlst 2 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Cœur de l'Atlantide",
      text: [
        {
          title: "SOURCE DE VIE",
          description:
            "— Le prochain personnage que vous jouez durant ce tour vous coûte 2 de moins.",
        },
      ],
    },
    it: {
      name: "Il Cuore di Atlantide",
      text: [
        {
          title: "DONARE VITA",
          description: "— Paga 2 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 30,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_925579c341974d16b613c348efe8df5e",
    tcgPlayer: 536277,
  },
  text: [
    {
      title: "LIFE GIVER",
      description: "{E} — You pay 2 {I} less for the next character you play this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "zzp-1",
      name: "LIFE GIVER",
      text: "LIFE GIVER {E} — You pay 2 {I} less for the next character you play this turn.",
      type: "activated",
    },
  ],
};
