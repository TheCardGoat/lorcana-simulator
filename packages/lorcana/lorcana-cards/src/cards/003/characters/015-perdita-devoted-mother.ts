import type { CharacterCard } from "@tcg/lorcana-types";

export const perditaDevotedMother: CharacterCard = {
  id: "fgK",
  canonicalId: "ci_fgK",
  reprints: ["set3-015"],
  cardType: "character",
  name: "Perdita",
  version: "Devoted Mother",
  i18n: {
    en: {
      name: "Perdita",
      version: "Devoted Mother",
      text: [
        {
          title: "COME ALONG, CHILDREN",
          description:
            "When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.",
        },
      ],
    },
    de: {
      name: "Perdi",
      version: "Engagierte Mutter",
      text: [
        {
          title: "KOMMT, KINDER",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, darfst du einen Charakter von deinem Ablagestapel, der 2 oder weniger kostet, kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Perdita",
      version: "Mère dévouée",
      text: [
        {
          title: "ALLONS, LES ENFANTS À",
          description:
            "chaque fois que vous jouez ce personnage ou qu'il est envoyé à l'aventure, vous pouvez jouer gratuitement un personnage de votre défausse coûtant 2 ou moins.",
        },
      ],
    },
    it: {
      name: "Peggy",
      version: "Madre Devota",
      text: [
        {
          title: "VENITE VIA, PICCOLI",
          description:
            "Quando giochi questo personaggio e ogni volta che va all'avventura, puoi giocare gratuitamente un personaggio con costo 2 o inferiore dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 15,
  rarity: "legendary",
  cost: 6,
  strength: 1,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a1c95bf6c8744ccaa5ff363453aa8716",
    tcgPlayer: 538722,
  },
  text: [
    {
      title: "COME ALONG, CHILDREN",
      description:
        "When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          from: "discard",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1dc-1",
      text: "COME ALONG, CHILDREN When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.",
      type: "action",
    },
  ],
};
