import type { CharacterCard } from "@tcg/lorcana-types";
import { luisaMadrigalMagicallyStrongOneI18n } from "./058-luisa-madrigal-magically-strong-one.i18n";

export const luisaMadrigalMagicallyStrongOne: CharacterCard = {
  id: "6ZH",
  canonicalId: "ci_tVH",
  reprints: ["set4-047", "set9-058"],
  cardType: "character",
  name: "Luisa Madrigal",
  version: "Magically Strong One",
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 58,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4ce57ce9f6484fd386b2add4847b5dc8",
    tcgPlayer: 650002,
  },
  text: "Rush",
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      id: "1rs-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
  i18n: luisaMadrigalMagicallyStrongOneI18n,
};
