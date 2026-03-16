import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaDreamComeTrueEnchanted: CharacterCard = {
  id: "XnU",
  canonicalId: "ci_fz8",
  reprints: ["set10-155"],
  cardType: "character",
  name: "Cinderella",
  version: "Dream Come True",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Dream Come True",
      text: [
        {
          title: "WHATEVER YOU WISH FOR",
          description:
            "At the end of your turn, if you played a Princess character this turn, you may put a card from your hand into your inkwell facedown to draw a card.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Ein Traum ist wahr geworden",
      text: [
        {
          title: "DAS LEBEN, ES LACHT MIR DANN ZU",
          description:
            "Am Ende deines Zuges, falls du in diesem Zug mindestens 1 Prinzessin ausgespielt hast, darfst du 1 beliebige Karte aus deiner Hand verdeckt in deinen Tintenvorrat legen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Cendrillon",
      version: "Rêve qui se réalise",
      text: [
        {
          title: "LES RÊVES QUI SOMMEILLENT DANS NOS CŒURS À",
          description:
            "la fin de votre tour, si vous avez joué un personnage Princesse ce tour-ci, vous pouvez placer une carte de votre main dans votre réserve d'encre, face cachée, pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Cenerentola",
      version: "Sogno Divenuto Realtà",
      text: [
        {
          title: "TI ESPRIMI CON SINCERITÀ",
          description:
            "Alla fine del tuo turno, se hai giocato un personaggio Principessa in questo turno, puoi aggiungere una carta dalla tua mano al tuo calamaio, a faccia in giù, per pescare una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Cinderella",
  set: "010",
  cardNumber: 236,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_3c235410b79145c080fa8e3b000a2c60",
    tcgPlayer: 660029,
  },
  text: [
    {
      title: "WHATEVER YOU WISH FOR",
      description:
        "At the end of your turn, if you played a Princess character this turn, you may put a card from your hand into your inkwell facedown to draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "played-character-with-classification",
          comparison: {
            operator: "gte",
            value: 1,
          },
          classification: "Princess",
        },
        then: {
          facedown: true,
          source: "hand",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "1sh-1",
      text: "WHATEVER YOU WISH FOR At the end of your turn, if you played a Princess character this turn, you may put a card from your hand into your inkwell facedown to draw a card.",
      type: "action",
    },
  ],
};
