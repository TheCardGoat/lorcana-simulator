import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesSpectralDemigodEpic: CharacterCard = {
  id: "MXG",
  canonicalId: "ci_hMF",
  reprints: ["set11-117"],
  cardType: "character",
  name: "Hercules",
  version: "Spectral Demigod",
  i18n: {
    en: {
      name: "Hercules",
      version: "Spectral Demigod",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "SUPERHUMAN STRENGTH",
          description: "While there's a card under this character, he gets +3 {S}.",
        },
      ],
    },
    de: {
      name: "Hercules",
      version: "Spektraler Halbgott",
      text: "Stärken 2 ÜBERMENSCHLICHE KRAFT Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +3.",
    },
    fr: {
      name: "Hercule",
      version: "Demi-dieu spectral",
      text: "Boost 2 FORCE SURHUMAINE Tant qu'il y a une carte sous ce personnage, il gagne +3.",
    },
    it: {
      name: "Ercole",
      version: "Semidio Spettrale",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) FORZA SOVRUMANA Mentre c'è una carta sotto a questo personaggio, riceve +3.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "011",
  cardNumber: 214,
  rarity: "common",
  specialRarity: "epic",
  cost: 1,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_366f46e2c0bc4366832935158a49cdb4",
    tcgPlayer: 677149,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "SUPERHUMAN STRENGTH",
      description: "While there's a card under this character, he gets +3 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Deity", "Whisper"],
  abilities: [
    {
      id: "16g-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "16g-2",
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "SUPERHUMAN STRENGTH While there’s a card under this character, he gets +3 {S}.",
    },
  ],
};
