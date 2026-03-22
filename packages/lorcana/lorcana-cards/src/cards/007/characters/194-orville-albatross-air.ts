import type { CharacterCard } from "@tcg/lorcana-types";
import { orvilleAlbatrossAirI18n } from "./194-orville-albatross-air.i18n";

export const orvilleAlbatrossAir: CharacterCard = {
  id: "DJD",
  canonicalId: "ci_DJD",
  reprints: ["set7-194"],
  cardType: "character",
  name: "Orville",
  version: "Albatross Air",
  inkType: ["steel"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 194,
  rarity: "common",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d44a1dff239492ebbafca394d0f475c",
    tcgPlayer: 618729,
  },
  text: [
    {
      title: "WELCOME ABOARD, FOLKS",
      description:
        "During your turn, while you have a character named Miss Bianca or Bernard in play, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1jn-1",
      text: "WELCOME ABOARD, FOLKS During your turn, while you have a character named Miss Bianca or Bernard in play, this character gains Evasive.",
      type: "action",
    },
  ],
  i18n: orvilleAlbatrossAirI18n,
};
