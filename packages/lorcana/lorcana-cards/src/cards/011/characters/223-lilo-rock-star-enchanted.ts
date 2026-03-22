import type { CharacterCard } from "@tcg/lorcana-types";
import { liloRockStarEnchantedI18n } from "./223-lilo-rock-star-enchanted.i18n";

export const liloRockStarEnchanted: CharacterCard = {
  id: "wic",
  canonicalId: "ci_2am",
  reprints: ["set11-017"],
  cardType: "character",
  name: "Lilo",
  version: "Rock Star",
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 223,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_41acb92e0c494214949c72c409593b50",
    tcgPlayer: 677158,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "I'LL COUNT YOU IN",
      description:
        "Whenever this character quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "11h-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
    {
      id: "11h-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "discard",
          type: "play-card",
          cost: "free",
        },
        type: "optional",
      },
      type: "action",
      text: "I’LL COUNT YOU IN Whenever this character quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
  i18n: liloRockStarEnchantedI18n,
};
