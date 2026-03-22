import type { CharacterCard } from "@tcg/lorcana-types";
import { herculesMightyLeaderI18n } from "./118-hercules-mighty-leader.i18n";

export const herculesMightyLeader: CharacterCard = {
  id: "xm6",
  canonicalId: "ci_xm6",
  reprints: ["set10-118"],
  cardType: "character",
  name: "Hercules",
  version: "Mighty Leader",
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 118,
  rarity: "legendary",
  cost: 4,
  strength: 5,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_ee4bc5f80eb74a19b749e0b31be7d920",
    tcgPlayer: 660037,
  },
  text: [
    {
      title: "EVER VIGILANT",
      description: "This character can't be dealt damage unless he's being challenged.",
    },
    {
      title: "EVER VALIANT",
      description:
        "While this character is exerted, your other Hero characters can't be dealt damage unless they're being challenged.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Deity"],
  abilities: [],
  i18n: herculesMightyLeaderI18n,
};
