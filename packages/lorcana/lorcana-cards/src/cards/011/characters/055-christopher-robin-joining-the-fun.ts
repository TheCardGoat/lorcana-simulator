import type { CharacterCard } from "@tcg/lorcana-types";

export const christopherRobinJoiningTheFun: CharacterCard = {
  id: "OZm",
  canonicalId: "ci_OZm",
  reprints: ["set11-055"],
  cardType: "character",
  name: "Christopher Robin",
  version: "Joining the Fun",
  i18n: {
    en: {
      name: "Christopher Robin",
      version: "Joining the Fun",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Christopher Robin",
      version: "Mit Spaß bei der Sache",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Jean-Christophe",
      version: "Se joint à la bataille",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur.",
        },
      ],
    },
    it: {
      name: "Christopher Robin",
      version: "Che Si Unisce al Divertimento",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 55,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6ef0db16a9b944d29c9a18fb37a8916d",
    tcgPlayer: 676194,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "4b3-1",
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
  ],
};
