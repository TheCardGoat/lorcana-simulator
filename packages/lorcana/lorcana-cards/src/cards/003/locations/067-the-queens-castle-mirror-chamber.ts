import type { LocationCard } from "@tcg/lorcana-types";

export const theQueensCastleMirrorChamber: LocationCard = {
  id: "2mb",
  canonicalId: "ci_2mb",
  reprints: ["set3-067"],
  cardType: "location",
  name: "The Queen's Castle",
  version: "Mirror Chamber",
  i18n: {
    en: {
      name: "The Queen's Castle",
      version: "Mirror Chamber",
      text: [
        {
          title: "USING THE MIRROR",
          description:
            "At the start of your turn, for each character you have here, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Das Schloss der Königin",
      version: "Spiegel-Kammer",
      text: [
        {
          title: "DEN SPIEGEL BENUTZEN",
          description:
            "Zu Beginn deines Zuges, kannst du für jeden deiner Charaktere an diesem Ort, 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Château de la reine",
      version: "Salle du miroir",
      text: [
        {
          title: "UTILISATION DU MIROIR",
          description:
            "Au début de votre tour, pour chacun de vos personnages sur ce lieu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Il Castello della Regina",
      version: "Stanza dello Specchio",
      text: [
        {
          title: "USARE LO SPECCHIO",
          description:
            "All'inizio del tuo turno, per ogni personaggio che hai in questo luogo, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "003",
  cardNumber: 67,
  rarity: "rare",
  cost: 4,
  willpower: 7,
  moveCost: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a4f0a9a928674b2a93d17f7c81eb09d7",
    tcgPlayer: 538680,
  },
  text: [
    {
      title: "USING THE MIRROR",
      description:
        "At the start of your turn, for each character you have here, you may draw a card.",
    },
  ],
  abilities: [
    {
      id: "16x-1",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "for-each",
        counter: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "same-location-as-source",
              },
            ],
          },
        },
        effect: {
          chooser: "CONTROLLER",
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          type: "optional",
        },
      },
      type: "triggered",
      text: "USING THE MIRROR At the start of your turn, for each character you have here, you may draw a card.",
    },
  ],
};
