import type { ItemCard } from "@tcg/lorcana-types";

export const imperialBow: ItemCard = {
  id: "qox",
  canonicalId: "ci_qox",
  reprints: ["set4-201"],
  cardType: "item",
  name: "Imperial Bow",
  i18n: {
    en: {
      name: "Imperial Bow",
      text: [
        {
          title: "WITHIN RANGE",
          description:
            "{E}, 1 {I} — Chosen Hero character gains Challenger +2 and Evasive this turn. (They get +2 {S} while challenging. They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Kaiserlicher Bogen",
      text: [
        {
          title: "IN REICHWEITE, 1",
          description:
            "— Ein Held oder eine Heldin deiner Wahl erhält in diesem Zug Herausfordern +2 und Wendig. (Während der Charakter herausfordert, erhält er +2. Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Arc Impérial",
      text: [
        {
          title: "À PORTÉE DE TIR,",
          description:
            "1 — Choisissez un personnage Héros qui gagne Offensif +2 et Insaisissable pour le reste de ce tour. (Lorsqu'il défie, ce personnage gagne +2. Il peut défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Arco Imperiale",
      text: [
        {
          title: "ENTRO GITTATA, 1",
          description:
            "— Un personaggio Eroe a tua scelta ottiene Sfidante +2 e Sfuggente per questo turno. (Riceve +2 mentre sta sfidando. Può sfidare i personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 201,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7979a7d0305443eb9ddb9b10469644d",
    tcgPlayer: 549617,
  },
  text: [
    {
      title: "WITHIN RANGE",
      description:
        "{E}, 1 {I} — Chosen Hero character gains Challenger +2 and Evasive this turn. (They get +2 {S} while challenging. They can challenge characters with Evasive.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "gain-keyword",
            duration: "this-turn",
            keyword: "Challenger",
            value: 2,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-classification",
                  classification: "Hero",
                },
              ],
            },
          },
          {
            type: "gain-keyword",
            duration: "this-turn",
            keyword: "Evasive",
            target: {
              ref: "previous-target",
            },
          },
        ],
      },
      id: "1li-1",
      name: "WITHIN RANGE",
      text: "WITHIN RANGE {E}, 1 {I} — Chosen Hero character gains Challenger +2 and Evasive this turn.",
      type: "activated",
    },
  ],
};
