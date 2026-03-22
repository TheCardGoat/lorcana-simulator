import type { CharacterCard } from "@tcg/lorcana-types";
import { motherGothelUnwaveringSchemerI18n } from "./092-mother-gothel-unwavering-schemer.i18n";

export const motherGothelUnwaveringSchemer: CharacterCard = {
  id: "7PI",
  canonicalId: "ci_7PI",
  reprints: ["set5-092"],
  cardType: "character",
  name: "Mother Gothel",
  version: "Unwavering Schemer",
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 92,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_df75fce740274e7092a368c0dfa0b417",
    tcgPlayer: 561633,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "THE WORLD IS DARK",
      description:
        "When you play this character, each opponent chooses one of their characters and returns that card to their hand.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  abilities: [],
  i18n: motherGothelUnwaveringSchemerI18n,
};
