import type { ActionCard } from "@tcg/lorcana-types";
import { circleOfLifeEnchantedI18n } from "./225-circle-of-life-enchanted.i18n";

export const circleOfLifeEnchanted: ActionCard = {
  id: "pVb",
  canonicalId: "ci_gzm",
  reprints: ["set9-026"],
  cardType: "action",
  name: "Circle of Life",
  inkType: ["amber"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 225,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  inkable: true,
  externalIds: {
    lorcast: "crd_ee377c93c09341fe808b8582cbded0f2",
    tcgPlayer: 649230,
  },
  text: [
    {
      title: "Sing Together 8",
    },
    {
      title: "Play a character from your discard for free.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        cardType: "character",
        cost: "free",
        from: "discard",
        type: "play-card",
      },
      id: "1bo-1",
      text: "Sing Together 8 Play a character from your discard for free.",
      type: "action",
    },
  ],
  i18n: circleOfLifeEnchantedI18n,
};
