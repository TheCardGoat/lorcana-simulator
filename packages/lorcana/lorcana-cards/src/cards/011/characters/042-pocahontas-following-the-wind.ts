import type { CharacterCard } from "@tcg/lorcana-types";
import { pocahontasFollowingTheWindI18n } from "./042-pocahontas-following-the-wind.i18n";

export const pocahontasFollowingTheWind: CharacterCard = {
  id: "o0i",
  canonicalId: "ci_o0i",
  reprints: ["set11-042"],
  cardType: "character",
  name: "Pocahontas",
  version: "Following the Wind",
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 42,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_044b499eebfa487ea9fb1a43e8d5fcdb",
    tcgPlayer: 674700,
  },
  text: [
    {
      title: "WHAT IS MY PATH?",
      description:
        "Whenever this character quests, gain lore equal to another chosen exerted character's {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [],
  i18n: pocahontasFollowingTheWindI18n,
};
