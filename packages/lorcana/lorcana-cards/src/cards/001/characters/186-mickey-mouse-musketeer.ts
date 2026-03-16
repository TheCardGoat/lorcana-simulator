import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseMusketeer: CharacterCard = {
  id: "sdI",
  canonicalId: "ci_sdI",
  reprints: ["set1-186"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Musketeer",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "ALL FOR ONE",
          description: "Your other Musketeer characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Mickey Mouse",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) ALL FOR ONE Your other Musketeer characters get +1.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) ALL FOR ONE Your other Musketeer characters get +1.",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Musketeer",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) ALL FOR ONE Your other Musketeer characters get +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "001",
  cardNumber: 186,
  rarity: "rare",
  cost: 6,
  strength: 2,
  willpower: 7,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_94245aa3b4a241379cf9f7fbbf7f6cd7",
    tcgPlayer: 494141,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "ALL FOR ONE",
      description: "Your other Musketeer characters get +1 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      id: "9h9-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "9h9-2",
      name: "ALL FOR ONE",
      text: "ALL FOR ONE Your other Musketeer characters get +1 {S}.",
      type: "static",
    },
  ],
};
