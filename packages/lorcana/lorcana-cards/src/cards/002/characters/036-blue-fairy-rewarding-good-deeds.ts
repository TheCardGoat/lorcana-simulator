import type { CharacterCard } from "@tcg/lorcana-types";

export const blueFairyRewardingGoodDeeds: CharacterCard = {
  id: "llN",
  canonicalId: "ci_llN",
  reprints: ["set2-036"],
  cardType: "character",
  name: "Blue Fairy",
  version: "Rewarding Good Deeds",
  i18n: {
    en: {
      name: "Blue Fairy",
      version: "Rewarding Good Deeds",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "ETHEREAL GLOW",
          description: "Whenever you play a Floodborn character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Die Blaue Fee",
      version: "Belohnt gute Taten",
      text: "Wendig HIMMLISCHES LEUCHTEN Jedes Mal, wenn du eine Flutgestalt ausspielst, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "La Fée Bleue",
      version: "Récompense les bonnes actions",
      text: "Insaisissable LUEUR ÉTHÉRÉE Chaque fois que vous jouez un personnage Floodborn, vous pouvez piocher une carte.",
    },
    it: {
      name: "Blue Fairy",
      version: "Rewarding Good Deeds",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) ETHEREAL GLOW Whenever you play a Floodborn character, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "002",
  cardNumber: 36,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fde84e341b0c47929fba2503d3141e45",
    tcgPlayer: 527542,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "ETHEREAL GLOW",
      description: "Whenever you play a Floodborn character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  missingTests: true,
  abilities: [
    {
      id: "tv6-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "tv6-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "ETHEREAL GLOW",
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
      text: "ETHEREAL GLOW Whenever you play a Floodborn character, you may draw a card.",
    },
  ],
};
