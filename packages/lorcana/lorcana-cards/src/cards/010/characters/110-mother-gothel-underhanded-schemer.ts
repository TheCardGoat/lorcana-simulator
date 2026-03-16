import type { CharacterCard } from "@tcg/lorcana-types";

export const motherGothelUnderhandedSchemer: CharacterCard = {
  id: "Att",
  canonicalId: "ci_Att",
  reprints: ["set10-110"],
  cardType: "character",
  name: "Mother Gothel",
  version: "Underhanded Schemer",
  i18n: {
    en: {
      name: "Mother Gothel",
      version: "Underhanded Schemer",
      text: [
        {
          title: "SOMEBODY'S GOT TO USE IT",
          description: "If a character was banished this turn, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Mutter Gothel",
      version: "Hinterhältige Intrigantin",
      text: [
        {
          title: "IRGENDJEMAND MUSS JA WAS DAVON HABEN",
          description:
            "Solange in diesem Zug ein Charakter verbannt wurde, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Mère Gothel",
      version: "Fourbe conspiratrice",
      text: [
        {
          title: "QUELQU'UN DOIT BIEN SE SERVIR DE ÇA",
          description: "Si un personnage a été banni ce tour-ci, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Madre Gothel",
      version: "Subdola Cospiratrice",
      text: [
        {
          title: "QUALCUNO DOVRÀ PURE USARLO",
          description:
            "Se un personaggio è stato esiliato in questo turno, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 110,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3450ebee9acb4c258e0d161ca6c77010",
    tcgPlayer: 659190,
  },
  text: [
    {
      title: "SOMEBODY'S GOT TO USE IT",
      description: "If a character was banished this turn, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "banished-characters",
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          modifier: 2,
          stat: "strength",
          target: "SELF",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "1au-1",
      text: "SOMEBODY'S GOT TO USE IT If a character was banished this turn, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
