import type { CharacterCard } from "@tcg/lorcana-types";

export const judyHoppsLeadDetective: CharacterCard = {
  id: "7DY",
  canonicalId: "ci_04m",
  reprints: ["set10-150"],
  cardType: "character",
  name: "Judy Hopps",
  version: "Lead Detective",
  i18n: {
    en: {
      name: "Judy Hopps",
      version: "Lead Detective",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "LATERAL THINKING",
          description:
            "During your turn, your Detective characters gain Alert and Resist +2. (They can challenge as if they had Evasive. Damage dealt to them is reduced by 2.)",
        },
      ],
    },
    de: {
      name: "Judy Hopps",
      version: "Hauptkommissarin",
      text: "Gestaltwandel 4 LATERALES DENKEN In deinem Zug erhalten deine Detektive Alarmiert und Robust +2. (Sie können herausfordern, als hätten sie Wendig. Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 2.)",
    },
    fr: {
      name: "Judy Hopps",
      version: "Détective en charge",
      text: "Alter 4 PENSÉE LATÉRALE Durant votre tour, vos personnages Détective gagnent Agilité et Résistance +2.",
    },
    it: {
      name: "Judy Hopps",
      version: "Capo Detective",
      text: "Trasformazione 4 PENSIERO LATERALE Durante il tuo turno, i tuoi personaggi Detective ottengono Vigile e Resistere +2.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 150,
  rarity: "rare",
  cost: 6,
  strength: 6,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5413c96876fd4884861caaef3fcb58b5",
    tcgPlayer: 660043,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "LATERAL THINKING",
      description:
        "During your turn, your Detective characters gain Alert and Resist +2. (They can challenge as if they had Evasive. Damage dealt to them is reduced by 2.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1c8-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Alert",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1c8-2",
      text: "LATERAL THINKING During your turn, your Detective characters gain Alert and Resist +2.",
      type: "static",
    },
  ],
};
