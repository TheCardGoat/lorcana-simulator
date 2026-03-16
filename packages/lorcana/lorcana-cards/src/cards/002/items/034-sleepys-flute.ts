import type { ItemCard } from "@tcg/lorcana-types";

export const sleepysFlute: ItemCard = {
  id: "duq",
  canonicalId: "ci_duq",
  reprints: ["set2-034"],
  cardType: "item",
  name: "Sleepy's Flute",
  i18n: {
    en: {
      name: "Sleepy's Flute",
      text: [
        {
          title: "A SILLY SONG",
          description: "{E} — If you played a song this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Schlafmütz‘ Flöte",
      text: [
        {
          title: "GAUDIUM IM UNSINN",
          description:
            "— Falls du in diesem Zug mindestens ein Lied ausgespielt hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Flûte de Dormeur",
      text: [
        {
          title: "CHANSON TYROLIENNE",
          description: "— Gagnez 1 éclat de Lore si vous avez joué une chanson durant votre tour.",
        },
      ],
    },
    it: {
      name: "Sleepy's Flute",
      text: [
        {
          title: "A SILLY SONG",
          description: "— If you played a song this turn, gain 1 lore.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 34,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_341b56d7d2d549f5b2caa285c026278e",
    tcgPlayer: 527729,
  },
  text: [
    {
      title: "A SILLY SONG",
      description: "{E} — If you played a song this turn, gain 1 lore.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          comparison: {
            operator: "gte",
            value: 1,
          },
          metric: "played-songs",
          type: "turn-metric",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1aa-1",
      name: "A SILLY SONG",
      text: "A SILLY SONG {E} — If you played a song this turn, gain 1 lore.",
      type: "activated",
    },
  ],
};
