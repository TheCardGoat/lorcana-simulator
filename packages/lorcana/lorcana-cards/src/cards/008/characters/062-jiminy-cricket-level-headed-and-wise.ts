import type { CharacterCard } from "@tcg/lorcana-types";

export const jiminyCricketLevelheadedAndWise: CharacterCard = {
  id: "JE3",
  canonicalId: "ci_JE3",
  reprints: ["set8-062"],
  cardType: "character",
  name: "Jiminy Cricket",
  version: "Level-Headed and Wise",
  i18n: {
    en: {
      name: "Jiminy Cricket",
      version: "Level-Headed and Wise",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "ENOUGH'S ENOUGH",
          description:
            "While this character is exerted, opposing characters with Rush enter play exerted.",
        },
      ],
    },
    de: {
      name: "Jiminy Grille",
      version: "Besonnen und weise",
      text: "Wendig GENUG IST GENUG Solange dieser Charakter erschöpft ist, kommen gegnerische Charaktere mit Rasant erschöpft ins Spiel.",
    },
    fr: {
      name: "Jiminy Cricket",
      version: "Consciencieux et sage",
      text: "Insaisissable TROP C'EST TROP Tant que ce personnage est épuisé, les personnages adverses avec Charge entrent en jeu épuisés.",
    },
    it: {
      name: "Grillo Parlante",
      version: "Equilibrato e Saggio",
      text: "Sfuggente QUELLO CHE È TROPPO È TROPPO Mentre questo personaggio è impegnato, i personaggi avversari con Lesto entrano in gioco impegnati.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 62,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c9470722efc54fbbad1e2485e03b52c2",
    tcgPlayer: 631392,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "ENOUGH'S ENOUGH",
      description:
        "While this character is exerted, opposing characters with Rush enter play exerted.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "1i2-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "1i2-2",
      text: "ENOUGH'S ENOUGH While this character is exerted, opposing characters with Rush enter play exerted.",
      type: "static",
    },
  ],
};
