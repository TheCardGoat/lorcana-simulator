import type { CharacterCard } from "@tcg/lorcana-types";
import { minnieMouseMrsCratchitEpicI18n } from "./213-minnie-mouse-mrs-cratchit-epic.i18n";

export const minnieMouseMrsCratchitEpic: CharacterCard = {
  id: "VHR",
  canonicalId: "ci_mKu",
  reprints: ["set11-088"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Mrs. Cratchit",
  inkType: ["emerald"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 213,
  rarity: "common",
  specialRarity: "epic",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_84aa488aa433406493abed00a9d99611",
    tcgPlayer: 677148,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "A MOTHER'S LOVE",
      description:
        "When you play this character, you may put the top card of your deck facedown under one of your characters or locations with Boost. If you do, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "18q-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "18q-2",
      effect: {
        optionLabels: [
          "A MOTHER’S LOVE When you play this character, you may put the top card of your deck facedown under one of your characters",
          "locations with Boost. If you do, draw a card.",
        ],
        options: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "choice",
      },
      type: "action",
      text: "A MOTHER’S LOVE When you play this character, you may put the top card of your deck facedown under one of your characters or locations with Boost. If you do, draw a card.",
    },
  ],
  i18n: minnieMouseMrsCratchitEpicI18n,
};
