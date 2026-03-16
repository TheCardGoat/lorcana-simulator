import type { CharacterCard } from "@tcg/lorcana-types";

export const ticktockRelentlessCrocodile: CharacterCard = {
  id: "33J",
  canonicalId: "ci_33J",
  reprints: ["set7-191"],
  cardType: "character",
  name: "Tick-Tock",
  version: "Relentless Crocodile",
  i18n: {
    en: {
      name: "Tick-Tock",
      version: "Relentless Crocodile",
      text: [
        {
          title: "LOOKING FOR LUNCH",
          description:
            "During your turn, this character gains Evasive while a Pirate character is in play. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Ticktack",
      version: "Unerbittliches Krokodil",
      text: [
        {
          title: "SUCHT NACH ESSEN",
          description:
            "Solange ein Pirat im Spiel ist, erhält dieser Charakter in deinem Zug Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Tic-Tac",
      version: "Crocodile acharné",
      text: [
        {
          title: "EN QUÊTE D'UN REPAS",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable tant qu'il y a un personnage Pirate en jeu. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Cocò",
      version: "Coccodrillo Implacabile",
      text: [
        {
          title: "IN CERCA DI UNO SPUNTINO",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente mentre un personaggio Pirata è in gioco. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "007",
  cardNumber: 191,
  rarity: "common",
  cost: 5,
  strength: 5,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_64885a846c394abfa482aa6aa4a3711e",
    tcgPlayer: 619517,
  },
  text: [
    {
      title: "LOOKING FOR LUNCH",
      description:
        "During your turn, this character gains Evasive while a Pirate character is in play. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1qn-1",
      text: "LOOKING FOR LUNCH During your turn, this character gains Evasive while a Pirate character is in play.",
      type: "action",
    },
  ],
};
