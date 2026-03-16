import type { CharacterCard } from "@tcg/lorcana-types";

export const mrsJudsonHousekeeper: CharacterCard = {
  id: "IFJ",
  canonicalId: "ci_IFJ",
  reprints: ["set2-153"],
  cardType: "character",
  name: "Mrs. Judson",
  version: "Housekeeper",
  i18n: {
    en: {
      name: "Mrs. Judson",
      version: "Housekeeper",
      text: [
        {
          title: "TIDY UP",
          description:
            "Whenever you play a Floodborn character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Mrs. Minna",
      version: "Haushälterin",
      text: [
        {
          title: "AUFRÄUMEN",
          description:
            "Jedes Mal, wenn du eine Flutgestalt ausspielst, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Madame Judson",
      version: "Gouvernante",
      text: [
        {
          title: "ORDONNÉE",
          description:
            "Chaque fois que vous jouez un personnage Floodborn, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Mrs. Judson",
      version: "Housekeeper",
      text: [
        {
          title: "TIDY UP",
          description:
            "Whenever you play a Floodborn character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 153,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f70bca6387dd4f34a80c7a0ac8bc102e",
    tcgPlayer: 525268,
  },
  text: [
    {
      title: "TIDY UP",
      description:
        "Whenever you play a Floodborn character, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "1j5-1",
      name: "TIDY UP",
      text: "TIDY UP Whenever you play a Floodborn character, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
