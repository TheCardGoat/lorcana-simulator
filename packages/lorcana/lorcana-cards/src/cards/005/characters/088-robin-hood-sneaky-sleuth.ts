import type { CharacterCard } from "@tcg/lorcana-types";
import { robinHoodSneakySleuthI18n } from "./088-robin-hood-sneaky-sleuth.i18n";

export const robinHoodSneakySleuth: CharacterCard = {
  id: "9VF",
  canonicalId: "ci_9VF",
  reprints: ["set5-088"],
  cardType: "character",
  name: "Robin Hood",
  version: "Sneaky Sleuth",
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 88,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c87a5472942748c6af5d609bb93d63c1",
    tcgPlayer: 559159,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "CLEVER PLAN",
      description: "This character gets +1 {L} for each opposing damaged character in play.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "qao-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "qao-2",
      text: "CLEVER PLAN This character gets +1 {L} for each opposing damaged character in play.",
      type: "static",
    },
  ],
  i18n: robinHoodSneakySleuthI18n,
};
