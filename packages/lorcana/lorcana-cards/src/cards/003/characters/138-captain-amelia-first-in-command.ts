import type { CharacterCard } from "@tcg/lorcana-types";

export const captainAmeliaFirstInCommand: CharacterCard = {
  id: "TRx",
  canonicalId: "ci_TRx",
  reprints: ["set3-138"],
  cardType: "character",
  name: "Captain Amelia",
  version: "First in Command",
  i18n: {
    en: {
      name: "Captain Amelia",
      version: "First in Command",
      text: [
        {
          title: "DISCIPLINE",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Käpt'n Amelia",
      version: "Erste Offizierin",
      text: [
        {
          title: "DISZIPLIN",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Capitaine Amélia",
      version: "Commande le vaisseau",
      text: [
        {
          title: "DISCIPLINE",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Capitano Amelia",
      version: "Prima in Comando",
      text: [
        {
          title: "DISCIPLINA",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 138,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9ada4799889b49d69ae388f141a0c52c",
    tcgPlayer: 539094,
  },
  text: [
    {
      title: "DISCIPLINE",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Alien", "Captain"],
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
      id: "1xb-1",
      text: "DISCIPLINE During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
