import type { CharacterCard } from "@tcg/lorcana-types";

export const vanellopeVonSchweetzGutsyGogetter: CharacterCard = {
  id: "xuX",
  canonicalId: "ci_xuX",
  reprints: ["set6-110"],
  cardType: "character",
  name: "Vanellope Von Schweetz",
  version: "Gutsy Go-Getter",
  i18n: {
    en: {
      name: "Vanellope Von Schweetz",
      version: "Gutsy Go-Getter",
      text: [
        {
          title: "AS READY AS I'LL EVER BE",
          description:
            "At the start of your turn, if this character is at a location, draw a card and gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Vanellope von Schweetz",
      version: "Mutige Draufgängerin",
      text: [
        {
          title: "ICH WAR NOCH NIE ZUVOR BEREITER",
          description:
            "Zu Beginn deines Zuges, wenn dieser Charakter an einem Ort ist, ziehe 1 Karte und sammle 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Vanellope von Schweetz",
      version: "Fonceuse hardie",
      text: [
        {
          title: "J'AI JAMAIS ÉTÉ AUSSI PRÊTE DE MA VIE",
          description:
            "Au début de votre tour, si ce personnage est sur un lieu, piochez une carte et gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Vanellope von Schweetz",
      version: "Ambiziosa e Intraprendente",
      text: [
        {
          title: "MAI STATA COSÌ PRONTA",
          description:
            "All'inizio del tuo turno, se questo personaggio si trova in un luogo, pesca una carta e ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 110,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cfd767c1ed88437486b41bb5670ccc1c",
    tcgPlayer: 591981,
  },
  text: [
    {
      title: "AS READY AS I'LL EVER BE",
      description:
        "At the start of your turn, if this character is at a location, draw a card and gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess", "Racer"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "source",
            filters: [
              {
                type: "at-location",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "ypp-1",
      text: "AS READY AS I'LL EVER BE At the start of your turn, if this character is at a location, draw a card and gain 1 lore.",
      type: "action",
    },
  ],
};
