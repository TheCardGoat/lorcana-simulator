import type { ActionCard } from "@tcg/lorcana-types";

export const pickAFight: ActionCard = {
  id: "3r0",
  canonicalId: "ci_3r0",
  reprints: ["set2-200"],
  cardType: "action",
  name: "Pick a Fight",
  i18n: {
    en: {
      name: "Pick a Fight",
      text: "Chosen character can challenge ready characters this turn.",
    },
    de: {
      name: "Streit anzetteln",
      text: "Wähle einen Charakter. Er kann in diesem Zug bereite Charaktere herausfordern.",
    },
    fr: {
      name: "Choisir son combat",
      text: "Choisissez un personnage, il peut défier des personnages redressés pour le reste de ce tour.",
    },
    it: {
      name: "Attaccare Briga",
      text: "Un personaggio a tua scelta può sfidare i personaggi preparati per questo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Wreck It Ralph",
  set: "002",
  cardNumber: 200,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5516a5f756734f2c89d1ef63e8c9964d",
    tcgPlayer: 527296,
  },
  text: "Chosen character can challenge ready characters this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "grant-ability",
        ability: "can-challenge-ready",
        duration: "this-turn",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
