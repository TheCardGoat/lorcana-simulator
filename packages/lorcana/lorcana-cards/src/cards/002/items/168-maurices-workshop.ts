import type { ItemCard } from "@tcg/lorcana-types";

export const mauricesWorkshop: ItemCard = {
  id: "Xlt",
  canonicalId: "ci_Xlt",
  reprints: ["set2-168"],
  cardType: "item",
  name: "Maurice's Workshop",
  i18n: {
    en: {
      name: "Maurice's Workshop",
      text: [
        {
          title: "LOOKING FOR THIS?",
          description: "Whenever you play another item, you may pay 1 {I} to draw a card.",
        },
      ],
    },
    de: {
      name: "Maurice‘ Werkstatt",
      text: [
        {
          title: "SUCHST DU DAS HIER?",
          description:
            "Jedes Mal, wenn du einen anderen Gegenstand ausspielst, darfst du 1 bezahlen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Atelier de Maurice",
      text: [
        {
          title: "C'EST ÇA QUE TU CHERCHES?",
          description:
            "Chaque fois que vous jouez un autre objet, vous pouvez payer 1 pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Maurice's Workshop",
      text: [
        {
          title: "LOOKING FOR THIS?",
          description: "Whenever you play another item, you may pay 1 to draw a card.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 168,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_3c5cc621f8c2419aa3e82f1189fb74b0",
    tcgPlayer: 527770,
  },
  text: [
    {
      title: "LOOKING FOR THIS?",
      description: "Whenever you play another item, you may pay 1 {I} to draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "18c-1",
      name: "LOOKING FOR THIS?",
      text: "LOOKING FOR THIS? Whenever you play another item, you may pay 1 {I} to draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
