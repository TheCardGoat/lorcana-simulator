import type { ActionCard } from "@tcg/lorcana-types";

export const forceOfAGreatTyphoon: ActionCard = {
  id: "f7h",
  canonicalId: "ci_f7h",
  reprints: ["set11-128"],
  cardType: "action",
  name: "Force of a Great Typhoon",
  i18n: {
    en: {
      name: "Force of a Great Typhoon",
      text: "Chosen character gets +5 {S} this turn.",
    },
    de: {
      name: "Stark wie ein Taifun",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug +5.",
    },
    fr: {
      name: "Plus puissant que les ouragans",
      text: "Choisissez un personnage qui gagne +5 pour le reste de ce tour.",
    },
    it: {
      name: "Un Uomo Vero Senza Timori",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta riceve +5 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 128,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dbff3559ccd647889b1fb934994a2d02",
    tcgPlayer: 674694,
  },
  text: "Chosen character gets +5 {S} this turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Chosen character gets +5 {S} this turn.",
      effect: {
        type: "modify-stat",
        stat: "strength",
        modifier: 5,
        duration: "this-turn",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
