import type { CharacterCard } from "@tcg/lorcana-types";

export const bobbyPurplePigeon: CharacterCard = {
  id: "hjd",
  canonicalId: "ci_hjd",
  reprints: ["set8-182"],
  cardType: "character",
  name: "Bobby",
  version: "Purple Pigeon",
  i18n: {
    en: {
      name: "Bobby",
      version: "Purple Pigeon",
      text: "Bodyguard",
    },
    de: {
      name: "Bobby",
      version: "Lila Taube",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Bobby le pigeon",
      version: "Pigeon violet",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Bobby",
      version: "Piccione Viola",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 182,
  rarity: "common",
  cost: 3,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_88d71cff12ab4e23940f32ab8c568af4",
    tcgPlayer: 631471,
  },
  text: "Bodyguard",
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "mbj-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
