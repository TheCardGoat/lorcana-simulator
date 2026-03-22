import type { CharacterCard } from "@tcg/lorcana-types";
import { iagoPrettyPollyI18n } from "./040-iago-pretty-polly.i18n";

export const iagoPrettyPolly: CharacterCard = {
  id: "lhS",
  canonicalId: "ci_lhS",
  reprints: ["set3-040"],
  cardType: "character",
  name: "Iago",
  version: "Pretty Polly",
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 40,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c6206520d53f48a7ba4b32af8ca6cf66",
    tcgPlayer: 537407,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "d7s-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: iagoPrettyPollyI18n,
};
