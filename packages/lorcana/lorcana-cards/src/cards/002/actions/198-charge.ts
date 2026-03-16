import type { ActionCard } from "@tcg/lorcana-types";

export const charge: ActionCard = {
  id: "FWM",
  canonicalId: "ci_FWM",
  reprints: ["set2-198"],
  cardType: "action",
  name: "Charge!",
  i18n: {
    en: {
      name: "Charge!",
      text: "Chosen character gains Challenger +2 and Resist +2 this turn. (They get +2 {S} while challenging. Damage dealt to them is reduced by 2.)",
    },
    de: {
      name: "Zum Angriff!",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +2 und Robust +2. (Während der Charakter herausfordert, erhält er +2. Reduziere jeglichen Schaden, der ihm zugefügt wird, um 2.)",
    },
    fr: {
      name: "Fonce !",
      text: "Choisissez un personnage, il gagne Offensif +2 et Résistance +2 pour le reste de ce tour. (Lorsqu'il défie, ce personnage gagne +2. Les dommages qui lui sont infligés sont réduits de 2.)",
    },
    it: {
      name: "Carica!",
      text: "Un personaggio a tua scelta ottiene Sfidante +2 e Resistere +2 per questo turno. (Riceve +2 mentre sta sfidando. Il danno che gli viene inflitto è ridotto di 2.)",
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 198,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7f7875c57b0f49d9a0ca569ec1037777",
    tcgPlayer: 527639,
  },
  text: "Chosen character gains Challenger +2 and Resist +2 this turn. (They get +2 {S} while challenging. Damage dealt to them is reduced by 2.)",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            duration: "this-turn",
            keyword: "Challenger",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
            value: 2,
          },
          {
            duration: "this-turn",
            keyword: "Resist",
            target: {
              ref: "previous-target",
            },
            type: "gain-keyword",
            value: 2,
          },
        ],
      },
    },
  ],
};
