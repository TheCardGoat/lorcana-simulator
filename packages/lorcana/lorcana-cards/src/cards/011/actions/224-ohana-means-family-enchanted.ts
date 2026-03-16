import type { ActionCard } from "@tcg/lorcana-types";

export const ohanaMeansFamilyEnchanted: ActionCard = {
  id: "4eH",
  canonicalId: "ci_iVN",
  reprints: ["set11-032"],
  cardType: "action",
  name: "Ohana Means Family",
  i18n: {
    en: {
      name: "Ohana Means Family",
      text: "Remove all damage from chosen character of yours. Draw a card for each 1 damage removed this way.",
    },
    de: {
      name: "Ohana heißt Familie",
      text: "Wähle einen deiner Charaktere und entferne jeglichen Schaden von ihm. Ziehe 1 Karte für jeden Schaden, den du auf diese Weise entfernt hast.",
    },
    fr: {
      name: "Ohana signifie famille",
      text: "Choisissez l'un de vos personnages et retirez-lui tous ses dommages. Piochez une carte pour chaque dommage ainsi retiré.",
    },
    it: {
      name: "Ohana Significa Famiglia",
      text: "Rimuovi tutti i danni da un tuo personaggio a tua scelta. Pesca una carta per ogni singolo danno rimosso in questo modo.",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 224,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_87abaabc59344ef1bfed548f0b6753bf",
    tcgPlayer: 673068,
  },
  text: "Remove all damage from chosen character of yours. Draw a card for each 1 damage removed this way.",
  abilities: [
    {
      type: "action",
      text: "Remove all damage from chosen character of yours. Draw a card for each 1 damage removed this way.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "remove-damage",
            amount: 99,
            target: "CHOSEN_CHARACTER_OF_YOURS",
          },
          {
            type: "draw",
            amount: {
              type: "for-each",
              counter: {
                type: "damage-removed",
              },
            },
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
