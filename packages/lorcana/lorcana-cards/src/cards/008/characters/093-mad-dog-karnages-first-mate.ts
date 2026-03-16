import type { CharacterCard } from "@tcg/lorcana-types";

export const madDogKarnagesFirstMate: CharacterCard = {
  id: "rMw",
  canonicalId: "ci_rMw",
  reprints: ["set8-093"],
  cardType: "character",
  name: "Mad Dog",
  version: "Karnage's First Mate",
  i18n: {
    en: {
      name: "Mad Dog",
      version: "Karnage's First Mate",
      text: [
        {
          title: "ARE YOU SURE THIS IS SAFE, CAPTAIN?",
          description:
            "If you have a character named Don Karnage in play, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Brutus",
      version: "Kanailles Erster Offizier",
      text: [
        {
          title: "IST DAS DENN WIRKLICH SICHER, KÄPT'N?",
          description:
            "Wenn du einen Don-Kanaille-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Truffe",
      version: "Second de Don Carnage",
      text: [
        {
          title: "VOUS ÊTES SÛR QUE C'EST SANS DANGER, CAPITAINE?",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage nommé Don Carnage en jeu.",
        },
      ],
    },
    it: {
      name: "Cane Pazzo",
      version: "Braccio Destro di Massacre",
      text: [
        {
          title: "SEI SICURO CHE NON SIA PERICOLOSO, CAPITANO?",
          description:
            "Se hai in gioco un personaggio chiamato Don Massacre, paga 1 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "008",
  cardNumber: 93,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a48e0fd953434daa8315590258fe62a6",
    tcgPlayer: 631680,
  },
  text: [
    {
      title: "ARE YOU SURE THIS IS SAFE, CAPTAIN?",
      description:
        "If you have a character named Don Karnage in play, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
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
                equals: "Don Karnage",
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
      id: "19p-1",
      text: "ARE YOU SURE THIS IS SAFE, CAPTAIN? If you have a character named Don Karnage in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
  ],
};
