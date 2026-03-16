import type { ItemCard } from "@tcg/lorcana-types";

export const megabot: ItemCard = {
  id: "Bvz",
  canonicalId: "ci_Bvz",
  reprints: ["set6-098"],
  cardType: "item",
  name: "MegaBot",
  i18n: {
    en: {
      name: "MegaBot",
      text: [
        {
          title: "HAPPY FACE",
          description: "This item enters play exerted.",
        },
        {
          title: "DESTROY!",
        },
        {
          title: "{E},",
          description: "Banish this item — Choose one:",
        },
        {
          title: "* Banish chosen item.",
        },
        {
          title: "* Banish chosen damaged character.",
        },
      ],
    },
    de: {
      name: "MegaBot",
      text: [
        {
          title: "FREUNDLICHES GESICHT",
          description: "Dieser Gegenstand kommt erschöpft ins Spiel.",
        },
        {
          title: "ZERSTÖRE!,",
          description:
            "Verbanne diesen Gegenstand — Wähle eine Möglichkeit aus: • Verbanne einen Gegenstand deiner Wahl. • Verbanne einen beschädigten Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Méga-Robot",
      text: [
        {
          title: "VISAGE SOURIANT",
          description: "Cet objet arrive en jeu épuisé.",
        },
        {
          title: "DÉTRUIS-LE!,",
          description:
            "bannissez cet objet — choisissez entre: • Choisissez un objet et bannissez-le. • Choisissez un personnage avec au moins 1 dommage sur lui et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Megabot",
      text: [
        {
          title: "FACCINA FELICE",
          description: "Questo oggetto entra in gioco impegnato.",
        },
        {
          title: "DISTRUGGI!,",
          description:
            "esilia questo oggetto — Scegli uno: • Esilia un oggetto a tua scelta. • Esilia un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 98,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1ed3d03ca8724920aa9dccede9e08900",
    tcgPlayer: 588322,
  },
  text: [
    {
      title: "HAPPY FACE",
      description: "This item enters play exerted.",
    },
    {
      title: "DESTROY!",
    },
    {
      title: "{E},",
      description: "Banish this item — Choose one:",
    },
    {
      title: "* Banish chosen item.",
    },
    {
      title: "* Banish chosen damaged character.",
    },
  ],
  abilities: [
    {
      id: "4oq-1",
      name: "HAPPY FACE",
      type: "static",
      effect: {
        type: "restriction",
        restriction: "enters-play-exerted",
        target: "SELF",
      },
      text: "HAPPY FACE This item enters play exerted.",
    },
    {
      id: "4oq-2",
      name: "DESTROY!",
      type: "activated",
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        type: "or",
        optionLabels: ["Banish chosen item", "Banish chosen damaged character"],
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
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "damaged",
                },
              ],
            },
          },
        ],
      },
      text: "DESTROY! {E}, Banish this item — Choose one:",
    },
  ],
};
