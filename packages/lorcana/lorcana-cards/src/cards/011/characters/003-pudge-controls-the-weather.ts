import type { CharacterCard } from "@tcg/lorcana-types";

export const pudgeControlsTheWeather: CharacterCard = {
  id: "IAp",
  canonicalId: "ci_IAp",
  reprints: ["set11-003"],
  cardType: "character",
  name: "Pudge",
  version: "Controls the Weather",
  i18n: {
    en: {
      name: "Pudge",
      version: "Controls the Weather",
      text: [
        {
          title: "GOOD FRIEND",
          description:
            "If you have a character named Lilo in play, you can play this character for free.",
        },
      ],
    },
    de: {
      name: "Platsch",
      version: "Bestimmt das Wetter",
      text: [
        {
          title: "GUTER FREUND",
          description:
            "Falls du einen Lilo-Charakter im Spiel hast, kannst du diesen Charakter kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Doudou",
      version: "Fait venir le soleil",
      text: [
        {
          title: "BON COMPAGNON",
          description:
            "Si vous avez un personnage Lilo en jeu, vous pouvez jouez ce personnage-ci gratuitement.",
        },
      ],
    },
    it: {
      name: "Pudge",
      version: "Controlla il Tempo",
      text: [
        {
          title: "BUON AMICO",
          description:
            "Se hai in gioco un personaggio chiamato Lilo, puoi giocare questo personaggio gratis.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 3,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a862524392a1444389f95109d49ddd31",
    tcgPlayer: 674818,
  },
  text: [
    {
      title: "GOOD FRIEND",
      description:
        "If you have a character named Lilo in play, you can play this character for free.",
    },
  ],
  classifications: ["Storyborn", "Deity"],
  abilities: [
    {
      id: "wm7-1",
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Lilo",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          from: "hand",
          type: "play-card",
          cost: "free",
        },
        type: "conditional",
      },
      type: "action",
      text: "GOOD FRIEND If you have a character named Lilo in play, you can play this character for free.",
    },
  ],
};
