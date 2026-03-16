import type { ItemCard } from "@tcg/lorcana-types";

export const amberCoil: ItemCard = {
  id: "I8y",
  canonicalId: "ci_I8y",
  reprints: ["set7-041"],
  cardType: "item",
  name: "Amber Coil",
  i18n: {
    en: {
      name: "Amber Coil",
      text: [
        {
          title: "HEALING AURA",
          description:
            "During your turn, whenever a card is put into your inkwell, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Bernstein-Reif",
      text: [
        {
          title: "HEILENDE AURA",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Spirale d’ambre",
      text: [
        {
          title: "AURA GUÉRISSEUSE",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Spira d'Ambra",
      text: [
        {
          title: "AURA CURATIVA",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 41,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_928bd23c4cdb4440898accbb73aba3bf",
    tcgPlayer: 619430,
  },
  text: [
    {
      title: "HEALING AURA",
      description:
        "During your turn, whenever a card is put into your inkwell, you may remove up to 2 damage from chosen character.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "7an-1",
      name: "HEALING AURA",
      text: "HEALING AURA During your turn, whenever a card is put into your inkwell, you may remove up to 2 damage from chosen character.",
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
