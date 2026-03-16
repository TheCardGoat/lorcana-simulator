import type { CharacterCard } from "@tcg/lorcana-types";

export const kidaRoyalWarrior: CharacterCard = {
  id: "wgF",
  canonicalId: "ci_wgF",
  reprints: ["set3-177"],
  cardType: "character",
  name: "Kida",
  version: "Royal Warrior",
  i18n: {
    en: {
      name: "Kida",
      version: "Royal Warrior",
      text: "Bodyguard",
    },
    de: {
      name: "Kida",
      version: "Königliche Kriegerin",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Kida",
      version: "Guerrière royale",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Kida",
      version: "Guerriera Reale",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 177,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3cead19199044fd5bb448a13f2ce8189",
    tcgPlayer: 536564,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1be-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
