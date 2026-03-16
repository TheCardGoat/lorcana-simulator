import type { ActionCard } from "@tcg/lorcana-types";

export const legendOfTheSwordInTheStone: ActionCard = {
  id: "Sw8",
  canonicalId: "ci_Sw8",
  reprints: ["set2-064"],
  cardType: "action",
  name: "Legend of the Sword in the Stone",
  i18n: {
    en: {
      name: "Legend of the Sword in the Stone",
      text: "Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
    },
    de: {
      name: "Die Legende vom Schwert in dem Stein",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
    },
    fr: {
      name: "La légende de l'épée dans l'enclume",
      text: "Choisissez un personnage, il gagne Offensif + 3 pour le reste de ce tour.",
    },
    it: {
      name: "La Leggenda della Spada nella Roccia",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta ottiene Sfidante +3 per questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 64,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d4eaff075b2b41659976e71933d2c3e4",
    tcgPlayer: 526302,
  },
  text: "Chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        type: "gain-keyword",
        value: 3,
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
