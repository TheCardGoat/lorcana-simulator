import type { CharacterCard } from "@tcg/lorcana-types";

export const maximusRelentlessPursuer: CharacterCard = {
  id: "bqd",
  canonicalId: "ci_bqd",
  reprints: ["set1-011"],
  cardType: "character",
  name: "Maximus",
  version: "Relentless Pursuer",
  i18n: {
    en: {
      name: "Maximus",
      version: "Relentless Pursuer",
      text: [
        {
          title: "HORSE KICK",
          description: "When you play this character, chosen character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Maximus",
      version: "Gnadenloser Verfolger",
      text: [
        {
          title: "PFERDETRITT",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug -2.",
        },
      ],
    },
    fr: {
      name: "MAXIMUS",
      version: "Infatigable poursuivant",
      text: [
        {
          title: "COUP DE SABOT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Maximus",
      version: "Relentless Pursuer",
      text: [
        {
          title: "HORSE KICK",
          description: "When you play this character, chosen character gets –2 this turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 11,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_dbc44ab9437a44568efdf23b37f3f278",
    tcgPlayer: 494101,
  },
  text: [
    {
      title: "HORSE KICK",
      description: "When you play this character, chosen character gets -2 {S} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "2z0-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "2z0-2",
      name: "HORSE KICK",
      text: "HORSE KICK When you play this character, chosen character gets -2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
