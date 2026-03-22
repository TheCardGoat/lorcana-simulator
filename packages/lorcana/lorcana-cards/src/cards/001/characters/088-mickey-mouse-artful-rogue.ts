import type { CharacterCard } from "@tcg/lorcana-types";
import { mickeyMouseArtfulRogueI18n } from "./088-mickey-mouse-artful-rogue.i18n";

export const mickeyMouseArtfulRogue: CharacterCard = {
  id: "PiO",
  canonicalId: "ci_8IO",
  reprints: ["set1-088"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Artful Rogue",
  inkType: ["emerald"],
  set: "001",
  cardNumber: 88,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1a8604b7ba6c45e2bc8b32b0a70d08b5",
    tcgPlayer: 510156,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "MISDIRECTION",
      description:
        "Whenever you play an action, chosen opposing character can't quest during their next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "dul-1",
      text: "**Shift** 5 (_You may pay 5 {I} to play this on top of one of your characters named Tinker Bell._)\n**MISDIRECTION** Whenever you play an action, chosen opposing character can",
      type: "action",
    },
  ],
  i18n: mickeyMouseArtfulRogueI18n,
};
