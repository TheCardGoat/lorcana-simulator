import type { CharacterCard } from "@tcg/lorcana-types";
import { deweyShowyNephewI18n } from "./139-dewey-showy-nephew.i18n";

export const deweyShowyNephew: CharacterCard = {
  id: "Cbz",
  canonicalId: "ci_V2m",
  reprints: ["set3-139", "set9-139"],
  cardType: "character",
  name: "Dewey",
  version: "Showy Nephew",
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 139,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0367a7c71bef46c39719f0c5c0b0dc3b",
    tcgPlayer: 650074,
  },
  text: "Support",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "32f-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
  i18n: deweyShowyNephewI18n,
};
