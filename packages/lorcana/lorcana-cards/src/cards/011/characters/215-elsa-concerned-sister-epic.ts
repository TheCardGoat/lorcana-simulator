import type { CharacterCard } from "@tcg/lorcana-types";
import { elsaConcernedSisterEpicI18n } from "./215-elsa-concerned-sister-epic.i18n";

export const elsaConcernedSisterEpic: CharacterCard = {
  id: "x57",
  canonicalId: "ci_YF2",
  reprints: ["set11-125"],
  cardType: "character",
  name: "Elsa",
  version: "Concerned Sister",
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 215,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d66016477d454f19abf12684a50221ef",
    tcgPlayer: 677150,
  },
  text: [
    {
      title: "CLEAR THE WAY",
      description:
        "When you play this character, you pay 2 {I} less for the next location you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "1tp-1",
      effect: {
        amount: 2,
        cardType: "location",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      name: "CLEAR THE WAY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CLEAR THE WAY When you play this character, you pay 2 {I} less for the next location you play this turn.",
    },
  ],
  i18n: elsaConcernedSisterEpicI18n,
};
