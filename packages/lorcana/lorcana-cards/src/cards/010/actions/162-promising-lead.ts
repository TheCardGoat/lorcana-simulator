import type { ActionCard } from "@tcg/lorcana-types";

export const promisingLead: ActionCard = {
  id: "Hql",
  canonicalId: "ci_Hql",
  reprints: ["set10-162"],
  cardType: "action",
  name: "Promising Lead",
  i18n: {
    en: {
      name: "Promising Lead",
      text: "Chosen character gets +1 {L} and gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    de: {
      name: "Vielversprechender Hinweis",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +1 und Unterstützen. (Jedes Mal, wenn der Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Piste prometteuse",
      text: "Choisissez un personnage qui gagne +1 et Soutien pour le reste de ce tour.",
    },
    it: {
      name: "Pista Promettente",
      text: "Un personaggio a tua scelta riceve +1 e ottiene Aiutante per questo turno. (Ogni volta che va all'avventura, puoi aggiungere la sua alla di un altro personaggio a tua scelta per questo turno.)",
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 162,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e8b9ff676484f2bb8a16dde98de13a7",
    tcgPlayer: 658877,
  },
  text: "Chosen character gets +1 {L} and gains Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            duration: "this-turn",
            modifier: 2,
            stat: "lore",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
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
                    type: "has-classification",
                    classification: "Detective",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              duration: "this-turn",
              keyword: "Support",
              target: {
                ref: "previous-target",
              },
              type: "gain-keyword",
            },
          },
        ],
      },
      type: "action",
    },
  ],
};
