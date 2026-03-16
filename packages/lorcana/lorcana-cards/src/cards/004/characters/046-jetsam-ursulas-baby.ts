import type { CharacterCard } from "@tcg/lorcana-types";

export const jetsamUrsulasBaby: CharacterCard = {
  id: "jZW",
  canonicalId: "ci_jZW",
  reprints: ["set4-046"],
  cardType: "character",
  name: "Jetsam",
  version: 'Ursula\'s "Baby"',
  i18n: {
    en: {
      name: "Jetsam",
      version: 'Ursula\'s "Baby"',
      text: [
        {
          title: "Challenger +2",
        },
        {
          title: "OMINOUS PAIR",
          description: "Your characters named Flotsam gain Challenger +2.",
        },
      ],
    },
    de: {
      name: "Meerschaum",
      version: 'Ursulas "Baby"',
      text: "Herausfordern +2 UNHEIMLICHES DUO Deine Abschaum-Charaktere erhalten Herausfordern +2.",
    },
    fr: {
      name: "Jetsam",
      version: '"Bébé" d\'Ursula',
      text: "Offensif +2 DUO INQUIÉTANT Vos personnages Flotsam gagnent Offensif +2.",
    },
    it: {
      name: "Jetsam",
      version: "“Piccino” di Ursula",
      text: "Sfidante +2 COPPIA SINISTRA I tuoi personaggi chiamati Flotsam ottengono Sfidante +2.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 46,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b61f1e595b3844cdad00a05ee402457b",
    tcgPlayer: 549468,
  },
  text: [
    {
      title: "Challenger +2",
    },
    {
      title: "OMINOUS PAIR",
      description: "Your characters named Flotsam gain Challenger +2.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "du5-1",
      keyword: "Challenger",
      text: "Challenger +2",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        keyword: "Challenger",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 2,
      },
      id: "du5-2",
      text: "OMINOUS PAIR Your characters named Flotsam gain Challenger +2.",
      type: "action",
    },
  ],
};
