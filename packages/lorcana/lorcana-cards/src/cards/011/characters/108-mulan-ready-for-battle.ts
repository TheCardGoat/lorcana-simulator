import type { CharacterCard } from "@tcg/lorcana-types";

export const mulanReadyForBattle: CharacterCard = {
  id: "rjK",
  canonicalId: "ci_rjK",
  reprints: ["set11-108"],
  cardType: "character",
  name: "Mulan",
  version: "Ready for Battle",
  i18n: {
    en: {
      name: "Mulan",
      version: "Ready for Battle",
      text: [
        {
          title: "NOBLE SPIRIT",
          description:
            "If you have a character in play with damage, you pay 1 {I} less to play this character.",
        },
        {
          title: "FIGHTING SPIRIT",
          description:
            "If you have a character in play with 5 or more, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Mulan",
      version: "Bereit für die Schlacht",
      text: [
        {
          title: "EHRENHAFTER GEIST",
          description:
            "Falls du mindestens einen beschädigten Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "KAMPFGEIST",
          description:
            "Wenn du mindestens einen Charakter mit 5 oder mehr im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Mulan",
      version: "Prête pour la bataille",
      text: [
        {
          title: "ESPRIT NOBLE",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage ayant au moins un dommage en jeu.",
        },
        {
          title: "ESPRIT COMBATIF",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage ayant une de 5 ou plus en jeu.",
        },
      ],
    },
    it: {
      name: "Mulan",
      version: "Pronta alla Battaglia",
      text: [
        {
          title: "SPIRITO NOBILE",
          description:
            "Se hai in gioco un personaggio con danno, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "SPIRITO COMBATTIVO",
          description:
            "Se hai in gioco un personaggio con 5 o superiore, paga 1 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 108,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_96a789fd5e1943adbb12361ff791aec9",
    tcgPlayer: 675497,
  },
  text: [
    {
      title: "NOBLE SPIRIT",
      description:
        "If you have a character in play with damage, you pay 1 {I} less to play this character.",
    },
    {
      title: "FIGHTING SPIRIT",
      description:
        "If you have a character in play with 5 or more, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "zz5-1",
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
                type: "damaged",
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
        },
        type: "conditional",
      },
      type: "action",
      text: "NOBLE SPIRIT If you have a character in play with damage, you pay 1 {I} less to play this character.",
    },
    {
      id: "zz5-2",
      effect: {
        optionLabels: [
          "FIGHTING SPIRIT If you have a character in play with 5 {S}",
          "more, you pay 1 {I} less to play this character.",
        ],
        options: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            from: "hand",
            type: "play-card",
          },
        ],
        type: "choice",
      },
      type: "action",
      text: "FIGHTING SPIRIT If you have a character in play with 5 {S} or more, you pay 1 {I} less to play this character.",
    },
  ],
};
