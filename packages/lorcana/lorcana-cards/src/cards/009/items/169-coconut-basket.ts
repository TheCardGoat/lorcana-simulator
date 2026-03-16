import type { ItemCard } from "@tcg/lorcana-types";

export const coconutBasket: ItemCard = {
  id: "X1y",
  canonicalId: "ci_eG9",
  reprints: ["set1-166", "set9-169"],
  cardType: "item",
  name: "Coconut Basket",
  i18n: {
    en: {
      name: "Coconut Basket",
      text: [
        {
          title: "CONSIDER THE COCONUT",
          description:
            "Whenever you play a character, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Kokosnusskorb",
      text: [
        {
          title: "DENK NUR AN DIE KOKOSNUSS",
          description:
            "Jedes Mal, wenn du einen Charakter ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "PANIER DE NOIX DE COCO",
      text: [
        {
          title: "NOUS AVONS LA NOIX DE COCO",
          description:
            "Lorsque vous jouez un personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Coconut Basket",
      text: [
        {
          title: "CONSIDER THE COCONUT",
          description:
            "Whenever you play a character, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "009",
  cardNumber: 169,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a175d05b419e4250bd62273eeb6d48c5",
    tcgPlayer: 650103,
  },
  text: [
    {
      title: "CONSIDER THE COCONUT",
      description:
        "Whenever you play a character, you may remove up to 2 damage from chosen character.",
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
      id: "1d0-1",
      name: "CONSIDER THE COCONUT",
      text: "CONSIDER THE COCONUT Whenever you play a character, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
