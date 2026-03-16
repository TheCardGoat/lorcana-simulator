import type { ActionCard } from "@tcg/lorcana-types";

export const royalTantrumEnchanted: ActionCard = {
  id: "VaD",
  canonicalId: "ci_MQW",
  reprints: ["set5-161"],
  cardType: "action",
  name: "Royal Tantrum",
  i18n: {
    en: {
      name: "Royal Tantrum",
      text: "Banish any number of your items, then draw a card for each item banished this way.",
    },
    de: {
      name: "Königlicher Wutanfall",
      text: "Verbanne beliebig viele deiner Gegenstände, ziehe dann, für jeden so verbannten Gegenstand, je 1 Karte.",
    },
    fr: {
      name: "Caprice royal",
      text: "Bannissez autant de vos objets que vous le souhaitez et piochez une carte par objet banni de cette façon.",
    },
    it: {
      name: "Capricci Regali",
      text: "Esilia un qualsiasi numero di tuoi oggetti, poi pesca una carta per ogni oggetto esiliato in questo modo.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 219,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_ae4635bbf7ef4b4fb6a30c61f633fa0d",
    tcgPlayer: 561976,
  },
  text: "Banish any number of your items, then draw a card for each item banished this way.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["item"],
            },
            type: "banish",
          },
          {
            amount: {
              type: "for-each",
              counter: {
                type: "banished-this-way",
              },
            },
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "96v-1",
      text: "Banish any number of your items, then draw a card for each item banished this way.",
      type: "action",
    },
  ],
};
