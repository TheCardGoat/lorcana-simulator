import type { CharacterCard } from "@tcg/lorcana-types";

export const splatterPhoenixRejectedArtist: CharacterCard = {
  id: "q39",
  canonicalId: "ci_q39",
  reprints: ["set11-153"],
  cardType: "character",
  name: "Splatter Phoenix",
  version: "Rejected Artist",
  i18n: {
    en: {
      name: "Splatter Phoenix",
      version: "Rejected Artist",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
        {
          title: "Ward",
        },
      ],
    },
    de: {
      name: "Splatter Phoenix",
      version: "Zurückgewiesene Künstlerin",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Behütet",
        },
      ],
    },
    fr: {
      name: "Calamity Fresque",
      version: "Artiste rejetée",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur. Hors d'atteinte",
        },
      ],
    },
    it: {
      name: "Miranda Van Quack",
      version: "Artista Incompresa",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio. Protetto",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 153,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dd7610ea1502422199f68ea86fce5b19",
    tcgPlayer: 676224,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Ward",
    },
  ],
  classifications: ["Storyborn", "Super", "Villain"],
  abilities: [
    {
      id: "k08-1",
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
      id: "k08-2",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
