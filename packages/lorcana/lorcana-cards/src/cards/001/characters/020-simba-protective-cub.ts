import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaProtectiveCub: CharacterCard = {
  id: "ibT",
  canonicalId: "ci_ibT",
  reprints: ["set1-020"],
  cardType: "character",
  name: "Simba",
  version: "Protective Cub",
  i18n: {
    en: {
      name: "Simba",
      version: "Protective Cub",
      text: "Bodyguard",
    },
    de: {
      name: "Simba",
      version: "Schützender Welpe",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "SIMBA",
      version: "Lionceau protecteur",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Protective Cub",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 20,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a3bd1e1b8b3a4ca094cefbc1d7bf4d60",
    tcgPlayer: 503356,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "rvm-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
