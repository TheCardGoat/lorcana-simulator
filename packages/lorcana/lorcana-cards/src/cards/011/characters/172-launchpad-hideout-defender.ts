import type { CharacterCard } from "@tcg/lorcana-types";

export const launchpadHideoutDefender: CharacterCard = {
  id: "wIl",
  canonicalId: "ci_wIl",
  reprints: ["set11-172"],
  cardType: "character",
  name: "Launchpad",
  version: "Hideout Defender",
  i18n: {
    en: {
      name: "Launchpad",
      version: "Hideout Defender",
      text: [
        {
          title: "STAND GUARD",
          description: "Your locations gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Quack, der Bruchpilot",
      version: "Verteidiger des Verstecks",
      text: [
        {
          title: "WACHE STEHEN",
          description:
            "Deine Orte erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Flagada Jones",
      version: "Défenseur de la cachette",
      text: [
        {
          title: "MONTE LA GARDE",
          description: "Vos lieux gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Jet",
      version: "Difensore del Nasondiglio",
      text: [
        {
          title: "FARE LA GUARDIA I",
          description: "tuoi luoghi ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 172,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_31c0320e66744254b1a8a70f108427aa",
    tcgPlayer: 677139,
  },
  text: [
    {
      title: "STAND GUARD",
      description: "Your locations gain Resist +1.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "158-1",
      effect: {
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      type: "action",
      text: "STAND GUARD Your locations gain Resist +1.",
    },
  ],
};
