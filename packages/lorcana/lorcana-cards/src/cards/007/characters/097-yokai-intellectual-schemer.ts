import type { CharacterCard } from "@tcg/lorcana-types";

export const yokaiIntellectualSchemer: CharacterCard = {
  id: "zT9",
  canonicalId: "ci_zT9",
  reprints: ["set7-097"],
  cardType: "character",
  name: "Yokai",
  version: "Intellectual Schemer",
  i18n: {
    en: {
      name: "Yokai",
      version: "Intellectual Schemer",
      text: [
        {
          title: "INNOVATE",
          description: "You pay 1 {I} less to play characters using their Shift ability.",
        },
      ],
    },
    de: {
      name: "Yokai",
      version: "Intellektueller Intrigant",
      text: [
        {
          title: "ERNEUERN",
          description:
            "Du zahlst 1 weniger, um Charaktere mithilfe von Gestaltwandel auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Yokai",
      version: "Comploteur érudit",
      text: [
        {
          title: "INNOVER",
          description: "Jouer des personnages via leur capacité Alter vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Yokai",
      version: "Cospiratore Intellettuale",
      text: [
        {
          title: "INNOVARE",
          description:
            "Paga 1 in meno per giocare i personaggi usando la loro abilità Trasformazione.",
        },
      ],
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 97,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f9a3516262004948b7bd488cc55af5b9",
    tcgPlayer: 618139,
  },
  text: [
    {
      title: "INNOVATE",
      description: "You pay 1 {I} less to play characters using their Shift ability.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Inventor"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "8zk-1",
      text: "INNOVATE You pay 1 {I} less to play characters using their Shift ability.",
      type: "action",
    },
  ],
};
