import type { CharacterCard } from "@tcg/lorcana-types";

export const shereKhanMenacingPredator: CharacterCard = {
  id: "wAd",
  canonicalId: "ci_68m",
  reprints: ["set2-126", "set9-104"],
  cardType: "character",
  name: "Shere Khan",
  version: "Menacing Predator",
  i18n: {
    en: {
      name: "Shere Khan",
      version: "Menacing Predator",
      text: [
        {
          title: "DON'T INSULT MY INTELLIGENCE",
          description: "Whenever one of your characters challenges another character, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Shir Khan",
      version: "Bedrohliches Raubtier",
      text: [
        {
          title: "BELEIDIGE NICHT MEINE INTELLIGENZ",
          description:
            "Jedes Mal, wenn einer deiner Charaktere einen anderen Charakter herausfordert, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Shere Khan",
      version: "Prédateur menaçant",
      text: [
        {
          title: "N'INSULTE PAS MON INTELLIGENCE",
          description:
            "Chaque fois que l'un de vos personnages en défie un autre, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Shere Khan",
      version: "Menacing Predator",
      text: [
        {
          title: "DON'T INSULT MY INTELLIGENCE",
          description: "Whenever one of your characters challenges another character, gain 1 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Jungle Book",
  set: "009",
  cardNumber: 104,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4245d44a1e8344e1878acd9002b813e0",
    tcgPlayer: 650042,
  },
  text: [
    {
      title: "DON'T INSULT MY INTELLIGENCE",
      description: "Whenever one of your characters challenges another character, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1nj-1",
      name: "DON'T INSULT MY INTELLIGENCE",
      text: "DON'T INSULT MY INTELLIGENCE Whenever one of your characters challenges another character, gain 1 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
