import type { CharacterCard } from "@tcg/lorcana-types";
import { mulanEliteArcherI18n } from "./114-mulan-elite-archer.i18n";

export const mulanEliteArcher: CharacterCard = {
  id: "4gd",
  canonicalId: "ci_9XN",
  reprints: ["set4-114", "set9-126"],
  cardType: "character",
  name: "Mulan",
  version: "Elite Archer",
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 114,
  rarity: "legendary",
  cost: 6,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_44fe3bead4bf40f79163468a4fd647e5",
    tcgPlayer: 650061,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "STRAIGHT SHOOTER",
      description:
        "When you play this character, if you used Shift to play her, she gets +3 {S} this turn.",
    },
    {
      title: "TRIPLE SHOT",
      description:
        "During your turn, whenever this character deals damage to another character in a challenge, deal the same amount of damage to up to 2 other chosen characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [],
  i18n: mulanEliteArcherI18n,
};
