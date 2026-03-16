import type { ActionCard } from "@tcg/lorcana-types";

export const theMostDiabolicalScheme: ActionCard = {
  id: "7eC",
  canonicalId: "ci_7eC",
  reprints: ["set2-131"],
  cardType: "action",
  name: "The Most Diabolical Scheme",
  i18n: {
    en: {
      name: "The Most Diabolical Scheme",
      text: "Banish chosen Villain of yours to banish chosen character.",
    },
    de: {
      name: "Der teuflischste Plan",
      text: "Wähle eine deiner Schurkinnen oder einen deiner Schurken und verbanne jenen Charakter, um einen Charakter deiner Wahl zu verbannen.",
    },
    fr: {
      name: "La plus diabolique conjuration",
      text: "Choisissez l'un de vos personnages Méchant et bannissez-le pour bannir un autre personnage au choix.",
    },
    it: {
      name: "The Most Diabolical Scheme",
      text: "Banish chosen Villain of yours to banish chosen character.",
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 131,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_07082198195e40d6b940142d1383c881",
    tcgPlayer: 527540,
  },
  text: "Banish chosen Villain of yours to banish chosen character.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-classification",
                  classification: "Villain",
                },
              ],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              type: "banish",
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
          },
        ],
      },
    },
  ],
};
