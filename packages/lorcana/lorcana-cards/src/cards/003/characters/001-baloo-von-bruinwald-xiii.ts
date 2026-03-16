import type { CharacterCard } from "@tcg/lorcana-types";

export const balooVonBruinwaldXiii: CharacterCard = {
  id: "LOs",
  canonicalId: "ci_LOs",
  reprints: ["set3-001"],
  cardType: "character",
  name: "Baloo",
  version: "von Bruinwald XIII",
  i18n: {
    en: {
      name: "Baloo",
      version: "von Bruinwald XIII",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "LET'S MAKE LIKE A TREE",
          description: "When this character is banished, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Balu",
      version: "von Bruinwald XIII",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) AB DURCH DIE NASSE MITTE Wenn dieser Charakter verbannt wird, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Baloo",
      version: "von Bruinwald XIII",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.) MOI, JE ME JETTE À L'EAU Lorsque ce personnage est banni, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Baloo",
      version: "Von Bruinwald XIII",
      text: "Guardiano ALLONTANIAMOCI, SVELTI! Quando questo personaggio viene esiliato, ottieni 2 leggenda.",
    },
  },
  inkType: ["amber"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 1,
  rarity: "rare",
  cost: 3,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_2867c1fd1a954efabc42975882f5be8c",
    tcgPlayer: 539060,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "LET'S MAKE LIKE A TREE",
      description: "When this character is banished, gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      id: "owv-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "owv-2",
      name: "LET'S MAKE LIKE A TREE",
      text: "LET'S MAKE LIKE A TREE When this character is banished, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
