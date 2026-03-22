import type { CharacterCard } from "@tcg/lorcana-types";
import { jiminyCricketGhostOfChristmasPastEpicI18n } from "./218-jiminy-cricket-ghost-of-christmas-past-epic.i18n";

export const jiminyCricketGhostOfChristmasPastEpic: CharacterCard = {
  id: "tje",
  canonicalId: "ci_dGY",
  reprints: ["set11-146"],
  cardType: "character",
  name: "Jiminy Cricket",
  version: "Ghost of Christmas Past",
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 218,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea1ae83b3c414a2a838398390473ebc6",
    tcgPlayer: 677153,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "LOOK INTO YOUR PAST",
      description:
        "Whenever you put a card under this character, you may put a card from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Ghost"],
  abilities: [
    {
      id: "5um-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "5um-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
          exerted: true,
          facedown: true,
        },
        type: "optional",
      },
      name: "LOOK INTO YOUR PAST",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LOOK INTO YOUR PAST Whenever you put a card under this character, you may put a card from your discard into your inkwell facedown and exerted.",
    },
  ],
  i18n: jiminyCricketGhostOfChristmasPastEpicI18n,
};
