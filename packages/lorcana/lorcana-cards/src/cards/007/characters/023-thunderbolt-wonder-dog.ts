import type { CharacterCard } from "@tcg/lorcana-types";

export const thunderboltWonderDog: CharacterCard = {
  id: "xjz",
  canonicalId: "ci_xjz",
  reprints: ["set7-023"],
  cardType: "character",
  name: "Thunderbolt",
  version: "Wonder Dog",
  i18n: {
    en: {
      name: "Thunderbolt",
      version: "Wonder Dog",
      text: [
        {
          title: "Puppy Shift 3",
          description: "(You may pay 3 {I} to play this on top of one of your Puppy characters.)",
        },
        {
          title: "Bodyguard",
        },
      ],
    },
    de: {
      name: "Thunderbolt",
      version: "Wunderhund",
      text: "Welpen-Gestaltwandel 3 Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Ouragan",
      version: "Chien prodigieux",
      text: "Alter de Chiot 3 Rempart (Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
    },
    it: {
      name: "Fulmine",
      version: "Cane Prodigio",
      text: [
        {
          title: "Trasformazione Cucciolo 3",
          description:
            "(Puoi pagare 3 per giocare questa carta sopra a uno dei tuoi personaggi Cucciolo.) Guardiano",
        },
      ],
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 23,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5a0a0d8b44824cf3b19fd61fc940df4a",
    tcgPlayer: 619418,
  },
  text: [
    {
      title: "Puppy Shift 3",
      description: "(You may pay 3 {I} to play this on top of one of your Puppy characters.)",
    },
    {
      title: "Bodyguard",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "18d-1",
      keyword: "Shift",
      text: "Puppy Shift 3",
      type: "keyword",
    },
    {
      id: "18d-2",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
