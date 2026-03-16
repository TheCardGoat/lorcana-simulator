import type { ItemCard } from "@tcg/lorcana-types";

export const medallionWeights: ItemCard = {
  id: "0I6",
  canonicalId: "ci_BIF",
  reprints: ["set4-132", "set9-134"],
  cardType: "item",
  name: "Medallion Weights",
  i18n: {
    en: {
      name: "Medallion Weights",
      text: [
        {
          title: "DISCIPLINE AND STRENGTH",
          description:
            "{E}, 2 {I} — Chosen character gets +2 {S} this turn. Whenever they challenge another character this turn, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Gewichte der Medaillen",
      text: [
        {
          title: "DISZIPLIN UND",
          description:
            "STÄRKE, 2 — Gib einem Charakter deiner Wahl in diesem Zug +2. Jedes Mal, wenn er in diesem Zug einen anderen Charakter herausfordert, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Médaillons Lestés",
      text: [
        {
          title: "DISCIPLINE ET FORCE, 2",
          description:
            "— Choisissez un personnage qui gagne +2 pour le reste de ce tour. Chaque fois qu'il défie un autre personnage durant ce tour, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Pesi a Medaglia",
      text: [
        {
          title: "DISCIPLINA E FORZA, 2",
          description:
            "— Un personaggio a tua scelta riceve +2 per questo turno. Ogni volta che sfida un altro personaggio per questo turno, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "009",
  cardNumber: 134,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_568ccd26d0fa49ac94a67b49e599930d",
    tcgPlayer: 650069,
  },
  text: [
    {
      title: "DISCIPLINE AND STRENGTH",
      description:
        "{E}, 2 {I} — Chosen character gets +2 {S} this turn. Whenever they challenge another character this turn, you may draw a card.",
    },
  ],
  abilities: [
    {
      id: "1rm-1",
      name: "DISCIPLINE AND STRENGTH",
      text: "{E}, 2 {I} — Chosen character gets +2 {S} this turn. Whenever they challenge another character this turn, you may draw a card.",
      type: "activated",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            stat: "strength",
            modifier: 2,
            duration: "this-turn",
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "grant-ability",
            duration: "this-turn",
            target: {
              ref: "previous-target",
            },
            ability: {
              id: "draw-when-challenging",
              type: "triggered",
              text: "Whenever this character challenges another character this turn, you may draw a card.",
              trigger: {
                event: "challenge",
                timing: "whenever",
                on: "SELF",
                defender: {
                  controller: "opponent",
                },
              },
              effect: {
                type: "optional",
                chooser: "CONTROLLER",
                effect: {
                  type: "draw",
                  amount: 1,
                  target: "CONTROLLER",
                },
              },
            },
          },
        ],
      },
    },
  ],
};
