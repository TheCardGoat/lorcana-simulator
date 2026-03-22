import type { CharacterCard } from "@tcg/lorcana-types";
import { maximusTeamChampionI18n } from "./105-maximus-team-champion.i18n";

export const maximusTeamChampion: CharacterCard = {
  id: "kDj",
  canonicalId: "ci_kDj",
  reprints: ["set5-105"],
  cardType: "character",
  name: "Maximus",
  version: "Team Champion",
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 105,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a583e1fe8f2144a7bbc320e966734055",
    tcgPlayer: 561961,
  },
  text: [
    {
      title: "ROYALLY BIG REWARDS",
      description:
        "At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        optionLabels: [
          "if you have any characters in play with 5 {S}",
          "more, gain 2 lore. If you have any in play with 10 {S}",
          "more, gain 5 lore instead.",
        ],
        options: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 2,
            type: "gain-lore",
          },
          {
            amount: 5,
            type: "gain-lore",
          },
        ],
        type: "choice",
      },
      id: "p5e-1",
      text: "ROYALLY BIG REWARDS At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.",
      type: "action",
    },
  ],
  i18n: maximusTeamChampionI18n,
};
