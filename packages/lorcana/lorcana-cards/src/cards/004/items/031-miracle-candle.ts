import type { ItemCard } from "@tcg/lorcana-types";

export const miracleCandle: ItemCard = {
  id: "vcN",
  canonicalId: "ci_vcN",
  reprints: ["set4-031"],
  cardType: "item",
  name: "Miracle Candle",
  i18n: {
    en: {
      name: "Miracle Candle",
      text: [
        {
          title: "ABUELA'S GIFT",
          description:
            "Banish this item — If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.",
        },
      ],
    },
    de: {
      name: "Wunderkerze",
      text: [
        {
          title: "ABUELAS GABE",
          description:
            "Verbanne diesen Gegenstand — Wenn du mindestens 3 Charaktere im Spiel hast, sammle 2 Legenden und entferne bis zu 2 Schaden von einem Ort deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "La Chandelle du Miracle",
      text: [
        {
          title: "LE DON D'ABUELA",
          description:
            "Bannissez cet objet — Si vous avez 3 personnages ou plus en jeu, gagnez 2 éclats de Lore et choisissez un lieu et retirez-lui jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Candela del Miracolo",
      text: [
        {
          title: "IL TALENTO DI ABUELA",
          description:
            "Esilia questo oggetto — Se hai in gioco 3 o più personaggi, ottieni 2 leggenda e rimuovi fino a 2 danni da un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 31,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f192e99706074455884cf28efb9ee03a",
    tcgPlayer: 549249,
  },
  text: [
    {
      title: "ABUELA'S GIFT",
      description:
        "Banish this item — If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        condition: {
          type: "has-character-count",
          controller: "you",
          comparison: "or-more",
          count: 3,
        },
        then: {
          type: "sequence",
          steps: [
            {
              type: "gain-lore",
              amount: 2,
              target: "CONTROLLER",
            },
            {
              type: "remove-damage",
              amount: 2,
              upTo: true,
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["location"],
              },
            },
          ],
        },
        type: "conditional",
      },
      id: "1cb-1",
      name: "ABUELA'S GIFT",
      text: "ABUELA'S GIFT Banish this item — If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.",
      type: "activated",
    },
  ],
};
