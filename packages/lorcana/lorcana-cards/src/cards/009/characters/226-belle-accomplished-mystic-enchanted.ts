import type { CharacterCard } from "@tcg/lorcana-types";
import { belleAccomplishedMysticEnchantedI18n } from "./226-belle-accomplished-mystic-enchanted.i18n";

export const belleAccomplishedMysticEnchanted: CharacterCard = {
  id: "OJv",
  canonicalId: "ci_CTt",
  reprints: ["set4-036", "set9-040"],
  cardType: "character",
  name: "Belle",
  version: "Accomplished Mystic",
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 226,
  rarity: "enchanted",
  specialRarity: "enchanted",
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
      id: "OJv-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3",
    },
    {
      id: "OJv-2",
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
  i18n: belleAccomplishedMysticEnchantedI18n,
};
