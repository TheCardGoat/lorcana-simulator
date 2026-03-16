import type { ActionCard } from "@tcg/lorcana-types";

export const nextStopOlympusEnchanted: ActionCard = {
  id: "K04",
  canonicalId: "ci_49R",
  reprints: ["set10-129"],
  cardType: "action",
  name: "Next Stop, Olympus",
  i18n: {
    en: {
      name: "Next Stop, Olympus",
      text: [
        {
          title:
            "Action If you have a character with 5 {S} or more in play, you pay 2 {I} less to play this action.",
        },
        {
          title:
            "Ready chosen character. They can't quest for the rest of this turn. The next time they challenge a character this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Nächster Halt, Olymp",
      text: "Wenn du mindestens einen Charakter mit 5 oder mehr im Spiel hast, zahlst du 2 weniger, um diese Aktion auszuspielen. Mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden. Das nächste Mal während dieses Zuges, wenn er einen anderen Charakter herausfordert, sammelst du 1 Legende.",
    },
    fr: {
      name: "Prochaine étape, l’Olympe !",
      text: "Jouer cette action vous coûte 2 de moins si vous avez en jeu un personnage ayant 5 ou plus. Choisissez un personnage et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour. La prochaine fois qu'il défie un autre personnage ce tour-ci, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Prossima Fermata, Olimpo",
      text: "Se hai in gioco un personaggio con 5 o superiore, paga 2 in meno per giocare questa azione. Prepara un personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno. La prossima volta che sfida un altro personaggio per questo turno, ottieni 1 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 234,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fe0bc499ead74e4f8a5d2b0e6037cf91",
    tcgPlayer: 660028,
  },
  text: [
    {
      title:
        "Action If you have a character with 5 {S} or more in play, you pay 2 {I} less to play this action.",
    },
    {
      title:
        "Ready chosen character. They can't quest for the rest of this turn. The next time they challenge a character this turn, gain 1 lore.",
    },
  ],
  abilities: [
    {
      type: "static",
      name: "ACTION",
      text: "ACTION If you have a character with 5 {S} or more in play, you pay 2 {I} less to play this action.",
      sourceZones: ["hand"],
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "strength-comparison",
              comparison: "greater-or-equal",
              value: 5,
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        type: "cost-reduction",
        amount: 2,
      },
    },
    {
      type: "action",
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
          {
            ability: "gain-lore-when-challenging",
            duration: "this-turn",
            target: {
              ref: "previous-target",
            },
            type: "grant-ability",
          },
        ],
        type: "sequence",
      },
    },
  ],
};
