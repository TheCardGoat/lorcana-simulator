import type { ActionCard } from "@tcg/lorcana-types";

export const searchForClues: ActionCard = {
  id: "imz",
  canonicalId: "ci_imz",
  reprints: ["set10-026"],
  cardType: "action",
  name: "Search for Clues",
  i18n: {
    en: {
      name: "Search for Clues",
      text: "The player or players with the most cards in their hands choose and discard 2 cards. If you have a Detective character in play, gain 1 lore.",
    },
    de: {
      name: "Spurensuche",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) mit den meisten Karten auf der Hand wählen je 2 Karten aus ihrer Hand und werfen sie ab. Wenn du mindestens einen Detektiv im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Rechercher des indices",
      text: "Le joueur ou les joueurs ayant le plus de cartes en main défaussent chacun 2 cartes. Si vous avez un personnage Détective en jeu, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Cercare Indizi",
      text: "Il giocatore o i giocatori con più carte in mano scelgono e scartano 2 carte. Se hai in gioco un personaggio Detective, ottieni 1 leggenda.",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 26,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_3945ef0eb7ba41b8b1c9382bf3380579",
    tcgPlayer: 658337,
  },
  text: "The player or players with the most cards in their hands choose and discard 2 cards. If you have a Detective character in play, gain 1 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "discard",
            amount: 2,
            chosen: true,
            from: "hand",
            target: {
              selector: "each-player",
              filter: {
                type: "zone-count-rank",
                zone: "hand",
                rank: "highest",
                ties: "all",
                minCount: 1,
              },
            },
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                owner: "you",
                zones: ["play"],
                cardTypes: ["character"],
                filters: [
                  {
                    type: "has-classification",
                    classification: "Detective",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "gain-lore",
              amount: 1,
              target: "CONTROLLER",
            },
          },
        ],
      },
    },
  ],
};
