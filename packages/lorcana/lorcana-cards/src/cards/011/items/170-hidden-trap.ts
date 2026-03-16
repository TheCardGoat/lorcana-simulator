import type { ItemCard } from "@tcg/lorcana-types";

export const hiddenTrap: ItemCard = {
  id: "aeY",
  canonicalId: "ci_aeY",
  reprints: ["set11-170"],
  cardType: "item",
  name: "Hidden Trap",
  i18n: {
    en: {
      name: "Hidden Trap",
      text: [
        {
          title: "ALMOST READY",
          description: "This item enters play exerted.",
        },
        {
          title: "SNAP!",
        },
        {
          title: "{E},",
          description: "Banish this item — Choose one:",
        },
        {
          title: "* Banish chosen item.",
        },
        {
          title: "* Chosen opposing character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Versteckte Falle",
      text: [
        {
          title: "FAST FERTIG",
          description: "Dieser Gegenstand kommt erschöpft ins Spiel.",
        },
        {
          title: "SCHNAPP!,",
          description:
            "Verbanne diesen Gegenstand — Wähle eine Möglichkeit aus: • Verbanne einen Gegenstand deiner Wahl. • Ein gegnerischer Charakter deiner Wahl erhält in diesem Zug -2.",
        },
      ],
    },
    fr: {
      name: "Piège caché",
      text: [
        {
          title: "PRESQUE PRÊT",
          description: "Cet objet entre en jeu épuisé.",
        },
        {
          title: "TCHAC!,",
          description:
            "Bannissez cet objet — Choisissez entre: • Choisissez un objet et bannissez-le. • Choisissez un personnage adverse qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Trappola Nascosta",
      text: [
        {
          title: "QUASI PRONTA",
          description: "Questo oggetto entra in gioco impegnato.",
        },
        {
          title: "SNAP!,",
          description:
            "esilia questo oggetto — Scegli uno: • Esilia un oggetto a tua scelta. • Un personaggio avversario a tua scelta riceve -2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 170,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e0852ee050446dd96742b3986444917",
    tcgPlayer: 676234,
  },
  text: [
    {
      title: "ALMOST READY",
      description: "This item enters play exerted.",
    },
    {
      title: "SNAP!",
    },
    {
      title: "{E},",
      description: "Banish this item — Choose one:",
    },
    {
      title: "* Banish chosen item.",
    },
    {
      title: "* Chosen opposing character gets -2 {S} this turn.",
    },
  ],
  abilities: [
    {
      id: "1uw-1",
      name: "ALMOST READY",
      type: "static",
      effect: {
        type: "restriction",
        restriction: "enters-play-exerted",
        target: "SELF",
      },
      text: "ALMOST READY This item enters play exerted.",
    },
    {
      id: "1uw-2",
      name: "SNAP!",
      type: "activated",
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        type: "or",
        optionLabels: ["Banish chosen item", "Chosen opposing character gets -2 {S} this turn"],
        options: [
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["item"],
            },
          },
          {
            type: "modify-stat",
            stat: "strength",
            modifier: -2,
            duration: "this-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
      text: "SNAP! {E}, Banish this item — Choose one:",
    },
  ],
};
