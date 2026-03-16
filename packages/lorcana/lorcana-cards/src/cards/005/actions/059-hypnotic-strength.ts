import type { ActionCard } from "@tcg/lorcana-types";

export const hypnoticStrength: ActionCard = {
  id: "ZhD",
  canonicalId: "ci_ZhD",
  reprints: ["set5-059"],
  cardType: "action",
  name: "Hypnotic Strength",
  i18n: {
    en: {
      name: "Hypnotic Strength",
      text: "Draw a card. Chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
    de: {
      name: "Hypnotische Kräfte",
      text: "Ziehe 1 Karte. Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2.)",
    },
    fr: {
      name: "Force hypnotique",
      text: "Piochez une carte. Choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
    },
    it: {
      name: "Forza Ipnotica",
      text: "Pesca una carta. Un personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 59,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9444cd2552124a658a0c276513934a4f",
    tcgPlayer: 561345,
  },
  text: "Draw a card. Chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
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
            duration: "this-turn",
            keyword: "Challenger",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
            value: 2,
          },
        ],
        type: "sequence",
      },
      id: "tu0-1",
      text: "Draw a card. Chosen character gains Challenger +2 this turn.",
      type: "action",
    },
  ],
};
