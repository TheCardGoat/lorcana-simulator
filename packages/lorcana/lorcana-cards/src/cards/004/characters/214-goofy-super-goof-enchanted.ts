import type { CharacterCard } from "@tcg/lorcana-types";
import { goofySuperGoofEnchantedI18n } from "./214-goofy-super-goof-enchanted.i18n";

export const goofySuperGoofEnchanted: CharacterCard = {
  id: "8aU",
  canonicalId: "ci_EA0",
  reprints: ["set4-107"],
  cardType: "character",
  name: "Goofy",
  version: "Super Goof",
  inkType: ["ruby"],
  set: "004",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3088ee50256240d0b22c045f593df9a8",
    tcgPlayer: 550542,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "SUPER PEANUT POWERS",
      description: "Whenever this character challenges another character, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1n2-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "1n2-2",
      name: "SUPER PEANUT POWERS",
      text: "SUPER PEANUT POWERS Whenever this character challenges another character, gain 2 lore.",
      trigger: {
        defender: {},
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: goofySuperGoofEnchantedI18n,
};
