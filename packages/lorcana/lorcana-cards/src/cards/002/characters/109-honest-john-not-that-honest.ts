import type { CharacterCard } from "@tcg/lorcana-types";

export const honestJohnNotThatHonest: CharacterCard = {
  id: "3zO",
  canonicalId: "ci_3zO",
  reprints: ["set2-109"],
  cardType: "character",
  name: "Honest John",
  version: "Not That Honest",
  i18n: {
    en: {
      name: "Honest John",
      version: "Not That Honest",
      text: [
        {
          title: "EASY STREET",
          description: "Whenever you play a Floodborn character, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Ehrenwerter John",
      version: "Nicht sehr ehrenwert",
      text: [
        {
          title: "GEMACHTE LEUTE",
          description:
            "Jedes Mal, wenn du eine Flutgestalt ausspielst, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Grand Coquin",
      version: "Porte bien son nom",
      text: [
        {
          title: "LA BELLE VIE",
          description:
            "Chaque fois que vous jouez un personnage Floodborn, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Honest John",
      version: "Not That Honest",
      text: [
        {
          title: "EASY STREET",
          description: "Whenever you play a Floodborn character, each opponent loses 1 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Pinocchio",
  set: "002",
  cardNumber: 109,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_834655aa7bc54dd0b1bdf69ce343359d",
    tcgPlayer: 527275,
  },
  text: [
    {
      title: "EASY STREET",
      description: "Whenever you play a Floodborn character, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "1de-1",
      name: "EASY STREET",
      text: "EASY STREET Whenever you play a Floodborn character, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
