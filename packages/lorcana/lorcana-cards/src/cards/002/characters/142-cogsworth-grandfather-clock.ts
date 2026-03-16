import type { CharacterCard } from "@tcg/lorcana-types";

export const cogsworthGrandfatherClock: CharacterCard = {
  id: "oib",
  canonicalId: "ci_oib",
  reprints: ["set2-142"],
  cardType: "character",
  name: "Cogsworth",
  version: "Grandfather Clock",
  i18n: {
    en: {
      name: "Cogsworth",
      version: "Grandfather Clock",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Ward",
        },
        {
          title: "UNWIND",
          description: "Your other characters gain Resist +1",
        },
      ],
    },
    de: {
      name: "Von Unruh",
      version: "Standuhr",
      text: "Gestaltwandel 3 Behütet ENTSCHLEUNIGEN Deine anderen Charaktere erhalten Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
    },
    fr: {
      name: "Big Ben",
      version: "Grand-père Horloge",
      text: "Alter 3 Hors d'atteinte REPOSÉ Vos autres personnages gagnent Résistance +1.",
    },
    it: {
      name: "Cogsworth",
      version: "Grandfather Clock",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Cogsworth.) Ward (Opponents can't choose this character except to challenge.) UNWIND Your other characters gain Resist +1 (Damage dealt to them is reduced by 1.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 142,
  rarity: "common",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d98a2d4cddac4630b7e3364443381093",
    tcgPlayer: 517595,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Ward",
    },
    {
      title: "UNWIND",
      description: "Your other characters gain Resist +1",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "184-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "184-2",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "184-3",
      name: "UNWIND Your other",
      text: "UNWIND Your other characters gain Resist +1",
      type: "static",
    },
  ],
};
