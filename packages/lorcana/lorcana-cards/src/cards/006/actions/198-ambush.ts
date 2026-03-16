import type { ActionCard } from "@tcg/lorcana-types";

export const ambush: ActionCard = {
  id: "UOR",
  canonicalId: "ci_UOR",
  reprints: ["set6-198"],
  cardType: "action",
  name: "Ambush!",
  i18n: {
    en: {
      name: "Ambush!",
      text: [
        {
          title: "{E}",
          description:
            "one of your characters to deal damage equal to their {S} to chosen character.",
        },
      ],
    },
    de: {
      name: "Überfall!",
      text: "einen deiner Charaktere, um einem Charakter deiner Wahl Schaden in Höhe der des erschöpften Charakters zuzufügen.",
    },
    fr: {
      name: "Embuscade !",
      text: "l'un de vos personnages pour infliger autant de dommages que sa à un personnage de votre choix.",
    },
    it: {
      name: "Imboscata!",
      text: "uno dei tuoi personaggi per infliggere danno pari alla sua a un personaggio a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 198,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_35df29e6893942a38a14f775719ce522",
    tcgPlayer: 587971,
  },
  text: [
    {
      title: "{E}",
      description: "one of your characters to deal damage equal to their {S} to chosen character.",
    },
  ],
  abilities: [
    {
      type: "action",
      text: "{E} one of your characters to deal damage equal to their {S} to chosen character.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "ready",
                },
              ],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              type: "deal-damage",
              amount: {
                type: "strength-of",
                target: {
                  ref: "previous-target",
                },
              },
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
          },
        ],
      },
    },
  ],
};
