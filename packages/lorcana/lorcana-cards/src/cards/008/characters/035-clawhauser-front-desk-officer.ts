import type { CharacterCard } from "@tcg/lorcana-types";

export const clawhauserFrontDeskOfficer: CharacterCard = {
  id: "q40",
  canonicalId: "ci_9eu",
  reprints: ["set8-035"],
  cardType: "character",
  name: "Clawhauser",
  version: "Front Desk Officer",
  i18n: {
    en: {
      name: "Clawhauser",
      version: "Front Desk Officer",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Singer 4",
        },
      ],
    },
    de: {
      name: "Clawhauser",
      version: "Empfangsoffizier",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Singen 4 (Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
    },
    fr: {
      name: "Clawhauser",
      version: "Agent d'accueil",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
        },
      ],
    },
    it: {
      name: "Clawhauser",
      version: "Ufficiale dell'Accettazione",
      text: "Guardiano Melodioso 4",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "008",
  cardNumber: 35,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1727b81007044782bc9c1df26820e7e1",
    tcgPlayer: 631375,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Singer 4",
    },
  ],
  classifications: ["Storyborn", "Ally", "Detective"],
  abilities: [
    {
      id: "1u1-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "1u1-2",
      keyword: "Singer",
      text: "Singer 4",
      type: "keyword",
      value: 4,
    },
  ],
};
