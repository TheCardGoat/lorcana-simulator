import type { CharacterCard } from "@tcg/lorcana-types";
import { merlinCompletingHisResearchEpicI18n } from "./209-merlin-completing-his-research-epic.i18n";

export const merlinCompletingHisResearchEpic: CharacterCard = {
  id: "ZjO",
  canonicalId: "ci_Vvr",
  reprints: ["set10-058"],
  cardType: "character",
  name: "Merlin",
  version: "Completing His Research",
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "010",
  cardNumber: 209,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 0,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d51cdd2a1d904e03adb5e255a2b53a22",
    tcgPlayer: 660189,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "LEGACY OF LEARNING",
      description:
        "When this character is banished in a challenge, if he had a card under him, draw 2 cards.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer", "Whisper"],
  abilities: [
    {
      id: "mr7-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "mr7-2",
      effect: {
        condition: {
          expression: "he had a card under him",
          type: "if",
        },
        then: {
          amount: 2,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "LEGACY OF LEARNING",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LEGACY OF LEARNING When this character is banished in a challenge, if he had a card under him, draw 2 cards.",
    },
  ],
  i18n: merlinCompletingHisResearchEpicI18n,
};
