import type { ActionCard } from "@tcg/lorcana-types";

export const fragileAsAFlower: ActionCard = {
  id: "Bll",
  canonicalId: "ci_Bll",
  reprints: ["set10-065"],
  cardType: "action",
  name: "Fragile as a Flower",
  i18n: {
    en: {
      name: "Fragile as a Flower",
      text: "Draw a card. Exert chosen character with cost 2 or less. They can't ready at the start of their next turn.",
    },
    de: {
      name: "Zart wie eine Blume",
      text: "Ziehe 1 Karte. Erschöpfe einen Charakter deiner Wahl, der 2 oder weniger kostet. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
    },
    fr: {
      name: "Aussi fragile qu’une fleur",
      text: "Piochez une carte. Choisissez un personnage coûtant 2 ou moins et épuisez-le. Il ne se redresse pas au début de son prochain tour.",
    },
    it: {
      name: "Un Fuscello Delicato",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Pesca una carta. Impegna un personaggio a tua scelta con costo 2 o inferiore. Non si può preparare all'inizio del suo prossimo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 65,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_84584c67578c4843a7aa845642566259",
    tcgPlayer: 659418,
  },
  text: "Draw a card. Exert chosen character with cost 2 or less. They can't ready at the start of their next turn.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "cost-comparison",
                  comparison: "less-or-equal",
                  value: 2,
                },
              ],
            },
            type: "exert",
          },
          {
            duration: "until-start-of-next-turn",
            restriction: "cant-ready",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
