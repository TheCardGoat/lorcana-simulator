import type { ActionCard } from "@tcg/lorcana-types";
import { letsGetDangerousEnchantedI18n } from "./240-lets-get-dangerous-enchanted.i18n";

export const letsGetDangerousEnchanted: ActionCard = {
  id: "p0y",
  canonicalId: "ci_iht",
  reprints: ["set11-198"],
  cardType: "action",
  name: "Let's Get Dangerous",
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 240,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_656cd1bfb0084f92bfd003ca69b3b3c9",
    tcgPlayer: 677171,
  },
  text: "Each player shuffles their deck and then reveals the top card. Each player who reveals a character card may play that character for free. Otherwise, put the revealed cards on the bottom of their player's deck.",
  actionSubtype: "song",
  abilities: [
    {
      id: "w7s-1",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "shuffle-into-deck",
            target: "EACH_PLAYER",
          },
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
                cardTypes: ["character"],
              },
            },
            then: {
              type: "choice",
              chooser: "CONTROLLER",
              options: [
                {
                  type: "play-card",
                  from: "revealed",
                  cardType: "character",
                  cost: "free",
                  target: "CONTROLLER",
                },
                {
                  type: "put-on-bottom",
                  target: {
                    selector: "chosen",
                    count: 1,
                    reference: "revealed-first",
                  },
                },
              ],
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
          {
            type: "reveal-top-card",
            target: "OPPONENT",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
                cardTypes: ["character"],
              },
            },
            then: {
              type: "choice",
              chooser: "OPPONENT",
              options: [
                {
                  type: "play-card",
                  from: "revealed",
                  cardType: "character",
                  cost: "free",
                  target: "OPPONENT",
                },
                {
                  type: "put-on-bottom",
                  target: {
                    selector: "chosen",
                    count: 1,
                    reference: "revealed-first",
                  },
                },
              ],
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
        ],
      },
      type: "action",
      text: "Each player shuffles their deck and then reveals the top card. Each player who reveals a character card may play that character for free. Otherwise, put the revealed cards on the bottom of their player’s deck.",
    },
  ],
  i18n: letsGetDangerousEnchantedI18n,
};
