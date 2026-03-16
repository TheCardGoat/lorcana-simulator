import type { ItemCard } from "@tcg/lorcana-types";

export const signedContract: ItemCard = {
  id: "Ntp",
  canonicalId: "ci_yKQ",
  reprints: ["set4-099", "set9-101"],
  cardType: "item",
  name: "Signed Contract",
  i18n: {
    en: {
      name: "Signed Contract",
      text: [
        {
          title: "FINE PRINT",
          description: "Whenever an opponent plays a song, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Unterschriebener Vertrag",
      text: [
        {
          title: "KLEINGEDRUCKTES",
          description:
            "Jedes Mal, wenn eine gegnerische Person ein Lied spielt, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Contrat signé",
      text: [
        {
          title: "PETITS CARACTÈRES",
          description:
            "Chaque fois qu'un adversaire joue une chanson, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Contratto Firmato",
      text: [
        {
          title: "CLAUSOLE IN PICCOLO",
          description: "Ogni volta che un avversario gioca una canzone, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 101,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ebe4a26a2312422db81dc2b43198f159",
    tcgPlayer: 650039,
  },
  text: [
    {
      title: "FINE PRINT",
      description: "Whenever an opponent plays a song, you may draw a card.",
    },
  ],
  abilities: [
    {
      id: "1y6-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "FINE PRINT",
      trigger: {
        event: "play",
        on: {
          cardType: "song",
          controller: "opponent",
        },
        timing: "whenever",
      },
      type: "triggered",
      text: "FINE PRINT Whenever an opponent plays a song, you may draw a card.",
    },
  ],
};
