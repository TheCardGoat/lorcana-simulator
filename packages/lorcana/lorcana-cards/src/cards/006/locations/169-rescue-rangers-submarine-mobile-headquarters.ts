import type { LocationCard } from "@tcg/lorcana-types";

export const rescueRangersSubmarineMobileHeadquarters: LocationCard = {
  id: "DyS",
  canonicalId: "ci_DyS",
  reprints: ["set6-169"],
  cardType: "location",
  name: "Rescue Rangers Submarine",
  version: "Mobile Headquarters",
  i18n: {
    en: {
      name: "Rescue Rangers Submarine",
      version: "Mobile Headquarters",
      text: [
        {
          title: "PLANNING SESSION",
          description:
            "At the start of your turn, if you have a character here, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "U-Boot der Ritter des Rechts",
      version: "Mobiles Hauptquartier",
      text: [
        {
          title: "PLANUNGSSITZUNG",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Charakter an diesem Ort hast, lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Sous-marin des Rangers du Risque",
      version: "Quartier général mobile",
      text: [
        {
          title: "SESSION DE PLANIFICATION",
          description:
            "Au début de votre tour, si vous avez un personnage sur ce lieu, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Sottomarino degli Agenti Speciali",
      version: "Quartier Generale Mobile",
      text: [
        {
          title: "RIUNIONE STRATEGICA",
          description:
            "All'inizio del tuo turno, se hai un personaggio in questo luogo, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 169,
  rarity: "rare",
  cost: 2,
  willpower: 8,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_d6deefa8519c46a39b105b62d7b857f4",
    tcgPlayer: 586641,
  },
  text: [
    {
      title: "PLANNING SESSION",
      description:
        "At the start of your turn, if you have a character here, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  abilities: [
    {
      effect: {
        condition: {
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
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          chooser: "CONTROLLER",
          effect: {
            exerted: true,
            facedown: true,
            source: "top-of-deck",
            target: "CONTROLLER",
            type: "put-into-inkwell",
          },
          type: "optional",
        },
        type: "conditional",
      },
      id: "671-1",
      name: "PLANNING SESSION",
      text: "PLANNING SESSION At the start of your turn, if you have a character here, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
