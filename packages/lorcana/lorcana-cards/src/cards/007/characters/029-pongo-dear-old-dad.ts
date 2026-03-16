import type { CharacterCard } from "@tcg/lorcana-types";

export const pongoDearOldDad: CharacterCard = {
  id: "eBt",
  canonicalId: "ci_eBt",
  reprints: ["set7-029"],
  cardType: "character",
  name: "Pongo",
  version: "Dear Old Dad",
  i18n: {
    en: {
      name: "Pongo",
      version: "Dear Old Dad",
      text: [
        {
          title: "FOUND YOU, YOU LITTLE RASCAL",
          description:
            "At the start of your turn, look at the cards in your inkwell. You may play a Puppy character from there for free.",
        },
      ],
    },
    de: {
      name: "Pongo",
      version: "Guter alter Papa",
      text: [
        {
          title: "HAB DICH, DU KLEINER RACKER",
          description:
            "Sieh dir zu Beginn deines Zuges die Karten in deinem Tintenvorrat an. Du darfst einen Welpen daraus kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Pongo",
      version: "Bon vieux papa",
      text: [
        {
          title: "JE T'AI TROUVÉ, PETIT COQUIN",
          description:
            "Au début de votre tour, regardez les cartes dans votre réserve d'encre. Vous pouvez jouer gratuitement un personnage Chiot s'y trouvant.",
        },
      ],
    },
    it: {
      name: "Pongo",
      version: "Caro Vecchio Papà",
      text: [
        {
          title: "TI HO TROVATO, PICCOLO BIRBANTE",
          description:
            "All'inizio del tuo turno, guarda le carte nel tuo calamaio. Puoi giocare un personaggio Cucciolo da lì, gratis.",
        },
      ],
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 29,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9fbbf95f7db645ad87d4e78d12a05a96",
    tcgPlayer: 619422,
  },
  text: [
    {
      title: "FOUND YOU, YOU LITTLE RASCAL",
      description:
        "At the start of your turn, look at the cards in your inkwell. You may play a Puppy character from there for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "lmd-1",
      text: "FOUND YOU, YOU LITTLE RASCAL At the start of your turn, look at the cards in your inkwell. You may play a Puppy character from there for free.",
      type: "action",
    },
  ],
};
