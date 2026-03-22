import type { CharacterCard } from "@tcg/lorcana-types";
import { clawhauserFrontDeskOfficerI18n } from "./035-clawhauser-front-desk-officer.i18n";

export const clawhauserFrontDeskOfficer: CharacterCard = {
  id: "q40",
  canonicalId: "ci_9eu",
  reprints: ["set8-035"],
  cardType: "character",
  name: "Clawhauser",
  version: "Front Desk Officer",
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "008",
  cardNumber: 35,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1727b81007044782bc9c1df26820e7e1",
    tcgPlayer: 631375,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Singer 4",
    },
  ],
  classifications: ["Storyborn", "Ally", "Detective"],
  abilities: [
    {
      id: "1u1-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "1u1-2",
      keyword: "Singer",
      text: "Singer 4",
      type: "keyword",
      value: 4,
    },
  ],
  i18n: clawhauserFrontDeskOfficerI18n,
};
