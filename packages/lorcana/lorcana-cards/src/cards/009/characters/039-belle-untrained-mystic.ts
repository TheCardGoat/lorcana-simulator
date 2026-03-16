import type { CharacterCard } from "@tcg/lorcana-types";

export const belleUntrainedMystic: CharacterCard = {
  id: "fiU",
  canonicalId: "ci_b5v",
  reprints: ["set4-037", "set9-039"],
  cardType: "character",
  name: "Belle",
  version: "Untrained Mystic",
  i18n: {
    en: {
      name: "Belle",
      version: "Untrained Mystic",
      text: [
        {
          title: "HERE NOW, DON'T DO THAT",
          description:
            "When you play this character, move up to 1 damage counter from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Ungeübte Mystikerin",
      text: [
        {
          title: "HIER.",
        },
        {
          title: "TUE'S NICHT",
          description:
            "Wenn du diesen Charakter ausspielst, verschiebe 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Belle",
      version: "Mystique novice",
      text: [
        {
          title: "ALLONS, RESTEZ TRANQUILLE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et déplacez jusqu'à 1 de ses jetons Dommage sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Belle",
      version: "Mistica Inesperta",
      text: [
        {
          title: "STIA FERMO, NON FACCIA COSÌ",
          description:
            "Quando giochi questo personaggio, sposta fino a 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 39,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_53d3d0830c344ef08b076c3aada0afa6",
    tcgPlayer: 649986,
  },
  text: [
    {
      title: "HERE NOW, DON'T DO THAT",
      description:
        "When you play this character, move up to 1 damage counter from chosen character to chosen opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "161-1",
      text: "HERE NOW, DON'T DO THAT When you play this character, move up to 1 damage counter from chosen character to chosen opposing character.",
      type: "action",
    },
  ],
};
