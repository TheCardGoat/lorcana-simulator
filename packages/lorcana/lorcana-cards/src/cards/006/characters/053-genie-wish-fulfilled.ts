import type { CharacterCard } from "@tcg/lorcana-types";

export const genieWishFulfilled: CharacterCard = {
  id: "B2Y",
  canonicalId: "ci_M3n",
  reprints: ["set6-053"],
  cardType: "character",
  name: "Genie",
  version: "Wish Fulfilled",
  i18n: {
    en: {
      name: "Genie",
      version: "Wish Fulfilled",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "WHAT HAPPENS NOW?",
          description: "When you play this character, draw a card.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Wunsch erfüllt",
      text: "Wendig WAS KOMMT JETZT? Wenn du diesen Charakter ausspielst, ziehe 1 Karte.",
    },
    fr: {
      name: "Génie",
      version: "Vœu exaucé",
      text: "Insaisissable QUE ME RÉSERVE L'AVENIR? Lorsque vous jouez ce personnage, piochez une carte.",
    },
    it: {
      name: "Genio",
      version: "Desiderio Esaudito",
      text: "Sfuggente E ORA CHE SI FA? Quando giochi questo personaggio, pesca una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 53,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9a41d700cf2749da8eed29420df7467c",
    tcgPlayer: 593007,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "WHAT HAPPENS NOW?",
      description: "When you play this character, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "n6c-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "n6c-2",
      name: "WHAT HAPPENS NOW?",
      text: "WHAT HAPPENS NOW? When you play this character, draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
