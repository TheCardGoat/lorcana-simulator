import type { CharacterCard } from "@tcg/lorcana-types";
import { cinderellaBallroomSensationI18n } from "./003-cinderella-ballroom-sensation.i18n";

export const cinderellaBallroomSensation: CharacterCard = {
  id: "D9h",
  canonicalId: "ci_Djx",
  reprints: ["set2-003"],
  cardType: "character",
  name: "Cinderella",
  version: "Ballroom Sensation",
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 3,
  rarity: "rare",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4cf391db31ba468f948bad5a20b0bc16",
    tcgPlayer: 527802,
  },
  text: "Singer 3",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "4j3-1",
      keyword: "Singer",
      type: "keyword",
      value: 3,
      text: "Singer 3",
    },
  ],
  i18n: cinderellaBallroomSensationI18n,
};
