import type { CharacterCard } from "@tcg/lorcana-types";
import { aliceGrowingGirl } from "..";

export const aliceGrowingGirlEnchanted: CharacterCard = {
  ...aliceGrowingGirl,
  id: "Z51",
  reprints: ["set2-137", "set9-160"],
  set: "002",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  externalIds: {
    lorcast: "crd_8619541a52554ab3b8a32dcaf795748e",
    tcgPlayer: 647672,
  },
};
