import type { CharacterCard } from "@tcg/lorcana-types";
import { moanaBornLeaderI18n } from "./116-moana-born-leader.i18n";

export const moanaBornLeader: CharacterCard = {
  id: "xR2",
  canonicalId: "ci_xR2",
  reprints: ["set3-116"],
  cardType: "character",
  name: "Moana",
  version: "Born Leader",
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 116,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d506a2271c444d7f9c2becae74535475",
    tcgPlayer: 532861,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "WELCOME TO MY BOAT",
      description:
        "Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Captain"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "cku-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            target: {
              selector: "all",
              count: "all",
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "cku-2",
      name: "WELCOME TO MY BOAT",
      text: "WELCOME TO MY BOAT Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: moanaBornLeaderI18n,
};
