import type { ItemCard } from "@tcg/lorcana-types";

export const unconventionalTool: ItemCard = {
  id: "t79",
  canonicalId: "ci_t79",
  reprints: ["set7-150"],
  cardType: "item",
  name: "Unconventional Tool",
  i18n: {
    en: {
      name: "Unconventional Tool",
      text: [
        {
          title: "FIXED IN NO TIME",
          description:
            "When this item is banished, you pay 2 {I} less for the next item you play this turn.",
        },
      ],
    },
    de: {
      name: "Unkonventionelles Werkzeug",
      text: [
        {
          title: "IM HANDUMDREHEN REPARIERT",
          description:
            "Wenn dieser Gegenstand verbannt wird, zahlst du 2 weniger für den nächsten Gegenstand, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Outil inhabituel",
      text: [
        {
          title: "RÉPARÉ EN UN CLIN D'ŒIL",
          description:
            "Lorsque cet objet est banni, le prochain objet que vous jouez ce tour-ci vous coûte 2 de moins.",
        },
      ],
    },
    it: {
      name: "Strumento non Convenzionale",
      text: [
        {
          title: "AGGIUSTATO IN UN MOMENTO",
          description:
            "Quando questo oggetto viene esiliato, paga 2 in meno per giocare il tuo prossimo oggetto per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 150,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_99bcca2953964e4180ad6d27bea2d14d",
    tcgPlayer: 618709,
  },
  text: [
    {
      title: "FIXED IN NO TIME",
      description:
        "When this item is banished, you pay 2 {I} less for the next item you play this turn.",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 2,
        cardType: "item",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "qyw-1",
      name: "FIXED IN NO TIME",
      text: "FIXED IN NO TIME When this item is banished, you pay 2 {I} less for the next item you play this turn.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      sourceZones: ["play", "discard"],
      type: "triggered",
    },
  ],
};
