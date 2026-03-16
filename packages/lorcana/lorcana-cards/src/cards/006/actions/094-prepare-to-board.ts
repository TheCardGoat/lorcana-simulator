import type { ActionCard } from "@tcg/lorcana-types";

export const prepareToBoard: ActionCard = {
  id: "ZLw",
  canonicalId: "ci_ZLw",
  reprints: ["set6-094"],
  cardType: "action",
  name: "Prepare to Board!",
  i18n: {
    en: {
      name: "Prepare to Board!",
      text: "Chosen character gets +2 {S} this turn. If a Pirate character is chosen, they get +3 {S} instead.",
    },
    de: {
      name: "Bereit zum Entern!",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +2. Wählst du einen Piraten, dann gib dem Charakter stattdessen +3.",
    },
    fr: {
      name: "Paré à l'abordage !",
      text: "Choisissez un personnage qui gagne +2 pour le reste de ce tour. Si un personnage Pirate est choisi de cette façon, il gagne +3 à la place.",
    },
    it: {
      name: "Prepararsi all'Abbordaggio!",
      text: "Un personaggio a tua scelta riceve +2 per questo turno. Se viene scelto un personaggio Pirata, riceve invece +3.",
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 94,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7ce20e98d86e43eaaf8c525c60f4086c",
    tcgPlayer: 587968,
  },
  text: "Chosen character gets +2 {S} this turn. If a Pirate character is chosen, they get +3 {S} instead.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            modifier: 2,
            duration: "this-turn",
            stat: "strength",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
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
                    classification: "Pirate",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              modifier: 1,
              duration: "this-turn",
              stat: "strength",
              target: {
                ref: "previous-target",
              },
              type: "modify-stat",
            },
          },
        ],
      },
      id: "lql-1",
      text: "Chosen character gets +2 {S} this turn. If a Pirate character is chosen, they get +3 {S} instead.",
      type: "action",
    },
  ],
};
