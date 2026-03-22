import type { CharacterCard } from "@tcg/lorcana-types";
import { mufasaBetrayedLeaderI18n } from "./014-mufasa-betrayed-leader.i18n";

export const mufasaBetrayedLeader: CharacterCard = {
  id: "dcy",
  canonicalId: "ci_dcy",
  reprints: ["set2-014"],
  cardType: "character",
  name: "Mufasa",
  version: "Betrayed Leader",
  inkType: ["amber"],
  franchise: "Lion King",
  set: "002",
  cardNumber: 14,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_00dc125290b34527b59cec4901ec94f9",
    tcgPlayer: 527263,
  },
  text: [
    {
      title: "THE SUN WILL SET",
      description:
        "When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "King"],
  abilities: [
    {
      effect: {
        steps: [
          {
            target: "CONTROLLER",
            type: "reveal-top-card",
          },
          {
            type: "conditional",
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
              effect: {
                cost: "free",
                from: "revealed",
                entersExerted: true,
                target: "CONTROLLER",
                type: "play-card",
              },
              type: "optional",
            },
            else: {
              source: "revealed",
              type: "put-on-top",
            },
          },
        ],
        type: "sequence",
      },
      id: "6k5-1",
      name: "THE SUN WILL SET",
      text: "THE SUN WILL SET When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: mufasaBetrayedLeaderI18n,
};
