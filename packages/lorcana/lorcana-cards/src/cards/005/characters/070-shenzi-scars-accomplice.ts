import type { CharacterCard } from "@tcg/lorcana-types";

export const shenziScarsAccomplice: CharacterCard = {
  id: "NoM",
  canonicalId: "ci_NoM",
  reprints: ["set5-070"],
  cardType: "character",
  name: "Shenzi",
  version: "Scar's Accomplice",
  i18n: {
    en: {
      name: "Shenzi",
      version: "Scar's Accomplice",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "EASY PICKINGS",
          description: "While challenging a damaged character, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Shenzi",
      version: "Scars Komplizin",
      text: "Wendig LEICHTE BEUTE Solange dieser Charakter einen beschädigten Charakter herausfordert, erhält er +2.",
    },
    fr: {
      name: "Shenzi",
      version: "Complice de Scar",
      text: "Insaisissable UN CASSE-CROÛTE FACILE Tant que ce personnage défie un personnage ayant au moins un dommage sur lui, il gagne +2.",
    },
    it: {
      name: "Shenzi",
      version: "Complice di Scar",
      text: "Sfuggente PREDE FACILI Mentre sfida un personaggio danneggiato, questo personaggio riceve +2.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 70,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e736ff0f31bb455992c5ba93c4875444",
    tcgPlayer: 561955,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "EASY PICKINGS",
      description: "While challenging a damaged character, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      id: "1nr-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1nr-2",
      text: "EASY PICKINGS While challenging a damaged character, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
