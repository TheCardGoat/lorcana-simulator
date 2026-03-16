import type { CharacterCard } from "@tcg/lorcana-types";

export const cruellaDeVilPerfectlyWretched: CharacterCard = {
  id: "8wy",
  canonicalId: "ci_8wy",
  reprints: ["set2-145"],
  cardType: "character",
  name: "Cruella De Vil",
  version: "Perfectly Wretched",
  i18n: {
    en: {
      name: "Cruella De Vil",
      version: "Perfectly Wretched",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "OH, NO YOU DON'T",
          description:
            "Whenever this character quests, chosen opposing character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Cruella De Vil",
      version: "Fühlt sich elend",
      text: "Gestaltwandel 3 OH NEIN, DAS WIRST DU NICHT! Jedes Mal, wenn dieser Charakter erkundet, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -2.",
    },
    fr: {
      name: "Cruella d'Enfer",
      version: "Cruellement infecte",
      text: "Alter 3 OH NON, PAS QUESTION! Lorsque ce personnage est envoyé à l'aventure, choisissez un personnage adverse, il subit -2 pour le reste de ce tour.",
    },
    it: {
      name: "Cruella De Vil",
      version: "Perfectly Wretched",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Cruella De Vil.) OH, NO YOU DON'T Whenever this character quests, chosen opposing character gets -2 this turn.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "002",
  cardNumber: 145,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1676a1863764440991d68270eaf35bcd",
    tcgPlayer: 526869,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "OH, NO YOU DON'T",
      description:
        "Whenever this character quests, chosen opposing character gets -2 {S} this turn.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1l6-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: "CHOSEN_OPPOSING_CHARACTER",
        type: "modify-stat",
      },
      id: "1l6-2",
      name: "OH, NO YOU DON'T",
      text: "OH, NO YOU DON'T Whenever this character quests, chosen opposing character gets -2 {S} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
