import type { ItemCard } from "@tcg/lorcana-types";

export const kingsSensorCore: ItemCard = {
  id: "SdR",
  canonicalId: "ci_SdR",
  reprints: ["set6-200"],
  cardType: "item",
  name: "King's Sensor Core",
  i18n: {
    en: {
      name: "King's Sensor Core",
      text: [
        {
          title: "SYMBOL OF ROYALTY",
          description: "Your Prince and King characters gain Resist +1.",
        },
        {
          title: "ROYAL SEARCH",
          description:
            "{E}, 2 {I} — Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Sensorkern des Königs",
      text: [
        {
          title: "KÖNIGLICHES SYMBOL",
          description:
            "Deine Prinzen und Könige erhalten Robust +1. (Reduziere jeglichen Schaden, der den Charakteren zugefügt wird, um 1.) KÖNIGLICHE SUCHE, 2 — Decke die oberste Karte deines Decks auf. Falls es eine Prinz- oder eine König-Charakterkarte ist, darfst du diese auf deine Hand nehmen. Falls nicht, lege sie zurück auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Cœur du détecteur du roi",
      text: [
        {
          title: "SYMBOLE DE",
          description:
            "ROYAUTÉ Vos personnages Prince et Roi gagnent Résistance +1. RECHERCHE ROYALE, 2 — Révélez la première carte de votre pioche. S'il s'agit d'un personnage Prince ou Roi, vous pouvez placer cette carte dans votre main. Sinon, replacez cette carte sur votre pioche.",
        },
      ],
    },
    it: {
      name: "Nucleo Rivelatore del Re",
      text: [
        {
          title: "SIMBOLO DI",
          description:
            "REGALITÀ I tuoi personaggi Principe e Re ottengono Resistere +1. RICERCA REGALE, 2 — Rivela la prima carta del tuo mazzo. Se è una carta personaggio Principe o Re, puoi aggiungerla alla tua mano. Altrimenti, rimettila in cima al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "006",
  cardNumber: 200,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4d8747b6f80e4bc5a39ace7edc6df9da",
    tcgPlayer: 592022,
  },
  text: [
    {
      title: "SYMBOL OF ROYALTY",
      description: "Your Prince and King characters gain Resist +1.",
    },
    {
      title: "ROYAL SEARCH",
      description:
        "{E}, 2 {I} — Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
    },
  ],
  abilities: [
    {
      id: "1jp-1",
      name: "SYMBOL OF ROYALTY",
      type: "static",
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 1,
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "or",
              filters: [
                {
                  type: "has-classification",
                  classification: "Prince",
                },
                {
                  type: "has-classification",
                  classification: "King",
                },
              ],
            },
          ],
        },
      },
      text: "SYMBOL OF ROYALTY Your Prince and King characters gain Resist +1.",
    },
    {
      id: "1jp-2",
      name: "ROYAL SEARCH",
      type: "activated",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "revealed-first",
                cardType: "character",
                filters: [
                  {
                    type: "or",
                    filters: [
                      {
                        type: "has-classification",
                        classification: "Prince",
                      },
                      {
                        type: "has-classification",
                        classification: "King",
                      },
                    ],
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "optional",
              chooser: "CONTROLLER",
              effect: {
                type: "put-in-hand",
                source: "revealed",
                target: "CONTROLLER",
              },
            },
            else: {
              type: "put-on-top",
              source: "revealed",
            },
          },
        ],
      },
      text: "ROYAL SEARCH {E}, 2 {I} — Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
    },
  ],
};
