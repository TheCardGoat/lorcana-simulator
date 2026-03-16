import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiProtectiveRooster: CharacterCard = {
  id: "xE6",
  canonicalId: "ci_xE6",
  reprints: ["set5-179"],
  cardType: "character",
  name: "HeiHei",
  version: "Protective Rooster",
  i18n: {
    en: {
      name: "HeiHei",
      version: "Protective Rooster",
      text: "Bodyguard",
    },
    de: {
      name: "HeiHei",
      version: "Schützender Hahn",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Heihei",
      version: "Coq de protection",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Heihei",
      version: "Galletto Protettivo",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "005",
  cardNumber: 179,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3c5807144992461aa42226464a5cd693",
    tcgPlayer: 561158,
  },
  text: "Bodyguard",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "9lo-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
