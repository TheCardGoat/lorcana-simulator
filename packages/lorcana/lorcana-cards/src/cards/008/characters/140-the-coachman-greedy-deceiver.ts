import type { CharacterCard } from "@tcg/lorcana-types";

export const theCoachmanGreedyDeceiver: CharacterCard = {
  id: "4S2",
  canonicalId: "ci_4S2",
  reprints: ["set8-140"],
  cardType: "character",
  name: "The Coachman",
  version: "Greedy Deceiver",
  i18n: {
    en: {
      name: "The Coachman",
      version: "Greedy Deceiver",
      text: [
        {
          title: "WILD RIDE",
          description:
            "While 2 or more characters of yours are exerted, this character gets +2 {S} and gains Evasive.",
        },
      ],
    },
    de: {
      name: "Der Kutscher",
      version: "Gieriger Betrüger",
      text: [
        {
          title: "WILDER RITT",
          description:
            "Solange 2 oder mehr deiner Charaktere erschöpft sind, erhält dieser Charakter +1 und Wendig.",
        },
      ],
    },
    fr: {
      name: "Le Cocher",
      version: "Trompeur avide",
      text: [
        {
          title: "COURSE EFFRÉNÉE",
          description:
            "Tant que vous avez 2 personnages ou plus épuisés, ce personnage-ci gagne +2 et Insaisissable.",
        },
      ],
    },
    it: {
      name: "Il Cocchiere",
      version: "Avido Ingannatore",
      text: [
        {
          title: "CORSA SFRENATA",
          description:
            "Mentre 2 o più tuoi personaggi sono impegnati, questo personaggio riceve +2 e ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 140,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_be9dcbe9a9fa41a1986ff7c26818f092",
    tcgPlayer: 631441,
  },
  text: [
    {
      title: "WILD RIDE",
      description:
        "While 2 or more characters of yours are exerted, this character gets +2 {S} and gains Evasive.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        steps: [
          {
            modifier: 2,
            stat: "strength",
            target: "SELF",
            type: "modify-stat",
          },
          {
            keyword: "Evasive",
            target: "SELF",
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "1ym-1",
      text: "WILD RIDE While 2 or more characters of yours are exerted, this character gets +2 {S} and gains Evasive.",
      type: "action",
    },
  ],
};
