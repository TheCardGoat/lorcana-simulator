import type { ActionCard } from "@tcg/lorcana-types";

export const loseTheWay: ActionCard = {
  id: "Aft",
  canonicalId: "ci_Aft",
  reprints: ["set6-063"],
  cardType: "action",
  name: "Lose the Way",
  i18n: {
    en: {
      name: "Lose the Way",
      text: "Exert chosen character. Then, you may choose and discard a card. If you do, the exerted character can't ready at the start of their next turn.",
    },
    de: {
      name: "Den Weg verlieren",
      text: "Erschöpfe einen Charakter deiner Wahl. Dann darfst du eine Karte von deiner Hand auswählen und abwerfen. Wenn du dies tust, wird der erschöpfte Charakter zu Beginn seines nächsten Zuges nicht bereit gemacht.",
    },
    fr: {
      name: "Perdre son chemin",
      text: "Choisissez un personnage et épuisez-le. Ensuite, vous pouvez défausser une carte. Si vous le faites, le personnage épuisé ne se redresse pas au début de son prochain tour.",
    },
    it: {
      name: "Perdersi",
      text: "Impegna un personaggio a tua scelta. Poi, puoi scegliere e scartare una carta. Se lo fai, il personaggio impegnato non può prepararsi all'inizio del suo prossimo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 63,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d7336a7cef10416793a025c24ffc28a0",
    tcgPlayer: 587754,
  },
  text: "Exert chosen character. Then, you may choose and discard a card. If you do, the exerted character can't ready at the start of their next turn.",
  abilities: [
    {
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
            type: "exert",
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
                  duration: "until-start-of-next-turn",
                  restriction: "cant-ready",
                  target: {
                    ref: "previous-target",
                  },
                  type: "restriction",
                },
              ],
            },
            type: "optional",
          },
        ],
        type: "sequence",
      },
      id: "1um-1",
      text: "Exert chosen character. Then, you may choose and discard a card. If you do, the exerted character can't ready at the start of their next turn.",
      type: "action",
    },
  ],
};
