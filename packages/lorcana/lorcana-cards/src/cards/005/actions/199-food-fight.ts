import type { ActionCard } from "@tcg/lorcana-types";

export const foodFight: ActionCard = {
  id: "jt8",
  canonicalId: "ci_jt8",
  reprints: ["set5-199"],
  cardType: "action",
  name: "Food Fight!",
  i18n: {
    en: {
      name: "Food Fight!",
      text: 'Your characters gain "{E}, 1 {I} — Deal 1 damage to chosen character" this turn.',
    },
    de: {
      name: "Essensschlacht!",
      text: 'Deine Charaktere erhalten in diesem Zug: ", 1 — Füge einem Charakter deiner Wahl 1 Schaden zu."',
    },
    fr: {
      name: "Bataille de nourriture !",
      text: 'Vos personnages gagnent ", 1 — Choisissez un personnage et infligez-lui 1 dommage." pour le reste de ce tour.',
    },
    it: {
      name: "Battaglia di Cibo!",
      text: [
        {
          title: "I",
          description:
            'tuoi personaggi ottengono ", 1 — Infliggi 1 danno a un personaggio a tua scelta" per questo turno.',
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "005",
  cardNumber: 199,
  rarity: "uncommon",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_301228de8de94aa382a1cface63a3422",
    tcgPlayer: 561494,
  },
  text: 'Your characters gain "{E}, 1 {I} — Deal 1 damage to chosen character" this turn.',
  abilities: [
    {
      id: "1ww-1",
      type: "action",
      text: "Your characters gain “{E}, 1 {I} — Deal 1 damage to chosen character” this turn.",
      effect: {
        type: "grant-ability",
        duration: "this-turn",
        target: "YOUR_CHARACTERS",
        ability: {
          id: "food-fight-damage",
          type: "activated",
          text: "{E}, 1 {I} — Deal 1 damage to chosen character.",
          cost: {
            exert: true,
            ink: 1,
          },
          effect: {
            type: "deal-damage",
            amount: 1,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        },
      },
    },
  ],
};
