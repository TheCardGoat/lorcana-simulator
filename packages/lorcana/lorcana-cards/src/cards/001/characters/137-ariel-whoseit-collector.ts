import type { CharacterCard } from "@tcg/lorcana-types";

export const arielWhoseitCollector: CharacterCard = {
  id: "5XS",
  canonicalId: "ci_5XS",
  reprints: ["set1-137"],
  cardType: "character",
  name: "Ariel",
  version: "Whoseit Collector",
  i18n: {
    en: {
      name: "Ariel",
      version: "Whoseit Collector",
      text: [
        {
          title: "LOOK AT THIS STUFF",
          description: "Whenever you play an item, you may ready this character.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Krimskrams-Sammlerin",
      text: [
        {
          title: "SIEHST DU DEN KRAM?",
          description:
            "Jedes Mal, wenn du einen Gegenstand ausspielst, darfst du diesen Charakter bereit machen.",
        },
      ],
    },
    fr: {
      name: "ARIEL",
      version: "Collectionneuse de couics et de couacs",
      text: [
        {
          title: "VOIS CES TRÉSORS",
          description: "Chaque fois que vous jouez un objet, vous pouvez redresser ce personnage.",
        },
      ],
    },
    it: {
      name: "Ariel",
      version: "Whoseit Collector",
      text: [
        {
          title: "LOOK AT THIS STUFF",
          description: "Whenever you play an item, you may ready this character.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 137,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_a23c99ed9f3243969466fb000bd139dc",
    tcgPlayer: 502532,
  },
  text: [
    {
      title: "LOOK AT THIS STUFF",
      description: "Whenever you play an item, you may ready this character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "c6b-1",
      text: "**PRINCE'S CHARM** You may ready this character.",
      type: "action",
    },
  ],
};
