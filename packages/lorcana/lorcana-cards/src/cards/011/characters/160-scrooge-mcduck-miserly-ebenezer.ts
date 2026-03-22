import type { CharacterCard } from "@tcg/lorcana-types";
import { scroogeMcduckMiserlyEbenezerI18n } from "./160-scrooge-mcduck-miserly-ebenezer.i18n";

export const scroogeMcduckMiserlyEbenezer: CharacterCard = {
  id: "6pJ",
  canonicalId: "ci_6pJ",
  reprints: ["set11-160"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Miserly Ebenezer",
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 160,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_d5104ffcc4cc4473b8f4ffba12447855",
    tcgPlayer: 670163,
  },
  text: [
    {
      title: "BAH, HUMBUG",
      description:
        "During your turn, whenever a card is put into your inkwell, chosen character gets -1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "wi2-1",
      effect: {
        modifier: -1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
        duration: "this-turn",
      },
      type: "action",
      text: "BAH, HUMBUG During your turn, whenever a card is put into your inkwell, chosen character gets -1 {S} this turn.",
    },
  ],
  i18n: scroogeMcduckMiserlyEbenezerI18n,
};
