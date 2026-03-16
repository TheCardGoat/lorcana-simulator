import type { CharacterCard } from "@tcg/lorcana-types";

export const annaMagicalMission: CharacterCard = {
  id: "7E5",
  canonicalId: "ci_7E5",
  reprints: ["set8-072"],
  cardType: "character",
  name: "Anna",
  version: "Magical Mission",
  i18n: {
    en: {
      name: "Anna",
      version: "Magical Mission",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "Support",
        },
        {
          title: "COORDINATED PLAN",
          description:
            "Whenever this character quests, if you have a character named Elsa in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Magische Mission",
      text: "Gestaltwandel 4 Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) KOORDINIERTER PLAN Jedes Mal, wenn dieser Charakter erkundet, falls du einen Elsa-Charakter im Spiel hast, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Anna",
      version: "En mission magique",
      text: "Alter 4 Soutien PLAN COORDONNÉ Chaque fois que ce personnage est envoyé à l'aventure, si vous avez un personnage nommé Elsa en jeu, vous pouvez piocher une carte.",
    },
    it: {
      name: "Anna",
      version: "In Missione Magica",
      text: "Trasformazione 4 Aiutante PIANO COORDINATO Ogni volta che questo personaggio va all'avventura, se hai in gioco un personaggio chiamato Elsa, puoi pescare una carta.",
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 72,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae35ed50c6954dab9925888b61a657f2",
    tcgPlayer: 631399,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Support",
    },
    {
      title: "COORDINATED PLAN",
      description:
        "Whenever this character quests, if you have a character named Elsa in play, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "1w2-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4",
    },
    {
      id: "1w2-2",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
    {
      id: "1w2-3",
      effect: {
        condition: {
          expression: "you have a character named Elsa in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "COORDINATED PLAN",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "COORDINATED PLAN Whenever this character quests, if you have a character named Elsa in play, you may draw a card.",
    },
  ],
};
