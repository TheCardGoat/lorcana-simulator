import type { ItemCard } from "@tcg/lorcana-types";

export const aurelianGyrosensor: ItemCard = {
  id: "kHJ",
  canonicalId: "ci_RAl",
  reprints: ["set3-163", "set9-167"],
  cardType: "item",
  name: "Aurelian Gyrosensor",
  i18n: {
    en: {
      name: "Aurelian Gyrosensor",
      text: [
        {
          title: "SEEKING KNOWLEDGE",
          description:
            "Whenever one of your characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Aurelianischer Gyrosensor",
      text: [
        {
          title: "SUCHE NACH WISSEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere erkundet, darfst du dir die oberste Karte deines Decks anschauen. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Gyroscope lumineux",
      text: [
        {
          title: "À LA RECHERCHE DU SAVOIR",
          description:
            "Chaque fois que vous envoyez l'un de vos personnages à l'aventure, vous pouvez regarder la première carte de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Giroscopio Aureliano",
      text: [
        {
          title: "IN CERCA DI CONOSCENZA",
          description:
            "Ogni volta che uno dei tuoi personaggi va all'avventura, puoi guardare la prima carta del tuo mazzo. Mettila o in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "003",
  cardNumber: 163,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e6d5ca027b34def81032f79864dc6c6",
    tcgPlayer: 650101,
  },
  text: [
    {
      title: "SEEKING KNOWLEDGE",
      description:
        "Whenever one of your characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          destinations: [
            {
              zone: "deck-top",
              min: 0,
              max: 1,
            },
            {
              zone: "deck-bottom",
              remainder: true,
            },
          ],
          target: "CONTROLLER",
          type: "scry",
        },
        type: "optional",
      },
      id: "811-1",
      name: "SEEKING KNOWLEDGE",
      text: "SEEKING KNOWLEDGE Whenever one of your characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
