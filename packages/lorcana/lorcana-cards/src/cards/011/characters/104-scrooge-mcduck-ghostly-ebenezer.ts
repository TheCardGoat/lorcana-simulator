import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckGhostlyEbenezer: CharacterCard = {
  id: "cXq",
  canonicalId: "ci_cXq",
  reprints: ["set11-104"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Ghostly Ebenezer",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "Ghostly Ebenezer",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "COUNTING COINS",
          description: "This character gets +1 {S} and +1 {W} for each card under him.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Geisterhafter Ebenezer",
      text: "Stärken 1 MÜNZEN ZÄHLEN Dieser Charakter erhält für jede Karte unter ihm +1 und +1.",
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Ebenezer fantôme",
      text: "Boost 1 COMPTANT LES PIÈCES Ce personnage gagne +1 et +1 pour chaque carte sous lui.",
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Ebenezer Spettrale",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) CONTARE LE MONETE Questo personaggio riceve +1 e +1 per ogni carta sotto di sé.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 104,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4209198480ed495d9d5ed7608ece035f",
    tcgPlayer: 676209,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "COUNTING COINS",
      description: "This character gets +1 {S} and +1 {W} for each card under him.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Ghost"],
  abilities: [
    {
      id: "11x-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "11x-2",
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "COUNTING COINS This character gets +1 {S} and +1 {W} for each card under him.",
    },
  ],
};
