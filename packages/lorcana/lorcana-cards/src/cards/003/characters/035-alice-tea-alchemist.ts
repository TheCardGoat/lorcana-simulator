import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceTeaAlchemist: CharacterCard = {
  id: "Vs7",
  canonicalId: "ci_Vs7",
  reprints: ["set3-035"],
  cardType: "character",
  name: "Alice",
  version: "Tea Alchemist",
  i18n: {
    en: {
      name: "Alice",
      version: "Tea Alchemist",
      text: [
        {
          title: "CURIOUSER AND CURIOUSER",
          description:
            "{E} — Exert chosen opposing character and all other opposing characters with the same name.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Tee Alchemistin",
      text: [
        {
          title: "DAS WIRD JA IMMER ULKIGER",
          description:
            "— Erschöpfe einen gegnerischen Charakter deiner Wahl und alle gegnerischen Charaktere mit dem gleichen Namen.",
        },
      ],
    },
    fr: {
      name: "Alice",
      version: "Alchimiste théinée",
      text: [
        {
          title: "TRÈS TRÈS CURIEUX",
          description:
            "— Choisissez un personnage adverse et épuisez-le, ainsi que tous les personnages adverses du même nom.",
        },
      ],
    },
    it: {
      name: "Alice",
      version: "Alchimista del Tè",
      text: [
        {
          title: "È SEMPRE PIÙ CURIOSO",
          description:
            "— Impegna un personaggio avversario a tua scelta e tutti gli altri personaggi avversari con lo stesso nome.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "003",
  cardNumber: 35,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_df136840866d426db031332e34942735",
    tcgPlayer: 538729,
  },
  text: [
    {
      title: "CURIOUSER AND CURIOUSER",
      description:
        "{E} — Exert chosen opposing character and all other opposing characters with the same name.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Sorcerer"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
