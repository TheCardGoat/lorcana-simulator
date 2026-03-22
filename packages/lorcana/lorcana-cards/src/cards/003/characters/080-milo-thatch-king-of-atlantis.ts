import type { CharacterCard } from "@tcg/lorcana-types";
import { miloThatchKingOfAtlantisI18n } from "./080-milo-thatch-king-of-atlantis.i18n";

export const miloThatchKingOfAtlantis: CharacterCard = {
  id: "cXv",
  canonicalId: "ci_cXv",
  reprints: ["set3-080"],
  cardType: "character",
  name: "Milo Thatch",
  version: "King of Atlantis",
  inkType: ["emerald"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 80,
  rarity: "legendary",
  cost: 7,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_1ab44dc7b1b1406ea256eb308fb857f5",
    tcgPlayer: 536281,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "TAKE THEM BY SURPRISE",
      description:
        "When this character is banished, return all opposing characters to their players' hands.",
    },
  ],
  classifications: ["Floodborn", "Hero", "King"],
  abilities: [],
  i18n: miloThatchKingOfAtlantisI18n,
};
