import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesTrueHero: CharacterCard = {
  id: "xYw",
  canonicalId: "ci_0p0",
  reprints: ["set1-181", "set9-191"],
  cardType: "character",
  name: "Hercules",
  version: "True Hero",
  i18n: {
    en: {
      name: "Hercules",
      version: "True Hero",
      text: "Bodyguard",
    },
    de: {
      name: "Hercules",
      version: "Wahrer Held",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "HERCULE",
      version: "Vrai héros",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Hercules",
      version: "True Hero",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 191,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2ae8a63bba494c3e842e54ec56da3021",
    tcgPlayer: 650124,
  },
  text: "Bodyguard",
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1ch-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
