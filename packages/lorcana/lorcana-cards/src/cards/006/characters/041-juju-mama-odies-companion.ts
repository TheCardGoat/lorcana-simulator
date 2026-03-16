import type { CharacterCard } from "@tcg/lorcana-types";

export const jujuMamaOdiesCompanion: CharacterCard = {
  id: "N2e",
  canonicalId: "ci_N2e",
  reprints: ["set6-041"],
  cardType: "character",
  name: "Juju",
  version: "Mama Odie's Companion",
  i18n: {
    en: {
      name: "Juju",
      version: "Mama Odie's Companion",
      text: [
        {
          title: "BEES' KNEES",
          description:
            "When you play this character, move 1 damage counter from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Juju",
      version: "Mama Odies Gefährte",
      text: [
        {
          title: "ABSOLUT HIMMLISCH",
          description:
            "Wenn du diesen Charakter ausspielst, verschiebe 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Juju",
      version: "Compagnon de Mama Odie",
      text: [
        {
          title: "IL SERAIT PARFAIT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et déplacez 1 de ses dommages sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Juju",
      version: "Compagno di Mamma Odie",
      text: [
        {
          title: "ZUPPA PERFETTA",
          description:
            "Quando giochi questo personaggio, sposta 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "006",
  cardNumber: 41,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_617dc5c42bf6460da3d61a1f330186bf",
    tcgPlayer: 588154,
  },
  text: [
    {
      title: "BEES' KNEES",
      description:
        "When you play this character, move 1 damage counter from chosen character to chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "fzy-1",
      name: "BEES' KNEES",
      text: "BEES' KNEES When you play this character, move 1 damage counter from chosen character to chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
