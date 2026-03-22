import type { CharacterCard } from "@tcg/lorcana-types";
import { donaldDuckPieSlingerEnchantedI18n } from "./214-donald-duck-pie-slinger-enchanted.i18n";

export const donaldDuckPieSlingerEnchanted: CharacterCard = {
  id: "LmE",
  canonicalId: "ci_gl4",
  reprints: ["set5-107"],
  cardType: "character",
  name: "Donald Duck",
  version: "Pie Slinger",
  inkType: ["ruby"],
  set: "005",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_306fb0ac65b44f289a2cbacac51ba9fe",
    tcgPlayer: 559716,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "HUMBLE PIE",
      description:
        "When you play this character, if you used Shift to play him, each opponent loses 2 lore.",
    },
    {
      title: "RAGING DUCK",
      description: "While an opponent has 10 or more lore, this character gets +6 {S}.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Knight"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "14s-0",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      id: "14s-1",
      text: "HUMBLE PIE When you play this character, if you used Shift to play him, each opponent loses {d} lore.",
      name: "HUMBLE PIE",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        amount: 2,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      condition: {
        type: "used-shift",
      },
    },
    {
      id: "14s-2",
      text: "RAGING DUCK While an opponent has {d} or more lore, this character gets +{d} {S}.",
      name: "RAGING DUCK",
      type: "static",
      effect: {
        modifier: 6,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      condition: {
        comparison: "greater-or-equal",
        left: {
          controller: "opponent",
          type: "lore",
        },
        right: {
          type: "constant",
          value: 10,
        },
        type: "comparison",
      },
    },
  ],
  i18n: donaldDuckPieSlingerEnchantedI18n,
};
