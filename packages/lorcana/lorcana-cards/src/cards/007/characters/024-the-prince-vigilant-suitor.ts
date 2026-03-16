import type { CharacterCard } from "@tcg/lorcana-types";

export const thePrinceVigilantSuitor: CharacterCard = {
  id: "cGm",
  canonicalId: "ci_cGm",
  reprints: ["set7-024"],
  cardType: "character",
  name: "The Prince",
  version: "Vigilant Suitor",
  i18n: {
    en: {
      name: "The Prince",
      version: "Vigilant Suitor",
      text: "Bodyguard",
    },
    de: {
      name: "Der Prinz",
      version: "Wachsamer Verehrer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Le Prince",
      version: "Prétendant vigilant",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Il Principe",
      version: "Pretendente all'Erta",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "007",
  cardNumber: 24,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a661b0191f2d40ef8622c751bee7c0c5",
    tcgPlayer: 619419,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "ot0-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
