import type { ActionCard } from "@tcg/lorcana-types";

export const breakFree: ActionCard = {
  id: "W2A",
  canonicalId: "ci_W2A",
  reprints: ["set5-127"],
  cardType: "action",
  name: "Break Free",
  i18n: {
    en: {
      name: "Break Free",
      text: "Deal 1 damage to chosen character of yours. They gain Rush and get +1 {S} this turn. (They can challenge the turn they're played.)",
    },
    de: {
      name: "Befreien",
      text: "Wähle einen deiner Charaktere und füge ihm 1 Schaden zu. Er erhält in diesem Zug +1 und Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
    },
    fr: {
      name: "Se libérer",
      text: "Choisissez l'un de vos personnages et infligez-lui 1 dommage. Il gagne Charge et +1 pour le reste de ce tour.",
    },
    it: {
      name: "Liberarsi",
      text: "Infliggi 1 danno a un tuo personaggio a tua scelta. Ottiene Lesto e riceve +1 per questo turno. (Può sfidare nel turno in cui viene giocato.)",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "005",
  cardNumber: 127,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8f78f01a16b947d8808ca0d350cb5c31",
    tcgPlayer: 559717,
  },
  text: "Deal 1 damage to chosen character of yours. They gain Rush and get +1 {S} this turn. (They can challenge the turn they're played.)",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            steps: [
              {
                type: "gain-keyword",
                keyword: "Rush",
                duration: "this-turn",
                target: {
                  ref: "previous-target",
                },
              },
              {
                type: "modify-stat",
                stat: "strength",
                modifier: 1,
                target: {
                  ref: "previous-target",
                },
                duration: "this-turn",
              },
            ],
            type: "sequence",
          },
        ],
        type: "sequence",
      },
      id: "10c-1",
      text: "Deal 1 damage to chosen character of yours. They gain Rush and get +1 {S} this turn.",
      type: "action",
    },
  ],
};
