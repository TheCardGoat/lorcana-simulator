import type { ActionCard } from "@tcg/lorcana-types";

export const mostEveryonesMadHere: ActionCard = {
  id: "FLL",
  canonicalId: "ci_FLL",
  reprints: ["set8-151"],
  cardType: "action",
  name: "Most Everyone's Mad Here",
  i18n: {
    en: {
      name: "Most Everyone's Mad Here",
      text: "Gain lore equal to the damage on chosen character, then banish them.",
    },
    de: {
      name: "Die meisten von uns hier sind verrückt",
      text: "Wähle einen Charakter und zähle den Schaden auf ihm. Sammle diese Anzahl an Legenden und verbanne ihn.",
    },
    fr: {
      name: "Tout le monde est fou ici",
      text: "Choisissez un personnage et gagnez autant d'éclats de Lore qu'il a de dommages sur lui, puis bannissez-le.",
    },
    it: {
      name: "Sono Quasi Tutti Matti Qui",
      text: "Ottieni leggenda pari al danno su un personaggio a tua scelta, poi esilialo.",
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 151,
  rarity: "rare",
  cost: 7,
  inkable: false,
  externalIds: {
    lorcast: "crd_bc307680b7a247268c3e25f80be90450",
    tcgPlayer: 631451,
  },
  text: "Gain lore equal to the damage on chosen character, then banish them.",
  abilities: [
    {
      type: "action",
      effect: {
        steps: [
          {
            counter: {
              type: "damage-on-target",
            },
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "gain-lore",
            },
            target: "CHOSEN_CHARACTER",
            type: "for-each",
          },
          {
            target: {
              ref: "previous-target",
            },
            type: "banish",
          },
        ],
        type: "sequence",
      },
    },
  ],
};
