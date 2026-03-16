import type { CharacterCard } from "@tcg/lorcana-types";

export const lumiereNimbleCandelabra: CharacterCard = {
  id: "p7H",
  canonicalId: "ci_p7H",
  reprints: ["set8-128"],
  cardType: "character",
  name: "Lumiere",
  version: "Nimble Candelabra",
  i18n: {
    en: {
      name: "Lumiere",
      version: "Nimble Candelabra",
      text: [
        {
          title: "QUICK-STEP",
          description: "While you have an item card in your discard, this character gains Evasive.",
        },
      ],
    },
    de: {
      name: "Lumière",
      version: "Flinker Kerzenleuchter",
      text: [
        {
          title: "MIT SCHNELLEN SCHRITTEN",
          description:
            "Solange du mindestens eine Gegenstandskarte in deinem Ablagestapel hast, erhält dieser Charakter Wendig.",
        },
      ],
    },
    fr: {
      name: "Lumière",
      version: "Candelabre agile",
      text: [
        {
          title: "DÉMARCHE RAPIDE",
          description:
            "Tant que vous avez une carte Objet dans votre défausse, ce personnage gagne Insaisissable.",
        },
      ],
    },
    it: {
      name: "Lumiere",
      version: "Agile Candelabro",
      text: [
        {
          title: "PASSO RAPIDO",
          description:
            "Mentre hai una carta oggetto nei tuoi scarti, questo personaggio ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 128,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a5ab1a4a40304395b5363fff5858b9a8",
    tcgPlayer: 631434,
  },
  text: [
    {
      title: "QUICK-STEP",
      description: "While you have an item card in your discard, this character gains Evasive.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1k4-1",
      text: "QUICK-STEP While you have an item card in your discard, this character gains Evasive.",
      type: "action",
    },
  ],
};
