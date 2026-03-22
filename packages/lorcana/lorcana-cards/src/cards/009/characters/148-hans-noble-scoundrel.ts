import type { CharacterCard } from "@tcg/lorcana-types";
import { hansNobleScoundrelI18n } from "./148-hans-noble-scoundrel.i18n";

export const hansNobleScoundrel: CharacterCard = {
  id: "ylY",
  canonicalId: "ci_nNC",
  reprints: ["set4-146", "set9-148"],
  cardType: "character",
  name: "Hans",
  version: "Noble Scoundrel",
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 148,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_34956960ca9c4048b6d2887bb9ca7446",
    tcgPlayer: 650083,
  },
  text: [
    {
      title: "ROYAL SCHEMES",
      description:
        "When you play this character, if a Princess or Queen character is in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  abilities: [
    {
      effect: {
        condition: {
          type: "or",
          conditions: [
            {
              type: "target-query",
              query: {
                selector: "all",
                owner: "any",
                zones: ["play"],
                cardType: "character",
                filter: [
                  {
                    type: "has-classification",
                    classification: "Princess",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            {
              type: "target-query",
              query: {
                selector: "all",
                owner: "any",
                zones: ["play"],
                cardType: "character",
                filter: [
                  {
                    type: "has-classification",
                    classification: "Queen",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
          ],
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1wq-1",
      name: "ROYAL SCHEMES",
      text: "ROYAL SCHEMES When you play this character, if a Princess or Queen character is in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: hansNobleScoundrelI18n,
};
