import type { CharacterCard } from "@tcg/lorcana-types";

export const namaariMorningMist: CharacterCard = {
  id: "EAX",
  canonicalId: "ci_PU4",
  reprints: ["set2-189"],
  cardType: "character",
  name: "Namaari",
  version: "Morning Mist",
  i18n: {
    en: {
      name: "Namaari",
      version: "Morning Mist",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "BLADES",
          description: "This character can challenge ready characters.",
        },
      ],
    },
    de: {
      name: "Namaari",
      version: "Morgennebel",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) DIE KLINGE Dieser Charakter kann bereite Charaktere herausfordern.",
    },
    fr: {
      name: "Namaari",
      version: "Brume matinale",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.) LAMES Ce personnage peut défier des personnages redressés.",
        },
      ],
    },
    it: {
      name: "Namaari",
      version: "Morning Mist",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) BLADES This character can challenge ready characters.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 189,
  rarity: "legendary",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_8b02499c992945e2990cb669d7468256",
    tcgPlayer: 527798,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "BLADES",
      description: "This character can challenge ready characters.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Princess"],
  missingTests: true,
  abilities: [
    {
      id: "1dg-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        ability: "can-challenge-ready",
        target: "SELF",
        type: "grant-ability",
      },
      id: "1dg-2",
      name: "BLADES",
      text: "BLADES This character can challenge ready characters.",
      type: "static",
    },
  ],
};
