import type { CharacterCard } from "@tcg/lorcana-types";

export const balooFriendAndGuardian: CharacterCard = {
  id: "T1d",
  canonicalId: "ci_T1d",
  reprints: ["set10-001"],
  cardType: "character",
  name: "Baloo",
  version: "Friend and Guardian",
  i18n: {
    en: {
      name: "Baloo",
      version: "Friend and Guardian",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Support",
        },
      ],
    },
    de: {
      name: "Balu",
      version: "Freund und Beschützer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Baloo",
      version: "Ami et gardien",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) Soutien",
        },
      ],
    },
    it: {
      name: "Baloo",
      version: "Amico e Guardiano",
      text: "Guardiano Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 1,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9149ad820976479daad901fbd5bb1679",
    tcgPlayer: 659178,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Support",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "qnc-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "qnc-2",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
  ],
};
