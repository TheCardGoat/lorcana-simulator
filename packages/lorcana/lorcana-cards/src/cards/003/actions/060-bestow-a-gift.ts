import type { ActionCard } from "@tcg/lorcana-types";

export const bestowAGift: ActionCard = {
  id: "3hQ",
  canonicalId: "ci_3hQ",
  reprints: ["set3-060"],
  cardType: "action",
  name: "Bestow a Gift",
  i18n: {
    en: {
      name: "Bestow a Gift",
      text: "Move 1 damage counter from chosen character to chosen opposing character.",
    },
    de: {
      name: "Ein Geschenk machen",
      text: "Verschiebe 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
    },
    fr: {
      name: "Offrir un don",
      text: "Choisissez un personnage, déplacez 1 de ses jetons Dommage sur un personnage adverse de votre choix.",
    },
    it: {
      name: "Porgere un Dono",
      text: "Sposta 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "003",
  cardNumber: 60,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f3f30e7e137c4336a2551abfa4b4eeaf",
    tcgPlayer: 537626,
  },
  text: "Move 1 damage counter from chosen character to chosen opposing character.",
  abilities: [
    {
      type: "action",
      text: "Move 1 damage counter from chosen character to chosen opposing character.",
      effect: {
        type: "move-damage",
        amount: 1,
        from: "CHOSEN_CHARACTER",
        to: "CHOSEN_OPPOSING_CHARACTER",
      },
    },
  ],
};
