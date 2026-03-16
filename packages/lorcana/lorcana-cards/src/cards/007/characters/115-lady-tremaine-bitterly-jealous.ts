import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyTremaineBitterlyJealous: CharacterCard = {
  id: "KTu",
  canonicalId: "ci_KTu",
  reprints: ["set7-115"],
  cardType: "character",
  name: "Lady Tremaine",
  version: "Bitterly Jealous",
  i18n: {
    en: {
      name: "Lady Tremaine",
      version: "Bitterly Jealous",
      text: [
        {
          title: "THAT'S QUITE ENOUGH",
          description:
            "{E} — Return chosen damaged character to their player's hand. Then, each opponent discards a card at random.",
        },
      ],
    },
    de: {
      name: "Gräfin Tremaine",
      version: "Zutiefst neidisch",
      text: [
        {
          title: "JETZT",
          description:
            "HÖRT IHR AUF — Schicke einen beschädigten Charakter deiner Wahl auf die zugehörige Hand zurück. Danach müssen alle gegnerischen Mitspielenden je eine zufällig ausgewählte Karte von ihrer Hand abwerfen.",
        },
      ],
    },
    fr: {
      name: "Madame de Trémaine",
      version: "Amèrement jalouse",
      text: [
        {
          title: "CELA SUFFIT",
          description:
            "— Choisissez un personnage avec au moins un dommage et renvoyez-le dans la main de son propriétaire. Ensuite, chaque adversaire défausse une carte au hasard.",
        },
      ],
    },
    it: {
      name: "La Matrigna",
      version: "Tremendamente Invidiosa",
      text: [
        {
          title: "ADESSO BASTA",
          description:
            "— Fai riprendere in mano al suo giocatore un personaggio danneggiato a tua scelta. Poi, ogni avversario scarta una carta a caso.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Cinderella",
  set: "007",
  cardNumber: 115,
  rarity: "legendary",
  cost: 6,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9cb99a5eecf64cd9a96cbc780861205c",
    tcgPlayer: 619469,
  },
  text: [
    {
      title: "THAT'S QUITE ENOUGH",
      description:
        "{E} — Return chosen damaged character to their player's hand. Then, each opponent discards a card at random.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "1n1-1",
      text: "THAT'S QUITE ENOUGH {E} — Return chosen damaged character to their player's hand. Then, each opponent discards a card at random.",
      type: "activated",
    },
  ],
};
