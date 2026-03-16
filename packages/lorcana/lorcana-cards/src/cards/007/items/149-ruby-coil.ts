import type { ItemCard } from "@tcg/lorcana-types";

export const rubyCoil: ItemCard = {
  id: "Twc",
  canonicalId: "ci_Twc",
  reprints: ["set7-149"],
  cardType: "item",
  name: "Ruby Coil",
  i18n: {
    en: {
      name: "Ruby Coil",
      text: [
        {
          title: "CRIMSON SPARK",
          description:
            "During your turn, whenever a card is put into your inkwell, chosen character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Rubin-Reif",
      text: [
        {
          title: "KARMINROTER FUNKE",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, gib einem Charakter deiner Wahl in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Spirale de Rubis",
      text: [
        {
          title: "ÉTINCELLE POURPRE",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage qui gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Spira di Rubino",
      text: [
        {
          title: "SCINTILLA SCARLATTA",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un personaggio a tua scelta riceve +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d23dd955ab74137bba7be82615b2178",
    tcgPlayer: 619492,
  },
  text: [
    {
      title: "CRIMSON SPARK",
      description:
        "During your turn, whenever a card is put into your inkwell, chosen character gets +2 {S} this turn.",
    },
  ],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1mn-1",
      name: "CRIMSON SPARK",
      text: "CRIMSON SPARK During your turn, whenever a card is put into your inkwell, chosen character gets +2 {S} this turn.",
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
