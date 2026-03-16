import type { ItemCard } from "@tcg/lorcana-types";

export const ursulasCauldron: ItemCard = {
  id: "5L3",
  canonicalId: "ci_5L3",
  reprints: ["set1-067"],
  cardType: "item",
  name: "Ursula’s Cauldron",
  i18n: {
    en: {
      name: "Ursula’s Cauldron",
      text: [
        {
          title: "PEER INTO THE DEPTHS",
          description:
            "— Look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
        },
      ],
    },
    de: {
      name: "Ursulas Kessel",
      text: [
        {
          title: "BLICKE IN DIE TIEFE",
          description:
            "— Schaue dir die obersten 2 Karten deines Decks an. Lege 1 davon auf dein Deck und die andere unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "CHAUDRON D'URSULA",
      text: [
        {
          title: "SURVEILLANCE DES PROFONDEURS",
          description:
            "— Regardez les 2 premières cartes de votre pioche. Remettez-en une sur le dessus de votre pioche et l'autre en dessous.",
        },
      ],
    },
    it: {
      name: "Il Calderone di Ursula",
      text: [
        {
          title: "SCRUTARE NEGLI ABISSI",
          description:
            "— Guarda le prime 2 carte del tuo mazzo. Mettine una in cima al tuo mazzo e l'altra in fondo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 67,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9548bea5e69544d5b3e488e97d33065c",
    tcgPlayer: 507851,
  },
  text: [
    {
      title: "PEER INTO THE DEPTHS",
      description:
        "— Look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        steps: [
          {
            amount: 2,
            destinations: [
              {
                zone: "deck-bottom",
                remainder: true,
                ordering: "player-choice",
              },
            ],
            target: "CONTROLLER",
            type: "scry",
          },
          {
            target: "CHOSEN_CHARACTER",
            type: "put-on-bottom",
          },
        ],
        type: "sequence",
      },
      id: "1ad-1",
      text: "PEER INTO THE DEPTHS {E} — Look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
      type: "activated",
    },
  ],
};
