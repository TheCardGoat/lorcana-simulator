import type { CharacterCard } from "@tcg/lorcana-types";

export const flotsamRiffraff: CharacterCard = {
  id: "zgb",
  canonicalId: "ci_zgb",
  reprints: ["set3-072"],
  cardType: "character",
  name: "Flotsam",
  version: "Riffraff",
  i18n: {
    en: {
      name: "Flotsam",
      version: "Riffraff",
      text: [
        {
          title: "EERIE PAIR",
          description: "Your characters named Jetsam get +3 {S}.",
        },
      ],
    },
    de: {
      name: "Abschaum",
      version: "Fischabfall",
      text: [
        {
          title: "UNHEIMLICHES PAAR",
          description: "Deine Meerschaum-Charaktere erhalten +3.",
        },
      ],
    },
    fr: {
      name: "Flotsam",
      version: "Boule puante",
      text: [
        {
          title: "SINISTRE DUO",
          description: "Vos personnages Jetsam gagnent +3.",
        },
      ],
    },
    it: {
      name: "Flotsam",
      version: "Marmaglia",
      text: [
        {
          title: "COPPIA INQUIETANTE I",
          description: "tuoi personaggi chiamati Jetsam ricevono +3.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "003",
  cardNumber: 72,
  rarity: "common",
  cost: 3,
  strength: 5,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ba452763794342109447ecb7b492d919",
    tcgPlayer: 532924,
  },
  text: [
    {
      title: "EERIE PAIR",
      description: "Your characters named Jetsam get +3 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "c4r-1",
      text: "EERIE PAIR Your characters named Jetsam get +3 {S}.",
      type: "action",
    },
  ],
};
