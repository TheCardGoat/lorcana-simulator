import type { CharacterCard } from "@tcg/lorcana-types";
import { robinHoodSharpshooterEnchantedI18n } from "./215-robin-hood-sharpshooter-enchanted.i18n";

export const robinHoodSharpshooterEnchanted: CharacterCard = {
  id: "Uem",
  canonicalId: "ci_qwp",
  reprints: ["set5-118"],
  cardType: "character",
  name: "Robin Hood",
  version: "Sharpshooter",
  inkType: ["ruby"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d08869cde8294b0b9f73d0f7192e2335",
    tcgPlayer: 561984,
  },
  text: [
    {
      title: "MY GREATEST PERFORMANCE",
      description:
        "Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        type: "scry",
        amount: 4,
        destinations: [
          {
            zone: "play",
            min: 0,
            max: 1,
            reveal: true,
            cost: "free",
            filters: [
              {
                type: "card-type",
                cardType: "action",
              },
              {
                type: "cost",
                comparison: "lte",
                value: 6,
              },
            ],
          },
          {
            zone: "discard",
            remainder: true,
          },
        ],
      },
      id: "1w7-1",
      name: "MY GREATEST PERFORMANCE",
      text: "MY GREATEST PERFORMANCE Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: robinHoodSharpshooterEnchantedI18n,
};
