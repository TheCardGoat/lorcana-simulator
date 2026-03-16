import type { CharacterCard } from "@tcg/lorcana-types";

export const annaTruehearted: CharacterCard = {
  id: "0EO",
  canonicalId: "ci_0rK",
  reprints: ["set4-138", "set9-137"],
  cardType: "character",
  name: "Anna",
  version: "True-Hearted",
  i18n: {
    en: {
      name: "Anna",
      version: "True-Hearted",
      text: [
        {
          title: "LET ME HELP YOU",
          description:
            "Whenever this character quests, your other Hero characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Wahres Herz",
      text: [
        {
          title: "LASS MICH DIR HELFEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Heldinnen und Helden in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Anna",
      version: "Cœur sincère",
      text: [
        {
          title: "LAISSE-MOI T'AIDER",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages Héros gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Anna",
      version: "Cuore Puro",
      text: [
        {
          title: "LASCIA CHE TI AIUTI",
          description:
            "Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi Eroe ricevono +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 138,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a0dbcc4e038e43ee90773445e70c170c",
    tcgPlayer: 650072,
  },
  text: [
    {
      title: "LET ME HELP YOU",
      description:
        "Whenever this character quests, your other Hero characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Knight"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1qm-1",
      name: "LET ME HELP YOU",
      text: "LET ME HELP YOU Whenever this character quests, your other Hero characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
