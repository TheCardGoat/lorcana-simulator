import type { CharacterCard } from "@tcg/lorcana-types";

export const winnieThePoohHavingAThink: CharacterCard = {
  id: "ZKc",
  canonicalId: "ci_nqc",
  reprints: ["set2-161", "set9-159"],
  cardType: "character",
  name: "Winnie the Pooh",
  version: "Having a Think",
  i18n: {
    en: {
      name: "Winnie the Pooh",
      version: "Having a Think",
      text: [
        {
          title: "HUNNY POT",
          description:
            "Whenever this character quests, you may put a card from your hand into your inkwell facedown.",
        },
      ],
    },
    de: {
      name: "Winnie Puuh",
      version: "Denkt und denkt",
      text: [
        {
          title: "HONIGTOPF",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 beliebige Karte aus deiner Hand verdeckt in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Winnie l'ourson",
      version: "Pense pense pense",
      text: [
        {
          title: "POT DE MIEL",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, vous pouvez placer une carte de votre main dans votre réserve d'encre, face cachée.",
        },
      ],
    },
    it: {
      name: "Winnie the Pooh",
      version: "Having a Think",
      text: [
        {
          title: "HUNNY POT",
          description:
            "Whenever this character quests, you may put a card from your hand into your inkwell facedown.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Winnie the Pooh",
  set: "002",
  cardNumber: 161,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bf5d82370e8e4900a9e7b05d502470df",
    tcgPlayer: 650094,
  },
  text: [
    {
      title: "HUNNY POT",
      description:
        "Whenever this character quests, you may put a card from your hand into your inkwell facedown.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          facedown: true,
          source: "hand",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "18k-1",
      name: "HUNNY POT",
      text: "HUNNY POT Whenever this character quests, you may put a card from your hand into your inkwell facedown.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
