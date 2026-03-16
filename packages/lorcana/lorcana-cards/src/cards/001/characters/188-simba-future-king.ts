import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaFutureKing: CharacterCard = {
  id: "dTm",
  canonicalId: "ci_dTm",
  reprints: ["set1-188"],
  cardType: "character",
  name: "Simba",
  version: "Future King",
  i18n: {
    en: {
      name: "Simba",
      version: "Future King",
      text: [
        {
          title: "GUESS WHAT?",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Zukünftiger König",
      text: [
        {
          title: "WEISST DU WAS?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "SIMBA",
      version: "Futur roi",
      text: [
        {
          title: "TU SAIS QUOI?",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez piocher une carte puis en défaussez une.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Future King",
      text: [
        {
          title: "GUESS WHAT?",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 188,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_9f35462bf6cc430f89c193d85507ea73",
    tcgPlayer: 502536,
  },
  text: [
    {
      title: "GUESS WHAT?",
      description:
        "When you play this character, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "q21-1",
      name: "GUESS WHAT?",
      text: "GUESS WHAT? When you play this character, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
