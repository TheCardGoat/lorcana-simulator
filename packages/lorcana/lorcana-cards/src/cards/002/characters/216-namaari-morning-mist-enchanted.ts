import type { CharacterCard } from "@tcg/lorcana-types";
import { namaariMorningMistEnchantedI18n } from "./216-namaari-morning-mist-enchanted.i18n";
import { bodyguard } from "../../../helpers/abilities/bodyguard";

export const namaariMorningMistEnchanted: CharacterCard = {
  id: "2qq",
  canonicalId: "ci_PU4",
  reprints: ["set2-189"],
  cardType: "character",
  name: "Namaari",
  version: "Morning Mist",
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 216,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_8b02499c992945e2990cb669d7468256",
    tcgPlayer: 527798,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "BLADES",
      description: "This character can challenge ready characters.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Princess"],
  abilities: [
    bodyguard,
    {
      effect: {
        ability: "can-challenge-ready",
        target: "SELF",
        type: "grant-ability",
      },
      id: "1dg-2",
      name: "BLADES",
      text: "BLADES This character can challenge ready characters.",
      type: "static",
    },
  ],
  i18n: namaariMorningMistEnchantedI18n,
};
