import type { CharacterCard } from "@tcg/lorcana-types";

export const genieSatisfiedDragon: CharacterCard = {
  id: "0kv",
  canonicalId: "ci_0kv",
  reprints: ["set8-189"],
  cardType: "character",
  name: "Genie",
  version: "Satisfied Dragon",
  i18n: {
    en: {
      name: "Genie",
      version: "Satisfied Dragon",
      text: [
        {
          title: "BUG CATCHER",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Zufriedener Drache",
      text: [
        {
          title: "INSEKTENFÄNGER",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Génie",
      version: "Dragon satisfait",
      text: [
        {
          title: "CHASSEUR D'INSECTES",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Genio",
      version: "Drago Soddisfatto",
      text: [
        {
          title: "ACCHIAPPA INSETTI",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 189,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1a915d634d8048febe7e324fa0c4730b",
    tcgPlayer: 633426,
  },
  text: [
    {
      title: "BUG CATCHER",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally", "Dragon"],
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "ofy-1",
      text: "BUG CATCHER During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
