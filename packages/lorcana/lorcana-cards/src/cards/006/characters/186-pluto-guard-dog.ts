import type { CharacterCard } from "@tcg/lorcana-types";

export const plutoGuardDog: CharacterCard = {
  id: "mEY",
  canonicalId: "ci_mEY",
  reprints: ["set6-186"],
  cardType: "character",
  name: "Pluto",
  version: "Guard Dog",
  i18n: {
    en: {
      name: "Pluto",
      version: "Guard Dog",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "BRAVO",
          description: "While this character has no damage, he gets +4 {S}.",
        },
      ],
    },
    de: {
      name: "Pluto",
      version: "Wachhund",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) GUTER JUNGE Solange dieser Charakter unbeschädigt ist, erhält er +4.",
    },
    fr: {
      name: "Pluto",
      version: "Chien de garde",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) BON CHIEN Tant que ce personnage n'a aucun dommage sur lui, il gagne +4.",
        },
      ],
    },
    it: {
      name: "Pluto",
      version: "Cane da Guardia",
      text: "Guardiano BRAVO Mentre questo personaggio non ha danno, riceve +4.",
    },
  },
  inkType: ["steel"],
  set: "006",
  cardNumber: 186,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0b42ad3a223046c0a3807f04c58a552e",
    tcgPlayer: 593037,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "BRAVO",
      description: "While this character has no damage, he gets +4 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "173-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        modifier: 4,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "173-2",
      text: "BRAVO While this character has no damage, he gets +4 {S}.",
      type: "static",
    },
  ],
};
