import type { CharacterCard } from "@tcg/lorcana-types";

export const helgaSinclairToughAsNails: CharacterCard = {
  id: "lpp",
  canonicalId: "ci_lpp",
  reprints: ["set7-183"],
  cardType: "character",
  name: "Helga Sinclair",
  version: "Tough as Nails",
  i18n: {
    en: {
      name: "Helga Sinclair",
      version: "Tough as Nails",
      text: [
        {
          title: "Challenger +3 (While challenging, this character gets +3 {S}).",
        },
        {
          title: "QUICK REFLEXES",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Helga Sinclair",
      version: "Knallhart",
      text: "Herausfordern +3 SCHNELLE REFLEXE In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
    },
    fr: {
      name: "Helga Sinclair",
      version: "Dure à cuire",
      text: "Offensif +3 BONS RÉFLEXES Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
    },
    it: {
      name: "Helga Sinclair",
      version: "Dura Come la Roccia",
      text: "Sfidante +3 RIFLESSI FULMINEI Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
    },
  },
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ba65ec4007544e7ba265690e8e823312",
    tcgPlayer: 619511,
  },
  text: [
    {
      title: "Challenger +3 (While challenging, this character gets +3 {S}).",
    },
    {
      title: "QUICK REFLEXES",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1ld-1",
      keyword: "Challenger",
      text: "Challenger +3.",
      type: "keyword",
      value: 3,
    },
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1ld-2",
      text: "QUICK REFLEXES During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
