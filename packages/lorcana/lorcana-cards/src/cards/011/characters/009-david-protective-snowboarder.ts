import type { CharacterCard } from "@tcg/lorcana-types";

export const davidProtectiveSnowboarder: CharacterCard = {
  id: "qaR",
  canonicalId: "ci_qaR",
  reprints: ["set11-009"],
  cardType: "character",
  name: "David",
  version: "Protective Snowboarder",
  i18n: {
    en: {
      name: "David",
      version: "Protective Snowboarder",
      text: "Bodyguard",
    },
    de: {
      name: "David",
      version: "Beschützender Snowboarder",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "David",
      version: "Snowboardeur protecteur",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "David",
      version: "Snowboarder Protettivo",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 9,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b5db84fe81624162968c99d1ca9ee5af",
    tcgPlayer: 674826,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1yj-1",
      keyword: "Bodyguard",
      type: "keyword",
      text: "Bodyguard",
    },
  ],
};
