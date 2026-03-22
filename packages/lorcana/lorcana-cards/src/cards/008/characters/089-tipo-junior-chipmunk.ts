import type { CharacterCard } from "@tcg/lorcana-types";
import { tipoJuniorChipmunkI18n } from "./089-tipo-junior-chipmunk.i18n";

export const tipoJuniorChipmunk: CharacterCard = {
  id: "xfC",
  canonicalId: "ci_xfC",
  reprints: ["set8-089"],
  cardType: "character",
  name: "Tipo",
  version: "Junior Chipmunk",
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 89,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_00b83f7a91894fae8af0a95226aafe17",
    tcgPlayer: 632711,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "y4v-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: tipoJuniorChipmunkI18n,
};
