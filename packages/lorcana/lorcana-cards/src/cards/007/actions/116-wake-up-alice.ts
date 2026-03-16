import type { ActionCard } from "@tcg/lorcana-types";

export const wakeUpAlice: ActionCard = {
  id: "LkF",
  canonicalId: "ci_LkF",
  reprints: ["set7-116"],
  cardType: "action",
  name: "Wake Up, Alice!",
  i18n: {
    en: {
      name: "Wake Up, Alice!",
      text: "Return chosen damaged character to their player's hand.",
    },
    de: {
      name: "Alice, wach auf!",
      text: "Schicke einen beschädigten Charakter deiner Wahl auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "Réveille-toi, Alice !",
      text: "Choisissez un personnage avec au moins un dommage et renvoyez-le dans la main de son propriétaire.",
    },
    it: {
      name: "Alice, Svegliati!",
      text: "Fai tornare in mano al suo giocatore un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 116,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_688f773c54e34dbf8f96096b19c1c2b9",
    tcgPlayer: 618258,
  },
  text: "Return chosen damaged character to their player's hand.",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          filter: [
            {
              type: "damaged",
            },
          ],
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "7tg-1",
      text: "Return chosen damaged character to their player's hand.",
      type: "action",
    },
  ],
};
