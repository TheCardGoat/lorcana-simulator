import type { CharacterCard } from "@tcg/lorcana-types";

export const powerlineMusicalSuperstarEpic: CharacterCard = {
  id: "eva",
  canonicalId: "ci_JGr",
  reprints: ["set9-117"],
  cardType: "character",
  name: "Powerline",
  version: "Musical Superstar",
  i18n: {
    en: {
      name: "Powerline",
      version: "Musical Superstar",
      text: [
        {
          title: "ELECTRIC MOVE",
          description:
            "If you've played a song this turn, this character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Powerline",
      version: "Musikalischer Superstar",
      text: [
        {
          title: "ELEKTRISCHE BEWEGUNGEN",
          description:
            "Falls du in diesem Zug mindestens 1 Lied ausgespielt hast, erhält dieser Charakter Rasant.",
        },
      ],
    },
    fr: {
      name: "Powerline",
      version: "Superstar de la musique",
      text: [
        {
          title: "MOUVEMENT ÉLECTRISANT",
          description:
            "Si vous avez joué une chanson ce tour-ci, ce personnage gagne Charge pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Powerline",
      version: "Superstar Musicale",
      text: [
        {
          title: "MOSSA ELETTRICA",
          description:
            "Se hai giocato una canzone in questo turno, questo personaggio ottiene Lesto per questo turno. (Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 215,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e234293cec8f422eb1d613594771e5ee",
    tcgPlayer: 650151,
  },
  text: [
    {
      title: "ELECTRIC MOVE",
      description:
        "If you've played a song this turn, this character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "played-songs",
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          duration: "this-turn",
          keyword: "Rush",
          target: "SELF",
          type: "gain-keyword",
        },
        type: "conditional",
      },
      id: "yez-1",
      text: "ELECTRIC MOVE If you've played a song this turn, this character gains Rush this turn.",
      type: "action",
    },
  ],
};
