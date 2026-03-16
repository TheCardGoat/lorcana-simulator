import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesBelovedHero: CharacterCard = {
  id: "sss",
  canonicalId: "ci_ZfB",
  reprints: ["set4-180", "set9-186"],
  cardType: "character",
  name: "Hercules",
  version: "Beloved Hero",
  i18n: {
    en: {
      name: "Hercules",
      version: "Beloved Hero",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Resist +1",
        },
      ],
    },
    de: {
      name: "Hercules",
      version: "Geliebter Held",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Hercule",
      version: "Héros bien-aimé",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) Résistance +1",
        },
      ],
    },
    it: {
      name: "Ercole",
      version: "Beneamato Eroe",
      text: "Guardiano Resistere +1",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 186,
  rarity: "uncommon",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_37be647e4dfe481996bdf2bad1909176",
    tcgPlayer: 650119,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Resist +1",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1wx-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "1wx-2",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
  ],
};
