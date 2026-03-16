import type { CharacterCard } from "@tcg/lorcana-types";

export const theHornedKingWickedRuler: CharacterCard = {
  id: "siB",
  canonicalId: "ci_yas",
  reprints: ["set10-036"],
  cardType: "character",
  name: "The Horned King",
  version: "Wicked Ruler",
  i18n: {
    en: {
      name: "The Horned King",
      version: "Wicked Ruler",
      text: [
        {
          title: "Shift 2 {I}",
        },
        {
          title: "ARISE!",
          description:
            "Whenever one of your other characters is banished in a challenge, you may return that card to your hand, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Der gehörnte König",
      version: "Boshafter Herrscher",
      text: "Gestaltwandel 2 STEHT AUF! Jedes Mal, wenn einer deiner anderen Charaktere durch eine Herausforderung verbannt wird, darfst du jene Karte zurück auf deine Hand nehmen. Wähle danach eine Karte aus deiner Hand und wirf sie ab.",
    },
    fr: {
      name: "Le Seigneur des Ténèbres",
      version: "Monarque maléfique",
      text: "Alter 2 LEVEZ-VOUS! Chaque fois que l'un de vos autres personnages est banni via un défi, vous pouvez le renvoyer dans votre main, puis défausser une carte.",
    },
    it: {
      name: "Re Cornelius",
      version: "Sovrano Malvagio",
      text: "Trasformazione 2 LEVATEVI! Ogni volta che uno dei tuoi altri personaggi viene esiliato in una sfida, puoi riprendere in mano quella carta, poi scegli e scarta una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 36,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_831e34ca1c2143dd82785500356c339e",
    tcgPlayer: 660044,
  },
  text: [
    {
      title: "Shift 2 {I}",
    },
    {
      title: "ARISE!",
      description:
        "Whenever one of your other characters is banished in a challenge, you may return that card to your hand, then choose and discard a card.",
    },
  ],
  classifications: ["Floodborn", "Villain", "King", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "wsd-1",
      keyword: "Shift",
      text: "Shift 2 {I}",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "wsd-2",
      name: "ARISE!",
      text: "ARISE! Whenever one of your other characters is banished in a challenge, you may return that card to your hand, then choose and discard a card.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
