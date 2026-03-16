import type { ItemCard } from "@tcg/lorcana-types";

export const snowFort: ItemCard = {
  id: "o61",
  canonicalId: "ci_o61",
  reprints: ["set11-098"],
  cardType: "item",
  name: "Snow Fort",
  i18n: {
    en: {
      name: "Snow Fort",
      text: [
        {
          title: "THE HIGH GROUND",
          description: "Your characters get +1 {S}.",
        },
        {
          title: "BARRICADE",
          description: "During opponents' turns, your characters gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Schneefestung",
      text: [
        {
          title: "VORTEILHAFTE LAGE",
          description: "Deine Charaktere erhalten +1.",
        },
        {
          title: "BARRIKADE",
          description:
            "Deine Charaktere erhalten im Zug einer gegnerischen Person Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Fort de neige",
      text: [
        {
          title: "POSITION AVANTAGEUSE",
          description: "Vos personnages gagnent +1.",
        },
        {
          title: "BARRICADE",
          description: "Durant le tour de vos adversaires, vos personnages gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Fortino di Neve",
      text: [
        {
          title: "POSIZIONE DI VANTAGGIO I",
          description: "tuoi personaggi ricevono +1.",
        },
        {
          title: "BARRICATA",
          description: "Durante i turni degli avversari, i tuoi personaggi ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 98,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_626e78520f89461d8982834bdc9ac172",
    tcgPlayer: 673761,
  },
  text: [
    {
      title: "THE HIGH GROUND",
      description: "Your characters get +1 {S}.",
    },
    {
      title: "BARRICADE",
      description: "During opponents' turns, your characters gain Resist +1.",
    },
  ],
  abilities: [
    {
      id: "1bu-1",
      name: "THE HIGH GROUND",
      type: "static",
      effect: {
        type: "modify-stat",
        stat: "strength",
        modifier: 1,
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
      text: "THE HIGH GROUND Your characters get +1 {S}.",
    },
    {
      id: "1bu-2",
      name: "BARRICADE",
      type: "static",
      condition: {
        type: "during-turn",
        whose: "opponent",
      },
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 1,
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
      text: "BARRICADE During opponents' turns, your characters gain Resist +1.",
    },
  ],
};
