import type { ActionCard } from "@tcg/lorcana-types";

export const cutToTheChase: ActionCard = {
  id: "VLl",
  canonicalId: "ci_VLl",
  reprints: ["set1-129"],
  cardType: "action",
  name: "Cut to the Chase",
  i18n: {
    en: {
      name: "Cut to the Chase",
      text: "Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
    de: {
      name: "Mit schnellen Schnitten",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
    },
    fr: {
      name: "DROIT AU BUT",
      text: "Choisissez un personnage, il gagne Charge pour le reste de ce tour. (Il peut défier le tour où il est joué.)",
    },
    it: {
      name: "Cut to the Chase",
      text: "Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  },
  inkType: ["ruby"],
  set: "001",
  cardNumber: 129,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_df33509235464d18becdd63bd8ce91eb",
    tcgPlayer: 508615,
  },
  text: "Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
    },
  ],
};
