import type { CharacterCard } from "@tcg/lorcana-types";

export const honeyLemonChemistryWhiz: CharacterCard = {
  id: "20p",
  canonicalId: "ci_20p",
  reprints: ["set7-169"],
  cardType: "character",
  name: "Honey Lemon",
  version: "Chemistry Whiz",
  i18n: {
    en: {
      name: "Honey Lemon",
      version: "Chemistry Whiz",
      text: [
        {
          title: "PRETTY GREAT, HUH?",
          description:
            "Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Honey Lemon",
      version: "Chemikerin",
      text: [
        {
          title: "ZIEMLICH COOL, HÄ?",
          description:
            "Jedes Mal, wenn du mithilfe von Gestaltwandel eine Flutgestalt ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Honey Lemon",
      version: "Magicienne de la chimie",
      text: [
        {
          title: "MERVEILLEUX, NON?",
          description:
            "Chaque fois que vous jouez un personnage Floodborn en utilisant sa capacité Alter, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Honey Lemon",
      version: "Maga della Chimica",
      text: [
        {
          title: "È INCREDIBILE, EH?",
          description:
            "Ogni volta che giochi un personaggio Imbevuto, se hai usato Trasformazione per giocarlo, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 169,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_78044308d04647f5ac60546f4d320292",
    tcgPlayer: 619503,
  },
  text: [
    {
      title: "PRETTY GREAT, HUH?",
      description:
        "Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        condition: {
          type: "play-context",
          context: "used-shift",
        },
        then: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "conditional",
      },
      id: "1q1-1",
      text: "PRETTY GREAT, HUH? Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.",
      type: "action",
    },
  ],
};
