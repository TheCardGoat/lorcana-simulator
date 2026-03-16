import type { CharacterCard } from "@tcg/lorcana-types";

export const elisaMazaIntrepidInvestigator: CharacterCard = {
  id: "vxM",
  canonicalId: "ci_vxM",
  reprints: ["set10-122"],
  cardType: "character",
  name: "Elisa Maza",
  version: "Intrepid Investigator",
  i18n: {
    en: {
      name: "Elisa Maza",
      version: "Intrepid Investigator",
      text: [
        {
          title: "SPECIAL DETAIL",
          description:
            "While you have 2 or more other characters in play with 5 {S} or more, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Elisa Maza",
      version: "Unerschrockene Ermittlerin",
      text: [
        {
          title: "BESONDERES DETAIL",
          description:
            "Solange du mindestens 2 weitere Charaktere mit 5 oder mehr im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Elisa Maza",
      version: "Investigatrice intrépide",
      text: [
        {
          title: "UNITÉ SPÉCIALE",
          description:
            "Tant que vous avez 2 autres personnages ou plus ayant 5 ou plus, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Elisa Maza",
      version: "Investigatrice Intrepida",
      text: [
        {
          title: "INCARICO SPECIALE",
          description:
            "Mentre hai in gioco 2 o più altri personaggi con 5 o superiore, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 122,
  rarity: "rare",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_78d6ec7c65b746efaec6c74337bdb84d",
    tcgPlayer: 658293,
  },
  text: [
    {
      title: "SPECIAL DETAIL",
      description:
        "While you have 2 or more other characters in play with 5 {S} or more, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "65o-1",
      text: "SPECIAL DETAIL While you have 2 or more other characters in play with 5 {S} or more, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
