import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphHerosDuty: CharacterCard = {
  id: "16Q",
  canonicalId: "ci_16Q",
  reprints: ["set7-027"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Hero's Duty",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Hero's Duty",
      text: [
        {
          title: "OUTFLANK",
          description:
            "During your turn, whenever one of your other characters is banished, this character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Hero's Duty",
      text: [
        {
          title: "ÜBERFLÜGELN",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere in deinem Zug verbannt wird, erhält dieser Charakter in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "Hero's Duty",
      text: [
        {
          title: "CONTOURNEMENT",
          description:
            "Durant votre tour, chaque fois que l'un de vos autres personnages est banni, ce personnage-ci gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "In Hero's Duty",
      text: [
        {
          title: "AGGIRARE",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi altri personaggi viene esiliato, questo personaggio riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 27,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 8,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_98cc1ff61f704e70a88362de3d5d29a7",
    tcgPlayer: 619421,
  },
  text: [
    {
      title: "OUTFLANK",
      description:
        "During your turn, whenever one of your other characters is banished, this character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1p2-1",
      name: "OUTFLANK",
      text: "OUTFLANK During your turn, whenever one of your other characters is banished, this character gets +1 {L} this turn.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
