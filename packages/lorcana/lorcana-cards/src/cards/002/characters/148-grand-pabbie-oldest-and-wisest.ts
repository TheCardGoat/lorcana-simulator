import type { CharacterCard } from "@tcg/lorcana-types";

export const grandPabbieOldestAndWisest: CharacterCard = {
  id: "iZk",
  canonicalId: "ci_KJO",
  reprints: ["set2-148", "set9-150"],
  cardType: "character",
  name: "Grand Pabbie",
  version: "Oldest and Wisest",
  i18n: {
    en: {
      name: "Grand Pabbie",
      version: "Oldest and Wisest",
      text: [
        {
          title: "ANCIENT INSIGHT",
          description:
            "Whenever you remove 1 or more damage from one of your characters, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Grand Pabbie",
      version: "Ältester und Weisester",
      text: [
        {
          title: "ALTE WEISHEIT",
          description:
            "Jedes Mal, wenn du 1 oder mehr Schaden von einem deiner Charaktere entfernst, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Grand Pabbie",
      version: "Le plus vieux et le plus sage",
      text: [
        {
          title: "SAVOIR ANCIEN",
          description:
            "Chaque fois que vous retirez au moins 1 jeton Dommage de l'un de vos personnages, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Grand Pabbie",
      version: "Oldest and Wisest",
      text: [
        {
          title: "ANCIENT INSIGHT",
          description:
            "Whenever you remove 1 or more damage from one of your characters, gain 2 lore.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "002",
  cardNumber: 148,
  rarity: "common",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_fded826f4af24bb7aac039d15848173e",
    tcgPlayer: 650085,
  },
  text: [
    {
      title: "ANCIENT INSIGHT",
      description: "Whenever you remove 1 or more damage from one of your characters, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "qlg-1",
      name: "ANCIENT INSIGHT",
      text: "ANCIENT INSIGHT Whenever you remove 1 or more damage from one of your characters, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
