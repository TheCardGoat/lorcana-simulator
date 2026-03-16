import type { CharacterCard } from "@tcg/lorcana-types";

export const chienpoImperialSoldier: CharacterCard = {
  id: "Z6w",
  canonicalId: "ci_Z6w",
  reprints: ["set4-178"],
  cardType: "character",
  name: "Chien-Po",
  version: "Imperial Soldier",
  i18n: {
    en: {
      name: "Chien-Po",
      version: "Imperial Soldier",
      text: "Bodyguard",
    },
    de: {
      name: "Chien-Po",
      version: "Soldat des Kaisers",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Chien-Po",
      version: "Soldat Impérial",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Chien-Po",
      version: "Soldato Imperiale",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 178,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 7,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_dd040ced1dd34dab9d822a6584cdc41d",
    tcgPlayer: 548194,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1m9-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
