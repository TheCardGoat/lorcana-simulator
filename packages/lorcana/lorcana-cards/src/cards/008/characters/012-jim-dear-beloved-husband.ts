import type { CharacterCard } from "@tcg/lorcana-types";

export const jimDearBelovedHusband: CharacterCard = {
  id: "3Cr",
  canonicalId: "ci_3Cr",
  reprints: ["set8-012"],
  cardType: "character",
  name: "Jim Dear",
  version: "Beloved Husband",
  i18n: {
    en: {
      name: "Jim Dear",
      version: "Beloved Husband",
      text: "Bodyguard",
    },
    de: {
      name: "Jim",
      version: "Geliebter Ehemann",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Jim Chéri",
      version: "Époux bien-aimé",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Gianni Caro",
      version: "Marito Adorato",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 12,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_18b8e544b96748dc9950322a3fcb5cf8",
    tcgPlayer: 631356,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "cft-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
