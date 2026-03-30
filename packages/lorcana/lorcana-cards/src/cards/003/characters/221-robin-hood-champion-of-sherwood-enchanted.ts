import type { CharacterCard } from "@tcg/lorcana-types";
import { robinHoodChampionOfSherwood } from "..";

export const robinHoodChampionOfSherwoodEnchanted: CharacterCard = {
  ...robinHoodChampionOfSherwood,
  id: "FBp",
  reprints: ["set3-190", "set9-177"],
  set: "003",
  cardNumber: 221,
  rarity: "enchanted",
  specialRarity: "enchanted",
  externalIds: {
    lorcast: "crd_2bf47bf7bc7f46afa6d39e40f0dc86e7",
    tcgPlayer: 650110,
  },
};
