import type { CharacterCard } from "@tcg/lorcana-types";

export const annaMysticalMajesty: CharacterCard = {
  id: "JaG",
  canonicalId: "ci_JaG",
  reprints: ["set5-046"],
  cardType: "character",
  name: "Anna",
  version: "Mystical Majesty",
  i18n: {
    en: {
      name: "Anna",
      version: "Mystical Majesty",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "EXCEPTIONAL POWER",
          description: "When you play this character, exert all opposing characters.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Geheimnisvolle Majestät",
      text: "Gestaltwandel 4 BESONDERE MACHT Wenn du diesen Charakter ausspielst, erschöpfe alle gegnerischen Charaktere.",
    },
    fr: {
      name: "Anna",
      version: "Majesté mystique",
      text: "Alter 4 POUVOIR EXCEPTIONNEL Lorsque vous jouez ce personnage, épuisez tous les personnages adverses.",
    },
    it: {
      name: "Anna",
      version: "Maestà Mistica",
      text: "Trasformazione 4 POTERE ECCEZIONALE Quando giochi questo personaggio, impegna tutti i personaggi avversari.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 46,
  rarity: "rare",
  cost: 7,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_2254457f8600435abc8520521283f8ff",
    tcgPlayer: 561952,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "EXCEPTIONAL POWER",
      description: "When you play this character, exert all opposing characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "iok-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "iok-2",
      name: "EXCEPTIONAL POWER",
      text: "EXCEPTIONAL POWER When you play this character, exert all opposing characters.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
