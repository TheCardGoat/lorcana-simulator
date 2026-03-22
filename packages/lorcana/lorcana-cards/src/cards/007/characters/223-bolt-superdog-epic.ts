import type { CharacterCard } from "@tcg/lorcana-types";
import { boltSuperdogEpicI18n } from "./223-bolt-superdog-epic.i18n";

export const boltSuperdogEpic: CharacterCard = {
  id: "VBj",
  canonicalId: "ci_qlj",
  reprints: ["set7-004"],
  cardType: "character",
  name: "Bolt",
  version: "Superdog",
  inkType: ["amber", "steel"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 223,
  rarity: "common",
  specialRarity: "epic",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e8863a1965284a3bad897ee8614d2866",
    tcgPlayer: 619735,
  },
  text: [
    {
      title: "Shift 3",
      description: "(You may pay 3 to play this on top of one of your characters named Bolt.)",
    },
    {
      title: "MARK OF POWER",
      description:
        "Whenever you ready this character, gain 1 lore for each other undamaged character you have in play.",
    },
    {
      title: "BOLT STARE",
      description: "— Banish chosen Illusion character.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "VBj-1",
      keyword: "Shift",
      type: "keyword",
      cost: {
        ink: 3,
      },
      text: "Shift 3",
    },
    {
      id: "VBj-2",
      name: "MARK OF POWER",
      type: "triggered",
      trigger: {
        event: "ready",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        type: "gain-lore",
        amount: {
          type: "filtered-count",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          excludeSelf: true,
          filters: [
            {
              type: "status",
              status: "undamaged",
            },
          ],
        },
      },
      text: "MARK OF POWER Whenever you ready this character, gain 1 lore for each other undamaged character you have in play.",
    },
    {
      id: "VBj-3",
      name: "BOLT STARE",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "banish",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Illusion",
            },
          ],
        },
      },
      text: "BOLT STARE {E} — Banish chosen Illusion character.",
    },
  ],
  i18n: boltSuperdogEpicI18n,
};
