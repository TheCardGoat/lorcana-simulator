import type { CharacterCard } from "@tcg/lorcana-types";
import { tinkerBellGiantFairyI18n } from "./188-tinker-bell-giant-fairy.i18n";

export const tinkerBellGiantFairy: CharacterCard = {
  id: "49g",
  canonicalId: "ci_6gQ",
  reprints: ["set1-193", "set9-188"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Giant Fairy",
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 188,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a77ba07844374c399becfa3d49262642",
    tcgPlayer: 650121,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "ROCK THE BOAT",
      description: "When you play this character, deal 1 damage to each opposing character.",
    },
    {
      title: "PUNY PIRATE!",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Fairy"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "pf8-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "pf8-2",
      name: "ROCK THE BOAT",
      text: "ROCK THE BOAT When you play this character, deal 1 damage to each opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "pf8-3",
      name: "PUNY PIRATE!",
      text: "PUNY PIRATE! During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: tinkerBellGiantFairyI18n,
};
