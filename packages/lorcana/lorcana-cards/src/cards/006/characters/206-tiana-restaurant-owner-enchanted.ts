import type { CharacterCard } from "@tcg/lorcana-types";
import { tianaRestaurantOwnerEnchantedI18n } from "./206-tiana-restaurant-owner-enchanted.i18n";

export const tianaRestaurantOwnerEnchanted: CharacterCard = {
  id: "z7I",
  canonicalId: "ci_1Oj",
  reprints: ["set6-016"],
  cardType: "character",
  name: "Tiana",
  version: "Restaurant Owner",
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "006",
  cardNumber: 206,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4dfb12a1e5844317a783074a548bc8c7",
    tcgPlayer: 592031,
  },
  text: [
    {
      title: "SPECIAL RESERVATION",
      description:
        "Whenever a character of yours is challenged while this character is exerted, the challenging character gets -3 {S} this turn unless their player pays 3 {I}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      condition: {
        type: "is-exerted",
      },
      effect: {
        duration: "this-turn",
        modifier: -3,
        stat: "strength",
        target: {
          ref: "attacker",
        },
        type: "modify-stat",
      },
      id: "6kc-1",
      name: "SPECIAL RESERVATION",
      text: "SPECIAL RESERVATION Whenever a character of yours is challenged while this character is exerted, the challenging character gets -3 {S} this turn unless their player pays 3 {I}.",
      trigger: {
        event: "challenged",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: tianaRestaurantOwnerEnchantedI18n,
};
