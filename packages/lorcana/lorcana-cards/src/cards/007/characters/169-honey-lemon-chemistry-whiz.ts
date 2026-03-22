import type { CharacterCard } from "@tcg/lorcana-types";
import { honeyLemonChemistryWhizI18n } from "./169-honey-lemon-chemistry-whiz.i18n";

export const honeyLemonChemistryWhiz: CharacterCard = {
  id: "20p",
  canonicalId: "ci_20p",
  reprints: ["set7-169"],
  cardType: "character",
  name: "Honey Lemon",
  version: "Chemistry Whiz",
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 169,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_78044308d04647f5ac60546f4d320292",
    tcgPlayer: 619503,
  },
  text: [
    {
      title: "PRETTY GREAT, HUH?",
      description:
        "Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        condition: {
          type: "play-context",
          context: "used-shift",
        },
        then: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "conditional",
      },
      id: "1q1-1",
      text: "PRETTY GREAT, HUH? Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.",
      type: "action",
    },
  ],
  i18n: honeyLemonChemistryWhizI18n,
};
