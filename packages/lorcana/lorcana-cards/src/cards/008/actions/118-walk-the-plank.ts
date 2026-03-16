import type { ActionCard } from "@tcg/lorcana-types";

export const walkThePlank: ActionCard = {
  id: "m8D",
  canonicalId: "ci_m8D",
  reprints: ["set8-118"],
  cardType: "action",
  name: "Walk the Plank!",
  i18n: {
    en: {
      name: "Walk the Plank!",
      text: 'Your Pirate characters gain "{E} — Banish chosen damaged character" this turn.',
    },
    de: {
      name: "Über die Planke!",
      text: 'Deine Piraten erhalten in diesem Zug: " — Verbanne einen beschädigten Charakter deiner Wahl."',
    },
    fr: {
      name: "Sur la planche !",
      text: 'Vos personnages Pirate gagnent " — Choisissez un personnage avec un dommage ou plus et bannissez-le." pour le reste de ce tour.',
    },
    it: {
      name: "Sull'Asse!",
      text: [
        {
          title: "I",
          description:
            'tuoi personaggi Pirata ottengono " — Esilia un personaggio danneggiato a tua scelta" per questo turno.',
        },
      ],
    },
  },
  inkType: ["emerald", "steel"],
  franchise: "Peter Pan",
  set: "008",
  cardNumber: 118,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_d5390ce678f1438eb716de9952cfd9d2",
    tcgPlayer: 631427,
  },
  text: 'Your Pirate characters gain "{E} — Banish chosen damaged character" this turn.',
  abilities: [
    {
      type: "action",
      text: 'Your Pirate characters gain "{E} — Banish chosen damaged character" this turn.',
      effect: {
        type: "grant-ability",
        ability: "banish-damaged-when-exerted",
        duration: "this-turn",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Pirate",
            },
          ],
        },
      },
    },
  ],
};
