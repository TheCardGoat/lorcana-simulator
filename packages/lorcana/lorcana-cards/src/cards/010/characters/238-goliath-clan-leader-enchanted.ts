import type { CharacterCard } from "@tcg/lorcana-types";
import { goliathClanLeaderEnchantedI18n } from "./238-goliath-clan-leader-enchanted.i18n";

export const goliathClanLeaderEnchanted: CharacterCard = {
  id: "wwB",
  canonicalId: "ci_KcO",
  reprints: ["set10-173"],
  cardType: "character",
  name: "Goliath",
  version: "Clan Leader",
  inkType: ["steel"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 238,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8941521977e54d6fa2baaae91d13fb6e",
    tcgPlayer: 660035,
  },
  text: [
    {
      title: "DUSK TO DAWN",
      description:
        "At the end of each player's turn, if they have more than 2 cards in their hand, they choose and discard cards until they have 2. If they have fewer than 2 cards in their hand, they draw until they have 2.",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Gargoyle"],
  abilities: [
    {
      id: "KcO-1",
      name: "DUSK TO DAWN",
      text: "DUSK TO DAWN At the end of each player's turn, if they have more than 2 cards in their hand, they choose and discard cards until they have 2. If they have fewer than 2 cards in their hand, they draw until they have 2.",
      type: "triggered",
      trigger: {
        event: "end-turn",
        on: "ANY_PLAYER",
        timing: "at",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "resource-count",
          what: "cards-in-hand",
          controller: "you",
          comparison: "greater-than",
          value: 2,
        },
        then: {
          type: "discard",
          chosen: true,
          amount: {
            type: "difference",
            left: {
              type: "cards-in-hand",
              controller: "you",
            },
            right: 2,
          },
          target: "CONTROLLER",
        },
        else: {
          type: "conditional",
          condition: {
            type: "resource-count",
            what: "cards-in-hand",
            controller: "you",
            comparison: "less-than",
            value: 2,
          },
          then: {
            type: "draw-until-hand-size",
            size: 2,
            target: "CONTROLLER",
          },
        },
      },
    },
    {
      id: "KcO-2",
      name: "STONE BY DAY",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "static",
      condition: {
        type: "resource-count",
        what: "cards-in-hand",
        controller: "you",
        comparison: "greater-or-equal",
        value: 3,
      },
      effect: {
        type: "restriction",
        restriction: "cant-ready",
        target: "SELF",
      },
    },
  ],
  i18n: goliathClanLeaderEnchantedI18n,
};
