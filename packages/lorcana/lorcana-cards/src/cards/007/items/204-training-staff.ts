import type { ItemCard } from "@tcg/lorcana-types";

export const trainingStaff: ItemCard = {
  id: "T3y",
  canonicalId: "ci_T3y",
  reprints: ["set7-204"],
  cardType: "item",
  name: "Training Staff",
  i18n: {
    en: {
      name: "Training Staff",
      text: [
        {
          title: "PRECISION STRIKE",
          description:
            "{E}, 1 {I} — Chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Übungsstab",
      text: [
        {
          title: "PRÄZISIONSSCHLAG,",
          description:
            "1 — Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2.)",
        },
      ],
    },
    fr: {
      name: "Bâton d’entraînement",
      text: [
        {
          title: "FRAPPE",
          description:
            "PRÉCISE, 1 — Choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Bastone da Allenamento",
      text: [
        {
          title: "COLPO DI PRECISIONE, 1",
          description: "— Un personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "007",
  cardNumber: 204,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_58e5277d1e554fd28d2b56ce65317d81",
    tcgPlayer: 619526,
  },
  text: [
    {
      title: "PRECISION STRIKE",
      description:
        "{E}, 1 {I} — Chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
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
      id: "1rn-1",
      name: "PRECISION STRIKE",
      text: "PRECISION STRIKE {E}, 1 {I} — Chosen character gains Challenger +2 this turn.",
      type: "activated",
    },
  ],
};
