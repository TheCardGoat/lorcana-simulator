import type { CharacterCard } from "@tcg/lorcana-types";

export const whiteRabbitLateAgain: CharacterCard = {
  id: "k8j",
  canonicalId: "ci_k8j",
  reprints: ["set11-089"],
  cardType: "character",
  name: "White Rabbit",
  version: "Late Again",
  i18n: {
    en: {
      name: "White Rabbit",
      version: "Late Again",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
        {
          title: "Evasive",
        },
      ],
    },
    de: {
      name: "Weißes Kaninchen",
      version: "Wieder zu spät",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Wendig",
        },
      ],
    },
    fr: {
      name: "Le lapin blanc",
      version: "Encore en retard",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur. Insaisissable",
        },
      ],
    },
    it: {
      name: "Bianconiglio",
      version: "Di Nuovo in Ritardo",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio. Sfuggente",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "011",
  cardNumber: 89,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a8878d5ac3ea4ff7bfacb512552943cc",
    tcgPlayer: 673345,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1go-1",
      effect: {
        condition: {
          type: "first-turn-non-otp",
        },
        then: {
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      type: "action",
      text: "UNDERDOG If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      id: "1go-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
