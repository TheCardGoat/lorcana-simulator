import type { CharacterCard } from "@tcg/lorcana-types";
import { belleAccomplishedMysticI18n } from "./040-belle-accomplished-mystic.i18n";

export const belleAccomplishedMystic: CharacterCard = {
  id: "m95",
  canonicalId: "ci_CTt",
  reprints: ["set4-036", "set9-040"],
  cardType: "character",
  name: "Belle",
  version: "Accomplished Mystic",
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 40,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c51b6a26015b45f298d1664787f37234",
    tcgPlayer: 651121,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "ENHANCED HEALING",
      description:
        "When you play this character, move up to 3 damage counters from chosen character to chosen opposing character.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Sorcerer"],
  abilities: [
    {
      id: "m95-1",
      keyword: "Shift",
      text: "Shift 3 {I}",
      type: "keyword",
      cost: {
        ink: 3,
      },
    },
    {
      id: "m95-2",
      name: "ENHANCED HEALING",
      text: "ENHANCED HEALING When you play this character, move up to 3 damage counters from chosen character to chosen opposing character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "move-damage",
          amount: 3,
          from: "CHOSEN_CHARACTER",
          to: "CHOSEN_OPPOSING_CHARACTER",
        },
      },
    },
  ],
  i18n: belleAccomplishedMysticI18n,
};
