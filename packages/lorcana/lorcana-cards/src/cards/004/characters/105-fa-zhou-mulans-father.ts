import type { CharacterCard } from "@tcg/lorcana-types";

export const faZhouMulansFather: CharacterCard = {
  id: "m9e",
  canonicalId: "ci_m9e",
  reprints: ["set4-105"],
  cardType: "character",
  name: "Fa Zhou",
  version: "Mulan's Father",
  i18n: {
    en: {
      name: "Fa Zhou",
      version: "Mulan's Father",
      text: [
        {
          title: "WAR INJURY",
          description: "This character can't challenge.",
        },
        {
          title: "HEAD OF THE HOUSEHOLD",
          description:
            "{E} — Ready chosen character named Mulan. She can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Fa Zhou",
      version: "Mulans Vater",
      text: [
        {
          title: "KRIEGSVERLETZUNGEN",
          description:
            "Dieser Charakter kann nicht herausfordern. FAMILIENOBERHAUPT — Mache einen Mulan-Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Fa Zhou",
      version: "Père de Mulan",
      text: [
        {
          title: "BLESSURE DE GUERRE",
          description:
            "Ce personnage ne peut pas défier. CHEF DE FAMILLE — Choisissez un personnage Mulan et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Fa Zhou",
      version: "Padre di Mulan",
      text: [
        {
          title: "FERITA DI GUERRA",
          description:
            "Questo personaggio non può sfidare. CAPOFAMIGLIA — Prepara un personaggio a tua scelta chiamato Mulan. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 105,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8fe17bb9974247b18e4180d4e4df3ab0",
    tcgPlayer: 550590,
  },
  text: [
    {
      title: "WAR INJURY",
      description: "This character can't challenge.",
    },
    {
      title: "HEAD OF THE HOUSEHOLD",
      description:
        "{E} — Ready chosen character named Mulan. She can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "gc0-1",
      name: "WAR INJURY",
      text: "WAR INJURY This character can't challenge.",
      type: "static",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "gc0-2",
      text: "HEAD OF THE HOUSEHOLD {E} — Ready chosen character named Mulan. She can't quest for the rest of this turn.",
      type: "activated",
    },
  ],
};
