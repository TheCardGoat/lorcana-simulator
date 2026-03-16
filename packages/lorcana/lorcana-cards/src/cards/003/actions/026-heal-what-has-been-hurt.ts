import type { ActionCard } from "@tcg/lorcana-types";

export const healWhatHasBeenHurt: ActionCard = {
  id: "qoo",
  canonicalId: "ci_ol7",
  reprints: ["set3-026", "set9-027"],
  cardType: "action",
  name: "Heal What Has Been Hurt",
  i18n: {
    en: {
      name: "Heal What Has Been Hurt",
      text: "Remove up to 3 damage from chosen character. Draw a card.",
    },
    de: {
      name: "Lass mich nicht allein",
      text: "Entferne bis zu 3 Schaden von einem Charakter deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Guéris les blessures",
      text: "Choisissez un personnage et retirez-lui jusqu'à 3 jetons Dommage. Piochez une carte.",
    },
    it: {
      name: "Incanto della Guarigione",
      text: "(Un personaggio con costo 3 o superiore può per giocare questa canzone gratis.) Rimuovi fino a 3 danni da un personaggio a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "003",
  cardNumber: 26,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_d3bdbbdbd842435fa3fa0ac7ec4eb28d",
    tcgPlayer: 649974,
  },
  text: "Remove up to 3 damage from chosen character. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "remove-damage",
            amount: 3,
            upTo: true,
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
