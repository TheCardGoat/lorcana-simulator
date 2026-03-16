import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarTyrannicalHypnotist: CharacterCard = {
  id: "4QY",
  canonicalId: "ci_4QY",
  reprints: ["set5-172"],
  cardType: "character",
  name: "Jafar",
  version: "Tyrannical Hypnotist",
  i18n: {
    en: {
      name: "Jafar",
      version: "Tyrannical Hypnotist",
      text: [
        {
          title: "Challenger +7",
        },
        {
          title: "INTIMIDATING GAZE",
          description: "Opposing characters with cost 4 or less can't challenge.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Tyrannischer Hypnosekünstler",
      text: "Herausfordern +7 EINSCHÜCHTERNDER BLICK Gegnerische Charaktere, die 4 oder weniger kosten, können nicht herausfordern.",
    },
    fr: {
      name: "Jafar",
      version: "Hypnotiseur tyrannique",
      text: "Offensif +7 REGARD INTIMIDANT Les personnages adverses coûtant 4 ou moins ne peuvent pas défier.",
    },
    it: {
      name: "Jafar",
      version: "Ipnotizzatore Tirannico",
      text: "Sfidante +7 SGUARDO INTIMIDATORIO I personaggi avversari con costo 4 o inferiore non possono sfidare.",
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 172,
  rarity: "legendary",
  cost: 6,
  strength: 0,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1ba7f7638b4a47d29957c8eef13099b8",
    tcgPlayer: 561328,
  },
  text: [
    {
      title: "Challenger +7",
    },
    {
      title: "INTIMIDATING GAZE",
      description: "Opposing characters with cost 4 or less can't challenge.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "xg5-1",
      keyword: "Challenger",
      text: "Challenger +7",
      type: "keyword",
      value: 7,
    },
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "xg5-2",
      text: "INTIMIDATING GAZE Opposing characters with cost 4 or less can't challenge.",
      type: "action",
    },
  ],
};
