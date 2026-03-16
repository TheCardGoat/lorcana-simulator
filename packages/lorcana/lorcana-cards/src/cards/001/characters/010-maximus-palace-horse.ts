import type { CharacterCard } from "@tcg/lorcana-types";

export const maximusPalaceHorse: CharacterCard = {
  id: "A1E",
  canonicalId: "ci_A1E",
  reprints: ["set1-010"],
  cardType: "character",
  name: "Maximus",
  version: "Palace Horse",
  i18n: {
    en: {
      name: "Maximus",
      version: "Palace Horse",
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
      name: "Maximus",
      version: "Schloss-Pferd",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "MAXIMUS",
      version: "Cheval du palais",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir un de vos personnages avec Rempart.) Soutien",
        },
      ],
    },
    it: {
      name: "Maximus",
      version: "Palace Horse",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) Support (Whenever this character quests, you may add their to another chosen character's this turn.)",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 10,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_1d41bcb819ef4f12b40b5aab332e0c4c",
    tcgPlayer: 506837,
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
      id: "174-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "174-2",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
  ],
};
