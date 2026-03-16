import type { ItemCard } from "@tcg/lorcana-types";

export const mauricesMachine: ItemCard = {
  id: "jlq",
  canonicalId: "ci_jlq",
  reprints: ["set7-151"],
  cardType: "item",
  name: "Maurice's Machine",
  i18n: {
    en: {
      name: "Maurice's Machine",
      text: [
        {
          title: "BREAK DOWN",
          description:
            "When this item is banished, you may return an item card with cost 2 or less from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Maurice’ Maschine",
      text: [
        {
          title: "ZUSAMMENBRUCH",
          description:
            "Wenn dieser Gegenstand verbannt wird, darfst du 1 Gegenstandskarte, die 2 oder weniger kostet, aus deinem Ablagestapel zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Machine de Maurice",
      text: [
        {
          title: "TOMBÉE EN PANNE",
          description:
            "Lorsque cet objet est banni, vous pouvez renvoyer une carte Objet coûtant 2 ou moins de votre défausse dans votre main.",
        },
      ],
    },
    it: {
      name: "Marchingegno di Maurice",
      text: [
        {
          title: "SMONTARE",
          description:
            "Quando questo oggetto viene esiliato, puoi riprendere in mano una carta oggetto con costo 2 o inferiore dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 151,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_86f1f9b1aee3486ca626ba64f1a8edb5",
    tcgPlayer: 619493,
  },
  text: [
    {
      title: "BREAK DOWN",
      description:
        "When this item is banished, you may return an item card with cost 2 or less from your discard to your hand.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "item",
          filter: {
            type: "cost-comparison",
            comparison: "less-or-equal",
            value: 2,
          },
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "1fj-1",
      name: "BREAK DOWN",
      text: "BREAK DOWN When this item is banished, you may return an item card with cost 2 or less from your discard to your hand.",
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
