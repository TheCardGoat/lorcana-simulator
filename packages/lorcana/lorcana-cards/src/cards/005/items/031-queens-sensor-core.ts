import type { ItemCard } from "@tcg/lorcana-types";

export const queensSensorCore: ItemCard = {
  id: "Xs0",
  canonicalId: "ci_Xs0",
  reprints: ["set5-031"],
  cardType: "item",
  name: "Queen's Sensor Core",
  i18n: {
    en: {
      name: "Queen's Sensor Core",
      text: [
        {
          title: "SYMBOL OF NOBILITY",
          description:
            "At the start of your turn, if you have a Princess or Queen character in play, gain 1 lore.",
        },
        {
          title: "ROYAL SEARCH",
          description:
            "{E}, 2 {I} — Reveal the top card of your deck. If it's a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Sensorkern der Königin",
      text: [
        {
          title: "SYMBOL DES ADELS",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens eine Prinzessin oder eine Königin im Spiel hast, sammelst du 1 Legende. KÖNIGLICHE SUCHE, 2 — Decke die oberste Karte deines Decks auf. Falls es eine Prinzessin oder eine Königin-Charakterkarte ist, darfst du diese auf deine Hand nehmen. Falls nicht, lege sie zurück auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Cœur du détecteur de la Reine",
      text: [
        {
          title: "SYMBOLE DE NOBLESSE",
          description:
            "Au début de votre tour, si vous avez un personnage Princesse ou Reine en jeu, gagnez 1 éclat de Lore. RECHERCHE ROYALE, 2 — Révélez la première carte de votre pioche. S'il s'agit d'une carte Personnage Princesse ou Reine, vous pouvez la prendre en main. Sinon, replacez-la sur votre pioche.",
        },
      ],
    },
    it: {
      name: "Nucleo Rivelatore della Regina",
      text: [
        {
          title: "SIMBOLO DI",
          description:
            "NOBILTÀ All'inizio del tuo turno, se hai in gioco un personaggio Principessa o Regina, ottieni 1 leggenda. RICERCA REGALE, 2 — Rivela la prima carta del tuo mazzo. Se è una carta personaggio Principessa o Regina, puoi aggiungerla alla tua mano. Altrimenti, mettila in cima al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 31,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a3736e115d014a5e85d5913b9d100f9e",
    tcgPlayer: 560914,
  },
  text: [
    {
      title: "SYMBOL OF NOBILITY",
      description:
        "At the start of your turn, if you have a Princess or Queen character in play, gain 1 lore.",
    },
    {
      title: "ROYAL SEARCH",
      description:
        "{E}, 2 {I} — Reveal the top card of your deck. If it's a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "1xk-1",
      name: "SYMBOL OF NOBILITY",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "or",
          conditions: [
            {
              type: "target-query",
              query: {
                selector: "all",
                owner: "you",
                zones: ["play"],
                cardType: "character",
                filters: [
                  {
                    type: "has-classification",
                    classification: "Princess",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            {
              type: "target-query",
              query: {
                selector: "all",
                owner: "you",
                zones: ["play"],
                cardType: "character",
                filters: [
                  {
                    type: "has-classification",
                    classification: "Queen",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
          ],
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
      },
      text: "SYMBOL OF NOBILITY At the start of your turn, if you have a Princess or Queen character in play, gain 1 lore.",
    },
    {
      name: "ROYAL SEARCH",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        amount: 1,
        destinations: [
          {
            zone: "hand",
            min: 0,
            max: 1,
            reveal: true,
            filter: {
              type: "or",
              filters: [
                {
                  type: "and",
                  filters: [
                    {
                      type: "card-type",
                      cardType: "character",
                    },
                    {
                      type: "has-classification",
                      classification: "Princess",
                    },
                  ],
                },
                {
                  type: "and",
                  filters: [
                    {
                      type: "card-type",
                      cardType: "character",
                    },
                    {
                      type: "has-classification",
                      classification: "Queen",
                    },
                  ],
                },
              ],
            },
          },
          {
            zone: "deck-top",
            remainder: true,
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      id: "1xk-2",
      text: "ROYAL SEARCH {E}, 2 {I} — Reveal the top card of your deck. If it's a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
      type: "activated",
    },
  ],
};
