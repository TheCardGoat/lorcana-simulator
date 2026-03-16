import type { ActionCard } from "@tcg/lorcana-types";

export const inkGeyser: ActionCard = {
  id: "NRZ",
  canonicalId: "ci_NRZ",
  reprints: ["set7-119"],
  cardType: "action",
  name: "Ink Geyser",
  i18n: {
    en: {
      name: "Ink Geyser",
      text: "Each player exerts all the cards in their inkwell. Then each player with more than 3 cards in their inkwell returns cards at random from their inkwell to their hand until they have 3 cards in their inkwell.",
    },
    de: {
      name: "Tintengeysir",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) erschöpfen alle Karten in ihrem Tintenvorrat. Danach nehmen alle Mitspielenden (auch du), die mehr als 3 Karten in ihrem Tintenvorrat haben, so lange zufällig Karten aus ihrem Tintenvorrat zurück auf die Hand, bis sie nur noch 3 Karten im Tintenvorrat haben.",
        },
      ],
    },
    fr: {
      name: "Geyser d’encre",
      text: "Chaque joueur épuise toutes les cartes de sa réserve d'encre. Ensuite, chaque joueur avec plus de 3 cartes dans sa réserve d'encre renvoie des cartes au hasard de sa réserve d'encre dans sa main jusqu'à n'en avoir plus que 3 dans sa réserve d'encre.",
    },
    it: {
      name: "Geyser d'Inchiostro",
      text: "Ogni giocatore impegna tutte le carte del suo calamaio. Poi ogni giocatore con più di 3 carte nel suo calamaio riprende in mano carte a caso dal suo calamaio finché non ha 3 carte nel suo calamaio.",
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Lorcana",
  set: "007",
  cardNumber: 119,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_1043af1f4d454d8d83c4a85a75e1ad05",
    tcgPlayer: 618175,
  },
  text: "Each player exerts all the cards in their inkwell. Then each player with more than 3 cards in their inkwell returns cards at random from their inkwell to their hand until they have 3 cards in their inkwell.",
  abilities: [
    {
      type: "action",
      text: "Each player exerts all the cards in their inkwell. Then each player with more than 3 cards in their inkwell returns cards at random from their inkwell to their hand until they have 3 cards in their inkwell.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            target: {
              selector: "all",
              count: "all",
              owner: "any",
              zones: ["inkwell"],
            },
          },
          {
            type: "return-random-from-inkwell",
            target: "EACH_PLAYER",
            leave: 3,
          },
        ],
      },
    },
  ],
};
