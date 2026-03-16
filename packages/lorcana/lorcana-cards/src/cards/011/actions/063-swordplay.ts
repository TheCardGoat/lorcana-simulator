import type { ActionCard } from "@tcg/lorcana-types";

export const swordplay: ActionCard = {
  id: "7uF",
  canonicalId: "ci_7uF",
  reprints: ["set11-063"],
  cardType: "action",
  name: "Swordplay",
  i18n: {
    en: {
      name: "Swordplay",
      text: "Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
    },
    de: {
      name: "Schwertkunst",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
    },
    fr: {
      name: "Manier l'épée",
      text: "Choisissez un personnage qui gagne Offensif +3 pour le reste de ce tour.",
    },
    it: {
      name: "Abilità con la Spada",
      text: "Un personaggio a tua scelta ottiene Sfidante +3 per questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "011",
  cardNumber: 63,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_79bedff3158647f791e28faa270773b5",
    tcgPlayer: 675299,
  },
  text: "Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
  abilities: [
    {
      type: "action",
      text: "Chosen character gains Challenger +3 this turn.",
      effect: {
        type: "gain-keyword",
        keyword: "Challenger",
        value: 3,
        duration: "this-turn",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
