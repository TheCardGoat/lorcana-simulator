import type { CharacterCard } from "@tcg/lorcana-types";

export const rhinoPowerHamster: CharacterCard = {
  id: "I1B",
  canonicalId: "ci_I1B",
  reprints: ["set8-030"],
  cardType: "character",
  name: "Rhino",
  version: "Power Hamster",
  i18n: {
    en: {
      name: "Rhino",
      version: "Power Hamster",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "EPIC BALL OF AWESOME",
          description: "While this character has no damage, he gains Resist +2.",
        },
      ],
    },
    de: {
      name: "Dino",
      version: "Energiegeladener Hamster",
      text: "Gestaltwandel 2 EPISCHER BALL DER GROSSARTIGKEIT Solange dieser Charakter unbeschädigt ist, erhält er Robust +2. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Rhino",
      version: "Hamster survolté",
      text: "Alter 2 BOULE SUPER GÉNIALE Tant que ce personnage n'a aucun dommage sur lui, il gagne Résistance +2.",
    },
    it: {
      name: "Rhino",
      version: "Criceto Potenziato",
      text: "Trasformazione 2 PALLA EPICA E PAZZESCA Mentre questo personaggio non ha danno, ottiene Resistere +2.",
    },
  },
  inkType: ["amber", "steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 30,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b7d241314eca4aa2b268c00cd4dde064",
    tcgPlayer: 631700,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "EPIC BALL OF AWESOME",
      description: "While this character has no damage, he gains Resist +2.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "g5c-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "g5c-2",
      text: "EPIC BALL OF AWESOME While this character has no damage, he gains Resist +2.",
      type: "static",
    },
  ],
};
