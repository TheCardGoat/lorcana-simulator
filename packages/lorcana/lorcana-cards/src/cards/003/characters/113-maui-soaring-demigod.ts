import type { CharacterCard } from "@tcg/lorcana-types";

export const mauiSoaringDemigod: CharacterCard = {
  id: "IYc",
  canonicalId: "ci_IYc",
  reprints: ["set3-113"],
  cardType: "character",
  name: "Maui",
  version: "Soaring Demigod",
  i18n: {
    en: {
      name: "Maui",
      version: "Soaring Demigod",
      text: [
        {
          title: "Reckless",
        },
        {
          title: "IN MA BELLY",
          description:
            "Whenever a character of yours named HeiHei quests, this character gets +1 {L} and loses Reckless this turn.",
        },
      ],
    },
    de: {
      name: "Maui",
      version: "Aufstrebender Halbgott",
      text: "Impulsiv IN MEINEM BAUCH Jedes Mal, wenn einer deiner HeiHei-Charaktere erkundet, verliert dieser Charakter Impulsiv und erhält +1 in diesem Zug.",
    },
    fr: {
      name: "Maui",
      version: "Demi-dieu planant",
      text: "Combattant DANS MON VENTRE Chaque fois que l'un de vos personnages Heihei est envoyé à l'aventure, ce personnage gagne +1 et perd Combattant pour le reste de ce tour.",
    },
    it: {
      name: "Maui",
      version: "Semidio Alato",
      text: "Attaccabrighe NEL MIO STOMACO Ogni volta che un tuo personaggio chiamato Heihei va all'avventura, questo personaggio ottiene +1 e perde Attaccabrighe per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 3,
  strength: 5,
  willpower: 2,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_1b985f3a7a854505902294c666c69c34",
    tcgPlayer: 539090,
  },
  text: [
    {
      title: "Reckless",
    },
    {
      title: "IN MA BELLY",
      description:
        "Whenever a character of yours named HeiHei quests, this character gets +1 {L} and loses Reckless this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity"],
  missingTests: true,
  abilities: [
    {
      id: "q08-1",
      keyword: "Reckless",
      text: "Reckless",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "q08-2",
      name: "IN MA BELLY",
      text: "IN MA BELLY Whenever a character of yours named HeiHei quests, this character gets +1 {L} and loses Reckless this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
