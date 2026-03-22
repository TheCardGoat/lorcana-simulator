import type { CharacterCard } from "@tcg/lorcana-types";
import { peterPanNeverLandPranksterI18n } from "./085-peter-pan-never-land-prankster.i18n";

export const peterPanNeverLandPrankster: CharacterCard = {
  id: "QDn",
  canonicalId: "ci_QDn",
  reprints: ["set6-085"],
  cardType: "character",
  name: "Peter Pan",
  version: "Never Land Prankster",
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 85,
  rarity: "common",
  cost: 7,
  strength: 4,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_582e975ec5b64cb7be3e406585a05a6d",
    tcgPlayer: 583853,
  },
  text: [
    {
      title: "LOOK INNOCENT",
      description: "This character enters play exerted.",
    },
    {
      title: "CAN'T TAKE",
      description:
        "A JOKE? While this character is exerted, each opposing player can't gain lore unless one of their characters has challenged this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [],
  i18n: peterPanNeverLandPranksterI18n,
};
