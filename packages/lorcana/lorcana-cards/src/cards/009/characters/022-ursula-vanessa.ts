import type { CharacterCard } from "@tcg/lorcana-types";
import { ursulaVanessaI18n } from "./022-ursula-vanessa.i18n";

export const ursulaVanessa: CharacterCard = {
  id: "0pB",
  canonicalId: "ci_hSt",
  reprints: ["set4-025", "set9-022"],
  cardType: "character",
  name: "Ursula",
  version: "Vanessa",
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 22,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_357824b1398340d8979b1ead1c7ff44f",
    tcgPlayer: 649970,
  },
  text: "Singer 4",
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "lsj-1",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
  i18n: ursulaVanessaI18n,
};
