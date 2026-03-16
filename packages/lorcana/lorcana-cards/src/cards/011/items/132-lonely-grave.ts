import type { ItemCard } from "@tcg/lorcana-types";

export const lonelyGrave: ItemCard = {
  id: "zMB",
  canonicalId: "ci_zMB",
  reprints: ["set11-132"],
  cardType: "item",
  name: "Lonely Grave",
  i18n: {
    en: {
      name: "Lonely Grave",
      text: [
        {
          title: "HAUNTING PRESENCE",
          description:
            "{E}, Banish chosen character of yours — Put the top card of your deck facedown under one of your characters or locations with Boost.",
        },
      ],
    },
    de: {
      name: "Einsames Grab",
      text: [
        {
          title: "UNHEIMLICHE",
          description:
            "PRÄSENZ, Verbanne einen deiner Charaktere — Lege die oberste Karte deines Decks verdeckt unter einen deiner Charaktere oder Orte mit Stärken.",
        },
      ],
    },
    fr: {
      name: "Tombe solitaire",
      text: [
        {
          title: "PRÉSENCE HANTANTE,",
          description:
            "Choisissez l'un de vos personnages et bannissez-le — Placez la carte du dessus de votre pioche, face cachée, sous l'un de vos personnages ou de vos lieux avec Boost.",
        },
      ],
    },
    it: {
      name: "Tomba Vuota",
      text: [
        {
          title: "PRESENZA INQUIETANTE,",
          description:
            "esilia un tuo personaggio a tua scelta — Metti la prima carta del tuo mazzo a faccia in giù sotto a uno dei tuoi personaggi o luoghi con Potenziamento.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 132,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0fb558452ff949e1ad997108b6f0ad06",
    tcgPlayer: 675345,
  },
  text: [
    {
      title: "HAUNTING PRESENCE",
      description:
        "{E}, Banish chosen character of yours — Put the top card of your deck facedown under one of your characters or locations with Boost.",
    },
  ],
  abilities: [
    {
      id: "1cz-1",
      name: "HAUNTING PRESENCE",
      type: "activated",
      cost: {
        exert: true,
        banishCharacter: true,
      },
      effect: {
        type: "put-under",
        source: "top-of-deck",
        under: {
          cardTypes: ["character", "location"],
          count: 1,
          owner: "you",
          selector: "chosen",
          zones: ["play"],
          filter: [
            {
              keyword: "Boost",
              type: "has-keyword",
            },
          ],
        },
      },
      text: "HAUNTING PRESENCE {E}, Banish chosen character of yours — Put the top card of your deck facedown under one of your characters or locations with Boost.",
    },
  ],
};
