import type { CharacterCard } from "@tcg/lorcana-types";

export const reubenSandwichExpert: CharacterCard = {
  id: "YVY",
  canonicalId: "ci_YVY",
  reprints: ["set11-021"],
  cardType: "character",
  name: "Reuben",
  version: "Sandwich Expert",
  i18n: {
    en: {
      name: "Reuben",
      version: "Sandwich Expert",
      text: [
        {
          title: "LUNCH SPECIAL",
          description:
            "{E} — Remove up to 2 damage from chosen character of yours. For each 1 damage removed this way, you pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Reuben",
      version: "Sandwich-Experte",
      text: [
        {
          title: "SPEZIALMITTAGESSEN",
          description:
            "— Entferne bis zu 2 Schaden von einem deiner Charaktere. Du zahlst für jeden Schaden, den du auf diese Weise entfernt hast, 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Reuben",
      version: "Expert en sandwichs",
      text: [
        {
          title: "SPÉCIALITÉ DU JOUR",
          description:
            "— Choisissez l'un de vos personnages et retirez-lui jusqu'à 2 dommages. Pour chaque dommage ainsi retiré, le prochain personnage que vous jouez ce tour-ci vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Reuben",
      version: "Esperto di Panini",
      text: [
        {
          title: "SPECIALITÀ DEL PRANZO",
          description:
            "— Rimuovi fino a 2 danni da un tuo personaggio a tua scelta. Per ogni singolo danno rimosso in questo modo, paga 1 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 21,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_47d6da02d19a4b82a6d7aaf593ca151e",
    tcgPlayer: 673306,
  },
  text: [
    {
      title: "LUNCH SPECIAL",
      description:
        "{E} — Remove up to 2 damage from chosen character of yours. For each 1 damage removed this way, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      id: "1uo-1",
      effect: {
        steps: [
          {
            amount: 2,
            target: "YOUR_CHOSEN_CHARACTER",
            type: "remove-damage",
            upTo: true,
          },
          {
            type: "for-each",
            counter: {
              type: "damage-removed",
            },
            effect: {
              from: "hand",
              type: "play-card",
            },
          },
        ],
        type: "sequence",
      },
      type: "action",
      text: "LUNCH SPECIAL {E} – Remove up to 2 damage from chosen character of yours. For each 1 damage removed this way, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
};
