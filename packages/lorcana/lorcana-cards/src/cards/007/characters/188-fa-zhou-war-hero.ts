import type { CharacterCard } from "@tcg/lorcana-types";

export const faZhouWarHero: CharacterCard = {
  id: "HVE",
  canonicalId: "ci_HVE",
  reprints: ["set7-188"],
  cardType: "character",
  name: "Fa Zhou",
  version: "War Hero",
  i18n: {
    en: {
      name: "Fa Zhou",
      version: "War Hero",
      text: [
        {
          title: "TRAINING EXERCISES",
          description:
            "Whenever one of your characters challenges another character, if it's the second challenge this turn, gain 3 lore.",
        },
      ],
    },
    de: {
      name: "Fa Zhou",
      version: "Kriegsheld",
      text: [
        {
          title: "ÜBUNGSAUFGABEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere einen anderen Charakter herausfordert, falls es die zweite Herausforderung in diesem Zug ist, sammelst du 3 Legenden.",
        },
      ],
    },
    fr: {
      name: "Fa Zhou",
      version: "Héros de guerre",
      text: [
        {
          title: "EXERCICES D'ENTRAÎNEMENT",
          description:
            "Chaque fois que l'un de vos personnages en défie un autre, s'il s'agit du deuxième défi de ce tour, gagnez 3 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Fa Zhou",
      version: "Eroe di Guerra",
      text: [
        {
          title: "ESERCIZI DI ADDESTRAMENTO",
          description:
            "Ogni volta che uno dei tuoi personaggi sfida un altro personaggio, se è la seconda sfida di questo turno, ottieni 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "007",
  cardNumber: 188,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7f70b64da8740e0a6cc47d0862b88e3",
    tcgPlayer: 619515,
  },
  text: [
    {
      title: "TRAINING EXERCISES",
      description:
        "Whenever one of your characters challenges another character, if it's the second challenge this turn, gain 3 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "it's the second challenge this turn",
          type: "if",
        },
        then: {
          amount: 3,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1i5-1",
      name: "TRAINING EXERCISES",
      text: "TRAINING EXERCISES Whenever one of your characters challenges another character, if it's the second challenge this turn, gain 3 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
