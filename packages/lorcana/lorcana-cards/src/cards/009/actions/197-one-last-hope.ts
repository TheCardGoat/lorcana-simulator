import type { ActionCard } from "@tcg/lorcana-types";

export const oneLastHope: ActionCard = {
  id: "rJW",
  canonicalId: "ci_qmz",
  reprints: ["set4-197", "set9-197"],
  cardType: "action",
  name: "One Last Hope",
  i18n: {
    en: {
      name: "One Last Hope",
      text: "Chosen character gains Resist +2 until the start of your next turn. If a Hero character is chosen, they can also challenge ready characters this turn.",
    },
    de: {
      name: "Bleibt nur eine Hoffnung",
      text: "Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2. Wenn du einen Held oder eine Heldin wählst, kann dieser Charakter in diesem Zug bereite Charaktere herausfordern. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Il me reste un espoir",
      text: "Choisissez un personnage qui gagne Résistance +2 jusqu'au début de votre prochain tour. Si c'est un personnage Héros, il peut aussi défier des personnages redressés pour le reste de ce tour.",
    },
    it: {
      name: "L'Ultima Speranza",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta ottiene Resistere +2 fino all'inizio del tuo prossimo turno. Se quel personaggio è un Eroe, può anche sfidare i personaggi preparati per questo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 197,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_ae1714b13cbc42a4a83ec36fee365526",
    tcgPlayer: 650157,
  },
  text: "Chosen character gains Resist +2 until the start of your next turn. If a Hero character is chosen, they can also challenge ready characters this turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "gain-keyword",
            keyword: "Resist",
            value: 2,
            duration: "until-start-of-next-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "selected-first",
                filters: [
                  {
                    type: "card-type",
                    value: "character",
                  },
                  {
                    type: "has-classification",
                    classification: "Hero",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "grant-ability",
              ability: "can-challenge-ready",
              duration: "this-turn",
              target: {
                ref: "previous-target",
              },
            },
          },
        ],
      },
    },
  ],
};
