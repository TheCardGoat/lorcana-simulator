import type { CharacterCard } from "@tcg/lorcana-types";

export const liquidatorIcedOver: CharacterCard = {
  id: "UCV",
  canonicalId: "ci_UCV",
  reprints: ["set11-111"],
  cardType: "character",
  name: "Liquidator",
  version: "Iced Over",
  i18n: {
    en: {
      name: "Liquidator",
      version: "Iced Over",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
        {
          title: "Reckless",
        },
      ],
    },
    de: {
      name: "Liquidator",
      version: "Vereist",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Impulsiv",
        },
      ],
    },
    fr: {
      name: "Liquidator",
      version: "Couvert de glace",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur. Combattant",
        },
      ],
    },
    it: {
      name: "Liquidator",
      version: "Congelato",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio. Attaccabrighe",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 111,
  rarity: "uncommon",
  cost: 2,
  strength: 4,
  willpower: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_109b0bfb7a374953b896f3d6d051c099",
    tcgPlayer: 676212,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Reckless",
    },
  ],
  classifications: ["Storyborn", "Super", "Villain"],
  abilities: [
    {
      id: "12q-1",
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
      text: "UNDERDOG If this is your first turn and you’re not the first player, you pay 1 {I} less to play this character.",
    },
    {
      id: "12q-2",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
