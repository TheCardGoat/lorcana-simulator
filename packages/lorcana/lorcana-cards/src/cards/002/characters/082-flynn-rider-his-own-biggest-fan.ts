import type { CharacterCard } from "@tcg/lorcana-types";

export const flynnRiderHisOwnBiggestFan: CharacterCard = {
  id: "Q7q",
  canonicalId: "ci_Q7q",
  reprints: ["set2-082"],
  cardType: "character",
  name: "Flynn Rider",
  version: "His Own Biggest Fan",
  i18n: {
    en: {
      name: "Flynn Rider",
      version: "His Own Biggest Fan",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "Evasive",
        },
        {
          title: "ONE LAST, BIG SCORE",
          description: "This character gets -1 {L} for each card in your opponents' hands.",
        },
      ],
    },
    de: {
      name: "Flynn Rider",
      version: "Sein eigener größter Fan",
      text: "Gestaltwandel 2 Wendig EIN LETZTER, GROSSER COUP Dieser Charakter erhält -1 für jede Handkarte aller gegnerischen Mitspielenden.",
    },
    fr: {
      name: "Flynn Rider",
      version: "Son plus grand fan",
      text: "Alter 2 Insaisissable UN DERNIER GROS COUP Ce personnage subit -1 pour chaque carte dans les mains de vos adversaires.",
    },
    it: {
      name: "Flynn Rider",
      version: "His Own Biggest Fan",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named Flynn Rider.) Evasive (Only characters with Evasive can challenge this character.) ONE LAST, BIG SCORE This character gets -1 for each card in your opponents' hands.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "002",
  cardNumber: 82,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_ce8e3338542f433193eaf3a3737ba1c4",
    tcgPlayer: 527178,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "Evasive",
    },
    {
      title: "ONE LAST, BIG SCORE",
      description: "This character gets -1 {L} for each card in your opponents' hands.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "11r-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      id: "11r-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: {
          controller: "opponents",
          modifier: -1,
          type: "cards-in-hand",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "11r-3",
      text: "ONE LAST, BIG SCORE This character gets -1 {L} for each card in your opponents' hands.",
      type: "static",
    },
  ],
};
