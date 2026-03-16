import type { ActionCard } from "@tcg/lorcana-types";

export const fallingDownTheRabbitHole: ActionCard = {
  id: "kL9",
  canonicalId: "ci_kL9",
  reprints: ["set2-162"],
  cardType: "action",
  name: "Falling Down the Rabbit Hole",
  i18n: {
    en: {
      name: "Falling Down the Rabbit Hole",
      text: "Each player chooses one of their characters and puts them into their inkwell facedown and exerted.",
    },
    de: {
      name: "Hinab in das Kaninchenloch",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) wählen je einen ihrer Charaktere und legen ihn verdeckt und erschöpft in ihren Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Chute dans le terrier du lapin",
      text: "Chaque joueur choisit l'un de ses personnages en jeu et le place dans sa réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Falling Down the Rabbit Hole",
      text: "Each player chooses one of their characters and puts them into their inkwell facedown and exerted.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 162,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_2a71e5ea621f41ce9028d6551c153764",
    tcgPlayer: 526208,
  },
  text: "Each player chooses one of their characters and puts them into their inkwell facedown and exerted.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            exerted: true,
            facedown: true,
            source: "chosen-character",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "put-into-inkwell",
          },
          {
            chosenBy: "opponent",
            exerted: true,
            facedown: true,
            source: "chosen-character",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "put-into-inkwell",
          },
        ],
      },
    },
  ],
};
