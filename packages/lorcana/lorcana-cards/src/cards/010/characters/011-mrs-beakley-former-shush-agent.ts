import type { CharacterCard } from "@tcg/lorcana-types";

export const mrsBeakleyFormerShushAgent: CharacterCard = {
  id: "13A",
  canonicalId: "ci_13A",
  reprints: ["set10-011"],
  cardType: "character",
  name: "Mrs. Beakley",
  version: "Former S.H.U.S.H. Agent",
  i18n: {
    en: {
      name: "Mrs. Beakley",
      version: "Former S.H.U.S.H. Agent",
      text: "Bodyguard",
    },
    de: {
      name: "Frieda",
      version: "Ehemalige S.H.U.S.H.-Agentin",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Mamie Baba",
      version: "Ancienne agente du C.H.U.T.",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Tata",
      version: "Ex Agente dello S.H.U.S.H.",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 11,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a935c6ef1e2c459e8f5ae49d95c044b2",
    tcgPlayer: 658441,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "16m-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
