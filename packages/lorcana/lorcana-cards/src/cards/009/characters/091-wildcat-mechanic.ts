import type { CharacterCard } from "@tcg/lorcana-types";

export const wildcatMechanic: CharacterCard = {
  id: "Xbs",
  canonicalId: "ci_8Mj",
  reprints: ["set3-092", "set9-091"],
  cardType: "character",
  name: "Wildcat",
  version: "Mechanic",
  i18n: {
    en: {
      name: "Wildcat",
      version: "Mechanic",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "DISASSEMBLE",
          description: "{E} — Banish chosen item.",
        },
      ],
    },
    de: {
      name: "Wildkatz",
      version: "Mechaniker",
      text: "Wendig DEMONTIEREN — Verbanne einen Gegenstand deiner Wahl.",
    },
    fr: {
      name: "Turbo",
      version: "Mécanicien",
      text: "Insaisissable DÉSASSEMBLAGE — Choisissez un objet et bannissez-le.",
    },
    it: {
      name: "Valvola",
      version: "Meccanico",
      text: "Sfuggente SMONTARE — Esilia un oggetto a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "009",
  cardNumber: 91,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7a6168b43fd4c71a441f6f2e236117b",
    tcgPlayer: 650030,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DISASSEMBLE",
      description: "{E} — Banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [],
};
