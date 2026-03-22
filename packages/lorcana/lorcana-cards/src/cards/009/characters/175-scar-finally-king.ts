import type { CharacterCard } from "@tcg/lorcana-types";
import { scarFinallyKingI18n } from "./175-scar-finally-king.i18n";

export const scarFinallyKing: CharacterCard = {
  id: "mUj",
  canonicalId: "ci_rq5",
  reprints: ["set9-175"],
  cardType: "character",
  name: "Scar",
  version: "Finally King",
  inkType: ["steel"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 175,
  rarity: "legendary",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3d02b1019aa34f70b5e0da64191d9326",
    tcgPlayer: 651108,
  },
  text: [
    {
      title: "BE GRATEFUL",
      description: "Your Ally characters get +1 {S}.",
    },
    {
      title: "STICK WITH ME",
      description:
        "At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "King"],
  abilities: [
    {
      id: "1vp-1",
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      type: "static",
      name: "BE GRATEFUL Your Ally",
      text: "BE GRATEFUL Your Ally characters get +1 {S}.",
    },
    {
      id: "1vp-2",
      effect: {
        amount: 2,
        chosen: false,
        target: "CONTROLLER",
        type: "discard",
      },
      type: "action",
      text: "STICK WITH ME At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.",
    },
  ],
  i18n: scarFinallyKingI18n,
};
