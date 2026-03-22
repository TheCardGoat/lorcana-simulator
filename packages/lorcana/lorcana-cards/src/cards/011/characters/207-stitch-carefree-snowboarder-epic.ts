import type { CharacterCard } from "@tcg/lorcana-types";
import { stitchCarefreeSnowboarderEpicI18n } from "./207-stitch-carefree-snowboarder-epic.i18n";

export const stitchCarefreeSnowboarderEpic: CharacterCard = {
  id: "VLK",
  canonicalId: "ci_vWQ",
  reprints: ["set11-007"],
  cardType: "character",
  name: "Stitch",
  version: "Carefree Snowboarder",
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 207,
  rarity: "common",
  specialRarity: "epic",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_adca393d2367497aac99f2c4dd29b8ce",
  },
  text: [
    {
      title: "BRING YOUR FRIENDS",
      description:
        "Whenever this character quests, if you have 2 or more other characters in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      id: "1hd-1",
      effect: {
        condition: {
          expression: "you have 2 or more other characters in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "BRING YOUR FRIENDS",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "BRING YOUR FRIENDS Whenever this character quests, if you have 2 or more other characters in play, you may draw a card.",
    },
  ],
  i18n: stitchCarefreeSnowboarderEpicI18n,
};
