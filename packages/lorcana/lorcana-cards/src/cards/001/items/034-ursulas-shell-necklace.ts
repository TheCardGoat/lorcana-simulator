import type { ItemCard } from "@tcg/lorcana-types";

export const ursulasShellNecklace: ItemCard = {
  id: "0CY",
  canonicalId: "ci_Ewu",
  reprints: ["set1-034", "set9-033"],
  cardType: "item",
  name: "Ursula’s Shell Necklace",
  i18n: {
    en: {
      name: "Ursula’s Shell Necklace",
      text: [
        {
          title: "NOW, SING!",
          description: "Whenever you play a song, you may pay 1 to draw a card.",
        },
      ],
    },
    de: {
      name: "Ursulas Muschel-Halskette",
      text: [
        {
          title: "UND JETZT SING!",
          description:
            "Jedes Mal, wenn du ein Lied ausspielst, darfst du 1 zahlen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "PENDENTIF EN COQUILLAGE D'URSULA",
      text: [
        {
          title: "MAINTENANT, CHANTE!",
          description:
            "Chaque fois que vous jouez une chanson, vous pouvez payer 1 pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Ursula’s Shell Necklace",
      text: [
        {
          title: "NOW, SING!",
          description: "Whenever you play a song, you may pay 1 to draw a card.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 34,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_cfa8f36f7729492fa74fa256816c7f55",
    tcgPlayer: 649980,
  },
  text: [
    {
      title: "NOW, SING!",
      description: "Whenever you play a song, you may pay 1 to draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "pay-cost",
          cost: {
            ink: 1,
          },
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        },
        type: "optional",
      },
      id: "xg1-1",
      name: "NOW, SING!",
      text: "NOW, SING! Whenever you play a song, you may pay 1 to draw a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "song",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
