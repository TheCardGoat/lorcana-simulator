import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseTrumpeter: CharacterCard = {
  id: "lmM",
  canonicalId: "ci_gBS",
  reprints: ["set3-182", "set9-172"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Trumpeter",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Trumpeter",
      text: [
        {
          title: "SOUND THE CALL",
          description: "{E}, 2 {I} — Play a character for free.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Trompeter",
      text: [
        {
          title: "DER RUF ERKLINGT, 2",
          description: "— Spiele einen Charakter kostenlos aus.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Trompettiste",
      text: [
        {
          title: "SONNE L'APPEL, 2",
          description: "— Jouez gratuitement un personnage.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Trombettiere",
      text: [
        {
          title: "DARE IL SEGNALE, 2",
          description: "— Gioca un personaggio gratis.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "009",
  cardNumber: 172,
  rarity: "common",
  cost: 4,
  strength: 0,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_631c3f90c74b4c0cabded03d2b07f85b",
    tcgPlayer: 650106,
  },
  text: [
    {
      title: "SOUND THE CALL",
      description: "{E}, 2 {I} — Play a character for free.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        cardType: "character",
        cost: "free",
        from: "hand",
        type: "play-card",
      },
      id: "6jz-1",
      text: "SOUND THE CALL {E}, 2 {I} — Play a character for free.",
      type: "activated",
    },
  ],
};
