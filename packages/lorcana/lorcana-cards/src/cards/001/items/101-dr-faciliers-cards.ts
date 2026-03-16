import type { ItemCard } from "@tcg/lorcana-types";

export const drFaciliersCards: ItemCard = {
  id: "flR",
  canonicalId: "ci_flR",
  reprints: ["set1-101"],
  cardType: "item",
  name: "Dr. Facilier’s Cards",
  i18n: {
    en: {
      name: "Dr. Facilier’s Cards",
      text: [
        {
          title: "THE CARDS WILL TELL",
          description: "— You pay 1 less for the next action you play this turn.",
        },
      ],
    },
    de: {
      name: "Dr. Faciliers Karten",
      text: [
        {
          title: "IN DEN KARTEN STEHT'S",
          description:
            "— Du zahlst 1 weniger für die nächste Aktion, die du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "CARTES DU DR. FACILIER",
      text: [
        {
          title: "DIVINATION",
          description:
            "— La prochaine carte action que vous jouez durant ce tour coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Dr. Facilier’s Cards",
      text: [
        {
          title: "THE CARDS WILL TELL",
          description: "— You pay 1 less for the next action you play this turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Princess and the Frog",
  set: "001",
  cardNumber: 101,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_b30843c0d5e845ee88fc040b5c5e727b",
    tcgPlayer: 508762,
  },
  text: [
    {
      title: "THE CARDS WILL TELL",
      description: "— You pay 1 less for the next action you play this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        cardType: "action",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "18f-1",
      name: "THE CARDS WILL TELL",
      text: "THE CARDS WILL TELL {E} — You pay 1 {I} less for the next action you play this turn.",
      type: "activated",
    },
  ],
};
