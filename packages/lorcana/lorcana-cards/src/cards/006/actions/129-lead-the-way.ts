import type { ActionCard } from "@tcg/lorcana-types";

export const leadTheWay: ActionCard = {
  id: "4h8",
  canonicalId: "ci_4h8",
  reprints: ["set6-129"],
  cardType: "action",
  name: "Lead the Way",
  i18n: {
    en: {
      name: "Lead the Way",
      text: "Your characters get +2 {S} this turn.",
    },
    de: {
      name: "Den Weg weisen",
      text: "Deine Charaktere erhalten in diesem Zug +2.",
    },
    fr: {
      name: "Montrer la voie",
      text: "Vos personnages gagnent +2 pour le reste de ce tour.",
    },
    it: {
      name: "Fare Strada",
      text: [
        {
          title: "I",
          description: "tuoi personaggi ricevono +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 129,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_025d33fc4b0c45caabfa10a108e46acd",
    tcgPlayer: 593020,
  },
  text: "Your characters get +2 {S} this turn.",
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "3ig-1",
      text: "Your characters get +2 {S} this turn.",
      type: "action",
    },
  ],
};
