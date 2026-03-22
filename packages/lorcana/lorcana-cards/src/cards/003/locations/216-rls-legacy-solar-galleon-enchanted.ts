import type { LocationCard } from "@tcg/lorcana-types";
import { rlsLegacySolarGalleonEnchantedI18n } from "./216-rls-legacy-solar-galleon-enchanted.i18n";

export const rlsLegacySolarGalleonEnchanted: LocationCard = {
  id: "2t3",
  canonicalId: "ci_Rim",
  reprints: ["set3-136"],
  cardType: "location",
  name: "RLS Legacy",
  version: "Solar Galleon",
  inkType: ["ruby"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 216,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  willpower: 8,
  moveCost: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_7c421033c14c40e7a5be957ba42bb1b7",
    tcgPlayer: 539167,
  },
  text: [
    {
      title: "THIS IS OUR SHIP",
      description: "Characters gain Evasive while here.",
    },
    {
      title: "HEAVE TOGETHER NOW",
      description:
        "If you have a character here, you pay 2 {I} less to move a character of yours here.",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "CHARACTERS_HERE",
        type: "gain-keyword",
      },
      type: "static",
    },
    {
      type: "static",
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        filter: {
          cardType: "character",
        },
        location: "here",
        reduction: 2,
        type: "move-cost-reduction",
      },
    },
  ],
  i18n: rlsLegacySolarGalleonEnchantedI18n,
};
