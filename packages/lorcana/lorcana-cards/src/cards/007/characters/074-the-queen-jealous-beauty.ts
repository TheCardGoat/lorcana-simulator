import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenJealousBeauty: CharacterCard = {
  id: "J3O",
  canonicalId: "ci_J3O",
  reprints: ["set7-074"],
  cardType: "character",
  name: "The Queen",
  version: "Jealous Beauty",
  i18n: {
    en: {
      name: "The Queen",
      version: "Jealous Beauty",
      text: [
        {
          title: "NO ORDINARY APPLE",
          description:
            "{E} — Choose 3 cards from chosen opponent's discard and put them on the bottom of their deck to gain 3 lore. If any Princess cards were moved this way, gain 4 lore instead.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Eifersüchtige Schönheit",
      text: [
        {
          title: "KEIN",
          description:
            "GEWÖHNLICHER APFEL — Wähle 3 Karten aus einem gegnerischen Ablagestapel und lege diese unter das zugehörige Deck, um 3 Legenden zu sammeln. Falls du so mindestens eine Prinzessinnen-Karte bewegt hast, sammelst du stattdessen 4 Legenden.",
        },
      ],
    },
    fr: {
      name: "La Reine",
      version: "Beauté jalouse",
      text: [
        {
          title: "PAS UNE POMME ORDINAIRE",
          description:
            "— Choisissez un adversaire. Choisissez 3 cartes de sa défausse et placez-les sous sa pioche pour gagner 3 éclats de Lore. Si vous avez déplacé au moins un personnage Princesse de cette façon, gagnez 4 éclats de Lore à la place.",
        },
      ],
    },
    it: {
      name: "Regina",
      version: "Bellezza Gelosa",
      text: [
        {
          title: "NON",
          description:
            "È UNA MELA COME UN'ALTRA — Scegli 3 carte dagli scarti di un avversario a tua scelta e mettile in fondo al suo mazzo per ottenere 3 leggenda. Se una qualsiasi carta Principessa è stata spostata in questo modo, ottieni invece 4 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "007",
  cardNumber: 74,
  rarity: "legendary",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_db45bcd9604d43b3b9a430ee1f23bec8",
    tcgPlayer: 619446,
  },
  text: [
    {
      title: "NO ORDINARY APPLE",
      description:
        "{E} — Choose 3 cards from chosen opponent's discard and put them on the bottom of their deck to gain 3 lore. If any Princess cards were moved this way, gain 4 lore instead.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "any Princess cards were moved this way",
          type: "if",
        },
        then: {
          amount: 4,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "ce7-1",
      text: "NO ORDINARY APPLE {E} — Choose 3 cards from chosen opponent's discard and put them on the bottom of their deck to gain 3 lore. If any Princess cards were moved this way, gain 4 lore instead.",
      type: "activated",
    },
  ],
};
