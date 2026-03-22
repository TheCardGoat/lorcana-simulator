import type { CharacterCard } from "@tcg/lorcana-types";
import { madHatterUnrulyEccentricEnchantedI18n } from "./213-mad-hatter-unruly-eccentric-enchanted.i18n";

export const madHatterUnrulyEccentricEnchanted: CharacterCard = {
  id: "b11",
  canonicalId: "ci_6gF",
  reprints: ["set7-094"],
  cardType: "character",
  name: "Mad Hatter",
  version: "Unruly Eccentric",
  inkType: ["emerald", "ruby"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6826d906dfc147e89f475f146034e75f",
    tcgPlayer: 619741,
  },
  text: [
    {
      title: "UNBIRTHDAY PRESENT",
      description:
        "Whenever a damaged character challenges another character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "11o-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "UNBIRTHDAY PRESENT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "UNBIRTHDAY PRESENT Whenever a damaged character challenges another character, you may draw a card.",
    },
  ],
  i18n: madHatterUnrulyEccentricEnchantedI18n,
};
