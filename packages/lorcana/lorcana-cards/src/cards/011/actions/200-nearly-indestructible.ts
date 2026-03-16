import type { ActionCard } from "@tcg/lorcana-types";

export const nearlyIndestructible: ActionCard = {
  id: "xnF",
  canonicalId: "ci_xnF",
  reprints: ["set11-200"],
  cardType: "action",
  name: "Nearly Indestructible",
  i18n: {
    en: {
      name: "Nearly Indestructible",
      text: "Chosen character of yours gains Resist +2 until the start of your next turn.",
    },
    de: {
      name: "Beinahe unzerstörbar",
      text: "Wähle einen deiner Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Presque invincible",
      text: "Choisissez l'un de vos personnages qui gagne Résistance +2 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Praticamente Indistruttibile",
      text: "Un tuo personaggio a tua scelta ottiene Resistere +2 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 200,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_60d34f2b1b38499e8f7a5915a0a7e59c",
    tcgPlayer: 676248,
  },
  text: "Chosen character of yours gains Resist +2 until the start of your next turn.",
  abilities: [
    {
      type: "action",
      text: "Chosen character of yours gains Resist +2 until the start of your next turn.",
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 2,
        duration: "until-start-of-next-turn",
        target: "CHOSEN_CHARACTER_OF_YOURS",
      },
    },
  ],
};
