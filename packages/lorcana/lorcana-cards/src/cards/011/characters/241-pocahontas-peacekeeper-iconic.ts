import type { CharacterCard } from "@tcg/lorcana-types";
import { pocahontasPeacekeeperIconicI18n } from "./241-pocahontas-peacekeeper-iconic.i18n";

export const pocahontasPeacekeeperIconic: CharacterCard = {
  id: "0wY",
  canonicalId: "ci_4DB",
  reprints: ["set11-022"],
  cardType: "character",
  name: "Pocahontas",
  version: "Peacekeeper",
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_40a3f6d8de604ff085fa5629597780a3",
    tcgPlayer: 673298,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "CALMING WORDS",
      description:
        "When you play this character, if you used Shift to play her and none of your characters challenged this turn, characters can't challenge until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      id: "sbm-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "sbm-2",
      effect: {
        condition: {
          expression: "you used Shift to play her and none of your characters challenged this turn",
          type: "if",
        },
        then: {
          restriction: "cant-challenge",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      name: "CALMING WORDS",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CALMING WORDS When you play this character, if you used Shift to play her and none of your characters challenged this turn, characters can't challenge until the start of your next turn.",
    },
  ],
  i18n: pocahontasPeacekeeperIconicI18n,
};
