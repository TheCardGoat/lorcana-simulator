import type { ActionCard } from "@tcg/lorcana-types";
import { touchTheSkyEnchantedI18n } from "./240-touch-the-sky-enchanted.i18n";

export const touchTheSkyEnchanted: ActionCard = {
  id: "fvk",
  canonicalId: "ci_kgN",
  reprints: ["set12-199"],
  cardType: "action",
  name: "Touch the Sky",
  inkType: ["steel"],
  franchise: "Brave",
  set: "012",
  cardNumber: 240,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0b20b27507194e779b1e9d043d19e5de",
  },
  text: "Move a character of yours to a location for free. Then, draw cards equal to that location's {L}.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "move-to-location",
            cost: "free",
            character: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            location: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["location"],
            },
          },
          {
            type: "draw",
            target: "CONTROLLER",
            amount: {
              type: "target-location-attribute",
              attribute: "lore",
            },
          },
        ],
      },
    },
  ],
  i18n: touchTheSkyEnchantedI18n,
};
