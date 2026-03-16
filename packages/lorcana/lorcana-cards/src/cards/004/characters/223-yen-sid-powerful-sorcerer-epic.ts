import type { CharacterCard } from "@tcg/lorcana-types";

export const yenSidPowerfulSorcererEpic: CharacterCard = {
  id: "RiX",
  canonicalId: "ci_iNw",
  reprints: ["set4-059"],
  cardType: "character",
  name: "Yen Sid",
  version: "Powerful Sorcerer",
  i18n: {
    en: {
      name: "Yen Sid",
      version: "Powerful Sorcerer",
      text: [
        {
          title: "TIMELY INTERVENTION",
          description:
            "When you play this character, if you have a character named Magic Broom in play, you may draw a card.",
        },
        {
          title: "ARCANE STUDY",
          description:
            "While you have 2 or more Broom characters in play, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Yen Sid",
      version: "Mächtiger Zauberer",
      text: [
        {
          title: "RECHTZEITIGES EINGREIFEN",
          description:
            "Wenn du diesen Charakter ausspielst und einen Zauberbesen-Charakter im Spiel hast, darfst du 1 Karte ziehen.",
        },
        {
          title: "ARKANES STUDIUM",
          description:
            "Solange du mindestens 2 Zauberbesen-Charaktere im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Yen Sid",
      version: "Puissant sorcier",
      text: [
        {
          title: "INTERVENTION OPPORTUNE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Balais magiques en jeu, vous pouvez piocher une carte.",
        },
        {
          title: "ÉTUDE ARCANIQUE",
          description:
            "Tant que vous avez 2 personnages Balai ou plus en jeu, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Yen Sid",
      version: "Potente Stregone",
      text: [
        {
          title: "AIUTO TEMPESTIVO",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Scopa Magica, puoi pescare una carta.",
        },
        {
          title: "STUDIO ARCANO",
          description:
            "Mentre hai in gioco 2 o più personaggi Scopa, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  set: "004",
  cardNumber: 223,
  rarity: "legendary",
  specialRarity: "epic",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_86d6559da2404639813a26adaa8ccedf",
    tcgPlayer: 544492,
  },
  text: [
    {
      title: "TIMELY INTERVENTION",
      description:
        "When you play this character, if you have a character named Magic Broom in play, you may draw a card.",
    },
    {
      title: "ARCANE STUDY",
      description: "While you have 2 or more Broom characters in play, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          controller: "you",
          name: "Magic Broom in play",
          type: "has-named-character",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "7ea-1",
      name: "TIMELY INTERVENTION",
      text: "TIMELY INTERVENTION When you play this character, if you have a character named Magic Broom in play, you may draw a card. ARCANE STUDY While you have 2 or more Broom characters in play, this character gets +2.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
