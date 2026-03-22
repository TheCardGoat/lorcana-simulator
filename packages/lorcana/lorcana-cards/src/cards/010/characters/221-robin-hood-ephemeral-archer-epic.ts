import type { CharacterCard } from "@tcg/lorcana-types";
import { robinHoodEphemeralArcherEpicI18n } from "./221-robin-hood-ephemeral-archer-epic.i18n";

export const robinHoodEphemeralArcherEpic: CharacterCard = {
  id: "UdH",
  canonicalId: "ci_ZXj",
  reprints: ["set10-171"],
  cardType: "character",
  name: "Robin Hood",
  version: "Ephemeral Archer",
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "010",
  cardNumber: 221,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9a7e83a63b8444438f4bc7714df6faf9",
    tcgPlayer: 660272,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "EXPERT SHOT",
      description:
        "Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Whisper"],
  abilities: [
    {
      id: "1pw-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        condition: {
          expression: "there's a card under him",
          type: "if",
        },
        then: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "conditional",
      },
      id: "1pw-2",
      name: "EXPERT SHOT",
      text: "EXPERT SHOT Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: robinHoodEphemeralArcherEpicI18n,
};
