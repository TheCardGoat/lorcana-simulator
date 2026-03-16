import type { CharacterCard } from "@tcg/lorcana-types";

export const bruniFireSalamander: CharacterCard = {
  id: "K4I",
  canonicalId: "ci_K4I",
  reprints: ["set5-040"],
  cardType: "character",
  name: "Bruni",
  version: "Fire Salamander",
  i18n: {
    en: {
      name: "Bruni",
      version: "Fire Salamander",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "PARTING GIFT",
          description: "When this character is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Bruni",
      version: "Feuersalamander",
      text: "Wendig ABSCHIEDSGESCHENK Wenn dieser Charakter verbannt wird, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Bruni",
      version: "Salamandre de feu",
      text: "Insaisissable UN CADEAU AU PASSAGE Lorsque ce personnage est banni, vous pouvez piocher une carte.",
    },
    it: {
      name: "Bruni",
      version: "Salamandra del Fuoco",
      text: "Sfuggente DONO DI ADDIO Quando questo personaggio viene esiliato, puoi pescare una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 40,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c1cb807b384241ea876b8b2d52b1bc46",
    tcgPlayer: 555244,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "PARTING GIFT",
      description: "When this character is banished, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "29y-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "29y-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "PARTING GIFT",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "PARTING GIFT When this character is banished, you may draw a card.",
    },
  ],
};
