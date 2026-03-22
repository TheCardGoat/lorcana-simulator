import type { CharacterCard } from "@tcg/lorcana-types";
import { naniHeistMastermindI18n } from "./165-nani-heist-mastermind.i18n";

export const naniHeistMastermind: CharacterCard = {
  id: "3b6",
  canonicalId: "ci_3b6",
  reprints: ["set8-165"],
  cardType: "character",
  name: "Nani",
  version: "Heist Mastermind",
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 165,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b5e5171ece4a407eb3261f2f026f4df7",
    tcgPlayer: 631462,
  },
  text: [
    {
      title: "STICK TO THE PLAN",
      description: "{E} — Another chosen character gains Resist +2 this turn.",
    },
    {
      title: "IT'S UP TO YOU, LILO",
      description:
        "Your characters named Lilo gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "d2e-1",
      text: "STICK TO THE PLAN {E} — Another chosen character gains Resist +2 this turn.",
      type: "activated",
    },
    {
      effect: {
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "d2e-2",
      text: "IT'S UP TO YOU, LILO Your characters named Lilo gain Support.",
      type: "action",
    },
  ],
  i18n: naniHeistMastermindI18n,
};
