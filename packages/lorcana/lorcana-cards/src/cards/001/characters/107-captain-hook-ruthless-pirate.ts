import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookRuthlessPirate: CharacterCard = {
  id: "eM3",
  canonicalId: "ci_eM3",
  reprints: ["set1-107"],
  cardType: "character",
  name: "Captain Hook",
  version: "Ruthless Pirate",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Ruthless Pirate",
      text: [
        {
          title: "Rush",
        },
        {
          title: "YOU COWARD!",
          description:
            "While this character is exerted, opposing characters with Evasive gain Reckless. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "Skrupelloser Pirat",
      text: "Rasant DU FEIGLING! Solange dieser Charakter erschöpft ist, erhalten gegnerische Charaktere mit Wendig zusätzlich Impulsiv. (Sie können nicht erkunden und müssen herausfordern, wenn möglich.)",
    },
    fr: {
      name: "CAPITAINE CROCHET",
      version: "Pirate impitoyable",
      text: "Charge LÂCHE! Tant que ce personnage est épuisé, les personnages adverses avec Insaisissable gagnent Combattant. (Ils ne peuvent pas être envoyés à l'aventure et doivent défier à chaque tour s'ils le peuvent.)",
    },
    it: {
      name: "Captain Hook",
      version: "Ruthless Pirate",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) YOU COWARD! While this character is exerted, opposing characters with Evasive gain Reckless. (They can't quest and must challenge if able.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 107,
  rarity: "rare",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_6b3ab2c893c34e5989908e451259e1b1",
    tcgPlayer: 508624,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "YOU COWARD!",
      description:
        "While this character is exerted, opposing characters with Evasive gain Reckless. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      id: "1k7-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Reckless",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1k7-2",
      name: "YOU COWARD!",
      text: "YOU COWARD! While this character is exerted, opposing characters with Evasive gain Reckless.",
      type: "static",
    },
  ],
};
