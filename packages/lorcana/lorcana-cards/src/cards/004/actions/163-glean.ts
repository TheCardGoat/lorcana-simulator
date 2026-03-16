import type { ActionCard } from "@tcg/lorcana-types";

export const glean: ActionCard = {
  id: "XMc",
  canonicalId: "ci_XMc",
  reprints: ["set4-163"],
  cardType: "action",
  name: "Glean",
  i18n: {
    en: {
      name: "Glean",
      text: "Banish chosen item. Its player gains 2 lore.",
    },
    de: {
      name: "Gründlich prüfen",
      text: "Verbanne einen Gegenstand deiner Wahl. Wer den Gegenstand im Spiel hatte, sammelt 2 Legenden.",
    },
    fr: {
      name: "Glaner",
      text: "Choisissez un objet et bannissez-le. Son propriétaire gagne 2 éclats de Lore.",
    },
    it: {
      name: "Racimolare",
      text: "Esilia un oggetto a tua scelta. Il suo giocatore ottiene 2 leggenda.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 163,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3185489386dc4b9a833fec1e0668d65f",
    tcgPlayer: 550614,
  },
  text: "Banish chosen item. Its player gains 2 lore.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            target: {
              cardTypes: ["item"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "banish",
          },
          {
            amount: 2,
            target: "CARD_OWNER",
            type: "gain-lore",
          },
        ],
      },
      id: "wm3-1",
      text: "Banish chosen item. Its owner gains 2 lore.",
      type: "action",
    },
  ],
};
