import type { CharacterCard } from "@tcg/lorcana-types";

export const judyHoppsSnowballPatrol: CharacterCard = {
  id: "1pX",
  canonicalId: "ci_7Tl",
  reprints: ["set11-194"],
  cardType: "character",
  name: "Judy Hopps",
  version: "Snowball Patrol",
  i18n: {
    en: {
      name: "Judy Hopps",
      version: "Snowball Patrol",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
        {
          title: "Resist +1",
        },
      ],
    },
    de: {
      name: "Judy Hopps",
      version: "Schneeball-Patrouille",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Judy Hopps",
      version: "Patrouille aux boules de neige",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur. Résistance +1",
        },
      ],
    },
    it: {
      name: "Judy Hopps",
      version: "Pattuglia delle Palle di Neve",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio. Resistere +1",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "011",
  cardNumber: 194,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b7a2a60eb9d34fd986cf0bd44e2a1f1a",
    tcgPlayer: 677156,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Resist +1",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      id: "fpk-1",
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
      id: "fpk-2",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
