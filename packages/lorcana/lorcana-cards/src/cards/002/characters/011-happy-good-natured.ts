import type { CharacterCard } from "@tcg/lorcana-types";

export const happyGoodnatured: CharacterCard = {
  id: "Rek",
  canonicalId: "ci_Rek",
  reprints: ["set2-011"],
  cardType: "character",
  name: "Happy",
  version: "Good-Natured",
  i18n: {
    en: {
      name: "Happy",
      version: "Good-Natured",
      text: [
        {
          title: "Support",
          description:
            "(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)",
        },
        {
          title: "DIG, DIG, DIG",
          description:
            "While you have another Seven Dwarfs character in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Happy",
      version: "Gutmütig",
      text: [
        {
          title: "Unterstützen",
          description:
            "(Jedes Mal, wenn dieser Charakter erkundet, darfst du seine {S} in diesem Zug zur {S} eines anderen Charakters deiner Wahl addieren.)",
        },
        {
          title: "HEY HO, HEY HO",
          description:
            "Dieser Charakter erhält +1 {L}, solange du mindestens einen weiteren der Sieben Zwerge im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "Joyeux",
      version: "De nature joviale",
      text: [
        {
          title: "Soutien",
          description:
            "(Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez ajouter sa {S} à celle d'un autre personnage de votre choix pour le reste du tour.)",
        },
        {
          title: "PIOCHE, PIOCHE, PIOCHE",
          description:
            "Ce personnage gagne +1 {L} si vous avez un autre personnage Sept Nains en jeu.",
        },
      ],
    },
    it: {
      name: "Happy",
      version: "Good-Natured",
      text: [
        {
          title: "Support",
          description:
            "(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)",
        },
        {
          title: "DIG, DIG, DIG",
          description:
            "While you have another Seven Dwarfs character in play, this character gets +1 {L}.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 11,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7bea75aa713d410a9be82d9e82ace333",
    tcgPlayer: 526383,
  },
  text: [
    {
      title: "Support",
      description:
        "(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)",
    },
    {
      title: "DIG, DIG, DIG",
      description:
        "While you have another Seven Dwarfs character in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  abilities: [
    {
      id: "det-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
    {
      type: "static",
      effect: {
        type: "modify-stat",
        stat: "lore",
        modifier: 1,
        target: "SELF",
      },
      condition: {
        type: "has-character-count",
        classification: "Seven Dwarfs",
        controller: "you",
        count: 2,
        comparison: "greater-or-equal",
      },
      id: "dig-1",
      name: "DIG, DIG, DIG",
      text: "DIG, DIG, DIG While you have another Seven Dwarfs character in play, this character gets +1 {L}.",
    },
  ],
};
