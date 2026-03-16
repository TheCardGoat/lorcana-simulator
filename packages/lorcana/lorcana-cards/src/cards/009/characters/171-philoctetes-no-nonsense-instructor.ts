import type { CharacterCard } from "@tcg/lorcana-types";

export const philoctetesNononsenseInstructor: CharacterCard = {
  id: "ee3",
  canonicalId: "ci_C1p",
  reprints: ["set4-190", "set9-171"],
  cardType: "character",
  name: "Philoctetes",
  version: "No-Nonsense Instructor",
  i18n: {
    en: {
      name: "Philoctetes",
      version: "No-Nonsense Instructor",
      text: [
        {
          title: "YOU GOTTA STAY FOCUSED",
          description:
            "Your Hero characters gain Challenger +1. (They get +1 {S} while challenging.)",
        },
        {
          title: "SHAMELESS PROMOTER",
          description: "Whenever you play a Hero character, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Phil",
      version: "Kein Unsinns-Ausbilder",
      text: [
        {
          title: "DU MUSST DICH KONZENTIEREN",
          description:
            "Deine Heldinnen und Helden erhalten Herausfordern +1. (Während sie herausfordern, erhalten sie +1.)",
        },
        {
          title: "FRECHER VERKÜNDER",
          description:
            "Jedes Mal, wenn du einen Held oder eine Heldin ausspielst, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Philoctète",
      version: "Instructeur direct",
      text: [
        {
          title: "TU DOIS RESTER CONCENTRÉ",
          description:
            "Vos personnages Héros gagnent Offensif +1 (Lorsqu'ils défient, ces personnages gagnent +1.)",
        },
        {
          title: "ENTRAÎNEUR EFFRONTÉ",
          description: "Chaque fois que vous jouez un personnage Héros, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Filottete",
      version: "Istruttore Pragmatico",
      text: [
        {
          title: "DEVI RESTARE CONCENTRATO I",
          description:
            "tuoi personaggi Eroe ottengono Sfidante +1. (Ricevono +1 mentre stanno sfidando.)",
        },
        {
          title: "PROMOTORE SFACCIATO",
          description: "Ogni volta che giochi un personaggio Eroe, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 171,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f92eff31c1e24bb7802247c709840973",
    tcgPlayer: 650105,
  },
  text: [
    {
      title: "YOU GOTTA STAY FOCUSED",
      description: "Your Hero characters gain Challenger +1. (They get +1 {S} while challenging.)",
    },
    {
      title: "SHAMELESS PROMOTER",
      description: "Whenever you play a Hero character, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Challenger",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "1r4-1",
      name: "YOU GOTTA STAY FOCUSED Your Hero",
      text: "YOU GOTTA STAY FOCUSED Your Hero characters gain Challenger +1.",
      type: "static",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1r4-2",
      name: "SHAMELESS PROMOTER",
      text: "SHAMELESS PROMOTER Whenever you play a Hero character, gain 1 lore.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Hero",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
