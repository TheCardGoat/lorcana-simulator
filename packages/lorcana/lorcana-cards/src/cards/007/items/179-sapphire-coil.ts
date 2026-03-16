import type { ItemCard } from "@tcg/lorcana-types";

export const sapphireCoil: ItemCard = {
  id: "jrq",
  canonicalId: "ci_jrq",
  reprints: ["set7-179"],
  cardType: "item",
  name: "Sapphire Coil",
  i18n: {
    en: {
      name: "Sapphire Coil",
      text: [
        {
          title: "BRILLIANT SHINE",
          description:
            "During your turn, whenever a card is put into your inkwell, you may give chosen character -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Saphir-Reif",
      text: [
        {
          title: "STRAHLENDER GLANZ",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du einem Charakter deiner Wahl in diesem Zug -2 geben.",
        },
      ],
    },
    fr: {
      name: "Spirale de Saphir",
      text: [
        {
          title: "ÉCLAT LUSTRÉ",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez choisir un personnage qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Spira di Zaffiro",
      text: [
        {
          title: "SPLENDORE LUCENTE",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi dare -2 a un personaggio a tua scelta per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 179,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3f99d55a6a434a00b6e547ec30e48a69",
    tcgPlayer: 619510,
  },
  text: [
    {
      title: "BRILLIANT SHINE",
      description:
        "During your turn, whenever a card is put into your inkwell, you may give chosen character -2 {S} this turn.",
    },
  ],
  abilities: [
    {
      id: "1qw-1",
      name: "BRILLIANT SHINE",
      type: "triggered",
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "modify-stat",
          stat: "strength",
          modifier: -2,
          duration: "this-turn",
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
        },
      },
      text: "BRILLIANT SHINE During your turn, whenever a card is put into your inkwell, you may give chosen character -2 {S} this turn.",
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
    },
  ],
};
