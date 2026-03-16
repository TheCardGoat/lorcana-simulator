import type { CharacterCard } from "@tcg/lorcana-types";

export const hiramFlavershamToymaker: CharacterCard = {
  id: "LsX",
  canonicalId: "ci_LsX",
  reprints: ["set2-149"],
  cardType: "character",
  name: "Hiram Flaversham",
  version: "Toymaker",
  i18n: {
    en: {
      name: "Hiram Flaversham",
      version: "Toymaker",
      text: [
        {
          title: "ARTIFICER",
          description:
            "When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Xaver Hampelmann",
      version: "Spielzeugmacher",
      text: [
        {
          title: "HANDWERKER",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, darfst du einen deiner Gegenstände verbannen, um 2 Karten zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Flaversham",
      version: "Fabricant de jouets",
      text: [
        {
          title: "MAÎTRE ARTISAN",
          description:
            "Lorsque vous jouez ce personnage ou lorsque vous l'envoyez à l'aventure, vous pouvez bannir l'un de vos objets pour piocher 2 cartes.",
        },
      ],
    },
    it: {
      name: "Hiram Flaversham",
      version: "Toymaker",
      text: [
        {
          title: "ARTIFICER",
          description:
            "When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 149,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e0ddeb51820a4e46840686240e076a57",
    tcgPlayer: 527277,
  },
  text: [
    {
      title: "ARTIFICER",
      description:
        "When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
    },
  ],
  classifications: ["Storyborn", "Inventor"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "slt-1",
      name: "ARTIFICER When you play this character and",
      text: "ARTIFICER When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
