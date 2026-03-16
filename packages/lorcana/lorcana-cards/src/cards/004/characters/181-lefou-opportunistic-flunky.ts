import type { CharacterCard } from "@tcg/lorcana-types";

export const lefouOpportunisticFlunky: CharacterCard = {
  id: "ggW",
  canonicalId: "ci_ggW",
  reprints: ["set4-181"],
  cardType: "character",
  name: "LeFou",
  version: "Opportunistic Flunky",
  i18n: {
    en: {
      name: "LeFou",
      version: "Opportunistic Flunky",
      text: [
        {
          title: "I LEARNED FROM THE BEST",
          description:
            "During your turn, you may play this character for free if an opposing character was banished in a challenge this turn.",
        },
      ],
    },
    de: {
      name: "Le Fou",
      version: "Beeinflussbarer Lakai",
      text: [
        {
          title: "ICH HABE VOM BESTEN GELERNT",
          description:
            "In deinem Zug kannst du diesen Charakter kostenlos ausspielen, wenn ein gegnerischer Charakter in diesem Zug durch eine Herausforderung verbannt wurde.",
        },
      ],
    },
    fr: {
      name: "Le Fou",
      version: "Laquais opportuniste",
      text: [
        {
          title: "J'AI APPRIS AUPRÈS DU MEILLEUR",
          description:
            "Durant votre tour, si un personnage adverse a été banni via un défi, vous pouvez jouer ce personnage gratuitement.",
        },
      ],
    },
    it: {
      name: "Le Tont",
      version: "Lacchè Opportunista",
      text: [
        {
          title: "HO IMPARATO DAL MIGLIORE",
          description:
            "Durante il tuo turno, puoi giocare questo personaggio gratis se un personaggio avversario è stato esiliato in una sfida in questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 181,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_91f835d4527741b8b1190e6695d55698",
    tcgPlayer: 549559,
  },
  text: [
    {
      title: "I LEARNED FROM THE BEST",
      description:
        "During your turn, you may play this character for free if an opposing character was banished in a challenge this turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      condition: {
        type: "and",
        conditions: [
          {
            type: "during-turn",
            whose: "your",
          },
          {
            type: "banished-in-challenge-this-turn",
            owner: "opponent",
          },
        ],
      },
      effect: {
        amount: "full",
        type: "cost-reduction",
      },
      id: "1x0-1",
      name: "I LEARNED FROM THE BEST",
      sourceZones: ["hand"],
      text: "I LEARNED FROM THE BEST During your turn, you may play this character for free if an opposing character was banished in a challenge this turn.",
      type: "static",
    },
  ],
};
