import type { ActionCard } from "@tcg/lorcana-types";

export const duckForCover: ActionCard = {
  id: "WBj",
  canonicalId: "ci_WBj",
  reprints: ["set5-198"],
  cardType: "action",
  name: "Duck for Cover!",
  i18n: {
    en: {
      name: "Duck for Cover!",
      text: "Chosen character gains Resist +1 and Evasive this turn. (Damage dealt to them is reduced by 1. They can challenge characters with Evasive.)",
    },
    de: {
      name: "Duckt euch weg!",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Robust +1 und Wendig. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1. Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "Éviter le canardage",
      text: "Choisissez un personnage qui gagne Résistance +1 et Insaisissable pour le reste de ce tour. (Les dommages qui lui sont infligés sont réduits de 1 et il peut défier les personnages avec Insaisissable.)",
    },
    it: {
      name: "Al Riparo!",
      text: "Un personaggio a tua scelta ottiene Resistere +1 e Sfuggente per questo turno. (Il danno che gli viene inflitto è ridotto di 1. Può sfidare altri personaggi con Sfuggente.)",
    },
  },
  inkType: ["steel"],
  set: "005",
  cardNumber: 198,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2eae8238f1d54959a3bc9f1e875c1efe",
    tcgPlayer: 561850,
  },
  text: "Chosen character gains Resist +1 and Evasive this turn. (Damage dealt to them is reduced by 1. They can challenge characters with Evasive.)",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            duration: "this-turn",
            keyword: "Resist",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
            value: 1,
          },
          {
            duration: "this-turn",
            keyword: "Evasive",
            target: {
              ref: "previous-target",
            },
            type: "gain-keyword",
          },
        ],
      },
      id: "13l-1",
      text: "Chosen character gains Resist +1 and Evasive this turn.",
      type: "action",
    },
  ],
};
