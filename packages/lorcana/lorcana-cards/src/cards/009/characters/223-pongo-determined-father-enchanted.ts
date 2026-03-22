import type { CharacterCard } from "@tcg/lorcana-types";
import { pongoDeterminedFatherEnchantedI18n } from "./223-pongo-determined-father-enchanted.i18n";

export const pongoDeterminedFatherEnchanted: CharacterCard = {
  id: "0eJ",
  canonicalId: "ci_4Yx",
  reprints: ["set3-019", "set9-002"],
  cardType: "character",
  name: "Pongo",
  version: "Determined Father",
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "009",
  cardNumber: 223,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c233fd3627b24b02bd616aa62bbdc83a",
    tcgPlayer: 651110,
  },
  text: [
    {
      title: "TWILIGHT BARK",
      description:
        "Once during your turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "revealed-first",
            filters: [
              {
                type: "card-type",
                value: "character",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      id: "1ve-1",
      text: "TWILIGHT BARK Once during your turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.",
      type: "action",
    },
  ],
  i18n: pongoDeterminedFatherEnchantedI18n,
};
