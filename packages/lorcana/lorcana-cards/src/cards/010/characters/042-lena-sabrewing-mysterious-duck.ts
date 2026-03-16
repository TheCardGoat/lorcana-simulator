import type { CharacterCard } from "@tcg/lorcana-types";

export const lenaSabrewingMysteriousDuck: CharacterCard = {
  id: "9B6",
  canonicalId: "ci_9B6",
  reprints: ["set10-042"],
  cardType: "character",
  name: "Lena Sabrewing",
  version: "Mysterious Duck",
  i18n: {
    en: {
      name: "Lena Sabrewing",
      version: "Mysterious Duck",
      text: [
        {
          title: "ARCANE CONNECTION",
          description:
            "When you play this character, if you have a character or location in play with a card under them, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Lena Degenflügel",
      version: "Geheimnisvolle Ente",
      text: [
        {
          title: "ARKANE VERBINDUNG",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Charakter oder Ort mit einer Karte unter sich im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Lena de Sortilège",
      version: "Canette mystérieuse",
      text: [
        {
          title: "LIEN ARCANIQUE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage ou un lieu en jeu avec une carte sous lui, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Lena Sabrewing",
      version: "Papera Misteriosa",
      text: [
        {
          title: "CONNESSIONE ARCANA",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio o un luogo con una carta sotto di sé, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 42,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_041e41c6ea3349e6a3734dd749f9543e",
    tcgPlayer: 658457,
  },
  text: [
    {
      title: "ARCANE CONNECTION",
      description:
        "When you play this character, if you have a character or location in play with a card under them, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character or location in play with a card under them",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "ejj-1",
      name: "ARCANE CONNECTION",
      text: "ARCANE CONNECTION When you play this character, if you have a character or location in play with a card under them, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
