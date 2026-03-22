import type { CharacterCard } from "@tcg/lorcana-types";
import { elsaSnowQueenI18n } from "./053-elsa-snow-queen.i18n";

export const elsaSnowQueen: CharacterCard = {
  id: "pIt",
  canonicalId: "ci_77P",
  reprints: ["set1-041", "set9-053"],
  cardType: "character",
  name: "Elsa",
  version: "Snow Queen",
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 53,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2b5958e1524648629b663fb210bb7f76",
    tcgPlayer: 647660,
  },
  text: [
    {
      title: "FREEZE",
      description: "{E} — Exert chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "pIt-1",
      name: "FREEZE",
      text: "FREEZE {E} — Exert chosen opposing character.",
      type: "activated",
    },
  ],
  i18n: elsaSnowQueenI18n,
};
