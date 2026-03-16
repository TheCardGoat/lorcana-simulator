import type { CharacterCard } from "@tcg/lorcana-types";

export const broadwaySturdyAndStrong: CharacterCard = {
  id: "y1f",
  canonicalId: "ci_y1f",
  reprints: ["set10-190"],
  cardType: "character",
  name: "Broadway",
  version: "Sturdy and Strong",
  i18n: {
    en: {
      name: "Broadway",
      version: "Sturdy and Strong",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Broadway",
      version: "Robust und stark",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) AM TAGE AUS STEIN Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
    },
    fr: {
      name: "Broadway",
      version: "Fort et robuste",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) STATUE LE JOUR Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
        },
      ],
    },
    it: {
      name: "Broadway",
      version: "Robusto e Forte",
      text: "Guardiano STATUE DI GIORNO Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
    },
  },
  inkType: ["steel"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 190,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_63132ee7ba1f4847a88e67273e1714fa",
    tcgPlayer: 658294,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [],
};
