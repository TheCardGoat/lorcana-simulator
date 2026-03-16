import type { ItemCard } from "@tcg/lorcana-types";

export const kanineKrunchies: ItemCard = {
  id: "3jC",
  canonicalId: "ci_3jC",
  reprints: ["set7-043"],
  cardType: "item",
  name: "Kanine Krunchies",
  i18n: {
    en: {
      name: "Kanine Krunchies",
      text: [
        {
          title: "YOU CAN BE A CHAMPION, TOO",
          description: "Your Puppy characters get +1 {W}.",
        },
      ],
    },
    de: {
      name: "Kanine Krunchies",
      text: [
        {
          title: "KRÄCKER FÜR DIE KLEINEN HUNDE",
          description: "Deine Welpen erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Kanine Krunchies",
      text: [
        {
          title: "À PLEINES DENTS",
          description: "Vos personnages Chiot gagnent +1.",
        },
      ],
    },
    it: {
      name: "Kanine Krunchies",
      text: [
        {
          title: "SE LO TRATTI CON AMORE I",
          description: "tuoi personaggi Cucciolo ricevono +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 43,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f5583cd014c542abbfcdf83fb1d2feb6",
    tcgPlayer: 618246,
  },
  text: [
    {
      title: "YOU CAN BE A CHAMPION, TOO",
      description: "Your Puppy characters get +1 {W}.",
    },
  ],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "willpower",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Puppy",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "3wn-1",
      text: "YOU CAN BE A CHAMPION, TOO Your Puppy characters get +1 {W}.",
      type: "static",
    },
  ],
};
