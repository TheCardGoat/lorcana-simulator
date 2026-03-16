import type { CharacterCard } from "@tcg/lorcana-types";

export const diabloObedientRaven: CharacterCard = {
  id: "kjK",
  canonicalId: "ci_kjK",
  reprints: ["set6-049"],
  cardType: "character",
  name: "Diablo",
  version: "Obedient Raven",
  i18n: {
    en: {
      name: "Diablo",
      version: "Obedient Raven",
      text: [
        {
          title: "FLY, MY PET!",
          description: "When this character is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Diablo",
      version: "Ergebener Rabe",
      text: [
        {
          title: "FLIEG DAHIN, MEIN LIEBLING",
          description: "Wenn dieser Charakter verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Diablo",
      version: "Corbeau docile",
      text: [
        {
          title: "VOLE, MON MIGNON!",
          description: "Lorsque ce personnage est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Diablo",
      version: "Corvo Obbediente",
      text: [
        {
          title: "VOLA, MIO DILETTO!",
          description: "Quando questo personaggio viene esiliato, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "006",
  cardNumber: 49,
  rarity: "uncommon",
  cost: 1,
  strength: 0,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1419caf47da54560bbafd279ca6cfc4b",
    tcgPlayer: 588337,
  },
  text: [
    {
      title: "FLY, MY PET!",
      description: "When this character is banished, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1vn-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      type: "action",
      text: "FLY, MY PET! When this character is banished, you may draw a card.",
    },
  ],
};
