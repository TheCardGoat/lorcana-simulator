import type { CharacterCard } from "@tcg/lorcana-types";

export const mirabelMadrigalFamilyGatherer: CharacterCard = {
  id: "284",
  canonicalId: "ci_284",
  reprints: ["set5-014"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Family Gatherer",
  i18n: {
    en: {
      name: "Mirabel Madrigal",
      version: "Family Gatherer",
      text: [
        {
          title: "NOT WITHOUT MY FAMILY",
          description:
            "You can't play this character unless you have 5 or more characters in play.",
        },
      ],
    },
    de: {
      name: "Mirabel Madrigal",
      version: "Führt die Familie zusammen",
      text: [
        {
          title: "NICHT OHNE MEINE FAMILIE",
          description:
            "Du kannst diesen Charakter nicht ausspielen, außer du hast mindestens 5 Charaktere im Spiel.",
        },
      ],
    },
    fr: {
      name: "Mirabel Madrigal",
      version: "Rassembleuse de la Famille",
      text: [
        {
          title: "PAS SANS MA FAMILLE",
          description:
            "Vous ne pouvez pas jouer ce personnage à moins d'avoir 5 personnages ou plus en jeu.",
        },
      ],
    },
    it: {
      name: "Mirabel Madrigal",
      version: "Che Riunisce la Famiglia",
      text: [
        {
          title: "NON SENZA LA MIA FAMIGLIA",
          description:
            "Non puoi giocare questo personaggio a meno che tu non abbia in gioco 5 o più personaggi.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "005",
  cardNumber: 14,
  rarity: "legendary",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_79ca7c747dcb4e7189ed8bc3a6b14f8b",
    tcgPlayer: 561210,
  },
  text: [
    {
      title: "NOT WITHOUT MY FAMILY",
      description: "You can't play this character unless you have 5 or more characters in play.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Madrigal"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1v7-1",
      text: "NOT WITHOUT MY FAMILY You can't play this character unless you have 5 or more characters in play.",
      type: "static",
    },
  ],
};
