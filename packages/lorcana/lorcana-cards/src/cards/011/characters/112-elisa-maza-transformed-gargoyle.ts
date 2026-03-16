import type { CharacterCard } from "@tcg/lorcana-types";

export const elisaMazaTransformedGargoyle: CharacterCard = {
  id: "HGB",
  canonicalId: "ci_HGB",
  reprints: ["set11-112"],
  cardType: "character",
  name: "Elisa Maza",
  version: "Transformed Gargoyle",
  i18n: {
    en: {
      name: "Elisa Maza",
      version: "Transformed Gargoyle",
      text: [
        {
          title: "FOREVER STRONG",
          description: "Your characters' {S} can't be reduced below their printed value.",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Elisa Maza",
      version: "Verwandelte Gargoyle",
      text: [
        {
          title: "FÜR IMMER STARK",
          description:
            "Die deiner Charaktere kann nicht unter ihren aufgedruckten Wert reduziert werden.",
        },
        {
          title: "AM TAGE AUS STEIN",
          description:
            "Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
        },
      ],
    },
    fr: {
      name: "Elisa Maza",
      version: "Transformée en gargouille",
      text: [
        {
          title: "FORTE POUR TOUJOURS",
          description:
            "La de vos personnages ne peut pas être réduite en dessous de leur valeur imprimée.",
        },
        {
          title: "STATUE LE JOUR",
          description:
            "Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
        },
      ],
    },
    it: {
      name: "Elisa Maza",
      version: "Trasformata in Gargoyle",
      text: [
        {
          title: "FORTI PER SEMPRE",
          description:
            "La dei tuoi personaggi non può essere ridotta sotto al suo valore stampato.",
        },
        {
          title: "STATUE DI GIORNO",
          description: "Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "011",
  cardNumber: 112,
  rarity: "rare",
  cost: 3,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8d6d9d233b644d8d88baf2a34751328b",
    tcgPlayer: 673350,
  },
  text: [
    {
      title: "FOREVER STRONG",
      description: "Your characters' {S} can't be reduced below their printed value.",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Gargoyle", "Detective"],
  abilities: [
    {
      id: "153-1",
      name: "FOREVER STRONG",
      text: "FOREVER STRONG Your characters' {S} can't be reduced below their printed value.",
      type: "static",
      effect: {
        type: "stat-floor",
        stat: "strength",
        minimum: "printed",
        target: "YOUR_CHARACTERS",
      },
    },
    {
      id: "153-2",
      name: "STONE BY DAY",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "static",
      condition: {
        type: "resource-count",
        what: "cards-in-hand",
        controller: "you",
        comparison: "greater-or-equal",
        value: 3,
      },
      effect: {
        type: "restriction",
        restriction: "cant-ready",
        target: "SELF",
      },
    },
  ],
};
