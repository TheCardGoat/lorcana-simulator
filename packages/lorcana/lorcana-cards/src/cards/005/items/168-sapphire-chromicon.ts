import type { ItemCard } from "@tcg/lorcana-types";

export const sapphireChromicon: ItemCard = {
  id: "Xd5",
  canonicalId: "ci_Xd5",
  reprints: ["set5-168"],
  cardType: "item",
  name: "Sapphire Chromicon",
  i18n: {
    en: {
      name: "Sapphire Chromicon",
      text: [
        {
          title: "POWERING UP",
          description: "This item enters play exerted.",
        },
        {
          title: "SAPPHIRE LIGHT",
          description: "{E}, 2 {I}, Banish one of your items — Gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Saphir Chromikon",
      text: [
        {
          title: "LADEVORGANG",
          description:
            "Dieser Gegenstand kommt erschöpft ins Spiel. SAPHIRFARBENES LICHT, 2, Verbanne einen deiner Gegenstände — Sammle 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Chromicône de Saphir",
      text: [
        {
          title: "EN CHARGE",
          description:
            "Cet objet arrive en jeu épuisé. LUEUR DE SAPHIR, 2, bannissez l'un de vos objets — Gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Cromicon di Zaffiro",
      text: [
        {
          title: "ACCENSIONE",
          description:
            "Questo oggetto entra in gioco impegnato. LUCE DI ZAFFIRO, 2, esilia uno dei tuoi oggetti — Ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 168,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_c28dceb08757469c965d2620ac1841d8",
    tcgPlayer: 560103,
  },
  text: [
    {
      title: "POWERING UP",
      description: "This item enters play exerted.",
    },
    {
      title: "SAPPHIRE LIGHT",
      description: "{E}, 2 {I}, Banish one of your items — Gain 2 lore.",
    },
  ],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "cxg-1",
      name: "POWERING UP",
      text: "POWERING UP This item enters play exerted.",
      type: "static",
    },
    {
      cost: {
        exert: true,
        ink: 2,
        banishItem: true,
      },
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "cxg-2",
      name: "SAPPHIRE LIGHT",
      text: "SAPPHIRE LIGHT {E}, 2 {I}, Banish one of your items — Gain 2 lore.",
      type: "activated",
    },
  ],
};
