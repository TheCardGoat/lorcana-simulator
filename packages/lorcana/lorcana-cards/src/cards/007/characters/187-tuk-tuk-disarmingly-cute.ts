import type { CharacterCard } from "@tcg/lorcana-types";

export const tukTukDisarminglyCute: CharacterCard = {
  id: "MK2",
  canonicalId: "ci_MK2",
  reprints: ["set7-187"],
  cardType: "character",
  name: "Tuk Tuk",
  version: "Disarmingly Cute",
  i18n: {
    en: {
      name: "Tuk Tuk",
      version: "Disarmingly Cute",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Resist +2",
        },
      ],
    },
    de: {
      name: "Tuktuk",
      version: "Entwaffnend niedlich",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Tuk Tuk",
      version: "Irrésistiblement mignon",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) Résistance +2",
        },
      ],
    },
    it: {
      name: "Tuk Tuk",
      version: "Bello e Disarmante",
      text: "Guardiano Resistere +2",
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "007",
  cardNumber: 187,
  rarity: "rare",
  cost: 2,
  strength: 0,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_fd63d8b5d43d49ae9441e6839bfdec37",
    tcgPlayer: 619514,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Resist +2",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1xz-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "1xz-2",
      keyword: "Resist",
      text: "Resist +2",
      type: "keyword",
      value: 2,
    },
  ],
};
