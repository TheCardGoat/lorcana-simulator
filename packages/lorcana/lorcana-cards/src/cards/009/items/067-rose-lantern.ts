import type { ItemCard } from "@tcg/lorcana-types";

export const roseLantern: ItemCard = {
  id: "LJ1",
  canonicalId: "ci_bo3",
  reprints: ["set4-065", "set9-067"],
  cardType: "item",
  name: "Rose Lantern",
  i18n: {
    en: {
      name: "Rose Lantern",
      text: [
        {
          title: "MYSTICAL PETALS",
          description:
            "{E}, 2 {I} — Move 1 damage counter from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Rosen-Laterne",
      text: [
        {
          title: "GEHEIMNISVOLLE",
          description:
            "BLÜTENBLÄTTER, 2 — Verschiebe 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Rose-Lanterne",
      text: [
        {
          title: "PÉTALES MYSTIQUES,",
          description:
            "2 — Choisissez un personnage et déplacez 1 de ses jetons Dommage sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Lanterna della Rosa",
      text: [
        {
          title: "PETALI MISTICI, 2",
          description:
            "— Sposta 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 67,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0294484e638d4f389732639af2b5d5e8",
    tcgPlayer: 647667,
  },
  text: [
    {
      title: "MYSTICAL PETALS",
      description:
        "{E}, 2 {I} — Move 1 damage counter from chosen character to chosen opposing character.",
    },
  ],
  abilities: [
    {
      id: "13b-1",
      name: "MYSTICAL PETALS",
      text: "{E}, 2 {I} — Move 1 damage counter from chosen character to chosen opposing character.",
      type: "activated",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "move-damage",
        amount: 1,
        from: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
        },
        to: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
};
