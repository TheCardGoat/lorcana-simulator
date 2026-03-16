import type { ActionCard } from "@tcg/lorcana-types";

export const pouncingPractice: ActionCard = {
  id: "kf3",
  canonicalId: "ci_kf3",
  reprints: ["set8-176"],
  cardType: "action",
  name: "Pouncing Practice",
  i18n: {
    en: {
      name: "Pouncing Practice",
      text: "Chosen character gets -2 {S} this turn. Chosen character of yours gains Evasive this turn. (They can challenge characters with Evasive.)",
    },
    de: {
      name: "Springen üben",
      text: "Gib einem Charakter deiner Wahl in diesem Zug -2. Wähle einen deiner Charaktere. Jener erhält in diesem Zug Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "Entraînement au bond",
      text: "Choisissez un personnage qui subit -2 pour le reste de ce tour. Choisissez l'un de vos personnages qui gagne Insaisissable pour le reste de ce tour. (Il peut défier des personnages avec Insaisissable.)",
    },
    it: {
      name: "Lezione d'Agguato",
      text: "Un personaggio a tua scelta riceve -2 per questo turno. Un tuo personaggio a tua scelta ottiene Sfuggente per questo turno. (Può sfidare altri personaggi con Sfuggente.)",
    },
  },
  inkType: ["sapphire"],
  franchise: "Lion King",
  set: "008",
  cardNumber: 176,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_80199d9b642b481ba9a0b3435f1756de",
    tcgPlayer: 631469,
  },
  text: "Chosen character gets -2 {S} this turn. Chosen character of yours gains Evasive this turn. (They can challenge characters with Evasive.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            modifier: -2,
            stat: "strength",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "modify-stat",
          },
          {
            duration: "this-turn",
            keyword: "Evasive",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "59j-1",
      text: "Chosen character gets -2 {S} this turn. Chosen character of yours gains Evasive this turn.",
      type: "action",
    },
  ],
};
