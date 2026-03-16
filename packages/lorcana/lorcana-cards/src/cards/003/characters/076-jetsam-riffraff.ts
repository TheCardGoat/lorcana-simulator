import type { CharacterCard } from "@tcg/lorcana-types";

export const jetsamRiffraff: CharacterCard = {
  id: "j0a",
  canonicalId: "ci_j0a",
  reprints: ["set3-076"],
  cardType: "character",
  name: "Jetsam",
  version: "Riffraff",
  i18n: {
    en: {
      name: "Jetsam",
      version: "Riffraff",
      text: [
        {
          title: "Ward",
        },
        {
          title: "EERIE PAIR",
          description: "Your characters named Flotsam gain Ward.",
        },
      ],
    },
    de: {
      name: "Meerschaum",
      version: "Fischabfall",
      text: "Behütet UNHEIMLICHES PAAR Deine Abschaum-Charaktere erhalten Behütet.",
    },
    fr: {
      name: "Jetsam",
      version: "Boule puante",
      text: "Hors d'atteinte SINISTRE DUO Vos personnages Flotsam gagnent Hors d'atteinte.",
    },
    it: {
      name: "Jetsam",
      version: "Marmaglia",
      text: "Protetto COPPIA INQUIETANTE I tuoi personaggi chiamati Flotsam ottengono Protetto.",
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "003",
  cardNumber: 76,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d3950786da4a4d3497090ce82253a144",
    tcgPlayer: 532928,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "EERIE PAIR",
      description: "Your characters named Flotsam gain Ward.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "1py-1",
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
      id: "1py-2",
      text: "EERIE PAIR Your characters named Flotsam gain Ward.",
      type: "action",
    },
  ],
};
