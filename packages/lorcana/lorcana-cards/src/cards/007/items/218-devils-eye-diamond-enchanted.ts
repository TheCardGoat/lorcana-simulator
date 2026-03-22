import type { ItemCard } from "@tcg/lorcana-types";
import { devilsEyeDiamondEnchantedI18n } from "./218-devils-eye-diamond-enchanted.i18n";

export const devilsEyeDiamondEnchanted: ItemCard = {
  id: "6Y4",
  canonicalId: "ci_o00",
  reprints: ["set7-152"],
  cardType: "item",
  name: "Devil's Eye Diamond",
  inkType: ["ruby"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 218,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6a4c5fe1b3b74110acd16d725f8cc3f6",
    tcgPlayer: 619746,
  },
  text: [
    {
      title: "THE PRICE OF POWER",
      description: "{E} — If one of your characters was damaged this turn, gain 1 lore.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          type: "turn-metric",
          metric: "damaged-characters-by-owner",
          ownerScope: "you",
          comparison: {
            operator: "gt",
            value: 0,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "136-1",
      name: "THE PRICE OF POWER",
      text: "THE PRICE OF POWER {E} — If one of your characters was damaged this turn, gain 1 lore.",
      type: "activated",
    },
  ],
  i18n: devilsEyeDiamondEnchantedI18n,
};
