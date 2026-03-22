import type { CharacterCard } from "@tcg/lorcana-types";
import { monstroInfamousWhaleI18n } from "./064-monstro-infamous-whale.i18n";

export const monstroInfamousWhale: CharacterCard = {
  id: "kcf",
  canonicalId: "ci_kcf",
  reprints: ["set8-064"],
  cardType: "character",
  name: "Monstro",
  version: "Infamous Whale",
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 64,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bb513d50f4fb44aab988cf4dca6c9fe5",
    tcgPlayer: 631393,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "FULL BREACH",
      description:
        "Choose and discard a card — Ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "7w3-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "7w3-2",
      text: "FULL BREACH Choose and discard a card – Ready this character. He can't quest for the rest of this turn.",
      type: "action",
    },
  ],
  i18n: monstroInfamousWhaleI18n,
};
