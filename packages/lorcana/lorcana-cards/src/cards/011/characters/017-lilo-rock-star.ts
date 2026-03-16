import type { CharacterCard } from "@tcg/lorcana-types";

export const liloRockStar: CharacterCard = {
  id: "oO4",
  canonicalId: "ci_2am",
  reprints: ["set11-017"],
  cardType: "character",
  name: "Lilo",
  version: "Rock Star",
  i18n: {
    en: {
      name: "Lilo",
      version: "Rock Star",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "I'LL COUNT YOU IN",
          description:
            "Whenever this character quests, you may play a character with cost 2 or less from your discard for free.",
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Rockstar",
      text: "Gestaltwandel 4 ICH ZÄHLE AUF DICH Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Charakter von deinem Ablagestapel, der 2 oder weniger kostet, kostenlos ausspielen.",
    },
    fr: {
      name: "Lilo",
      version: "Rock Star",
      text: "Alter 4 JE TE COMPTE PARMI NOUS Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez jouer gratuitement un personnage coûtant 2 ou moins de votre défausse.",
    },
    it: {
      name: "Lilo",
      version: "Rock Star",
      text: "Trasformazione 4 TI CONTO Ogni volta che questo personaggio va all'avventura, puoi giocare un personaggio con costo 2 o inferiore dai tuoi scarti, gratis.",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 17,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_41acb92e0c494214949c72c409593b50",
    tcgPlayer: 677158,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "I'LL COUNT YOU IN",
      description:
        "Whenever this character quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "11h-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
    {
      id: "11h-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "discard",
          type: "play-card",
          cost: "free",
        },
        type: "optional",
      },
      type: "action",
      text: "I’LL COUNT YOU IN Whenever this character quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
};
