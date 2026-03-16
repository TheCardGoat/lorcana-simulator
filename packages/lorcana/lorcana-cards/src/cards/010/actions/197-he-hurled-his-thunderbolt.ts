import type { ActionCard } from "@tcg/lorcana-types";

export const heHurledHisThunderbolt: ActionCard = {
  id: "3ft",
  canonicalId: "ci_2tJ",
  reprints: ["set10-197"],
  cardType: "action",
  name: "He Hurled His Thunderbolt",
  i18n: {
    en: {
      name: "He Hurled His Thunderbolt",
      text: "Deal 4 damage to chosen character. Your Deity characters gain Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
    de: {
      name: "Mit einem Blitz allein",
      text: "Füge einem Charakter deiner Wahl 4 Schaden zu. Deine Gottheiten erhalten in diesem Zug Herausfordern +2. (Während sie herausfordern, erhalten sie +2.)",
    },
    fr: {
      name: "Foudroyant d'un éclair",
      text: "Choisissez un personnage et infligez-lui 4 dommages. Vos personnages Dieu gagnent Offensif +2 pour le reste de ce tour. (Lorsqu'ils défient, ces personnages gagnent +2.)",
    },
    it: {
      name: "Con i suoi Fulmini",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Infliggi 4 danni a un personaggio a tua scelta. I tuoi personaggi Divinità ottengono Sfidante +2 per questo turno. (Ricevono +2 mentre stanno sfidando.)",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 197,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_de5dfda85c534def9ee3a0d93cb55597",
    tcgPlayer: 660026,
  },
  text: "Deal 4 damage to chosen character. Your Deity characters gain Challenger +2 this turn. (They get +2 {S} while challenging.)",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 4,
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
            duration: "this-turn",
            keyword: "Challenger",
            target: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-classification",
                  classification: "Deity",
                },
              ],
            },
            type: "gain-keyword",
            value: 2,
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
