import type { ActionCard } from "@tcg/lorcana-types";

export const twinFire: ActionCard = {
  id: "Vmz",
  canonicalId: "ci_Vmz",
  reprints: ["set6-197"],
  cardType: "action",
  name: "Twin Fire",
  i18n: {
    en: {
      name: "Twin Fire",
      text: "Deal 2 damage to chosen character. Then, you may choose and discard a card to deal 2 damage to another chosen character.",
    },
    de: {
      name: "Zwillingsfeuer",
      text: "Füge einem Charakter deiner Wahl 2 Schaden zu. Dann darfst du eine Karte von deiner Hand auswählen und abwerfen, um einem anderen Charakter deiner Wahl 2 Schaden zuzufügen.",
    },
    fr: {
      name: "Tir jumelé",
      text: "Choisissez un personnage et infligez-lui 2 dommages. Ensuite, vous pouvez défausser une carte pour choisir un autre personnage et lui infliger 2 dommages.",
    },
    it: {
      name: "Fuoco Gemello",
      text: "Infliggi 2 danni a un personaggio a tua scelta. Poi, puoi scegliere e scartare una carta per infliggere 2 danni a un altro personaggio a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 197,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_7f56bbeab3ce4593beb4feea23724b82",
    tcgPlayer: 591992,
  },
  text: "Deal 2 damage to chosen character. Then, you may choose and discard a card to deal 2 damage to another chosen character.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            chooser: "CONTROLLER",
            effect: {
              type: "sequence",
              steps: [
                {
                  type: "discard",
                  amount: 1,
                  from: "hand",
                  target: "CONTROLLER",
                  chosen: true,
                },
                {
                  amount: 2,
                  target: {
                    selector: "chosen",
                    count: 1,
                    owner: "any",
                    zones: ["play"],
                    cardTypes: ["character"],
                    requireDifferentTargets: true,
                  },
                  type: "deal-damage",
                },
              ],
            },
            type: "optional",
          },
        ],
      },
      id: "w3l-1",
      text: "Deal 2 damage to chosen character. Then, you may choose and discard a card to deal 2 damage to another chosen character.",
      type: "action",
    },
  ],
};
