import type { ItemCard } from "@tcg/lorcana-types";

export const scrump: ItemCard = {
  id: "9I8",
  canonicalId: "ci_9I8",
  reprints: ["set6-033"],
  cardType: "item",
  name: "Scrump",
  i18n: {
    en: {
      name: "Scrump",
      text: [
        {
          title: "I MADE HER",
          description:
            "{E} one of your characters — Chosen character gets -2 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Schrulle",
      text: [
        {
          title: "DIE HAB ICH SELBST",
          description:
            "GENÄHT einen deiner Charaktere — Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2.",
        },
      ],
    },
    fr: {
      name: "Souillon",
      text: [
        {
          title: "C'EST MOI QUI L'AI FAITE",
          description:
            "l'un de vos personnages — Choisissez un personnage qui subit -2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Scrump",
      text: [
        {
          title: "L'HO FATTA IO",
          description:
            "uno dei tuoi personaggi — Un personaggio a tua scelta riceve -2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 33,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a631b5ead5b34dd4b89ae313a3dcbd1d",
    tcgPlayer: 592003,
  },
  text: [
    {
      title: "I MADE HER",
      description:
        "{E} one of your characters — Chosen character gets -2 {S} until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exertCharacters: 1,
      },
      effect: {
        duration: "until-start-of-next-turn",
        modifier: -2,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "88v-1",
      name: "I MADE HER",
      text: "I MADE HER {E} one of your characters — Chosen character gets -2 {S} until the start of your next turn.",
      type: "activated",
    },
  ],
};
