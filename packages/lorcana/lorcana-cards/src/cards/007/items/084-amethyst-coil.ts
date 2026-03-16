import type { ItemCard } from "@tcg/lorcana-types";

export const amethystCoil: ItemCard = {
  id: "aGu",
  canonicalId: "ci_aGu",
  reprints: ["set7-084"],
  cardType: "item",
  name: "Amethyst Coil",
  i18n: {
    en: {
      name: "Amethyst Coil",
      text: [
        {
          title: "MAGICAL TOUCH",
          description:
            "During your turn, whenever a card is put into your inkwell, you may move 1 damage counter from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Amethyst-Reif",
      text: [
        {
          title: "MAGISCHE BERÜHRUNG",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl verschieben.",
        },
      ],
    },
    fr: {
      name: "Spirale d’améthyste",
      text: [
        {
          title: "TOUCHER MAGIQUE",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez choisir un personnage et déplacer 1 de ses dommages sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Spira d'Ametista",
      text: [
        {
          title: "TOCCO MAGICO",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi spostare 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 84,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_e26f9abffd3943c096c50b0cef7425ff",
    tcgPlayer: 619451,
  },
  text: [
    {
      title: "MAGICAL TOUCH",
      description:
        "During your turn, whenever a card is put into your inkwell, you may move 1 damage counter from chosen character to chosen opposing character.",
    },
  ],
  abilities: [
    {
      id: "1uu-1",
      name: "MAGICAL TOUCH",
      type: "triggered",
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "move-damage",
          amount: 1,
          from: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
            filter: [
              {
                type: "damaged",
              },
            ],
          },
          to: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
        },
      },
      text: "MAGICAL TOUCH During your turn, whenever a card is put into your inkwell, you may move 1 damage counter from chosen character to chosen opposing character.",
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
