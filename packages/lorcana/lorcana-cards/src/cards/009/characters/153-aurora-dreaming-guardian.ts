import type { CharacterCard } from "@tcg/lorcana-types";

export const auroraDreamingGuardian: CharacterCard = {
  id: "klx",
  canonicalId: "ci_mSW",
  reprints: ["set1-139", "set9-153"],
  cardType: "character",
  name: "Aurora",
  version: "Dreaming Guardian",
  i18n: {
    en: {
      name: "Aurora",
      version: "Dreaming Guardian",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "PROTECTIVE EMBRACE",
          description: "Your other characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Aurora",
      version: "Wächterin der Träume",
      text: "Gestaltwandel 3 SCHÜTZENDE UMARMUNG Deine anderen Charaktere erhalten Behütet. (Gegnerische Karten können diese Charaktere nicht auswählen, außer um sie herauszufordern.)",
    },
    fr: {
      name: "AURORE",
      version: "Gardienne rêveuse",
      text: [
        {
          title: "Alter 3",
          description:
            "(Vous pouvez payer 3 pour jouer ce personnage sur un autre personnage Aurore.) ÉTREINTE PROTECTRICE Vos autres personnages gagnent Hors d'atteinte. (Ils ne peuvent pas être choisis par vos adversaires, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Aurora",
      version: "Dreaming Guardian",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Aurora.) PROTECTIVE EMBRACE Your other characters gain Ward. (Opponents can't choose them except to challenge.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "009",
  cardNumber: 153,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_81f418041acd4fd98990e02403938de4",
    tcgPlayer: 650088,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "PROTECTIVE EMBRACE",
      description: "Your other characters gain Ward.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "11z-1",
      keyword: "Shift",
      text: "Shift 3 {I}",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "11z-2",
      name: "PROTECTIVE EMBRACE Your other",
      text: "PROTECTIVE EMBRACE Your other characters gain Ward.",
      type: "static",
    },
  ],
};
