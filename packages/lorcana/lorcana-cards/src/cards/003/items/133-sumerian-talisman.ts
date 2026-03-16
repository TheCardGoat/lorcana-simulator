import type { ItemCard } from "@tcg/lorcana-types";

export const sumerianTalisman: ItemCard = {
  id: "zQ8",
  canonicalId: "ci_zQ8",
  reprints: ["set3-133"],
  cardType: "item",
  name: "Sumerian Talisman",
  i18n: {
    en: {
      name: "Sumerian Talisman",
      text: [
        {
          title: "SOURCE OF MAGIC",
          description:
            "During your turn, whenever one of your characters is banished in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Sumerischer Talisman",
      text: [
        {
          title: "DIE QUELLE DER MAGIE",
          description:
            "Jedes Mal, wenn einer deiner Charaktere in deinem Zug durch eine Herausforderung verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Talisman sumérien",
      text: [
        {
          title: "SOURCE DE MAGIE",
          description:
            "Chaque fois que l'un de vos personnages est banni via un défi durant votre tour, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Talismano Sumero",
      text: [
        {
          title: "FONTE DI MAGIA",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi personaggi viene esiliato in una sfida, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 133,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_890de7a0c3e34c8da80430d86a27365c",
    tcgPlayer: 536271,
  },
  text: [
    {
      title: "SOURCE OF MAGIC",
      description:
        "During your turn, whenever one of your characters is banished in a challenge, you may draw a card.",
    },
  ],
  abilities: [
    {
      id: "xe8-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "SOURCE OF MAGIC",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "SOURCE OF MAGIC During your turn, whenever one of your characters is banished in a challenge, you may draw a card.",
    },
  ],
};
