import type { CharacterCard } from "@tcg/lorcana-types";
import { ratiganGreedyGeniusI18n } from "./167-ratigan-greedy-genius.i18n";

export const ratiganGreedyGenius: CharacterCard = {
  id: "Ca0",
  canonicalId: "ci_Ca0",
  reprints: ["set8-167"],
  cardType: "character",
  name: "Ratigan",
  version: "Greedy Genius",
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "008",
  cardNumber: 167,
  rarity: "legendary",
  cost: 8,
  strength: 6,
  willpower: 7,
  lore: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_6119229219f04cdaa2650c87645a1bf4",
    tcgPlayer: 631464,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "TIME RUNS OUT",
      description:
        "At the end of your turn, if you didn't put any cards into your inkwell this turn, banish this character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "e9z-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "cards-inked",
          comparison: {
            operator: "eq",
            value: 0,
          },
        },
        then: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "conditional",
      },
      id: "e9z-2",
      text: "TIME RUNS OUT At the end of your turn, if you didn't put any cards into your inkwell this turn, banish this character.",
      type: "action",
    },
  ],
  i18n: ratiganGreedyGeniusI18n,
};
