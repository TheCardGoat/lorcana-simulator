import type { ActionCard } from "@tcg/lorcana-types";

export const colorsOfTheWindEnchanted: ActionCard = {
  id: "zw0",
  canonicalId: "ci_Wdy",
  reprints: ["set11-064"],
  cardType: "action",
  name: "Colors of the Wind",
  i18n: {
    en: {
      name: "Colors of the Wind",
      text: "Each player reveals the top card of their deck. Draw a card for each different ink symbol on cards revealed this way.",
    },
    de: {
      name: "Das Farbenspiel des Winds",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) decken die oberste Karte ihres Decks auf. Ziehe 1 Karte für jedes unterschiedliche Tintenfarbensymbol unter den auf diese Weise aufgedeckten Karten.",
        },
      ],
    },
    fr: {
      name: "L’air du vent",
      text: "Chaque joueur révèle la carte du dessus de sa pioche. Piochez une carte pour chaque couleur d'encre différente figurant sur les cartes ainsi révélées.",
    },
    it: {
      name: "Il Vento e i Suoi Color",
      text: "Ogni giocatore rivela la prima carta del suo mazzo. Pesca una carta per ogni tipo di inchiostro diverso delle carte rivelate in questo modo.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 228,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_8ef1d474eb68402e8d35e2aa3bce689a",
    tcgPlayer: 677161,
  },
  text: "Each player reveals the top card of their deck. Draw a card for each different ink symbol on cards revealed this way.",
  actionSubtype: "song",
  abilities: [
    {
      id: "arw-1",
      type: "action",
      text: "Each player reveals the top card of their deck. Draw a card for each different ink type of cards revealed this way.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "EACH_PLAYER",
          },
          {
            type: "count",
            what: "distinct-revealed-ink-types",
          },
          {
            type: "draw",
            amount: {
              type: "trigger-amount",
            },
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
