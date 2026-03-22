import type { CharacterCard } from "@tcg/lorcana-types";
import { peteBadGuyI18n } from "./088-pete-bad-guy.i18n";

export const peteBadGuy: CharacterCard = {
  id: "2R8",
  canonicalId: "ci_rio",
  reprints: ["set2-088"],
  cardType: "character",
  name: "Pete",
  version: "Bad Guy",
  inkType: ["emerald"],
  set: "002",
  cardNumber: 88,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_67714955a33e4508913f44b8ccb08e5c",
    tcgPlayer: 528108,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "TAKE THAT!",
      description: "Whenever you play an action, this character gets +2 {S} this turn.",
    },
    {
      title: "WHO'S NEXT?",
      description: "While this character has 7 {S} or more, he gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "kek-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "kek-2",
      name: "TAKE THAT!",
      text: "TAKE THAT! Whenever you play an action, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "kek-3",
      text: "WHO'S NEXT? While this character has 7 {S} or more, he gets +2 {L}.",
      type: "static",
    },
  ],
  missingTests: true,
  i18n: peteBadGuyI18n,
};
