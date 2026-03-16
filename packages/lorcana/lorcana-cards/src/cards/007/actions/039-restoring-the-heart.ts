import type { ActionCard } from "@tcg/lorcana-types";

export const restoringTheHeart: ActionCard = {
  id: "PpP",
  canonicalId: "ci_PpP",
  reprints: ["set7-039"],
  cardType: "action",
  name: "Restoring the Heart",
  i18n: {
    en: {
      name: "Restoring the Heart",
      text: "Remove up to 3 damage from chosen character or location. Draw a card.",
    },
    de: {
      name: "Das Herz zurückbringen",
      text: "Entferne bis zu 3 Schaden von einem Charakter oder Ort deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Restituer le Cœur",
      text: "Choisissez un personnage ou un lieu et retirez-lui jusqu'à 3 dommages. Piochez une carte.",
    },
    it: {
      name: "Risanare il Cuore",
      text: "Rimuovi fino a 3 danni da un personaggio o da un luogo a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "Moana",
  set: "007",
  cardNumber: 39,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a9d9c4039f5445c582413664824aad1d",
    tcgPlayer: 618132,
  },
  text: "Remove up to 3 damage from chosen character or location. Draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 3,
            target: "CHOSEN_CHARACTER_OR_LOCATION",
            type: "remove-damage",
            upTo: true,
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "inl-1",
      text: "Remove up to 3 damage from chosen character or location. Draw a card.",
      type: "action",
    },
  ],
};
