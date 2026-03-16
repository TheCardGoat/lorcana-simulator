import type { CharacterCard } from "@tcg/lorcana-types";

export const antoniosJaguarFaithfulCompanion: CharacterCard = {
  id: "tDk",
  canonicalId: "ci_tDk",
  reprints: ["set8-031"],
  cardType: "character",
  name: "Antonio's Jaguar",
  version: "Faithful Companion",
  i18n: {
    en: {
      name: "Antonio's Jaguar",
      version: "Faithful Companion",
      text: [
        {
          title: "YOU WANT TO GO WHERE?",
          description:
            "When you play this character, if you have a character named Antonio Madrigal in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Antonios Jaguar",
      version: "Treuer Gefährte",
      text: [
        {
          title: "WOHIN WILLST DU GEHEN?",
          description:
            "Wenn du diesen Charakter ausspielst und einen Antonio-Madrigal-Charakter im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Jaguar d’Antonio",
      version: "Fidèle compagnon",
      text: [
        {
          title: "TU VEUX ALLER OÙ!?",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage nommé Antonio Madrigal en jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Giaguaro di Antonio",
      version: "Compagno Fedele",
      text: [
        {
          title: "DOV'È CHE VUOI ANDARE?",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Antonio Madrigal, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 31,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5aeba01760c3494cae9eb6629dfdb1de",
    tcgPlayer: 631344,
  },
  text: [
    {
      title: "YOU WANT TO GO WHERE?",
      description:
        "When you play this character, if you have a character named Antonio Madrigal in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character named Antonio Madrigal in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "c5s-1",
      name: "YOU WANT TO GO WHERE?",
      text: "YOU WANT TO GO WHERE? When you play this character, if you have a character named Antonio Madrigal in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
