import type { CharacterCard } from "@tcg/lorcana-types";

export const montereyJackDefiantProtector: CharacterCard = {
  id: "scr",
  canonicalId: "ci_scr",
  reprints: ["set8-188"],
  cardType: "character",
  name: "Monterey Jack",
  version: "Defiant Protector",
  i18n: {
    en: {
      name: "Monterey Jack",
      version: "Defiant Protector",
      text: "Bodyguard",
    },
    de: {
      name: "Samson",
      version: "Unbeugsamer Beschützer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Jack le Costaud",
      version: "Protecteur intraitable",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Monterey Jack",
      version: "Protettore Spavaldo",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Rescue Rangers",
  set: "008",
  cardNumber: 188,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c36fb1d14427405e9855584cc3303929",
    tcgPlayer: 631474,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1s2-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
