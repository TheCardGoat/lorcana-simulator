import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseWaywardSorcerer: CharacterCard = {
  id: "iGH",
  canonicalId: "ci_cZb",
  reprints: ["set1-051"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Wayward Sorcerer",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Wayward Sorcerer",
      text: [
        {
          title: "ANIMATE BROOM",
          description: "You pay 1 {I} less to play Broom characters.",
        },
        {
          title: "CEASELESS WORKER",
          description:
            "Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Eigenwilliger Zauberer",
      text: [
        {
          title: "LEBENDIGE BESEN",
          description: "Du zahlst 1 weniger, um Besen auszuspielen.",
        },
        {
          title: "UNERMÜDLICHE ARBEITER",
          description:
            "Jedes Mal, wenn einer deiner Besen durch eine Herausforderung verbannt wird, darfst du jene Karte zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "MICKEY",
      version: "Sorcier renégat",
      text: [
        {
          title: "ANIMER LES BALAIS",
          description: "Les personnages Balai vous coûtent 1 de moins à jouer.",
        },
        {
          title: "TRAVAILLEUR INFATIGABLE",
          description:
            "Si l'un de vos personnages Balai est banni via un défi, vous pouvez le reprendre en main.",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Wayward Sorcerer",
      text: [
        {
          title: "ANIMATE BROOM",
          description: "You pay 1 less to play Broom characters.",
        },
        {
          title: "CEASELESS WORKER",
          description:
            "Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  set: "001",
  cardNumber: 51,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_5739e1f6076840cd901a1bc283ca6e96",
    tcgPlayer: 510154,
  },
  text: [
    {
      title: "ANIMATE BROOM",
      description: "You pay 1 {I} less to play Broom characters.",
    },
    {
      title: "CEASELESS WORKER",
      description:
        "Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
    },
  ],
  classifications: ["Dreamborn", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "kuw-1",
      text: "**CEASELESS WORKER** Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
      type: "action",
    },
  ],
};
