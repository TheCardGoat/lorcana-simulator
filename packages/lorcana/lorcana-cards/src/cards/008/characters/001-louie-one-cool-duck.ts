import type { CharacterCard } from "@tcg/lorcana-types";

export const louieOneCoolDuck: CharacterCard = {
  id: "s04",
  canonicalId: "ci_s04",
  reprints: ["set8-001"],
  cardType: "character",
  name: "Louie",
  version: "One Cool Duck",
  i18n: {
    en: {
      name: "Louie",
      version: "One Cool Duck",
      text: [
        {
          title: "SPRING THE TRAP",
          description:
            "While this character is being challenged, the challenging character gets -1 {S}.",
        },
      ],
    },
    de: {
      name: "Track Duck",
      version: "Eine coole Ente",
      text: [
        {
          title: "LÖST DIE FALLE AUS",
          description:
            "Während dieser Charakter herausgefordert wird, erhält der herausfordernde Charakter -1.",
        },
      ],
    },
    fr: {
      name: "Loulou",
      version: "Canard trop cool",
      text: [
        {
          title: "DÉCLENCHER LE PIÈGE",
          description: "Tant que ce personnage est défié, le personnage le défiant subit -1.",
        },
      ],
    },
    it: {
      name: "Qua",
      version: "Papero Davvero Disinvolto",
      text: [
        {
          title: "FAR SCATTARE LA TRAPPOLA",
          description:
            "Mentre questo personaggio viene sfidato, il personaggio sfidante riceve -1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "008",
  cardNumber: 1,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3fc64a6e60ce4fcd9688de5efd25cfea",
    tcgPlayer: 633427,
  },
  text: [
    {
      title: "SPRING THE TRAP",
      description:
        "While this character is being challenged, the challenging character gets -1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1h7-1",
      text: "SPRING THE TRAP While this character is being challenged, the challenging character gets -1 {S}.",
      type: "static",
    },
  ],
};
