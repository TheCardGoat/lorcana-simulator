import type { CharacterCard } from "@tcg/lorcana-types";
import { heraQueenOfTheGodsI18n } from "./076-hera-queen-of-the-gods.i18n";

export const heraQueenOfTheGods: CharacterCard = {
  id: "vHX",
  canonicalId: "ci_vHX",
  reprints: ["set4-076"],
  cardType: "character",
  name: "Hera",
  version: "Queen of the Gods",
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 76,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0ac3ee4c2bb043a280fa2e4f7f6505e7",
    tcgPlayer: 549668,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "PROTECTIVE GODDESS",
      description: "Your characters named Zeus gain Ward.",
    },
    {
      title: "YOU'RE",
      description: "A TRUE HERO Your characters named Hercules gain Evasive.",
    },
  ],
  classifications: ["Storyborn", "Queen", "Deity"],
  abilities: [
    {
      id: "149-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "149-2",
      text: "PROTECTIVE GODDESS Your characters named Zeus gain Ward.",
      type: "action",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "149-3",
      text: "YOU'RE A TRUE HERO Your characters named Hercules gain Evasive.",
      type: "action",
    },
  ],
  i18n: heraQueenOfTheGodsI18n,
};
