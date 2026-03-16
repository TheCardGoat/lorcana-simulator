import type { CharacterCard } from "@tcg/lorcana-types";

export const nalaUndauntedLioness: CharacterCard = {
  id: "XTr",
  canonicalId: "ci_XTr",
  reprints: ["set9-173"],
  cardType: "character",
  name: "Nala",
  version: "Undaunted Lioness",
  i18n: {
    en: {
      name: "Nala",
      version: "Undaunted Lioness",
      text: [
        {
          title: "DETERMINED DIVERSION",
          description: "While this character has no damage, she gets +1 {L} and gains Resist +1.",
        },
      ],
    },
    de: {
      name: "Nala",
      version: "Unerschrockene Löwin",
      text: [
        {
          title: "ENTSCHLOSSENE ABLENKUNG",
          description:
            "Solange dieser Charakter unbeschädigt ist, erhält er +1 und Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Nala",
      version: "Lionne indomptable",
      text: [
        {
          title: "DIVERSION RÉSOLUE",
          description:
            "Tant que ce personnage n'a aucun dommage sur lui, il gagne +1 et Résistance +1.",
        },
      ],
    },
    it: {
      name: "Nala",
      version: "Leonessa Indomita",
      text: [
        {
          title: "DISTRAZIONE RISOLUTA",
          description: "Mentre questo personaggio non ha danno, riceve +1 e ottiene Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 173,
  rarity: "rare",
  cost: 2,
  strength: 0,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_11287d0d009b455ba9cde545d4f98c5b",
    tcgPlayer: 650107,
  },
  text: [
    {
      title: "DETERMINED DIVERSION",
      description: "While this character has no damage, she gets +1 {L} and gains Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        steps: [
          {
            modifier: 1,
            stat: "lore",
            target: "SELF",
            type: "modify-stat",
          },
          {
            keyword: "Resist",
            target: "SELF",
            type: "gain-keyword",
            value: 1,
          },
        ],
        type: "sequence",
      },
      id: "1xs-1",
      text: "DETERMINED DIVERSION While this character has no damage, she gets +1 {L} and gains Resist +1.",
      type: "static",
    },
  ],
};
