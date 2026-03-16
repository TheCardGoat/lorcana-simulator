import type { CharacterCard } from "@tcg/lorcana-types";

export const rajahDevotedProtector: CharacterCard = {
  id: "hab",
  canonicalId: "ci_hab",
  reprints: ["set10-006"],
  cardType: "character",
  name: "Rajah",
  version: "Devoted Protector",
  i18n: {
    en: {
      name: "Rajah",
      version: "Devoted Protector",
      text: "Bodyguard",
    },
    de: {
      name: "Radsha",
      version: "Engagierter Beschützer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Rajah",
      version: "Protecteur dévoué",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Rajah",
      version: "Protettore Devoto",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Aladdin",
  set: "010",
  cardNumber: 6,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_aa590039809f41f6b67c833b1fba999c",
    tcgPlayer: 659444,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1gk-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
