import type { CharacterCard } from "@tcg/lorcana-types";
import { mrsPottsEnchantedTeapotI18n } from "./052-mrs-potts-enchanted-teapot.i18n";

export const mrsPottsEnchantedTeapot: CharacterCard = {
  id: "R9W",
  canonicalId: "ci_R9W",
  reprints: ["set4-052"],
  cardType: "character",
  name: "Mrs. Potts",
  version: "Enchanted Teapot",
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 52,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_26639bb10e744e3ca745b81492084497",
    tcgPlayer: 549620,
  },
  text: [
    {
      title: "IT'LL TURN OUT ALL RIGHT",
      description:
        "When you play this character, if you have a character named Lumiere or Cogsworth in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          controller: "you",
          name: "Lumiere or Cogsworth in play",
          type: "has-named-character",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "1mj-1",
      name: "IT'LL TURN OUT ALL RIGHT",
      text: "IT'LL TURN OUT ALL RIGHT When you play this character, if you have a character named Lumiere or Cogsworth in play, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: mrsPottsEnchantedTeapotI18n,
};
