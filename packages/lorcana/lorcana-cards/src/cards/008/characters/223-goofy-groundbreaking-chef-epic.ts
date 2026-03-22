import type { CharacterCard } from "@tcg/lorcana-types";
import { goofyGroundbreakingChefEpicI18n } from "./223-goofy-groundbreaking-chef-epic.i18n";

export const goofyGroundbreakingChefEpic: CharacterCard = {
  id: "TRK",
  canonicalId: "ci_fqx",
  reprints: ["set8-004"],
  cardType: "character",
  name: "Goofy",
  version: "Groundbreaking Chef",
  inkType: ["amber"],
  set: "008",
  cardNumber: 223,
  rarity: "legendary",
  specialRarity: "epic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5271034abc194947b4c2b0e9c66b7f78",
    tcgPlayer: 632719,
  },
  text: [
    {
      title: "PLENTY TO GO AROUND",
      description:
        "At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "t21-1",
      name: "PLENTY TO GO AROUND",
      type: "triggered",
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["character"],
            excludeSelf: true,
          },
          type: "remove-damage",
          upTo: true,
          thenReady: true,
        },
        type: "optional",
      },
      text: "PLENTY TO GO AROUND At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.",
    },
  ],
  i18n: goofyGroundbreakingChefEpicI18n,
};
