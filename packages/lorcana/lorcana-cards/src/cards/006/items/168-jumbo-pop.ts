import type { ItemCard } from "@tcg/lorcana-types";

export const jumboPop: ItemCard = {
  id: "iYv",
  canonicalId: "ci_iYv",
  reprints: ["set6-168"],
  cardType: "item",
  name: "Jumbo Pop",
  i18n: {
    en: {
      name: "Jumbo Pop",
      text: [
        {
          title: "HERE YOU GO",
          description:
            "Banish this item — Remove up to 2 damage from each of your characters. Draw a card.",
        },
      ],
    },
    de: {
      name: "Riesenpfote am Stiel",
      text: [
        {
          title: "BITTE SEHR",
          description:
            "Verbanne diesen Gegenstand — Entferne bis zu 2 Schaden von jedem deiner Charaktere. Ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Jumbo Pop",
      text: [
        {
          title: "C'EST POUR TOI",
          description:
            "Bannissez cet objet — Retirez jusqu'à 2 dommages de chacun de vos personnages. Piochez une carte.",
        },
      ],
    },
    it: {
      name: "Ghiacciolo Jumbo",
      text: [
        {
          title: "ECCO QUA",
          description:
            "Esilia questo oggetto — Rimuovi fino a 2 danni da ogni tuo personaggio. Pesca una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 168,
  rarity: "common",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_f19a04399d3d44a9b9e346a4ee4741a4",
    tcgPlayer: 591138,
  },
  text: [
    {
      title: "HERE YOU GO",
      description:
        "Banish this item — Remove up to 2 damage from each of your characters. Draw a card.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        steps: [
          {
            amount: 2,
            target: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "remove-damage",
            upTo: true,
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "lhl-1",
      name: "HERE YOU GO",
      text: "HERE YOU GO Banish this item — Remove up to 2 damage from each of your characters. Draw a card.",
      type: "activated",
    },
  ],
};
