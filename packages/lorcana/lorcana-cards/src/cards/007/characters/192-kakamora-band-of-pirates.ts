import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraBandOfPirates: CharacterCard = {
  id: "TUI",
  canonicalId: "ci_TUI",
  reprints: ["set7-192"],
  cardType: "character",
  name: "Kakamora",
  version: "Band of Pirates",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Band of Pirates",
      text: [
        {
          title: "SHOWBOATING",
          description:
            "While you have another Pirate character in play, this character gains Challenger +3.",
        },
      ],
    },
    de: {
      name: "Kokomora",
      version: "Piratenbande",
      text: [
        {
          title: "ANGEBEREI",
          description:
            "Solange du mindestens einen weiteren Piraten im Spiel hast, erhält dieser Charakter Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
        },
      ],
    },
    fr: {
      name: "Kakamora",
      version: "Bande de pirates",
      text: [
        {
          title: "FANFARONNADE",
          description:
            "Tant que vous avez un autre personnage Pirate en jeu, ce personnage-ci gagne Offensif +3.",
        },
      ],
    },
    it: {
      name: "Kakamora",
      version: "Banda di Pirati",
      text: [
        {
          title: "METTERSI IN MOSTRA",
          description:
            "Mentre hai in gioco un altro personaggio Pirata, questo personaggio ottiene Sfidante +3.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "007",
  cardNumber: 192,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e97a6df3786a4f2489911d0b9201a127",
    tcgPlayer: 619518,
  },
  text: [
    {
      title: "SHOWBOATING",
      description:
        "While you have another Pirate character in play, this character gains Challenger +3.",
    },
  ],
  classifications: ["Storyborn", "Pirate"],
  abilities: [
    {
      effect: {
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 3,
      },
      id: "15r-1",
      text: "SHOWBOATING While you have another Pirate character in play, this character gains Challenger +3.",
      type: "action",
    },
  ],
};
