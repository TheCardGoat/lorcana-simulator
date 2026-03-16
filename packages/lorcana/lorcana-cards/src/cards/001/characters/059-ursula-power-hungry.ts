import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaPowerHungry: CharacterCard = {
  id: "O7h",
  canonicalId: "ci_O7h",
  reprints: ["set1-059"],
  cardType: "character",
  name: "Ursula",
  version: "Power Hungry",
  i18n: {
    en: {
      name: "Ursula",
      version: "Power Hungry",
      text: [
        {
          title: "IT'S TOO EASY!",
          description:
            "When you play this character, each opponent loses 1 lore. You may draw a card for each 1 lore lost this way.",
        },
      ],
    },
    de: {
      name: "Ursula",
      version: "Machtgierig",
      text: [
        {
          title: "DAS IST ZU EINFACH!",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden je 1 Legende. Du darfst für jede auf diese Weise verlorene Legende 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "URSULA",
      version: "Assoiffée de pouvoir",
      text: [
        {
          title: "C'EST TROP BEAU!",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire perd 1 éclat de Lore. Vous pouvez piochez une carte par éclat de Lore perdu de cette façon.",
        },
      ],
    },
    it: {
      name: "Ursula",
      version: "Power Hungry",
      text: [
        {
          title: "IT'S TOO EASY!",
          description:
            "When you play this character, each opponent loses 1 lore. You may draw a card for each 1 lore lost this way.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 59,
  rarity: "legendary",
  cost: 7,
  strength: 2,
  willpower: 8,
  lore: 3,
  inkable: false,
  missingImplementation: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_2700ee961f214ad48e6284b2a8e864dc",
    tcgPlayer: 508755,
  },
  text: [
    {
      title: "IT'S TOO EASY!",
      description:
        "When you play this character, each opponent loses 1 lore. You may draw a card for each 1 lore lost this way.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "O7h-1",
      name: "IT'S TOO EASY!",
      text: "IT'S TOO EASY! When you play this character, each opponent loses 1 lore. You may draw a card for each 1 lore lost this way.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "lose-lore",
            amount: 1,
            target: "EACH_OPPONENT",
          },
          {
            type: "optional",
            chooser: "CONTROLLER",
            effect: {
              type: "draw",
              amount: {
                type: "for-each",
                counter: {
                  type: "lore-lost",
                },
              },
              target: "CONTROLLER",
            },
          },
        ],
      },
    },
  ],
};
