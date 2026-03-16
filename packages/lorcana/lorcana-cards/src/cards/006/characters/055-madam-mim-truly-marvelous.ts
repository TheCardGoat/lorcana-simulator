import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimTrulyMarvelous: CharacterCard = {
  id: "I6q",
  canonicalId: "ci_I6q",
  reprints: ["set6-055"],
  cardType: "character",
  name: "Madam Mim",
  version: "Truly Marvelous",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Truly Marvelous",
      text: [
        {
          title: "OH, BAT GIZZARDS 2",
          description: "{I}, Choose and discard a card — Gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Wahrlich wunderbar",
      text: [
        {
          title: "BEIM BEELZEBUB 2,",
          description: "Wähle eine Karte aus deiner Hand und wirf sie ab — Sammle 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Madame Mime",
      version: "Vraiment merveilleuse",
      text: [
        {
          title: "PAR LES CORNES DE SATAN 2,",
          description: "défaussez une carte de votre main — Gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Maga Magò",
      version: "La Più Formidabile",
      text: [
        {
          title: "OH, PESTE E CORNA! 2,",
          description: "scegli e scarta una carta — Ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "006",
  cardNumber: 55,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_997d20bbd2204f4a8cd9670598d8405c",
    tcgPlayer: 587972,
  },
  text: [
    {
      title: "OH, BAT GIZZARDS 2",
      description: "{I}, Choose and discard a card — Gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "182-1",
      text: "OH, BAT GIZZARDS 2 {I}, Choose and discard a card - Gain 1 lore.",
      type: "action",
    },
  ],
};
