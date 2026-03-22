import type { CharacterCard } from "@tcg/lorcana-types";
import { minnieMouseWideeyedDiverI18n } from "./114-minnie-mouse-wide-eyed-diver.i18n";

export const minnieMouseWideeyedDiver: CharacterCard = {
  id: "8gH",
  canonicalId: "ci_8gH",
  reprints: ["set2-114"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Wide-Eyed Diver",
  inkType: ["ruby"],
  set: "002",
  cardNumber: 114,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a79cd84bf7444d0f847f6ceb36c93f24",
    tcgPlayer: 519169,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "Evasive",
    },
    {
      title: "UNDERSEA ADVENTURE",
      description:
        "Whenever you play a second action in a turn, this character gets +2 {L} this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "974-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      id: "974-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "974-3",
      name: "UNDERSEA ADVENTURE",
      text: "UNDERSEA ADVENTURE Whenever you play a second action in a turn, this character gets +2 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  missingTests: true,
  i18n: minnieMouseWideeyedDiverI18n,
};
