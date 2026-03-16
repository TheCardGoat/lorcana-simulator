import type { CharacterCard } from "@tcg/lorcana-types";

export const ratiganNefariousCriminal: CharacterCard = {
  id: "m4P",
  canonicalId: "ci_AfF",
  reprints: ["set7-143"],
  cardType: "character",
  name: "Ratigan",
  version: "Nefarious Criminal",
  i18n: {
    en: {
      name: "Ratigan",
      version: "Nefarious Criminal",
      text: [
        {
          title: "A MARVELOUS PERFORMANCE",
          description: "Whenever you play an action while this character is exerted, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Rattenzahn",
      version: "Ruchloser Verbrecher",
      text: [
        {
          title: "EINE WUNDERBARE VORSTELLUNG",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, solange dieser Charakter erschöpft ist, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Ratigan",
      version: "Criminel néfaste",
      text: [
        {
          title: "SPLENDIDE PERFORMANCE",
          description:
            "Chaque fois que vous jouez une action, si ce personnage est épuisé, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Rattigan",
      version: "Efferato Criminale",
      text: [
        {
          title: "UNA SPLENDIDA INTERPRETAZIONE",
          description:
            "Ogni volta che giochi un'azione mentre questo personaggio è impegnato, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "007",
  cardNumber: 143,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c43f19388b414266aeddb6cd78f7c020",
    tcgPlayer: 619744,
  },
  text: [
    {
      title: "A MARVELOUS PERFORMANCE",
      description: "Whenever you play an action while this character is exerted, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "8q4-1",
      name: "A MARVELOUS PERFORMANCE",
      text: "A MARVELOUS PERFORMANCE Whenever you play an action while this character is exerted, gain 1 lore.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
