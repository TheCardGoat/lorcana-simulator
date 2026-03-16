import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseEnthusiasticDancer: CharacterCard = {
  id: "lzK",
  canonicalId: "ci_lzK",
  reprints: ["set5-112"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Enthusiastic Dancer",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Enthusiastic Dancer",
      text: [
        {
          title: "PERFECT PARTNERS",
          description:
            "While you have a character named Minnie Mouse in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Enthusiastischer Tänzer",
      text: [
        {
          title: "PERFEKTE PARTNER",
          description:
            "Solange du mindestens einen Minnie-Maus-Charakter im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Danseur enthousiaste",
      text: [
        {
          title: "CAVALIERS PARFAITS",
          description: "Tant que vous avez un personnage Minnie en jeu, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Ballerino Entusiasta",
      text: [
        {
          title: "PARTNER PERFETTI",
          description:
            "Mentre hai in gioco un personaggio chiamato Minni, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "005",
  cardNumber: 112,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bc7acdf1831f4c71bbab9e1c2c16f0ff",
    tcgPlayer: 557293,
  },
  text: [
    {
      title: "PERFECT PARTNERS",
      description:
        "While you have a character named Minnie Mouse in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "18m-1",
      text: "PERFECT PARTNERS While you have a character named Minnie Mouse in play, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
