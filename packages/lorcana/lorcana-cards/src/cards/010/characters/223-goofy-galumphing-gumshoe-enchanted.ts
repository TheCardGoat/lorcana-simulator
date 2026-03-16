import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyGalumphingGumshoeEnchanted: CharacterCard = {
  id: "Lbk",
  canonicalId: "ci_zXO",
  reprints: ["set10-024"],
  cardType: "character",
  name: "Goofy",
  version: "Galumphing Gumshoe",
  i18n: {
    en: {
      name: "Goofy",
      version: "Galumphing Gumshoe",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "HOT PURSUIT",
          description:
            "When you play this character and whenever he quests, each opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Stolzierender Schnüffler",
      text: "Gestaltwandel 5 HITZIGE VERFOLGUNGSJAGD Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, gib allen gegnerischen Charakteren bis zu Beginn deines nächsten Zuges -1.",
    },
    fr: {
      name: "Dingo",
      version: "Détective pas très privé",
      text: "Alter 5 POURSUITE EFFRÉNÉE Lorsque vous jouez ce personnage et chaque fois qu'il est envoyé à l'aventure, chaque personnage adverse subit -1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Pippo",
      version: "Investigatore Goffo",
      text: "Trasformazione 5 INSEGUIMENTO SERRATO Quando giochi questo personaggio e ogni volta che va all'avventura, ogni personaggio avversario riceve -1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  set: "010",
  cardNumber: 223,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  strength: 5,
  willpower: 7,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_51faef6e502845188f6fee9429829df2",
    tcgPlayer: 660365,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "HOT PURSUIT",
      description:
        "When you play this character and whenever he quests, each opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1mo-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1mo-2",
      name: "HOT PURSUIT When you play this character and",
      text: "HOT PURSUIT When you play this character and whenever he quests, each opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
