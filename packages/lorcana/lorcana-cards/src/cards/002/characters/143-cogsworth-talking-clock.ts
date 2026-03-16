import type { CharacterCard } from "@tcg/lorcana-types";

export const cogsworthTalkingClock: CharacterCard = {
  id: "xGr",
  canonicalId: "ci_xGr",
  reprints: ["set2-143"],
  cardType: "character",
  name: "Cogsworth",
  version: "Talking Clock",
  i18n: {
    en: {
      name: "Cogsworth",
      version: "Talking Clock",
      text: [
        {
          title: "WAIT A MINUTE",
          description: 'Your characters with Reckless gain "{E} — Gain 1 lore."',
        },
      ],
    },
    de: {
      name: "Von Unruh",
      version: "Sprechende Uhr",
      text: [
        {
          title: "MOMENT MAL",
          description: 'Deine Charaktere mit Impulsiv erhalten: " — Sammle 1 Legende."',
        },
      ],
    },
    fr: {
      name: "Big Ben",
      version: "Horloge parlante",
      text: [
        {
          title: "ATTENDEZ UNE MINUTE",
          description: 'Vos personnages avec Combattant gagnent " — Gagnez 1 éclat de Lore."',
        },
      ],
    },
    it: {
      name: "Tockins",
      version: "Orologio Parlante",
      text: [
        {
          title: "VIENI QUI I",
          description: 'tuoi personaggi con Attaccabrighe ottengono " — ottieni 1 leggenda."',
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 143,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6ae3b063360244f19a8aa03334b16078",
    tcgPlayer: 517592,
  },
  text: [
    {
      title: "WAIT A MINUTE",
      description: 'Your characters with Reckless gain "{E} — Gain 1 lore."',
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "y7r-1",
      text: "WAIT A MINUTE Your characters with Reckless gain “{E} — Gain 1 lore.”",
      type: "activated",
    },
  ],
};
