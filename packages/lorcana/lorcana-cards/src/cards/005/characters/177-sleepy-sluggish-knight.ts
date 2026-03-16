import type { CharacterCard } from "@tcg/lorcana-types";

export const sleepySluggishKnight: CharacterCard = {
  id: "72x",
  canonicalId: "ci_72x",
  reprints: ["set5-177"],
  cardType: "character",
  name: "Sleepy",
  version: "Sluggish Knight",
  i18n: {
    en: {
      name: "Sleepy",
      version: "Sluggish Knight",
      text: "Bodyguard",
    },
    de: {
      name: "Schlafmütz",
      version: "Ritter der Müdigkeit",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Dormeur",
      version: "Chevalier amorphe",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Pisolo",
      version: "Cavaliere Sonnolento",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 177,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4de6cdcaa4d946e5bf5f63d07f8d1b8b",
    tcgPlayer: 559664,
  },
  text: "Bodyguard",
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      id: "1k0-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
