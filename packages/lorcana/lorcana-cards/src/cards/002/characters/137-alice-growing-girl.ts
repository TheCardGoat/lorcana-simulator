import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceGrowingGirl: CharacterCard = {
  id: "6Vx",
  canonicalId: "ci_Gej",
  reprints: ["set2-137", "set9-160"],
  cardType: "character",
  name: "Alice",
  version: "Growing Girl",
  i18n: {
    en: {
      name: "Alice",
      version: "Growing Girl",
      text: [
        {
          title: "GOOD ADVICE",
          description:
            "Your other characters gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
        {
          title: "WHAT DID I DO?",
          description: "While this character has 10 {S} or more, she gets +4 {L}.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Wachsendes Mädchen",
      text: [
        {
          title: "DAS IST EIN GUTER RAT",
          description:
            "Deine anderen Charaktere erhalten Unterstützen. (Jedes Mal, wenn die Charaktere erkunden, darfst du ihre in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
        {
          title: "WAS HAB ICH GETAN?",
          description: "Solange dieser Charakter 10 oder mehr hat, erhält er +4.",
        },
      ],
    },
    fr: {
      name: "Alice",
      version: "En pleine croissance",
      text: [
        {
          title: "JE SAIS CE QUE JE DOIS FAIRE",
          description:
            "Vos autres personnages gagnent Soutien. (Lorsqu'ils sont envoyés à l'aventure, vous pouvez ajouter leur à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
        {
          title: "QU'AI-JE FAIT?",
          description: "Tant que ce personnage a au moins 10, il gagne +4.",
        },
      ],
    },
    it: {
      name: "Alice",
      version: "Growing Girl",
      text: [
        {
          title: "GOOD ADVICE",
          description:
            "Your other characters gain Support. (Whenever they quest, you may add their to another chosen character's this turn.)",
        },
        {
          title: "WHAT DID I DO?",
          description: "While this character has 10 or more, she gets +4.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 137,
  rarity: "legendary",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8619541a52554ab3b8a32dcaf795748e",
    tcgPlayer: 647672,
  },
  text: [
    {
      title: "GOOD ADVICE",
      description:
        "Your other characters gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
    {
      title: "WHAT DID I DO?",
      description: "While this character has 10 {S} or more, she gets +4 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1ao-1",
      name: "GOOD ADVICE Your other",
      text: "GOOD ADVICE Your other characters gain Support.",
      type: "static",
    },
    {
      effect: {
        modifier: 4,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1ao-2",
      text: "WHAT DID I DO? While this character has 10 {S} or more, she gets +4 {L}.",
      type: "static",
    },
  ],
};
