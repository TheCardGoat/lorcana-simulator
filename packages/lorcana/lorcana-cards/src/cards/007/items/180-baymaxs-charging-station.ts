import type { ItemCard } from "@tcg/lorcana-types";

export const baymaxsChargingStation: ItemCard = {
  id: "Xqf",
  canonicalId: "ci_Xqf",
  reprints: ["set7-180"],
  cardType: "item",
  name: "Baymax's Charging Station",
  i18n: {
    en: {
      name: "Baymax's Charging Station",
      text: [
        {
          title: "ENERGY CONVERTER",
          description:
            "Whenever you play a Floodborn character, if you used Shift to play them, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Baymax’ Ladestation",
      text: [
        {
          title: "ENERGIEWANDLER",
          description:
            "Jedes Mal, wenn du mithilfe von Gestaltwandel eine Flutgestalt ausspielst, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Chargeur de Baymax",
      text: [
        {
          title: "CONVERTISSEUR D'ÉNERGIE",
          description:
            "Chaque fois que vous jouez un personnage Floodborn en utilisant sa capacité Alter, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Stazione di Ricarica di Baymax",
      text: [
        {
          title: "CONVERTITORE DI ENERGIA",
          description:
            "Ogni volta che giochi un personaggio Imbevuto, se hai usato Trasformazione per giocarlo, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 180,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_c2a15901752f4d5289f1296558834989",
    tcgPlayer: 618725,
  },
  text: [
    {
      title: "ENERGY CONVERTER",
      description:
        "Whenever you play a Floodborn character, if you used Shift to play them, you may draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        condition: {
          type: "play-context",
          context: "used-shift",
        },
        then: {
          type: "optional",
          chooser: "CONTROLLER",
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        },
        type: "conditional",
      },
      id: "zom-1",
      name: "ENERGY CONVERTER",
      text: "ENERGY CONVERTER Whenever you play a Floodborn character, if you used Shift to play them, you may draw a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
