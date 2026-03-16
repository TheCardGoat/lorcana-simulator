import type { CharacterCard } from "@tcg/lorcana-types";

export const honkerMuddlefootTimidGenius: CharacterCard = {
  id: "3yH",
  canonicalId: "ci_3yH",
  reprints: ["set11-143"],
  cardType: "character",
  name: "Honker Muddlefoot",
  version: "Timid Genius",
  i18n: {
    en: {
      name: "Honker Muddlefoot",
      version: "Timid Genius",
      text: [
        {
          title: "BE CAREFUL!",
          description: "Your characters named Darkwing Duck gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Alfred Wirrfuß",
      version: "Schüchternes Genie",
      text: [
        {
          title: "SEID VORSICHTIG!",
          description:
            "Deine Darkwing-Duck-Charaktere erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Cuicui Bourbifoot",
      version: "Génie timide",
      text: [
        {
          title: "FAIS ATTENTION!",
          description: "Vos personnages Myster Mask gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Tonnaso Parapiglia",
      version: "Timido Genio",
      text: [
        {
          title: "STAI ATTENTO!",
        },
        {
          title: "I",
          description: "tuoi personaggi chiamati Darkwing Duck ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 143,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_864fbdcc6f91431db5a365dd2aa4dba1",
    tcgPlayer: 677136,
  },
  text: [
    {
      title: "BE CAREFUL!",
      description: "Your characters named Darkwing Duck gain Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Inventor"],
  abilities: [
    {
      id: "fcd-1",
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      type: "action",
      text: "BE CAREFUL! Your characters named Darkwing Duck gain Resist +1.",
    },
  ],
};
