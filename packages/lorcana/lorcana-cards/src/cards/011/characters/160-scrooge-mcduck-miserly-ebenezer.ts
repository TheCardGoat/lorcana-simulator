import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckMiserlyEbenezer: CharacterCard = {
  id: "6pJ",
  canonicalId: "ci_6pJ",
  reprints: ["set11-160"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Miserly Ebenezer",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "Miserly Ebenezer",
      text: [
        {
          title: "BAH, HUMBUG",
          description:
            "During your turn, whenever a card is put into your inkwell, chosen character gets -1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Geiziger Ebenezer",
      text: [
        {
          title: "ALLES HUMBUG",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du einem Charakter deiner Wahl in diesem Zug -1 geben.",
        },
      ],
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Ebenezer avare",
      text: [
        {
          title: "BAH, FARIBOLES!",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage qui subit -1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Ebenezer Spilorcio",
      text: [
        {
          title: "BAH, BUBBOLE",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un personaggio a tua scelta riceve -1 per questo turno.",
        },
      ],
    },
  },
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
};
