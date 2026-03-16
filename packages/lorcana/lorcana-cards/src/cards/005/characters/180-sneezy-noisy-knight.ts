import type { CharacterCard } from "@tcg/lorcana-types";

export const sneezyNoisyKnight: CharacterCard = {
  id: "O74",
  canonicalId: "ci_O74",
  reprints: ["set5-180"],
  cardType: "character",
  name: "Sneezy",
  version: "Noisy Knight",
  i18n: {
    en: {
      name: "Sneezy",
      version: "Noisy Knight",
      text: [
        {
          title: "HEADWIND",
          description:
            "When you play this character, chosen Knight character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Hatschi",
      version: "Ritter der Geräusche",
      text: [
        {
          title: "GEGENWIND",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Ritter deiner Wahl in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2.)",
        },
      ],
    },
    fr: {
      name: "Atchoum",
      version: "Chevalier bruyant",
      text: [
        {
          title: "VENT CONTRAIRE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Chevalier qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Eolo",
      version: "Cavaliere Rumoroso",
      text: [
        {
          title: "VENTO CONTRARIO",
          description:
            "Quando giochi questo personaggio, un personaggio Cavaliere a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 180,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea122d22ac8a430389070f2f090c05e0",
    tcgPlayer: 559663,
  },
  text: [
    {
      title: "HEADWIND",
      description:
        "When you play this character, chosen Knight character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 2,
      },
      id: "83h-1",
      name: "HEADWIND",
      text: "HEADWIND When you play this character, chosen Knight character gains Challenger +2 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
