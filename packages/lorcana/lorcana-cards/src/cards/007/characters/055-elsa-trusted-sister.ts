import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaTrustedSister: CharacterCard = {
  id: "DdM",
  canonicalId: "ci_DdM",
  reprints: ["set7-055"],
  cardType: "character",
  name: "Elsa",
  version: "Trusted Sister",
  i18n: {
    en: {
      name: "Elsa",
      version: "Trusted Sister",
      text: [
        {
          title: "WHAT DO WE DO NOW?",
          description:
            "Whenever this character quests, if you have a character named Anna in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Vertraute Schwester",
      text: [
        {
          title: "WAS TUN WIR JETZT?",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, falls du einen Anna-Charakter im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Elsa",
      version: "Sœur de confiance",
      text: [
        {
          title: "QUE FAIT-ON MAINTENANT?",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, si vous avez un personnage Anna en jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Sorella Fidata",
      text: [
        {
          title: "COSA FACCIAMO ORA?",
          description:
            "Ogni volta che questo personaggio va all'avventura, se hai in gioco un personaggio chiamato Anna, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 55,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e04382533a045eda3c48e76e9dda411",
    tcgPlayer: 619434,
  },
  text: [
    {
      title: "WHAT DO WE DO NOW?",
      description:
        "Whenever this character quests, if you have a character named Anna in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character named Anna in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "yr0-1",
      name: "WHAT DO WE DO NOW?",
      text: "WHAT DO WE DO NOW? Whenever this character quests, if you have a character named Anna in play, gain 1 lore.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
