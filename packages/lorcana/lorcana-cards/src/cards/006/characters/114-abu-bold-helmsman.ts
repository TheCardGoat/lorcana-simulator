import type { CharacterCard } from "@tcg/lorcana-types";
import { abuBoldHelmsmanI18n } from "./114-abu-bold-helmsman.i18n";

export const abuBoldHelmsman: CharacterCard = {
  id: "t59",
  canonicalId: "ci_t59",
  reprints: ["set6-114"],
  cardType: "character",
  name: "Abu",
  version: "Bold Helmsman",
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 114,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4b053bdcc56546798dfd962d892a3630",
    tcgPlayer: 592025,
  },
  text: "Rush",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1f2-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
  i18n: abuBoldHelmsmanI18n,
};
