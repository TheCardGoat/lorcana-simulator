import type { CharacterCard } from "@tcg/lorcana-types";
import { maleficentFormidableQueenI18n } from "./035-maleficent-formidable-queen.i18n";

export const maleficentFormidableQueen: CharacterCard = {
  id: "IEz",
  canonicalId: "ci_IEz",
  reprints: ["set5-035"],
  cardType: "character",
  name: "Maleficent",
  version: "Formidable Queen",
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 35,
  rarity: "common",
  cost: 8,
  strength: 7,
  willpower: 7,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d3bfcff390e54c9bbd1027b57320d621",
    tcgPlayer: 561950,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "LISTEN WELL, ALL OF YOU",
      description:
        "When you play this character, for each of your characters named Maleficent in play, return a chosen opposing character, item, or location with cost 3 or less to their player's hand.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1a2-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "1a2-2",
      text: "LISTEN WELL, ALL OF YOU When you play this character, for each of your characters named Maleficent in play, return a chosen opposing character, item, or location with cost 3 or less to their player's hand.",
      type: "action",
    },
  ],
  i18n: maleficentFormidableQueenI18n,
};
