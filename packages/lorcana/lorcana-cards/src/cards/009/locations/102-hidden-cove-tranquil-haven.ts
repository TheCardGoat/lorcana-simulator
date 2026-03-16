import type { LocationCard } from "@tcg/lorcana-types";

export const hiddenCoveTranquilHaven: LocationCard = {
  id: "ejC",
  canonicalId: "ci_Of3",
  reprints: ["set4-101", "set9-102"],
  cardType: "location",
  name: "Hidden Cove",
  version: "Tranquil Haven",
  i18n: {
    en: {
      name: "Hidden Cove",
      version: "Tranquil Haven",
      text: [
        {
          title: "REVITALIZING WATERS",
          description: "Characters get +1 {S} and +1 {W} while here.",
        },
      ],
    },
    de: {
      name: "Versteckte Grotte",
      version: "Ruhiger Hafen",
      text: [
        {
          title: "BELEBENDE GEWÄSSER",
          description: "Charaktere an diesem Ort erhalten +1 und +1.",
        },
      ],
    },
    fr: {
      name: "La crique cachée",
      version: "Havre de paix",
      text: [
        {
          title: "EAUX REVITALISANTES",
          description: "Les personnages sur ce lieu gagnent +1 et +1.",
        },
      ],
    },
    it: {
      name: "Cala Nascosta",
      version: "Porto Sicuro",
      text: [
        {
          title: "ACQUE RIVITALIZZANTI I",
          description: "personaggi ricevono +1 e +1 mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "009",
  cardNumber: 102,
  rarity: "common",
  cost: 1,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_a7b30a7923bd4b3596c48ede7e6b438e",
    tcgPlayer: 650040,
  },
  text: [
    {
      title: "REVITALIZING WATERS",
      description: "Characters get +1 {S} and +1 {W} while here.",
    },
  ],
  abilities: [
    {
      id: "1ts-1",
      name: "REVITALIZING WATERS",
      text: "REVITALIZING WATERS Characters get +1 {S} and +1 {W} while here.",
      type: "static",
      effect: {
        modifier: 1,
        stat: "strength",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
    },
    {
      id: "1ts-2",
      name: "REVITALIZING WATERS",
      text: "REVITALIZING WATERS Characters get +1 {S} and +1 {W} while here.",
      type: "static",
      effect: {
        modifier: 1,
        stat: "willpower",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
    },
  ],
};
