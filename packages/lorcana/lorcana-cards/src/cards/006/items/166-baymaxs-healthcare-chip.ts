import type { ItemCard } from "@tcg/lorcana-types";

export const baymaxsHealthcareChip: ItemCard = {
  id: "zdZ",
  canonicalId: "ci_zdZ",
  reprints: ["set6-166"],
  cardType: "item",
  name: "Baymax's Healthcare Chip",
  i18n: {
    en: {
      name: "Baymax's Healthcare Chip",
      text: [
        {
          title: "10,000 MEDICAL PROCEDURES",
          description: "{E} — Choose one:",
        },
        {
          title: "* Remove up to 1 damage from chosen character.",
        },
        {
          title:
            "* If you have a Robot character in play, remove up to 3 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Baymax' Gesundheitschip",
      text: [
        {
          title: "10.000 MEDIZINISCHE VERFAHREN",
          description:
            "— Wähle eine Möglichkeit aus: • Entferne bis zu 1 Schaden von einem Charakter deiner Wahl. • Wenn du mindestens einen Roboter im Spiel hast, entferne bis zu 3 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Puce de soins de Baymax",
      text: "10 000 PROCÉDURES MÉDICALES — Choisissez entre: • Choisissez un personnage et retirez-lui jusqu'à 1 dommage. • Si vous avez un personnage Robot en jeu, choisissez un personnage et retirez-lui jusqu'à 3 dommages.",
    },
    it: {
      name: "Microchip Sanitario di Baymax",
      text: [
        {
          title: "10.000 PROCEDURE MEDICHE",
          description:
            "— Scegli uno: • Rimuovi fino a 1 danno da un personaggio a tua scelta. • Se hai in gioco un personaggio Robot, rimuovi fino a 3 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 166,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_edfd3ef020dd41d5b1733088bdf2c991",
    tcgPlayer: 587969,
  },
  text: [
    {
      title: "10,000 MEDICAL PROCEDURES",
      description: "{E} — Choose one:",
    },
    {
      title: "* Remove up to 1 damage from chosen character.",
    },
    {
      title:
        "* If you have a Robot character in play, remove up to 3 damage from chosen character.",
    },
  ],
  abilities: [
    {
      id: "81j-1",
      name: "10,000 MEDICAL PROCEDURES",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "has-classification",
                classification: "Robot",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "or",
          optionLabels: [
            "Remove up to 1 damage from chosen character",
            "Remove up to 3 damage from chosen character",
          ],
          options: [
            {
              type: "remove-damage",
              amount: 1,
              upTo: true,
              target: "CHOSEN_CHARACTER",
            },
            {
              type: "remove-damage",
              amount: 3,
              upTo: true,
              target: "CHOSEN_CHARACTER",
            },
          ],
        },
        else: {
          type: "remove-damage",
          amount: 1,
          upTo: true,
          target: "CHOSEN_CHARACTER",
        },
      },
      text: "10,000 MEDICAL PROCEDURES {E} — Choose one:",
    },
  ],
};
