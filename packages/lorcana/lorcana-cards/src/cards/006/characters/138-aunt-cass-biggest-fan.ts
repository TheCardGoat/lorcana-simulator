import type { CharacterCard } from "@tcg/lorcana-types";

export const auntCassBiggestFan: CharacterCard = {
  id: "zKK",
  canonicalId: "ci_zKK",
  reprints: ["set6-138"],
  cardType: "character",
  name: "Aunt Cass",
  version: "Biggest Fan",
  i18n: {
    en: {
      name: "Aunt Cass",
      version: "Biggest Fan",
      text: [
        {
          title: "HAPPY TO HELP",
          description:
            "Whenever this character quests, chosen Inventor character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Tante Cass",
      version: "Größter Fan",
      text: [
        {
          title: "ICH HELFE GERN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhält ein Erfinder deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Tante Cassie",
      version: "Plus grande fan",
      text: [
        {
          title: "HEUREUSE D'AIDER",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage Inventeur qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Zia Cass",
      version: "La Più Grande Fan",
      text: [
        {
          title: "FELICE DI AIUTARE",
          description:
            "Ogni volta che questo personaggio va all'avventura, un personaggio Inventore a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 138,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a881e85e281f4e3abe2fbf0437a5c159",
    tcgPlayer: 591989,
  },
  text: [
    {
      title: "HAPPY TO HELP",
      description:
        "Whenever this character quests, chosen Inventor character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1qq-1",
      name: "HAPPY TO HELP",
      text: "HAPPY TO HELP Whenever this character quests, chosen Inventor character gets +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
