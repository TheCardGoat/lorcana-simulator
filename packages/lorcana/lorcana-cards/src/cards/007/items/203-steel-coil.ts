import type { ItemCard } from "@tcg/lorcana-types";

export const steelCoil: ItemCard = {
  id: "02J",
  canonicalId: "ci_02J",
  reprints: ["set7-203"],
  cardType: "item",
  name: "Steel Coil",
  i18n: {
    en: {
      name: "Steel Coil",
      text: [
        {
          title: "METALLIC FLOW",
          description:
            "During your turn, whenever a card is put into your inkwell, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Stahl-Reif",
      text: [
        {
          title: "METALLISCHER FLUSS",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Spirale d’acier",
      text: [
        {
          title: "FLUIDE MÉTALLIQUE",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez piocher une carte puis en défausser une.",
        },
      ],
    },
    it: {
      name: "Spira d'Acciaio",
      text: [
        {
          title: "FLUSSO METALLICO",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi pescare una carta, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 203,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9733c3ea959643178de845a528ff915c",
    tcgPlayer: 619525,
  },
  text: [
    {
      title: "METALLIC FLOW",
      description:
        "During your turn, whenever a card is put into your inkwell, you may draw a card, then choose and discard a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "sequence",
          steps: [
            {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            {
              amount: 1,
              chosen: true,
              from: "hand",
              target: "CONTROLLER",
              type: "discard",
            },
          ],
        },
        type: "optional",
      },
      id: "1y9-1",
      name: "METALLIC FLOW",
      text: "METALLIC FLOW During your turn, whenever a card is put into your inkwell, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
