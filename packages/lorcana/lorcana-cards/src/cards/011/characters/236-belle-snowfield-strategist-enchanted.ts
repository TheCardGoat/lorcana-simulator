import type { CharacterCard } from "@tcg/lorcana-types";
import { belleSnowfieldStrategistEnchantedI18n } from "./236-belle-snowfield-strategist-enchanted.i18n";

export const belleSnowfieldStrategistEnchanted: CharacterCard = {
  id: "hmt",
  canonicalId: "ci_byy",
  reprints: ["set11-158"],
  cardType: "character",
  name: "Belle",
  version: "Snowfield Strategist",
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 236,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9652fdf2822645ee91302352c74c9d6a",
    tcgPlayer: 677167,
  },
  text: [
    {
      title: "WINTER STOCKPILE",
      description:
        "Whenever one of your characters is banished, you may put that card from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "psq-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
          exerted: true,
          facedown: true,
        },
        type: "optional",
      },
      name: "WINTER STOCKPILE",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "WINTER STOCKPILE Whenever one of your characters is banished, you may put that card from your discard into your inkwell facedown and exerted.",
    },
  ],
  i18n: belleSnowfieldStrategistEnchantedI18n,
};
