import type { ActionCard } from "@tcg/lorcana-types";

export const nanisPayback: ActionCard = {
  id: "9Vx",
  canonicalId: "ci_9Vx",
  reprints: ["set11-127"],
  cardType: "action",
  name: "Nani's Payback",
  i18n: {
    en: {
      name: "Nani's Payback",
      text: "Each opponent loses lore equal to the damage on chosen character of yours, to a maximum of 4 lore each. Draw a card.",
    },
    de: {
      name: "Nanis Rache",
      text: "Wähle einen deiner Charaktere und zähle den Schaden auf ihm. Alle gegnerischen Mitspielenden verlieren jeweils diese Anzahl an Legenden, bis zu einem Maximum von 4. Ziehe 1 Karte.",
    },
    fr: {
      name: "La revanche de Nani",
      text: "Choisissez l'un de vos personnages. Chaque adversaire perd autant d'éclats de Lore qu'il y a de dommages sur le personnage choisi, jusqu'à un maximum de 4 éclats de Lore chacun. Piochez une carte.",
    },
    it: {
      name: "La Rivincita di Nani",
      text: "Ogni avversario perde leggenda pari al danno su un tuo personaggio a tua scelta, fino a un massimo di 4 leggenda ciascuno. Pesca una carta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 127,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_ade83b5dd75144a4b901097e22b7b8b1",
    tcgPlayer: 676215,
  },
  text: "Each opponent loses lore equal to the damage on chosen character of yours, to a maximum of 4 lore each. Draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        steps: [
          {
            counter: {
              type: "damage-on-target",
            },
            effect: {
              amount: 1,
              target: "EACH_OPPONENT",
              type: "lose-lore",
            },
            maximum: 4,
            target: "CHOSEN_CHARACTER_OF_YOURS",
            type: "for-each",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
    },
  ],
};
