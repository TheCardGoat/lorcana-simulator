import type { CharacterCard } from "@tcg/lorcana-types";

export const lenaSabrewingPureEnergy: CharacterCard = {
  id: "q7a",
  canonicalId: "ci_q7a",
  reprints: ["set8-049"],
  cardType: "character",
  name: "Lena Sabrewing",
  version: "Pure Energy",
  i18n: {
    en: {
      name: "Lena Sabrewing",
      version: "Pure Energy",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "SUPERNATURAL VENGEANCE",
          description: "{E} — Deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Lena Degenflügel",
      version: "Reine Energie",
      text: "Wendig ÜBERNATÜRLICHE RACHE — Füge einem Charakter deiner Wahl 1 Schaden zu.",
    },
    fr: {
      name: "Lena de Sortilège",
      version: "Énergie pure",
      text: "Insaisissable VENGEANCE DE L'AU-DELÀ — Choisissez un personnage et infligez-lui 1 dommage.",
    },
    it: {
      name: "Lena Sabrewing",
      version: "Pura Energia",
      text: "Sfuggente VENDETTA SOPRANNATURALE — Infliggi 1 danno a un personaggio a tua scelta.",
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Ducktales",
  set: "008",
  cardNumber: 49,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5d5fd6b02f3646c9ae4661c9a36177c6",
    tcgPlayer: 631383,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "SUPERNATURAL VENGEANCE",
      description: "{E} — Deal 1 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Sorcerer"],
  abilities: [
    {
      id: "1r9-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1r9-2",
      text: "SUPERNATURAL VENGEANCE {E} – Deal 1 damage to chosen character.",
      type: "action",
    },
  ],
};
