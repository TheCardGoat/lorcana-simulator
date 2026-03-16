import type { ActionCard } from "@tcg/lorcana-types";

export const blastFromYourPast: ActionCard = {
  id: "hV2",
  canonicalId: "ci_hV2",
  reprints: ["set5-028"],
  cardType: "action",
  name: "Blast from Your Past",
  i18n: {
    en: {
      name: "Blast from Your Past",
      text: "Name a card. Return all character cards with that name from your discard to your hand.",
    },
    de: {
      name: "Wer einmal lügt, der hat Pech",
      text: "Benenne eine Karte. Nimm alle Charakterkarten mit dem genannten Namen aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "Un mirage à deux visages",
      text: "Nommez une carte. Renvoyez dans votre main toutes les cartes Personnage portant ce nom depuis votre défausse.",
    },
    it: {
      name: "Le Tue Menzogne",
      text: "(Un personaggio con costo 6 o superiore può per cantare questa canzone gratis.) Nomina una carta. Riprendi in mano dai tuoi scarti tutte le carte personaggio con quel nome.",
    },
  },
  inkType: ["amber"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 28,
  rarity: "common",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_1fafea8238334475ae8ed9ece3728309",
    tcgPlayer: 561468,
  },
  text: "Name a card. Return all character cards with that name from your discard to your hand.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "name-a-card",
          },
          {
            type: "return-to-hand",
            target: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["discard"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "named-card",
                },
              ],
            },
          },
        ],
      },
      id: "1tj-1",
      text: "Name a card. Return all character cards with that name from your discard to your hand.",
      type: "action",
    },
  ],
};
