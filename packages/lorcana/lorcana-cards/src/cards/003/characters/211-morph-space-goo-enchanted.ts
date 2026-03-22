import type { CharacterCard } from "@tcg/lorcana-types";
import { morphSpaceGooEnchantedI18n } from "./211-morph-space-goo-enchanted.i18n";

export const morphSpaceGooEnchanted: CharacterCard = {
  id: "UdW",
  canonicalId: "ci_LwP",
  reprints: ["set3-081"],
  cardType: "character",
  name: "Morph",
  version: "Space Goo",
  inkType: ["emerald"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 211,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2e1d43823fc642549ba92787523ce17f",
    tcgPlayer: 539163,
  },
  text: [
    {
      title: "MIMICRY",
      description:
        "You may play any character with Shift on this character as if this character had any name.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
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
      id: "vo5-1",
      text: "MIMICRY You may play any character with Shift on this character as if this character had any name.",
      type: "static",
    },
  ],
  i18n: morphSpaceGooEnchantedI18n,
};
