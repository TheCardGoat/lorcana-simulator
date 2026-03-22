import type { CharacterCard } from "@tcg/lorcana-types";
import { mickeyMouseWaywardSorcererEnchantedI18n } from "./208-mickey-mouse-wayward-sorcerer-enchanted.i18n";

export const mickeyMouseWaywardSorcererEnchanted: CharacterCard = {
  id: "N5a",
  canonicalId: "ci_cZb",
  reprints: ["set1-051"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Wayward Sorcerer",
  inkType: ["amethyst"],
  set: "001",
  cardNumber: 208,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5739e1f6076840cd901a1bc283ca6e96",
    tcgPlayer: 510154,
  },
  text: [
    {
      title: "ANIMATE BROOM",
      description: "You pay 1 {I} less to play Broom characters.",
    },
    {
      title: "CEASELESS WORKER",
      description:
        "Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
    },
  ],
  classifications: ["Dreamborn", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "kuw-1",
      text: "**CEASELESS WORKER** Whenever one of your Broom characters is banished in a challenge, you may return that card to your hand.",
      type: "action",
    },
  ],
  i18n: mickeyMouseWaywardSorcererEnchantedI18n,
};
