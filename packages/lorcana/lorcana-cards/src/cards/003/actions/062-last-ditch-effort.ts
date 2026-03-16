import type { ActionCard } from "@tcg/lorcana-types";

export const lastditchEffort: ActionCard = {
  id: "vq2",
  canonicalId: "ci_04M",
  reprints: ["set3-062", "set9-062"],
  cardType: "action",
  name: "Last-Ditch Effort",
  i18n: {
    en: {
      name: "Last-Ditch Effort",
      text: "Exert chosen opposing character. Then chosen character of yours gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
    de: {
      name: "Letzter Versuch",
      text: "Erschöpfe einen gegnerischen Charakter deiner Wahl. Wähle danach einen deiner Charaktere, er erhält in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2).",
    },
    fr: {
      name: "Effort désespéré",
      text: "Choisissez un personnage adverse et épuisez-le. Choisissez ensuite l'un de vos personnages qui gagne Offensif +2 jusqu'à la fin du tour.",
    },
    it: {
      name: "Ultimo Tentativo Disperato",
      text: "Impegna un personaggio avversario a tua scelta. Poi un tuo personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "003",
  cardNumber: 62,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_1b909f18bf5e43948a2f59d32a9dbaa7",
    tcgPlayer: 650006,
  },
  text: "Exert chosen opposing character. Then chosen character of yours gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            target: "CHOSEN_OPPOSING_CHARACTER",
          },
          {
            type: "gain-keyword",
            keyword: "Challenger",
            value: 2,
            duration: "this-turn",
            target: "CHOSEN_CHARACTER_OF_YOURS",
          },
        ],
      },
    },
  ],
};
