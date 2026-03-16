import type { CharacterCard } from "@tcg/lorcana-types";

export const angelSirenSinger: CharacterCard = {
  id: "FwE",
  canonicalId: "ci_HaX",
  reprints: ["set11-025"],
  cardType: "character",
  name: "Angel",
  version: "Siren Singer",
  i18n: {
    en: {
      name: "Angel",
      version: "Siren Singer",
      text: [
        {
          title: "UNDERDOG",
          description:
            "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
        },
        {
          title: "Singer 3",
        },
      ],
    },
    de: {
      name: "Engel",
      version: "Sirenen-Sängerin",
      text: [
        {
          title: "UNDERDOG",
          description:
            "Falls dies dein erster Zug ist und du das Spiel nicht begonnen hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Singen 3 (Die Kosten dieses Charakters gelten als 3 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Angel",
      version: "Chanteuse sirène",
      text: [
        {
          title: "OUTSIDER",
          description:
            "Jouer ce personnage vous coûte 1 de moins si c'est votre premier tour et que vous n'êtes pas le premier joueur. Mélomane 3 (Ce personnage est considéré comme ayant un coût de 3 pour chanter des chansons.)",
        },
      ],
    },
    it: {
      name: "Angel",
      version: "Dal Canto di Sirena",
      text: [
        {
          title: "SFAVORITO",
          description:
            "Se questo è il tuo primo turno e non sei il primo giocatore, paga 1 in meno per giocare questo personaggio. Melodioso 3",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 25,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ce082b2459af4c0a94a900a468bd9096",
    tcgPlayer: 658220,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Singer 3",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      id: "izw-1",
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
      id: "izw-2",
      keyword: "Singer",
      type: "keyword",
      value: 3,
      text: "Singer 3",
    },
  ],
};
